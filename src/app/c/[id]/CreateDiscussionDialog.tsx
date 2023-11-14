import Tiptap, {
    TiptapContent,
    TiptapControls,
    TiptapFormCompat,
} from "@/app/components/Tiptap";
import prisma from "@/lib/prisma";
import { save } from "@/utils/mutations/discussions";
import { PlusIcon } from "@radix-ui/react-icons";
import {
    Button,
    Card,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
    Flex,
    IconButton,
    TextArea,
    TextFieldInput,
} from "@radix-ui/themes";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export default function CreateDiscussionDialog({
    classId,
}: {
    classId: string;
}) {
    return (
        <DialogRoot>
            <DialogTrigger>
                <IconButton
                    radius="full"
                    size="1"
                    title="New"
                    style={{ cursor: "pointer" }}
                >
                    <PlusIcon width={16} height={16} />
                </IconButton>
            </DialogTrigger>

            <DialogContent style={{ maxWidth: "400px" }}>
                <DialogTitle>Create a Discussion</DialogTitle>

                <form action={save(classId)}>
                    <Flex direction="column" gap="2">
                        <TextFieldInput placeholder="Name" name="name" />

                        <Card>
                            <Tiptap initialContent="Description">
                                <TiptapContent />
                                <TiptapFormCompat />
                            </Tiptap>
                        </Card>

                        <Flex gap="3" mt="4" justify="end">
                            <DialogClose>
                                <Button variant="soft" color="gray">
                                    Cancel
                                </Button>
                            </DialogClose>
                            <DialogClose>
                                <Button type="submit">Create</Button>
                            </DialogClose>
                        </Flex>
                    </Flex>
                </form>
            </DialogContent>
        </DialogRoot>
    );
}
