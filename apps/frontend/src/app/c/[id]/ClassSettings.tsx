import prisma from "@/lib/prisma";
import { Class } from "@prisma/client";
import { GearIcon } from "@radix-ui/react-icons";
import { Card, Flex, TextFieldInput, Button, Text, DialogRoot, DialogTrigger, IconButton, DialogContent, DialogTitle } from "@radix-ui/themes";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import DeleteClassDialog from "./DeleteClassDialog";

const ClassSettings = ({classData}: { classData: Class }) => {
    async function renameClass(formData: FormData) {
        'use server'
        await prisma.class.update({
            where: {
                id: classData.id
            },
            data: {
                name: formData.get('name') as string
            }
        });

        revalidateTag('classes')
    }

    return <DialogRoot>
        <DialogTrigger>
            <IconButton radius="full" size="2" title="Settings" style={{cursor: 'pointer'}}>
                <GearIcon height="16" width="16"/>
            </IconButton>
        </DialogTrigger>
        <DialogContent>
            <DialogTitle>Settings for {classData.name}</DialogTitle>
            <Flex direction='column' align='stretch' gap='2'>
                <form action={renameClass} style={{display: 'flex'}}>
                    <Flex direction='row' gap='2'>
                        <TextFieldInput name="name" defaultValue={classData.name} placeholder="Name"/>
                        <Button type="submit">Rename</Button>
                    </Flex>
                </form>
                <DeleteClassDialog classData={classData}>
                    <Button color="red">Delete</Button>
                </DeleteClassDialog>
            </Flex>
        </DialogContent>
    </DialogRoot>
}

export default ClassSettings;