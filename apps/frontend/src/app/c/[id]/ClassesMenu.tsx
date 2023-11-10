import { getClasses } from "@/utils/classes";
import { auth } from "@clerk/nextjs";
import { DropdownMenuItem } from "@radix-ui/themes";
import Link from "next/link";

export default async function ClassesMenu() {
    const { userId } = auth();
    const classes = await getClasses(userId!);

    return <>
        {classes.map(cls =>
            <Link href={`/c/${cls.id}`} key={cls.id}>
                <DropdownMenuItem style={{cursor: 'pointer'}}>
                    {cls.name}
                </DropdownMenuItem>
            </Link>
        )}
    </>
}