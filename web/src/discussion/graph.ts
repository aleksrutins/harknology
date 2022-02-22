import { Response } from "@prisma/client";

export default async function getNodes(discussionId: string) {
    const responses: Response[] = (await (await fetch(`/api/discussions/${discussionId}/responses`)).json());
    return responses.map(response => ({
        
    }))
}