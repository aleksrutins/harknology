import prisma from "@/lib/prisma";
import { PlusIcon } from "@radix-ui/react-icons";
import { TextFieldInput, TextArea, Button, DialogRoot, DialogTrigger, DialogContent, DialogTitle, Flex, DialogClose, IconButton } from "@radix-ui/themes";
import { revalidateTag } from "next/cache";

const CreateClassDialog = ({ teacherId }: { teacherId: string }) => {
  async function createClass(data: FormData) {
    'use server'

    await prisma.class.create({
      data: {
        name: data.get('name') as string,
        description: data.get('description') as string,
        teacher_id: teacherId
      }
    });

    revalidateTag('classes')
  }

  return <DialogRoot>
        <DialogTrigger>
            <IconButton radius="full" size="3" title="New" style={{cursor: 'pointer'}}>
                <PlusIcon width={24} height={24}/>
            </IconButton>
        </DialogTrigger>

        <DialogContent style={{maxWidth: '400px'}}>
            <DialogTitle>Create Class</DialogTitle>

            <form action={createClass}>
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

export default CreateClassDialog;