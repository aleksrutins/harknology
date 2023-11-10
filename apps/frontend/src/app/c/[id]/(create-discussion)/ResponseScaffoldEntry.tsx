"use client";
import { useContext, useEffect, useState } from "react";
import { DiscussionScaffoldContext } from "./DiscussionScaffold";
import { useFetch } from "@/utils/useAsyncMemo";
import { MembersResponse } from "@/utils/classes";
import { Button, DropdownMenu, Flex } from "@radix-ui/themes";
import UserProfile from "@/app/components/UserProfile";

export default function ResponseScaffoldEntry(
  classId: string,
  responseIndex: number
) {
  const ctx = useContext(DiscussionScaffoldContext);
  const members = useFetch<MembersResponse>(
    () => [`/api/c/${classId}/members`],
    [classId]
  );

  const posterId = useState<string | undefined>(undefined);
  const content = useState("");
  const inReplyTo = useState<number[]>([]);
  const usedEvidence = useState(false);

  useEffect(() => {
    ctx.responses[responseIndex] = {
      userId: posterId[0]!,
      content: content[0],
      inReplyTo: inReplyTo[0],
      info: {
        usedEvidence: usedEvidence[0],
      },
    };
  }, [ctx, responseIndex, posterId, content, inReplyTo, usedEvidence]);

  return (
    <Flex direction="column" gap="3">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button>
            {(posterId[0] &&
              members?.students.find((m) => m.student_id == posterId[0])
                ?.student_id && (
                <UserProfile
                  userId={
                    members?.students.find((m) => m.student_id == posterId[0])
                      ?.student_id!
                  }
                />
              )) ??
              "No student selected"}
          </Button>
        </DropdownMenu.Trigger>
      </DropdownMenu.Root>
    </Flex>
  );
}
