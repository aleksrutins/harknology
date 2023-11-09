import ErrorDisplay from "@/app/components/ErrorDisplay";
import Loader from "@/app/components/Loader";
import { canAccessClass } from "@/utils/classes";
import { getDiscussion } from "@/utils/discussions";
import { auth } from "@clerk/nextjs";
import { Container, Text, Flex, Card } from "@radix-ui/themes";
import { Suspense } from "react";
import ResponsesList from "./responses";
import ResponseEditor from "./ResponseEditor";
import { ReplyContext, ReplyProvider } from "./replies";
import DiscussionSettings from "./DiscussionSettings";
import { LockClosedIcon } from "@radix-ui/react-icons";

export default async function DiscussionView({
    params,
}: {
    params: { id: string; discussionId: string };
}) {
    const { userId } = auth();
    const discussion = await getDiscussion(params.discussionId);

    if (!discussion || !canAccessClass(params.id, userId!))
        return <ErrorDisplay err="Discussion not found" />;

    return (
        <>
            <Flex gap="2" align="center">
                <Text size="8" weight="bold">
                    {discussion.name}
                </Text>
                {userId === discussion.class.teacher_id && (
                    <DiscussionSettings discussion={discussion} />
                )}
                {discussion.locked && (
                    <Text size="2" color="gray">
                        <Flex align="center" gap="1">
                            <LockClosedIcon />
                            Locked
                        </Flex>
                    </Text>
                )}
            </Flex>
            <Text
                as="p"
                size="2"
                dangerouslySetInnerHTML={{ __html: discussion.description }}
            />
            <Flex direction="column" gap="3" pt="3">
                <ReplyProvider>
                    <Suspense fallback={<Loader center />}>
                        <ResponsesList
                            discussionId={params.discussionId}
                            isTeacher={discussion.class.teacher_id === userId}
                            isLocked={discussion.locked}
                        />
                    </Suspense>
                    {!discussion.locked && (
                        <Card>
                            <ResponseEditor
                                discussionId={params.discussionId}
                            />
                        </Card>
                    )}
                </ReplyProvider>
            </Flex>
        </>
    );
}
