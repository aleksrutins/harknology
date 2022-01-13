import prisma from "@/prisma";
import { Class, User } from "@prisma/client";
import { Session } from "next-auth";
export default async (id: string, session: Session): Promise<[[(Class & { students: User[] }) | null, 'teacher' | 'student'] | null, boolean]> => {
    const cls = prisma.class.findUnique({
        where: {
            id: id
        },
        include: {
            students: true
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