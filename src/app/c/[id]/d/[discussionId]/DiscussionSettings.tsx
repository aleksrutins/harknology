import Tiptap, {
    TiptapContent,
    TiptapFormCompat,
} from "@/app/components/Tiptap";
import prisma from "@/lib/prisma";
import { deleteDiscussion, save } from "@/utils/mutations/discussions";
import { Discussion } from "@prisma/client";
import { GearIcon } from "@radix-ui/react-icons";
import {
    Button,
    Card,
    Checkbox,
    DialogClose,
    DialogContent,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
    Flex,
    IconButton,
    Text,
    TextFieldInput,
} from "@radix-ui/themes";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export default function DiscussionSettings({
    discussion,
}: {
    discussion: Discussion;
}) {
    return (
        <DialogRoot>
            <DialogTrigger>
                <IconButton radius="full" size="2" title="Settings">
                    <GearIcon width={16} height={16} />
                </IconButton>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Edit {discussion.name}</DialogTitle>

                <form action={save(discussion.class_id, discussion.id)}>
                    <Flex direction="column" gap="2">
                        <TextFieldInput
                            placeholder="Name"
                            name="name"
                            defaultValue={discussion.name}
                        />

                        <Card>
                            <Tiptap initialContent={discussion.description}>
                                <TiptapContent />
                                <TiptapFormCompat />
                            </Tiptap>
                        </Card>

                        <Text as="label">
                            <Flex gap="2" align="center">
                                <Checkbox
                                    defaultChecked={discussion.locked}
                                    name="locked"
                                />
                                Locked
                            </Flex>
                        </Text>

                        <Flex gap="3" mt="4" justify="between">
                            <DialogClose>
                                <Button
                                    type="submit"
                                    variant="soft"
                                    color="red"
                                    formAction={deleteDiscussion(discussion.id)}
                                >
                                    Delete
                                </Button>
                            </DialogClose>
                            <Flex gap="3" justify="end">
                                <DialogClose>
                                    <Button variant="soft" color="gray">
                                        Cancel
                                    </Button>
                                </DialogClose>
                                <DialogClose>
                                    <Button type="submit">Save</Button>
                                </DialogClose>
                            </Flex>
                        </Flex>
                    </Flex>
                </form>
            </DialogContent>
        </DialogRoot>
    );
}
