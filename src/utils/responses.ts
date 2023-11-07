import prisma from "@/lib/prisma";
import { cache } from "react";

export const tags = ['responses'];

export const getResponses = cache(async (discussionId: string) => await prisma.response.findMany({
    where: {
        discussion_id: discussionId
    },
    orderBy: {
        created_at: 'asc'
    }
}));

export const getResponse = cache(async (id: string) => await prisma.response.findUnique({
    where: {
        id
    }
}))