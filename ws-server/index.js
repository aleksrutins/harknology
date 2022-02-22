const { Server } = require('socket.io');
const prisma = require('./prisma');
const config = require('./config');
const checkClassAuth = require('./checkClassAuth');
const axios = require('axios').default;

let subscriptions = new Map();

function storeSubscription(obj, clientId) {
    if(subscriptions.has(obj))
        subscriptions.get(obj).push(clientId);
    else
        subscriptions.set(obj, [clientId]);
}

function disconnectSubscriptions(clientId) {
    for(let [,subs] of subscriptions) for(let i in subs) 
        if(subs[i] == clientId) subs.splice(i, 1);
}

const io = new Server({
    cors: {
        origin: config.serverUrl
    }
});

io.on('connection', async socket => {
    console.log(`connect ${socket.id}`);
    socket.on('subscribe', async discussionId => {
        const session = await (await axios.get(`${config.serverUrl}/api/auth/session`)).data;
        const discussion = await prisma.discussion.findUnique({
            where: {
                id: discussionId
            },
            select: {
                responses: true,
                classId: true
            }
        });
        const [[, role], status] = await checkClassAuth(discussion.classId, session);
        if(!status) return;
        socket.emit('responses', discussion.responses);
        storeSubscription(`discussion:${discussionId}`, socket.id);
    });
    socket.on('subscribeResponse', async responseId => {
        const response = await prisma.response.findUnique({
            where: {
                id: responseId
            },
            select: {
                responses: true,
                discussion: true
            }
        });
        const [[, role], status] = await checkClassAuth(response.discussion.classId, session);
        if(!status) return;
        socket.emit('responses', response.responses);
        storeSubscription(`response:${responseId}`, socket.id);
    });
    socket.on('respond', async response => {
        await prisma.response.create({
            data: response
        });
        (await io.fetchSockets())
            .filter(socket => {
                if(response.parentId)
                    return (subscriptions.get(`response:${response.parentId}`) || []).includes(socket.id)
                else
                    return (subscriptions.get(`discussion:${response.discussionId}`) || []).includes(socket.id)
            })
            .forEach(socket => {
                socket.emit('response', response);
            });
    });
    socket.on('disconnect', () => {
        console.log(`disconnect ${socket.id}`);
        disconnectSubscriptions(socket.id);
    });
});

io.listen(config.port);