import { checkClassAuth } from "misc/checkClassAuth";
import prisma from "database";
import { ConnectionType } from "@prisma/client";
import { z } from "zod";
import { createRouter, ensureAuth } from "./util";

export default createRouter()
  .query("get", {
    input: z.string(),
    async resolve({ ctx, input }) {
        const session = ensureAuth(ctx);
      const discussion = await prisma.discussion.findUnique({
        where: {
          id: input,
        },
      });
      const [[cls], status] = await checkClassAuth(
        discussion?.classId as string,
        session,
      );
      if (status == false) {
        throw 'Not authorized'
      }
      if (discussion) return discussion
      else throw "Not found"
    },
  })
  .query('responses', {
    input: z.string(),
    async resolve({ctx, input}) {
        const session = ensureAuth(ctx);
        const discussion = await prisma.discussion.findUnique({
            where: {
                id: input
            }
        });
        const [,status] = await checkClassAuth(discussion?.classId as string, session);
        if(!status) {
            throw 'Not authorized';
        }
        const responses = await prisma.response.findMany({
            where: {
                discussionId: input
            },
            include: {
                connectsFrom: true,
                connectsTo: true
            }
        });
        return responses;
    }
  })
  .mutation('create', {
    input: z.object({
        classId: z.string(),
        name: z.string(),
        description: z.string()
    }),
    async resolve({ctx, input}) {
        const session = ensureAuth(ctx);
        const [data, status] = await checkClassAuth(input.classId, session);
      if(!status) {
          throw 'Not authorized';
      }
      const discussion = await prisma.discussion.create({
          data: {
              ...input
          }
      });
      return discussion.id;
    }
  })
  .mutation('respond', {
    input: z.object({
        discussion: z.string(),
        parents: z.array(z.string()),
        body: z.string()
    }),
    async resolve({ ctx, input }) {
        const session = ensureAuth(ctx);

        const discussion = await prisma.discussion.findUnique({
            where: {
                id: input.discussion as string
            }
        });
        const [data, status] = await checkClassAuth(discussion?.classId!, session);
        if(!status) {
            throw 'Not authorized';
        }
        const response = await prisma.response.create({
            data: {
                discussionId: input.discussion,
                userEmail: session.user?.email!,
                content: input.body,
                connectsFrom: {
                    create: input.parents.map(parent => ({
                        type: ConnectionType.ResponseTo,
                        from: {
                            connect: {
                                id: parent
                            }
                        }
                    }))
                }
            }
        });
        return [200, JSON.stringify(response)];
    }
  });
