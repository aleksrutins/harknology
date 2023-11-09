'use server';

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";

export async function deleteExpiredCodes() {
    await prisma.joinCode.deleteMany({
        where: {
            createdAt: {
                lt: new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
            }
        }
    });
}

export async function getJoinCode(classId: string) {
    await deleteExpiredCodes();

    while(true)
        try {
            return await prisma.joinCode.create({
                data: {
                    classId
                }
            })
        } catch(e) {

        }
}

export async function getClassInfo(code: string): Promise<{ id: string, name: string } | undefined> {
    await deleteExpiredCodes();
    return await prisma.joinCode.findUnique({
        where: {
            code
        },
        select: {
            class: {
                select: {
                    id: true,
                    name: true
                }
            }
        }
    }).then(code => code?.class);
}

export async function joinClass(code: string) {
    await deleteExpiredCodes();

    const { userId } = auth();
    if(userId == null) throw new Error("Not authorized");

    const classInfo = await getClassInfo(code);
    if(classInfo == null) throw new Error("Class not found");

    await prisma.studentClass.create({
        data: {
            student_id: userId,
            class_id: classInfo.id
        }
    });
}