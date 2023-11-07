import ErrorDisplay from "@/app/components/ErrorDisplay";
import UserProfile from "@/app/components/UserProfile";
import prisma from "@/lib/prisma";
import { canAccessClass, getClass } from "@/utils/classes";
import { auth } from "@clerk/nextjs";
import { Button, Card, Container, Flex, Text, TextField, TextFieldInput } from "@radix-ui/themes";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export default async function ClassHome({ params: { id: classId } }: { params: { id: string }}) {
    const classData = await getClass(classId);
    if(!classData) return <ErrorDisplay err="Class not found"/>;

    async function renameClass(formData: FormData) {
        'use server'
        await prisma.class.update({
            where: {
                id: classId
            },
            data: {
                name: formData.get('name') as string
            }
        });

        revalidateTag('classes')
    }

    async function deleteClass() {
        'use server'
        await prisma.class.delete({
            where: {
                id: classId
            }
        });

        revalidateTag('classes');
        redirect('/');
    }

    return <>
        <Text size="8" weight="bold">{classData.name}</Text>
        <Text as="p" size="2" color="gray">{classData.description}</Text>
        <Flex direction='row' gap='2' my="2">
            Taught by
            <UserProfile userId={classData.teacher_id}/>
        </Flex>

        {classData.teacher_id == auth().userId &&
            <Card style={{maxWidth: 300, marginTop: 10}}>
                <Flex direction='column' align='stretch' gap='2'>
                    <Text size="2" weight="bold">Settings</Text>
                    <form action={renameClass}>
                        <Flex direction='row' gap='2'>
                            <TextFieldInput name="name" defaultValue={classData.name} placeholder="Name"/>
                            <Button type="submit">Rename</Button>
                        </Flex>
                    </form>
                    <form action={`/c/${classId}/delete`} method='GET'>
                        <Button type="submit" color="red">Delete Class</Button>
                    </form>
                </Flex>
            </Card>
        }
    </>
}