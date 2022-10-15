import prisma from "@/prisma";
import { JoinCode } from "@prisma/client";
import { z } from "zod";
import { createRouter, ensureAuth } from "./util";

export default createRouter()
  .query("info", {
    input: z.string(),
    async resolve({ ctx, input }) {
      ensureAuth(ctx);
      const code = prisma.joinCode.findUnique({
        where: {
          code: input,
        },
      });
      const clasroom = await code.class();
      const teacher = (await code.class().teacher());
      return {
        class: {
          id: clasroom?.id!,
          name: clasroom?.name!,
        },
        teacher: {
          name: teacher?.name!,
          email: teacher?.email!,
          image: teacher?.image!,
        },
      };
    },
  })
  .mutation("createForClass", {
    input: z.string(),
    async resolve({ ctx, input }) {
      const session = ensureAuth(ctx);
      const cls = prisma.class.findUnique({
        where: {
          id: input,
        },
      });
      if((await cls) == null) {
        throw "No such class";
      }
      if ((await cls)?.teacherEmail != session.user?.email) {
        throw "Not authorized";
      }
      const codes = (await cls.joinCodes())!;
      let activeCodes: JoinCode[] = [];
      for (let code of codes) {
        if (code.expires > new Date()) {
          // Code has expired
          await prisma.joinCode.delete({
            where: {
              code: code.code,
            },
          });
          continue;
        }
        activeCodes.push(code);
      }
      if (activeCodes.length == 0) {
        activeCodes.push(
          await prisma.joinCode.create({
            data: {
              classId: input,
              expires: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
            },
          }),
        );
      }
      return activeCodes[0];
    },
  })
  .mutation("joinClass", {
    input: z.string(),
    async resolve({ ctx, input }) {
      const session = ensureAuth(ctx);
      const user = await prisma.user.findUnique({
        where: {
          email: session.user?.email!,
        },
        select: {
          id: true,
        },
      });
      const code = await prisma.joinCode.findUnique({
        where: {
          code: input,
        },
      });
      await prisma.class.update({
        where: {
          id: code?.classId!,
        },
        data: {
          students: {
            connect: {
              id: user?.id,
            },
          },
        },
      });
    },
  });
