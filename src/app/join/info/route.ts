import { getClassInfo } from "../join";

export type JoinClassInfo = ReturnType<typeof getClassInfo> extends Promise<
  infer T
>
  ? T
  : any;

export async function GET(req: Request) {
  const params = new URL(req.url).searchParams;
  const code = params.get("code");
  if (!code) return new Response("Invalid code", { status: 400 });
  const info = await getClassInfo(code);
  if (!info) return new Response("Invalid code", { status: 400 });

  return new Response(JSON.stringify(info));
}
