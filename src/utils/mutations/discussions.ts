import prisma from "@/lib/prisma";
import { revalidateTag } from "next/cache";

export const save =
    (classId?: string, id?: string) => async (formData: FormData) => {
        "use server";
        const name = formData.get("name") as string;
        const description = formData.get("content") as string;
        const locked = formData.get("locked") === "on";

        if (id && classId)
            await prisma.discussion.update({
                where: { id },
                data: { name, description, locked },
            });
        else
            await prisma.discussion.create({
                data: {
                    name,
                    description,
                    locked,
                    class: { connect: { id: classId } },
                },
            });

        revalidateTag("discussions");
    };

export const deleteDiscussion = (id: string) => async () => {
    "use server";
    await prisma.discussion.delete({
        where: { id },
    });

    revalidateTag("discussions");
};
