import Tiptap, { TiptapContent, TiptapControls, TiptapFormCompat } from "@/app/components/Tiptap";
import prisma from "@/lib/prisma";
import { getResponse } from "@/utils/responses"
import { auth } from "@clerk/nextjs";
import { Button, Card, Flex } from "@radix-ui/themes";
import { revalidateTag } from "next/cache";
import ResponseEditorClient from "./ResponseEditorClient";

const ResponseEditor = async ({ discussionId, responseId, shouldCloseDialog }: { discussionId: string, responseId?: string, cardVariant?: 'surface' | 'ghost', shouldCloseDialog?: boolean }) => {
    const { userId } = auth();
    const currentText = responseId ? (await getResponse(responseId))?.content : '';

    async function save(formData: FormData) {
        'use server';

        if(formData.get('content') == currentText) return;

        if (responseId) {
            await prisma.response.update({
                where: {
                    id: responseId
                },
                data: {
                    content: formData.get('content') as string
                }
            });
        } else {
            await prisma.response.create({
                data: {
                    discussion_id: discussionId,
                    content: formData.get('content') as string,
                    poster_id: userId!,
                    repliesFrom: {
                        create: (formData.get('replyTo') as string)
                            .split(';')
                            .map(reply => ({ to_id: reply }))
                    }
                }
            });
        }

        revalidateTag('responses');
    }

    return <ResponseEditorClient currentText={currentText} save={save} shouldCloseDialog={shouldCloseDialog} />
}

export default ResponseEditor;