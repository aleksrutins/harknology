import { getResponses } from "@/utils/responses";
import { Flex } from "@radix-ui/themes";
import { ResponseView } from "./ResponseView";

export default async function ResponsesList({ discussionId }: { discussionId: string }) {
    const responses = await getResponses(discussionId);

    return <Flex direction="column" gap='3'>
        {responses.map(response => <ResponseView key={response.id} response={response}/>)}
    </Flex>
}