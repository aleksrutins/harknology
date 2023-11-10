'use client';

import { useState } from "react";
import { Button, Flex, Strong, Text, TextFieldInput } from "@radix-ui/themes";
import { useAsyncMemo } from "@/utils/useAsyncMemo";
import { JoinClassInfo } from "./info/route";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function JoinClassPage() {
    const params = useSearchParams();
    const [code, setCode] = useState(params.get('code') ?? "");
    const classInfo = useAsyncMemo<JoinClassInfo>(
        async () =>
            fetch(`/join/info?code=${code}`)
            .then(res => res.json())
            .catch(_ => undefined),
        [code]
    );

    return <Flex direction="column" align="center" justify="center" gap="3" style={{width: '100vw', height: '100vh'}}>
        <h1 style={{margin: 0}}>Join Class</h1>
        <TextFieldInput placeholder="Code" size="3" onChange={(evt) => setCode(evt.target.value)} value={code} style={{ textAlign: 'center' }}/>
        <Text as="p">
            { classInfo ? <>Joining <Strong>{classInfo?.name}</Strong></> : <Strong style={{color: 'var(--red-12)'}}>Invalid code</Strong> }
        </Text>
        <Flex>
            { classInfo && <Link href={`/join/join?code=${code}`} style={{display: 'block'}}>
                <Button>Join</Button>
            </Link> }
            <Link href="/">
                <Button color="gray" variant="soft">Cancel</Button>
            </Link>
        </Flex>
    </Flex>
}