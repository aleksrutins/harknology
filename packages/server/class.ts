import { checkClassAuth } from "misc/checkClassAuth";
import prisma from "database";
import { z } from "zod";
import { createRouter, ensureAuth } from "./util";

export default createRouter()

  .query("all", {
    async resolve({ ctx }) {
      const session = ensureAuth(ctx);
      return {
        classesTeaching: await prisma.class.findMany({
          where: {
            teacherEmail: session.user?.email!,
          },
        }),
        classes: await prisma.user.findUnique({
          where: {
            email: session.user?.email!,
          },
        }).classes(),
      };
    },
  })

  .query("get", {
    input: z.string(),
    async resolve({ ctx, input }) {
      const session = ensureAuth(ctx);
      const [[cls], status] = await checkClassAuth(input, session);
      if (status == false) throw "Not authorized";
      return {
        ...cls!,
        students: cls!.students.map((student) => ({
          name: student.name!,
          email: student.email!,
          image: student.image!,
        })),
        discussions: cls!.discussions,
      };
    },
  })

  .query("role", {
    input: z.string(),
    async resolve({ ctx, input }) {
      const session = ensureAuth(ctx);
      try {
        const [[, role]] = await checkClassAuth(input, session);
        return role;
      } catch (e) {
        console.log(e);
        return "none";
      }
    },
  })

  .query("discussions", {
    input: z.string(),
    async resolve({ ctx, input }) {
      const session = ensureAuth(ctx);
      const [data, status] = await checkClassAuth(input, session);
      if (!status) {
        throw "Not authorized";
      }
      const [cls] = data!;
      return cls?.discussions ?? [];
    },
  })

  .mutation("create", {
    input: z.object({
      name: z.string(),
      description: z.string(),
    }),
    async resolve({ ctx, input }) {
      const session = ensureAuth(ctx);
      try {
        await prisma.class.create({
          data: {
            ...input,
            teacherEmail: session.user?.email!,
          },
        });
      } catch (e) {
        throw "Could not create class";
      }
    },
  })

  .mutation('delete', {
    input: z.string(),
    async resolve({ctx, input}) {
        const session = ensureAuth(ctx);
        const cls = await prisma.class.findUnique({
            where: {
                id: input
            }
        });
        if(cls?.teacherEmail != session.user?.email) {
            throw 'Not authorized';
        }
        await prisma.class.delete({
            where: {
                id: input
            }
        });
    }
  });
