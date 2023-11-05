import ErrorDisplay from "@/app/components/ErrorDisplay";
import { canAccessClass } from "@/utils/classes";
import { getDiscussion } from "@/utils/discussions";
import { auth } from "@clerk/nextjs";

export default async function DiscussionView({ params }: { params: { id: string, discussionId: string } }) {
    const { userId } = auth();
    const discussion = await getDiscussion(params.discussionId);

    if(!discussion || !canAccessClass(params.id, userId!)) return <ErrorDisplay err="Discussion not found"/>;

    return <div>{discussion.name}</div>
}