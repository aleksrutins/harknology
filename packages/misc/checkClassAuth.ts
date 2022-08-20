import prisma from "database";
import { Class, Discussion, User } from "@prisma/client";
import { Session } from "next-auth";

export type Result = [[(Class & { students: User[], discussions: Discussion[] }) | null, 'teacher' | 'student' | 'none'], boolean];

export const checkClassAuth = async (id: string, session: Session): Promise<Result> => {
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
          (await cls.students()).map(student => student.email).includes(session.user?.email!)) {
              return [[await cls, 'student'], true];
          }
        } catch {}
    return [[null, 'none'], false];
}
