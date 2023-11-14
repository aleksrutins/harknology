import ErrorDisplay from "@/app/components/ErrorDisplay";
import prisma from "@/lib/prisma";
import { deleteClass } from "@/utils/mutations/classes";
import { getClass } from "@/utils/queries/classes";
import { auth } from "@clerk/nextjs";
import { Class } from "@prisma/client";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import {
    Button,
    DialogClose,
    DialogContent,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
    Flex,
    Inset,
} from "@radix-ui/themes";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function DeleteClassDialog({
    classData,
    children,
}: {
    classData: Class;
    children: ReactNode;
}) {
    return (
        <DialogRoot>
            <DialogTrigger>{children}</DialogTrigger>
            <DialogContent style={{ backgroundColor: "var(--red-3)" }}>
                <Flex direction="column" align="center" gap="2" px="6">
                    <ExclamationTriangleIcon
                        height={48}
                        width={48}
                        style={{ padding: "20px" }}
                    />
                    <DialogTitle>
                        Are you sure you want to delete &quot;{classData.name}
                        &quot;?
                    </DialogTitle>
                    <Flex direction="row" gap="2">
                        <DialogClose>
                            <Button variant="soft">Cancel</Button>
                        </DialogClose>
                        <form action={deleteClass(classData.id)}>
                            <Button type="submit" color="red">
                                Delete
                            </Button>
                        </form>
                    </Flex>
                </Flex>
            </DialogContent>
        </DialogRoot>
    );
}
