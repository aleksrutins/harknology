'use client';

import { ReactNode, createContext, useState } from "react";

export const ReplyContext = createContext<{
    replies: Set<string>,
    setReplies: (replyTo: Set<string>) => void
}>({ replies: new Set(), setReplies: () => { } });

export const ReplyProvider = ({ children }: { children: ReactNode }) => {
    const [replyTo, setReplyTo] = useState(new Set<string>());
    return <ReplyContext.Provider value={{replies: replyTo, setReplies: setReplyTo}}>{children}</ReplyContext.Provider>;
};