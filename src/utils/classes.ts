import prisma from "@/lib/prisma";
import { cache } from "react";

export const tags = ['classes']

export const getClasses = cache(async (userId: string) => await prisma.class.findMany({
    where: {
        OR: [
            { teacher_id: userId },
            {
                students: {
                    some: { student_id: userId }
                }
            }
        ]
    }
}))

export const getClass = cache(async (id: string) => await prisma.class.findUnique({
    where: {
        id
    }
}))

export const getMembers = cache(async (id: string) => await prisma.class.findUnique({
    where: { id },
    select: { teacher_id: true, students: { select: { student_id: true } } }
}))

export const canAccessClass = cache(async (classId: string, userId: string) => (!!(await getClasses(userId)).find(c => c.id == classId)))