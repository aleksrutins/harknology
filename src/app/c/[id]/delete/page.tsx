import ErrorDisplay from "@/app/components/ErrorDisplay";
import prisma from "@/lib/prisma";
import { getClass } from "@/utils/classes";
import { auth } from "@clerk/nextjs";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Button, Flex } from "@radix-ui/themes";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export default async function ConfirmDelete({ params: { id } }: { params: { id: string } }) {
    const { userId } = auth();
    const cls = await getClass(id);
    if(!cls || cls.teacher_id != userId) return <ErrorDisplay err="Permission denied"/>;

    async function deleteClass() {
        'use server'
        await prisma.class.delete({
            where: {
                id
            }
        });

        revalidateTag('classes');
        redirect('/');
    }

    return <Flex direction="column" align="center" gap="2" px="6" style={{backgroundColor: 'var(--red-a3)', width: '100%', height: '100%'}}>
        <ExclamationTriangleIcon height={64} width={64} style={{padding: '20px'}}/> 
        <h1>Are you sure you want to delete '{cls.name}'?</h1>
        <Flex direction="row" gap="2">
            <a href={`/c/${id}`}>
                <Button variant="soft">
                    Cancel
                </Button>
            </a>
            <form action={deleteClass}>
                <Button type="submit" color="red">Delete</Button>
            </form>
        </Flex>
    </Flex>
}