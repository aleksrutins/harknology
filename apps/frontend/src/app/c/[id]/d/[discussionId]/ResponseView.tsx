import UserProfile from "@/app/components/UserProfile";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { Reply, Response } from "@prisma/client";
import { Pencil1Icon, ResetIcon, TrashIcon } from "@radix-ui/react-icons";
import {
    Button,
    Card,
    DialogClose,
    DropdownMenuRoot,
    DropdownMenuTrigger,
    Flex,
    IconButton,
    Text,
} from "@radix-ui/themes";
import { revalidateTag } from "next/cache";
import EditResponseDialog from "./EditResponseDialog";
import DateTimeView from "@/app/components/DateTimeView";
import ReplyButton from "./ReplyButton";
import styles from "./ResponseView.module.css";

export function ResponseView({
    response,
    isTeacher,
    isLocked,
}: {
    response: Response & {
        repliesFrom: (Reply & { to: { poster_id: string } })[];
    };
    isTeacher: boolean;
    isLocked: boolean;
}) {
    const { userId } = auth();

    async function deleteResponse() {
        "use server";

        await prisma.response.delete({
            where: {
                id: response.id,
            },
        });

        revalidateTag("responses");
    }

    return (
        <Card className={styles.responseCard} id={`response-${response.id}`}>
            <Flex direction="column">
                <Flex direction="row" align="center" justify="between" gap="2">
                    <Flex gap="1">
                        <UserProfile userId={response.poster_id} />
                        •
                        <DateTimeView date={response.created_at} />
                        {response.updated_at &&
                            response.updated_at.toLocaleString() !=
                                response.created_at.toLocaleString() && (
                                <>
                                    • updated
                                    <DateTimeView date={response.updated_at} />
                                </>
                            )}
                    </Flex>
                    <form>
                        <Flex gap="2">
                            {!isLocked && (
                                <>
                                    {(userId == response.poster_id ||
                                        isTeacher) && (
                                        <>
                                            <EditResponseDialog
                                                discussionId={
                                                    response.discussion_id
                                                }
                                                responseId={response.id}
                                            />
                                            <IconButton
                                                type="submit"
                                                formAction={deleteResponse}
                                                color="red"
                                            >
                                                <TrashIcon />
                                            </IconButton>
                                        </>
                                    )}
                                    <ReplyButton replyTo={response.id}>
                                        <ResetIcon />
                                    </ReplyButton>
                                </>
                            )}
                        </Flex>
                    </form>
                </Flex>
                <Text
                    as="p"
                    dangerouslySetInnerHTML={{ __html: response.content }}
                ></Text>
                <Flex direction="row" gap="4" wrap="wrap">
                    {response.repliesFrom.map((reply) => (
                        <a
                            href={`#response-${reply.to_id}`}
                            key={reply.id}
                            style={{
                                display: "block",
                                color: "var(--gray-11)",
                            }}
                        >
                            <Flex direction="row" align="center" gap="2">
                                <ResetIcon />
                                <UserProfile userId={reply.to.poster_id} />
                            </Flex>
                        </a>
                    ))}
                </Flex>
            </Flex>
        </Card>
    );
}
