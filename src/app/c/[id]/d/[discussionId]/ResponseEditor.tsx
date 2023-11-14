import Tiptap, {
    TiptapContent,
    TiptapControls,
    TiptapFormCompat,
} from "@/app/components/Tiptap";
import prisma from "@/lib/prisma";
import { getResponse } from "@/utils/queries/responses";
import { auth } from "@clerk/nextjs";
import { Button, Card, Flex } from "@radix-ui/themes";
import { revalidateTag } from "next/cache";
import ResponseEditorClient from "./ResponseEditorClient";
import { save } from "@/utils/mutations/responses";

const ResponseEditor = async ({
    discussionId,
    responseId,
    shouldCloseDialog,
}: {
    discussionId: string;
    responseId?: string;
    cardVariant?: "surface" | "ghost";
    shouldCloseDialog?: boolean;
}) => {
    const currentText = responseId
        ? (await getResponse(responseId))?.content
        : "";

    return (
        <ResponseEditorClient
            currentText={currentText}
            save={save(currentText, responseId, discussionId)}
            shouldCloseDialog={shouldCloseDialog}
        />
    );
};

export default ResponseEditor;
