import Loader, { PageSuspense } from "@/app/components/Loader";
import { getClass, getClasses } from "@/utils/classes";
import { auth } from "@clerk/nextjs";
import { CaretDownIcon, HomeIcon } from "@radix-ui/react-icons";
import { Button, DropdownMenuContent, DropdownMenuRoot, DropdownMenuTrigger, Flex, Separator } from "@radix-ui/themes";
import { ReactNode, Suspense } from "react";
import ClassesMenu from "./ClassesMenu";
import SidebarLink from "./SidebarLink";
import SidebarDiscussionList from "./SidebarDiscussionList";
import Link from "next/link";

export default async function ClassLayout({ children, params }: { children: ReactNode, params: { id: string } }) {
    const { userId } = auth();
    const cls = await getClass(params.id);
    if(!cls) return <div>Invalid class ID</div>
    return <Flex direction="row" style={{ height: '100vh', width: '100vw' }}>
        <Flex direction="column" align="stretch" gap='3' style={{ backgroundColor: 'var(--gray-2)', padding: '20px' }}>
            <Link href="/" style={{display: 'block', textAlign: 'center'}}><HomeIcon/></Link>

            <DropdownMenuRoot>
                <DropdownMenuTrigger>
                    <Button variant="soft" style={{marginBottom: '10px'}}>
                        {cls.name}
                        <CaretDownIcon/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent variant="soft">
                    <Suspense fallback={<Loader borderColor="black" center/>}>
                        <ClassesMenu/>
                    </Suspense>
                </DropdownMenuContent>
            </DropdownMenuRoot>

            <SidebarLink href={`/c/${params.id}`}>
                <HomeIcon/>
                Home
            </SidebarLink>

            <h5 style={{textAlign: 'center'}}>Discussions</h5>

            <Suspense fallback={<Loader center borderColor="black"/>}>
                <SidebarDiscussionList classId={params.id}/>
            </Suspense>
        </Flex>
        <div style={{ flex: 1 }}>
            <PageSuspense color="black">
                {children}
            </PageSuspense>
        </div>
    </Flex>
}