import { useAuth } from "@/auth";
import { useInput } from "@/input";
import { Response } from "@prisma/client";
import { Editor } from "@tiptap/react";
import { useState } from "react";
import { SWRResponse } from "swr";
import Button from "./Basic/Button";
import LoadingIndicator from "./LoadingIndicator";
import Tiptap from "./Tiptap";

export default function ResponseEditor(props: {
    discussion: string,
    parent?: string,
    swr: SWRResponse<Response[], any>
}) {
    const [editor, setEditor] = useState<Editor>();
    const [busy, setBusy] = useState(false);
    const {session, status} = useAuth();
    async function createResponse() {
        setBusy(true);
        await fetch(`/api/discussions/${props.discussion}/responses/create/from/${props.parent ?? 'global'}`, {
            method: 'POST',
            body: editor!.getHTML()
        });
        editor?.chain().clearContent().run();
        props.swr.mutate();
        setBusy(false);
    }
    return <>
        <Tiptap setEditor={setEditor} placeholder="Enter your response..."/>
        <Button buttonStyle="primary" onClick={createResponse} disabled={busy}>{busy? <LoadingIndicator borderColor="black"/> : 'Respond'}</Button>
    </>;
}