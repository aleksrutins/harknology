import Loader, { PageSuspense } from "@/app/components/Loader";
import { canAccessClass, getClass, getClasses } from "@/utils/classes";
import { auth } from "@clerk/nextjs";
import { CaretDownIcon, HomeIcon, PersonIcon, PlusIcon } from "@radix-ui/react-icons";
import { Button, DropdownMenuContent, DropdownMenuRoot, DropdownMenuTrigger, Flex, Separator } from "@radix-ui/themes";
import { ReactNode, Suspense } from "react";
import ClassesMenu from "./ClassesMenu";
import SidebarLink from "./SidebarLink";
import SidebarDiscussionList from "./SidebarDiscussionList";
import Link from "next/link";
import ErrorDisplay from "@/app/components/ErrorDisplay";
import CreateDiscussionDialog from "./CreateDiscussionDialog";

export default async function ClassLayout({ children, params }: { children: ReactNode, params: { id: string } }) {
    const { userId } = auth();
    const cls = await getClass(params.id);
    if(!cls || !canAccessClass(params.id, userId!)) return <ErrorDisplay err="Class not found"/>;
    
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
                    <Suspense fallback={<Loader center/>}>
                        <ClassesMenu/>
                    </Suspense>
                </DropdownMenuContent>
            </DropdownMenuRoot>

            <SidebarLink href={`/c/${params.id}`}>
                <HomeIcon/>
                Home
            </SidebarLink>

            <SidebarLink href={`/c/${params.id}/members`}>
                <PersonIcon/>
                Members
            </SidebarLink>

            <Flex direction='row' justify='between' align='center' gap='6' style={{marginTop: '10px'}}>
                <h5 style={{margin: 0}}>Discussions</h5>
                {cls.teacher_id == userId &&
                    <CreateDiscussionDialog classId={params.id}/>
                }
            </Flex>

            <Suspense fallback={<Loader center/>}>
                <SidebarDiscussionList classId={params.id}/>
            </Suspense>
        </Flex>
        <div style={{ flex: 1 }}>
            <PageSuspense>
                {children}
            </PageSuspense>
        </div>
    </Flex>
}