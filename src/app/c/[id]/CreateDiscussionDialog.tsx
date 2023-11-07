import prisma from "@/lib/prisma";
import { PlusIcon } from "@radix-ui/react-icons";
import { Button, DialogClose, DialogContent, DialogDescription, DialogRoot, DialogTitle, DialogTrigger, Flex, TextArea, TextFieldInput } from "@radix-ui/themes";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export default function CreateDiscussionDialog({ classId }: { classId: string }) {
    async function createDiscussion(form: FormData) {
        'use server';
        const { id } = await prisma.discussion.create({
            data: {
                name: form.get('name') as string,
                description: form.get('description') as string,
                class_id: classId
            },
        });

        revalidateTag('discussions');
        redirect(`/c/${classId}/d/${id}`);
    }
    
    return <DialogRoot>
        <DialogTrigger>
            <Button radius="full" size="1" title="New" style={{cursor: 'pointer'}}>
                <PlusIcon width={16} height={16}/>
            </Button>
        </DialogTrigger>

        <DialogContent style={{maxWidth: '400px'}}>
            <DialogTitle>Create a Discussion</DialogTitle>

            <form action={createDiscussion}>
                <Flex direction="column" gap="3">
                    <TextFieldInput placeholder="Name" name="name"/>
                    <TextArea placeholder="Description" name="description"/>
                    
                    <Flex gap="3" mt="4" justify="end">
                        <DialogClose>
                            <Button variant="soft" color="gray">Cancel</Button>
                        </DialogClose>
                        <DialogClose>
                            <Button type="submit">Create</Button>
                        </DialogClose>
                    </Flex>
                </Flex>
            </form>
        </DialogContent>
    </DialogRoot>
}