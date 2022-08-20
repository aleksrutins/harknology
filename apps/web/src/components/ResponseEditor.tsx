import { useAuth } from "@/auth";
import { useInput } from "@/input";
import { trpc } from "@/util/trpc";
import { Response } from "@prisma/client";
import { Editor } from "@tiptap/react";
import { useState } from "react";
import { UseQueryResult } from "react-query";
import { SWRResponse } from "swr";
import Button from "./Basic/Button";
import LoadingIndicator from "./LoadingIndicator";
import Tiptap from "./Tiptap";

export default function ResponseEditor(props: {
    discussion: string,
    parents: Iterable<string>,
    query: UseQueryResult<Response[]>
}) {
    const [editor, setEditor] = useState<Editor>();
    const [busy, setBusy] = useState(false);
    const respond = trpc.useMutation('discussion.respond');
    async function createResponse() {
        setBusy(true);
        await respond.mutateAsync({discussion: props.discussion, parents: [...props.parents], body: editor!.getHTML()});
        editor?.chain().clearContent().run();
        props.query.refetch();
        setBusy(false);
    }
    return <>
        <Tiptap setEditor={setEditor} placeholder="Enter your response..."/>
        <Button buttonStyle="primary" onClick={createResponse} disabled={busy}>{busy? <LoadingIndicator borderColor="black"/> : 'Respond'}</Button>
    </>;
}
