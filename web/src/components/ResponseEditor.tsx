import { useAuth } from "@/auth";
import { useInput } from "@/input";
import Button from "./Basic/Button";
import Tiptap from "./Tiptap";

export default (props: {
    discussion: string,
    parent?: string
}) => {
    const [editor, onEditorChange] = useInput('');
    const {session, status} = useAuth();
    async function createResponse() {
        await fetch(`/api/discussions/${props.discussion}/responses/create/from/${props.parent ?? 'global'}`, {
            method: 'POST',
            body: editor
        })
    }
    return <>
        <Tiptap/>
        <Button buttonStyle="primary" onClick={createResponse}>Respond</Button>
    </>;
}