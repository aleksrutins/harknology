import { Result } from "%checkClassAuth";
import prisma from "@/prisma";
import apiRoute from "@/util/apiRoute";
import { Response } from "@prisma/client";
import { getSession } from "next-auth/react";

export default apiRoute<Response[]>(['checkClassAuth'], async ({ id }, { req }, checkClassAuth) => {
    const session = await getSession({ req });
    if(!session) {
        return [401, "Not authorized"]
    }
    const response = await prisma.response.findUnique({
        where: {
            id: id as string
        },
        select: {
            discussion: true
        }
    });
    try {
        const [data, status]: Result = await checkClassAuth(response?.discussion?.classId, session);
        if(!status) {
            return [403, 'Not authorized'];
        }
        const responses = await prisma.response.findMany({
            where: {
                parentId: id as string
            }
        });
        return [200, responses];
    } catch(e) {
        return [500, 'Error'];
    }
});