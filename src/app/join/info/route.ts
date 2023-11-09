import { getClassInfo } from "../join";

export type JoinClassInfo = ReturnType<typeof getClassInfo> extends Promise<infer T> ? T : any

export async function GET(req: Request) {
    const params = new URL(req.url).searchParams;
    const code = params.get('code');
    if(!code) return Response.error();
    const info = await getClassInfo(code);
    if(!info) return Response.error();

    return Response.json(info);
}