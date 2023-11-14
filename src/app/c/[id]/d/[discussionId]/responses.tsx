import { getResponses } from "@/utils/queries/responses";
import { Flex } from "@radix-ui/themes";
import { ResponseView } from "./ResponseView";

export default async function ResponsesList({
    discussionId,
    isLocked,
    isTeacher,
}: {
    discussionId: string;
    isLocked: boolean;
    isTeacher: boolean;
}) {
    const responses = await getResponses(discussionId);

    return (
        <Flex direction="column" gap="3">
            {responses.map((response) => (
                <ResponseView
                    key={response.id}
                    response={response}
                    isTeacher={isTeacher}
                    isLocked={isLocked}
                />
            ))}
        </Flex>
    );
}
