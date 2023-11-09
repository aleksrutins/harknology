import Tiptap, {
    TiptapContent,
    TiptapFormCompat,
} from "@/app/components/Tiptap";
import prisma from "@/lib/prisma";
import { Discussion } from "@prisma/client";
import { GearIcon } from "@radix-ui/react-icons";
import {
    Button,
    Card,
    DialogClose,
    DialogContent,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
    Flex,
    IconButton,
    TextFieldInput,
} from "@radix-ui/themes";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export default function DiscussionSettings({
    discussion,
}: {
    discussion: Discussion;
}) {
    async function saveInfo(formData: FormData) {
        "use server";
        const name = formData.get("name") as string;
        const description = formData.get("content") as string;

        await prisma.discussion.update({
            where: { id: discussion.id },
            data: { name, description },
        });

        revalidateTag("discussions");
    }

    async function deleteDiscussion() {
        "use server";
        await prisma.discussion.delete({
            where: { id: discussion.id },
        });

        revalidateTag("discussions");
        redirect(`/c/${discussion.class_id}`);
    }

    return (
        <DialogRoot>
            <DialogTrigger>
                <IconButton radius="full" size="2" title="Settings">
                    <GearIcon width={16} height={16} />
                </IconButton>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Edit {discussion.name}</DialogTitle>

                <form action={saveInfo}>
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

                        <Flex gap="3" mt="4" justify="between">
                            <DialogClose>
                                <Button
                                    type="submit"
                                    variant="soft"
                                    color="red"
                                    formAction={deleteDiscussion}
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
