import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { Response } from "@prisma/client";
import { revalidateTag } from "next/cache";

export const save =
    (currentContent?: string, responseId?: string, discussionId?: string) =>
    async (formData: FormData) => {
        "use server";
        const { userId } = auth();

        if (formData.get("content") == currentContent) return;

        if (responseId) {
            await prisma.response.update({
                where: {
                    id: responseId,
                },
                data: {
                    content: formData.get("content") as string,
                },
            });
        } else if (discussionId) {
            await prisma.response.create({
                data: {
                    discussion_id: discussionId,
                    content: formData.get("content") as string,
                    poster_id: userId!,
                    repliesFrom: {
                        create:
                            formData.get("replyTo") == ""
                                ? []
                                : (formData.get("replyTo") as string)
                                      .split(";")
                                      .map((reply) => ({ to_id: reply })),
                    },
                },
            });
        }

        revalidateTag("responses");
    };

export const deleteResponse = (id: string) => async () => {
    "use server";
    await prisma.response.delete({
        where: { id },
    });

    revalidateTag("responses");
};
