import { getMembers } from "@/utils/classes";

export async function GET(
  req: Request,
  { params: { id } }: { params: { id: string } }
) {
  return new Response(JSON.stringify(await getMembers(id)));
}
