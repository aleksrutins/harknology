import prisma from "@/lib/prisma";
import { cache } from "react"

export const tags = ['classes', 'discussions']

export const discussionsForClass = cache(async (classId: string) => await prisma.discussion.findMany({where: { class_id: classId }}));

export const getDiscussion = cache(async (discussionId: string) => await prisma.discussion.findUnique({where: { id: discussionId }}));