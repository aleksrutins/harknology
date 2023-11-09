import prisma from "@/lib/prisma";
import { getClassInfo } from "@/app/join/join";
import { auth } from "@clerk/nextjs";

export async function GET(req: Request) {
    const { userId } = auth();
    if (!userId) return new Response("Not authenticated", { status: 403 });
    const params = new URL(req.url).searchParams;
    const code = params.get("code") as string | undefined;
    if (!code) return new Response("Invalid code", { status: 400 });

    const classData = await getClassInfo(code);
    if (!classData) return new Response("Invalid code", { status: 400 });

    await prisma.studentClass.create({
        data: {
            class_id: classData.id,
            student_id: userId,
        },
    });

    return Response.redirect(`/c/${classData.id}`);
}
