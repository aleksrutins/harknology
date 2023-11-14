import prisma from "@/lib/prisma";
import { Class } from "@prisma/client";
import { GearIcon } from "@radix-ui/react-icons";
import {
    Card,
    Flex,
    TextFieldInput,
    Button,
    Text,
    DialogRoot,
    DialogTrigger,
    IconButton,
    DialogContent,
    DialogTitle,
    DialogClose,
} from "@radix-ui/themes";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import DeleteClassDialog from "./DeleteClassDialog";
import { save } from "@/utils/mutations/classes";
import Tiptap, {
    TiptapContent,
    TiptapFormCompat,
} from "@/app/components/Tiptap";

const ClassSettings = ({ classData }: { classData: Class }) => {
    return (
        <DialogRoot>
            <DialogTrigger>
                <IconButton
                    radius="full"
                    size="2"
                    title="Settings"
                    style={{ cursor: "pointer" }}
                >
                    <GearIcon height="16" width="16" />
                </IconButton>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Settings for {classData.name}</DialogTitle>
                <Flex direction="column" align="stretch" gap="2">
                    <form
                        action={save(classData.id)}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "1rem",
                            alignItems: "stretch",
                        }}
                    >
                        <Flex direction="column" align="stretch" gap="2">
                            <TextFieldInput
                                name="name"
                                defaultValue={classData.name}
                                placeholder="Name"
                            />
                            <Card>
                                <Tiptap initialContent={classData.description}>
                                    <TiptapContent />
                                    <TiptapFormCompat />
                                </Tiptap>
                            </Card>
                            <Flex direction="row" gap="1">
                                <DialogClose>
                                    <Button type="submit" style={{ flex: 1 }}>
                                        Save
                                    </Button>
                                </DialogClose>
                                <DeleteClassDialog classData={classData}>
                                    <Button
                                        color="red"
                                        type="button"
                                        style={{ flex: 1 }}
                                    >
                                        Delete
                                    </Button>
                                </DeleteClassDialog>
                            </Flex>
                        </Flex>
                    </form>
                </Flex>
            </DialogContent>
        </DialogRoot>
    );
};

export default ClassSettings;
