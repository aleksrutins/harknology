'use client';

import Tiptap, { TiptapControls, TiptapContent, TiptapFormCompat } from "@/app/components/Tiptap";
import { Card, Flex, Button, DialogClose } from "@radix-ui/themes";
import { useCurrentEditor } from "@tiptap/react";

const ResponseEditorForm = ({ currentText, shouldCloseDialog, save }: { currentText?: string, shouldCloseDialog?: boolean, save: (data: FormData) => void }) => {
    const { editor } = useCurrentEditor();

    return <form action={save} onSubmit={() => editor?.commands.setContent('')}>
            <Flex direction="column">
                <TiptapContent/>
                <TiptapFormCompat/>
                { shouldCloseDialog ? <DialogClose>
                    <Button type="submit">{currentText ? 'Save' : 'Post'}</Button>
                </DialogClose> : <Button type="submit">{currentText ? 'Save' : 'Post'}</Button> }
            </Flex>
    </form>
}

const ResponseEditorClient = ({currentText, cardVariant, shouldCloseDialog, save}: {currentText?: string, cardVariant?: 'surface' | 'ghost', shouldCloseDialog?: boolean, save: (data: FormData) => void}) => 
        <Card style={{maxWidth: '100%'}} variant={cardVariant}>
            <Tiptap initialContent={currentText}>
                <ResponseEditorForm currentText={currentText} save={save} shouldCloseDialog={shouldCloseDialog}/>
            </Tiptap>
        </Card>

export default ResponseEditorClient;