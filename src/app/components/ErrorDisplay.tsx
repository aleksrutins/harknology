import { ExclamationTriangleIcon, HomeIcon } from "@radix-ui/react-icons";
import { Flex } from "@radix-ui/themes";
import Link from "next/link";

export default function ErrorDisplay({ err }: { err: string }) {
    return <Flex direction='column' align="center" justify="center" style={{width: '100vw', height: '100vh', backgroundColor: 'var(--red-a3)'}}>
        <ExclamationTriangleIcon height={64} width={64} style={{padding: '20px'}}/>
        <Link href="/" style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '6px', backgroundColor: 'var(--red-a4)', paddingLeft: '10px', paddingRight: '10px', paddingTop: '5px', paddingBottom: '5px', borderRadius: 'var(--radius-3)'}}>
            <HomeIcon/>
            Home
        </Link>
        <h1>{err}</h1>
    </Flex>
}