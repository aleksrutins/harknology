import Loader, { PageSuspense } from "@/app/components/Loader";
import { canAccessClass, getClass, getClasses } from "@/utils/queries/classes";
import { UserButton, auth } from "@clerk/nextjs";
import { CaretDownIcon, HomeIcon, PersonIcon } from "@radix-ui/react-icons";
import {
    Button,
    Container,
    DropdownMenuContent,
    DropdownMenuRoot,
    DropdownMenuTrigger,
    Flex,
    Separator,
} from "@radix-ui/themes";
import { ReactNode, Suspense } from "react";
import ClassesMenu from "./ClassesMenu";
import SidebarLink from "./SidebarLink";
import SidebarDiscussionList from "./SidebarDiscussionList";
import Link from "next/link";
import ErrorDisplay from "@/app/components/ErrorDisplay";
import CreateDiscussionDialog from "./CreateDiscussionDialog";
import Image from "next/image";
import logo from "@/../public/logo.svg";

export default async function ClassLayout({
    children,
    params,
}: {
    children: ReactNode;
    params: { id: string };
}) {
    const { userId } = auth();
    const cls = await getClass(params.id);
    if (!cls || !canAccessClass(params.id, userId!))
        return <ErrorDisplay err="Class not found" />;

    return (
        <Flex direction="row" style={{ height: "100vh", width: "100vw" }}>
            <Flex
                direction="column"
                align="stretch"
                gap="3"
                style={{ backgroundColor: "var(--gray-2)", padding: "20px" }}
            >
                <Flex direction="row" justify="between" align="center">
                    <Link
                        href="/"
                        style={{ display: "block", textAlign: "center" }}
                        title="Home"
                    >
                        <Image
                            src={logo}
                            alt="Harknology"
                            height="48"
                            width="48"
                        />
                    </Link>
                    <UserButton afterSignOutUrl="/" />
                </Flex>

                <DropdownMenuRoot>
                    <DropdownMenuTrigger>
                        <Button
                            variant="soft"
                            mb="2"
                            style={{ cursor: "pointer" }}
                        >
                            {cls.name}
                            <CaretDownIcon />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent variant="soft">
                        <Suspense fallback={<Loader center />}>
                            <ClassesMenu />
                        </Suspense>
                    </DropdownMenuContent>
                </DropdownMenuRoot>

                <SidebarLink href={`/c/${params.id}`}>
                    <HomeIcon />
                    Home
                </SidebarLink>

                <SidebarLink href={`/c/${params.id}/members`}>
                    <PersonIcon />
                    Members
                </SidebarLink>

                <Flex
                    direction="row"
                    justify="between"
                    align="center"
                    gap="6"
                    style={{ marginTop: "10px" }}
                >
                    <h5 style={{ margin: 0 }}>Discussions</h5>
                    {cls.teacher_id == userId && (
                        <CreateDiscussionDialog classId={params.id} />
                    )}
                </Flex>

                <Suspense fallback={<Loader center />}>
                    <SidebarDiscussionList classId={params.id} />
                </Suspense>
            </Flex>
            <Flex px="3" style={{ flex: 1, overflow: "auto" }}>
                <PageSuspense>
                    <Container>
                        <div
                            style={{
                                paddingTop: "var(--space-6)",
                                paddingBottom: "var(--space-6)",
                            }}
                        >
                            {children}
                        </div>
                    </Container>
                </PageSuspense>
            </Flex>
        </Flex>
    );
}
