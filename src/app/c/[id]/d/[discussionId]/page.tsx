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

export default async function DiscussionView({ params }: { params: { id: string, discussionId: string } }) {
    const { userId } = auth();
    const discussion = await getDiscussion(params.discussionId);

    if (!discussion || !canAccessClass(params.id, userId!)) return <ErrorDisplay err="Discussion not found" />;

    return <>
        <Text size="8" weight="bold">{discussion.name}</Text>
        <Text as="p" size="2" color="gray">{discussion.description}</Text>
        <Flex direction="column" gap="3" pt="3">
            <ReplyProvider>
                <Suspense fallback={<Loader center />}>
                    <ResponsesList discussionId={params.discussionId} />
                </Suspense>
                <Card>
                    <ResponseEditor discussionId={params.discussionId} />
                </Card>
            </ReplyProvider>
        </Flex>
    </>
}