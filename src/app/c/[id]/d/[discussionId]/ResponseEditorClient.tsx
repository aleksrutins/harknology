'use client';

import Tiptap, { TiptapControls, TiptapContent, TiptapFormCompat } from "@/app/components/Tiptap";
import { Card, Flex, Button } from "@radix-ui/themes";
import { useCurrentEditor } from "@tiptap/react";

const ResponseEditorForm = ({ currentText, save }: { currentText?: string, save: (data: FormData) => void }) => {
    const { editor } = useCurrentEditor();
    return <form action={save} onSubmit={() => editor?.commands.setContent('')}>
            <Flex direction="column" gap="3">
                <TiptapContent/>
                <TiptapFormCompat/>
                <Button type="submit">{currentText ? 'Save' : 'Post'}</Button>
            </Flex>
    </form>
}

const ResponseEditorClient = ({currentText, save}: {currentText?: string, save: (data: FormData) => void}) => 
        <Card style={{maxWidth: '100%'}}>
            <Tiptap initialContent={currentText}>
                <ResponseEditorForm currentText={currentText} save={save}/>
            </Tiptap>
        </Card>

export default ResponseEditorClient;