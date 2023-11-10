import ErrorDisplay from "@/app/components/ErrorDisplay";
import UserProfile from "@/app/components/UserProfile";
import prisma from "@/lib/prisma";
import { canAccessClass, getClass } from "@/utils/classes";
import { auth } from "@clerk/nextjs";
import { Button, Card, Container, Flex, Text, TextField, TextFieldInput } from "@radix-ui/themes";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import ClassSettings from "./ClassSettings";

export default async function ClassHome({ params: { id: classId } }: { params: { id: string } }) {
    const classData = await getClass(classId);
    if (!classData) return <ErrorDisplay err="Class not found" />;

    return <>
        <Flex align="center" gap="3">
            <Text size="8" weight="bold">{classData.name}</Text>
            { auth().userId == classData.teacher_id && <ClassSettings classData={classData} />}
        </Flex>
        <Text as="p" size="2" color="gray">{classData.description}</Text>
        <Flex direction='row' gap='2' my="2">
            Taught by
            <UserProfile userId={classData.teacher_id} />
        </Flex>
    </>
}