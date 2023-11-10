'use client';

import { useContext } from "react";
import { ReplyContext } from "./replies";
import { Button, IconButton } from "@radix-ui/themes";

const ReplyButton = ({ replyTo, children }: { replyTo: string, children: React.ReactNode }) => {
    const { replies: replies, setReplies: setReplies } = useContext(ReplyContext);

    return <IconButton type="button" color='blue' variant={replies.has(replyTo) ? 'solid' : 'soft'} title="Reply" onClick={() => 
        replies.has(replyTo) ? setReplies(new Set([...replies].filter(r => r !== replyTo))) : setReplies(new Set([...replies, replyTo]))
    }>{children}</IconButton>
}

export default ReplyButton;