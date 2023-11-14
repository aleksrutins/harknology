import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export const deleteClass = (id: string) => async (_formData: FormData) => {
    "use server";
    await prisma.class.delete({
        where: {
            id,
        },
    });

    revalidateTag("classes");
    redirect("/");
};

export const save = (id?: string) => async (formData: FormData) => {
    "use server";
    const { userId } = auth();
    const name = formData.get("name") as string;
    const description = formData.get("content") as string;

    if (id)
        await prisma.class.update({
            where: { id },
            data: { name, description },
        });
    else
        await prisma.class.create({
            data: { name, description, teacher_id: userId! },
        });

    revalidateTag("classes");
};
