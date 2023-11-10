"use client";

import { createContext, useContext } from "react";

export type DiscussionScaffoldState = {
  responses: {
    userId: string;
    content: string;
    inReplyTo: number[];
    info: {
      usedEvidence: boolean;
    };
  }[];
};

export const DiscussionScaffoldContext = createContext<DiscussionScaffoldState>(
  {
    responses: [],
  }
);

export const DiscussionScaffoldProvider = DiscussionScaffoldContext.Provider;

export default function DiscussionScaffold() {
  const ctx = useContext(DiscussionScaffoldContext);
  return <></>;
}
