import { useAuth } from "@/auth";
import { useInput } from "@/input";
import { Response } from "@prisma/client";
import { Editor } from "@tiptap/react";
import { useState } from "react";
import { SWRResponse } from "swr";
import Button from "./Basic/Button";
import Tiptap from "./Tiptap";

export default (props: {
    discussion: string,
    parent?: string,
    swr: SWRResponse<Response[], any>
}) => {
    const [editor, setEditor] = useState<Editor>();
    const {session, status} = useAuth();
    async function createResponse() {
        await fetch(`/api/discussions/${props.discussion}/responses/create/from/${props.parent ?? 'global'}`, {
            method: 'POST',
            body: editor!.getHTML()
        });
        editor?.chain().clearContent().run();
        props.swr.mutate();
    }
    return <>
        <Tiptap setEditor={setEditor} placeholder="Enter your response..."/>
        <Button buttonStyle="primary" onClick={createResponse}>Respond</Button>
    </>;
}