import prisma from "@/prisma";
import { Class, Discussion, User } from "@prisma/client";
import { Session } from "next-auth";

export type Result = [[(Class & { students: User[], discussions: Discussion[] }) | null, 'teacher' | 'student'] | null, boolean];

export default async (id: string, session: Session): Promise<Result> => {
    const cls = prisma.class.findUnique({
        where: {
            id: id
        },
        include: {
            students: true,
            discussions: true
        }
    });
    if((await cls)?.teacherEmail == session.user?.email) {
        return [[await cls, 'teacher'], true];
    } else if(
          (await cls.students()).map(student => student.email).includes(session.user?.email!)) {
              return [[await cls, 'student'], true];
          }
    return [null, false];
}