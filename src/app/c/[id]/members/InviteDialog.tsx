import { PageSuspense } from "@/app/components/Loader";
import { getJoinCode } from "@/app/join/join";
import { PlusIcon } from "@radix-ui/react-icons";
import { DialogContent, DialogRoot, DialogTrigger, Flex, IconButton } from "@radix-ui/themes";
import Link from "next/link";
import QRCode from "react-qr-code";

async function InviteDialogContent({ classId }: { classId: string }) {
    const code = await getJoinCode(classId);
    const joinURL = `https://harknology.app/join?code=${code.code}`;

    return <Flex align="stretch" gap="5">
        <QRCode value={joinURL}/>
        <Flex direction="column" style={{flex: 1}}>
            <code style={{alignSelf: 'center', paddingLeft: '10px', paddingRight: '10px', border: '1px solid var(--gray-4)', borderRadius: 'var(--radius-3)', backgroundColor: 'var(--gray-3)', fontSize: '24pt'}}>{code.code}</code>
            <p>Enter the above code at <Link href="/join" style={{color: 'var(--blue-11)', textDecoration: 'underline'}}>harknology.app/join</Link>, or use the below link:</p>
            <Link href={joinURL} style={{color: 'var(--blue-11)', textDecoration: 'underline'}}>{joinURL}</Link>
        </Flex>
    </Flex>
}

export default async function InviteDialog({ classId }: { classId: string }) {
    return <DialogRoot>
        <DialogTrigger>
            <IconButton radius="full" size="3" title="Join" style={{cursor: 'pointer'}}>
                <PlusIcon width={24} height={24}/>
            </IconButton>
        </DialogTrigger>
        <DialogContent>
            <PageSuspense>
                <InviteDialogContent classId={classId} />
            </PageSuspense>
        </DialogContent>
    </DialogRoot>
}