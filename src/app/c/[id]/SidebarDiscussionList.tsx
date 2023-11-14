import prisma from "@/lib/prisma";
import SidebarLink from "./SidebarLink";
import { discussionsForClass } from "@/utils/queries/discussions";

export default async function SidebarDiscussionList({
    classId,
}: {
    classId: string;
}) {
    const discussions = await discussionsForClass(classId);

    return (
        <>
            {discussions.map((d) => (
                <SidebarLink key={d.id} href={`/c/${classId}/d/${d.id}`}>
                    {d.name}
                </SidebarLink>
            ))}
        </>
    );
}
