import prisma from "@/lib/prisma";
import { save } from "@/utils/mutations/classes";
import { PlusIcon } from "@radix-ui/react-icons";
import {
    TextFieldInput,
    TextArea,
    Button,
    DialogRoot,
    DialogTrigger,
    DialogContent,
    DialogTitle,
    Flex,
    DialogClose,
    IconButton,
    Card,
} from "@radix-ui/themes";
import { revalidateTag } from "next/cache";
import Tiptap, { TiptapContent, TiptapFormCompat } from "./components/Tiptap";

const CreateClassDialog = () => {
    return (
        <DialogRoot>
            <DialogTrigger>
                <IconButton
                    radius="full"
                    size="3"
                    title="New"
                    style={{ cursor: "pointer" }}
                >
                    <PlusIcon width={24} height={24} />
                </IconButton>
            </DialogTrigger>

            <DialogContent style={{ maxWidth: "400px" }}>
                <DialogTitle>Create Class</DialogTitle>

                <form action={save()}>
                    <Flex direction="column" gap="3">
                        <TextFieldInput placeholder="Name" name="name" />
                        <Card>
                            <Tiptap>
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
};

export default CreateClassDialog;
