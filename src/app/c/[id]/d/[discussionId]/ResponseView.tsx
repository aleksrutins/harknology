import UserProfile from "@/app/components/UserProfile";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { Response } from "@prisma/client";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { Button, Card, DialogClose, DropdownMenuRoot, DropdownMenuTrigger, Flex, Text } from "@radix-ui/themes";
import { revalidateTag } from "next/cache";
import EditResponseDialog from "./EditResponseDialog";
import DateTimeView from "@/app/components/DateTimeView";

export function ResponseView({ response }: { response: Response }) {
    const { userId } = auth();

    async function deleteResponse() {
        'use server';

        await prisma.response.delete({
            where: {
                id: response.id
            }
        });

        revalidateTag('responses')
    }

    return <Card>
        <Flex direction="column">
            <Flex direction="row" align="center" justify="between" gap="2">
                <Flex gap="1">
                    <UserProfile userId={response.poster_id} />
                    •
                    <DateTimeView date={response.created_at} />
                    { (response.updated_at && response.updated_at.toLocaleString() != response.created_at.toLocaleString()) && <>
                        • updated
                        <DateTimeView date={response.updated_at} />
                    </> }
                </Flex>
                {(userId == response.poster_id) && <form>
                    <Flex gap="2">
                        <EditResponseDialog discussionId={response.discussion_id} responseId={response.id}/>
                        <Button type="submit" formAction={deleteResponse} color="red">
                            <TrashIcon />
                        </Button>
                    </Flex>
                </form>}
            </Flex>
            <Text as="p" dangerouslySetInnerHTML={{ __html: response.content }}></Text>
        </Flex>
    </Card>
}