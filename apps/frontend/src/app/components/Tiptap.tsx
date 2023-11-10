'use client';

import { Button, Card, Flex } from "@radix-ui/themes";
import { Editor, EditorContent, EditorProvider, useCurrentEditor, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { FontBoldIcon, FontItalicIcon, StrikethroughIcon, ListBulletIcon, QuoteIcon, HeadingIcon } from "@radix-ui/react-icons";
import { ReactNode, useContext } from "react";
import Loader from "./Loader";

const TiptapControls = () => {
    const { editor } = useCurrentEditor();

    return <Flex style={{overflowX: 'scroll', maxWidth: '100%', marginBottom: 'var(--space-3)', flexShrink: 0}} gap="3">
        <Button type="button" onClick={() => editor?.chain()?.focus()?.toggleBold()?.run()} variant={editor?.isActive('bold') ? 'solid' : 'soft'}>
            <FontBoldIcon/>
        </Button>
        <Button type="button" onClick={() => editor?.chain()?.focus()?.toggleItalic()?.run()} variant={editor?.isActive('italic') ? 'solid' : 'soft'}>
            <FontItalicIcon/>
        </Button>
        <Button type="button" onClick={() => editor?.chain()?.focus()?.toggleStrike()?.run()} variant={editor?.isActive('strike') ? 'solid' : 'soft'}>
            <StrikethroughIcon/>
        </Button>
        <Button type="button" onClick={() => editor?.chain()?.focus()?.toggleBulletList()?.run()} variant={editor?.isActive('bulletList') ? 'solid' : 'soft'}>
            <ListBulletIcon/>
        </Button>
        <Button type="button" onClick={() => editor?.chain()?.focus()?.toggleOrderedList()?.run()} variant={editor?.isActive('orderedList') ? 'solid' : 'soft'}>
            1.
        </Button>
        <Button type="button" onClick={() => editor?.chain()?.focus()?.toggleBlockquote()?.run()} variant={editor?.isActive('blockquote') ? 'solid' : 'soft'}>
            <QuoteIcon/>
        </Button>
        <Button type="button" onClick={() => editor?.chain()?.focus()?.setHeading({ level: 1 })?.run()} variant={editor?.isActive('heading', { level: 1 }) ? 'solid' : 'soft'}>
            <HeadingIcon/>
            <sub>1</sub>
        </Button>
        <Button type="button" onClick={() => editor?.chain()?.focus()?.setHeading({ level: 2 })?.run()} variant={editor?.isActive('heading', { level: 2 }) ? 'solid' : 'soft'}>
            <HeadingIcon/>
            <sub>2</sub>
        </Button>
        <Button type="button" onClick={() => editor?.chain()?.focus()?.setHeading({ level: 3 })?.run()} variant={editor?.isActive('heading', { level: 3 }) ? 'solid' : 'soft'}>
            <HeadingIcon/>
            <sub>3</sub>
        </Button>
    </Flex>
}

const TiptapContent = () => {
    const { editor } = useCurrentEditor();

    return <EditorContent editor={editor} style={{display: 'block', overflow: 'auto'}} />;
}

const TiptapFormCompat = () => {
    const { editor } = useCurrentEditor();

    return <input type="hidden" name="content" value={editor?.getHTML() ?? ''} onChange={(e) => editor?.commands?.setContent(e.target.value)}/>;
}

const Tiptap = ({ children, initialContent }: { children: ReactNode, initialContent?: string }) =>
        <EditorProvider extensions={[StarterKit]} content={initialContent} slotBefore={<TiptapControls/>}>
            {children}
        </EditorProvider>

export {
    Tiptap as default,
    TiptapControls,
    TiptapContent,
    TiptapFormCompat
}