import prisma from "@/lib/prisma";
import { getClassInfo } from "@/app/join/join";
import { auth } from "@clerk/nextjs";

export async function POST(req: Request) {
  const { userId } = auth();
  const params = new URL(req.url).searchParams;
  const code = params.get("code") as string | undefined;
  if (!code) return new Response("Invalid code", { status: 400 });

  const classData = await getClassInfo(code);
  if (!classData) return new Response("Invalid code", { status: 400 });

  await prisma.studentClass.create({
    data: {
      classId: classData.id,
      studentId: userId,
    },
  });

  return Response.redirect(`/c/${classData.id}`);
}
