import prisma from "@/lib/prisma";
import { cache } from "react"

export const tags = ['classes', 'discussions']

export const discussionsForClass = cache(async (classId: string) => await prisma.discussion.findMany({where: { class_id: classId }}));