import checkClassAuth, { Result } from "%checkClassAuth";
import prisma from "@/prisma";
import apiRoute from "@/util/apiRoute";
import { Response } from "@prisma/client";
import { getSession } from "next-auth/react";

export default apiRoute<Response[]>(['checkClassAuth'], async ({ id }, { req }, _) => {
    const session = await getSession({ req });
    if(!session) {
        return [401, "Not authorized"]
    }
    const discussion = await prisma.discussion.findUnique({
        where: {
            id: id as string
        }
    });
    try {
        const [data, status]: Result = await checkClassAuth(discussion?.classId as string, session);
        if(!status) {
            return [403, 'Not authorized'];
        }
        const responses = await prisma.response.findMany({
            where: {
                discussionId: id as string,
                parentId: null
            }
        });
        return [200, responses];
    } catch(e) {
        return [500, 'Error'];
    }
});