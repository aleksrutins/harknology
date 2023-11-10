'use client';

import Tiptap, { TiptapControls, TiptapContent, TiptapFormCompat } from "@/app/components/Tiptap";
import { Card, Flex, Button, DialogClose } from "@radix-ui/themes";
import { useCurrentEditor } from "@tiptap/react";
import { useContext } from "react";
import { ReplyContext } from "./replies";

const ResponseEditorForm = ({ currentText, shouldCloseDialog, save }: { currentText?: string, shouldCloseDialog?: boolean, save: (data: FormData) => void }) => {
    const { editor } = useCurrentEditor();
    const { replies, setReplies } = useContext(ReplyContext);

    return <form action={save} onSubmit={() => {
        editor?.commands.setContent('');
        setReplies(new Set());
    }}>
        <Flex direction="column" gap="3">
            <TiptapContent />
            <TiptapFormCompat />
            {replies && <input type="hidden" name="replyTo" value={[...replies].join(';')} />}
            {shouldCloseDialog ? <DialogClose>
                <Button type="submit">{currentText ? 'Save' : 'Post'}</Button>
            </DialogClose> : <Button type="submit">{currentText ? 'Save' : 'Post'}</Button>}
        </Flex>
    </form>
}

const ResponseEditorClient = ({ currentText, shouldCloseDialog, save }: { currentText?: string, shouldCloseDialog?: boolean, save: (data: FormData) => void }) =>
    <>
        <Tiptap initialContent={currentText}>
            <ResponseEditorForm currentText={currentText} save={save} shouldCloseDialog={shouldCloseDialog} />
        </Tiptap>
    </>

export default ResponseEditorClient;