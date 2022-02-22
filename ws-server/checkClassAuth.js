const prisma = require('./prisma');

module.exports = async (id, session) => {
    const cls = prisma.class.findUnique({
        where: {
            id: id
        },
        select: {
            students: true,
            discussions: true,
            teacherEmail: true,
            id: true,
            name: true,
            description: true
        }
    });
    try {
        if((await cls)?.teacherEmail == session.user?.email) {
        return [[await cls, 'teacher'], true];
    } else if(
        (await cls.students()).map(student => student.email).includes(session.user?.email)) {
            return [[await cls, 'student'], true];
        }
        } catch {}
    return [[null, 'none'], false];
}