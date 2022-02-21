import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline';
import ToggleButton from './Basic/ToggleButton'

const Tiptap = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline
    ],
    content: '',
  })

  return (
    <div className='border rounded-lg m-2 focus-inside:ring-2 transition'>
      <div className='p-2 border-b'>
        <ToggleButton buttonStyle='primary' active={editor?.isActive('bold') ?? false} onClick={() => editor?.chain().focus().toggleBold().run()}><strong>B</strong></ToggleButton>
        <ToggleButton buttonStyle='primary' active={editor?.isActive('italic') ?? false} onClick={() => editor?.chain().focus().toggleItalic().run()}><em>I</em></ToggleButton>
        <ToggleButton buttonStyle='primary' active={editor?.isActive('underline') ?? false} onClick={() => editor?.chain().focus().toggleUnderline().run()}><u>U</u></ToggleButton>
        <ToggleButton buttonStyle='primary' active={editor?.isActive('strike') ?? false} onClick={() => editor?.chain().focus().toggleStrike().run()}><s>S</s></ToggleButton>
      </div>
      <EditorContent editor={editor} className="p-2" />
    </div>
  )
}

export default Tiptap;