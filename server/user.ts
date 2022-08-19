import prisma from "@/prisma";
import { z } from "zod";
import { createRouter } from "./util";

export default createRouter()
    .query('info', {
        input: z.string(),
        async resolve({ ctx, input }) {
            const user = await prisma.user.findUnique({
                where: {
                    email: input
                },
                select: {
                    name: true,
                    email: true,
                    image: true
                }
            });
            return user;
        }
    })
