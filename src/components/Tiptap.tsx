import { useEditor, EditorContent, Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline';
import ToggleButton from './Basic/ToggleButton'
import { PropsWithChildren } from 'react';
import styles from '@~/styles/Editor.module.css';

const Tiptap = (props: PropsWithChildren<{setEditor: (editor: Editor) => void, placeholder?: string}>) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline
    ],
    content: '',
  })
  
  props.setEditor(editor!);

  return (
    <div className={`border rounded-lg m-2 transition ${styles.editor}`}>
      <div className={`p-2 border-b ${styles.toolbar}`}>
        <ToggleButton buttonStyle='primary' active={editor?.isActive('bold') ?? false} onClick={() => editor?.chain().focus().toggleBold().run()}><strong>B</strong></ToggleButton>
        <ToggleButton buttonStyle='primary' active={editor?.isActive('italic') ?? false} onClick={() => editor?.chain().focus().toggleItalic().run()}><em>I</em></ToggleButton>
        <ToggleButton buttonStyle='primary' active={editor?.isActive('underline') ?? false} onClick={() => editor?.chain().focus().toggleUnderline().run()}><u>U</u></ToggleButton>
        <ToggleButton buttonStyle='primary' active={editor?.isActive('strike') ?? false} onClick={() => editor?.chain().focus().toggleStrike().run()}><s>S</s></ToggleButton>
      </div>
      <EditorContent placeholder={props.placeholder} editor={editor} className={`p-2 ${styles.editorContent}`} />
    </div>
  )
}

export default Tiptap;