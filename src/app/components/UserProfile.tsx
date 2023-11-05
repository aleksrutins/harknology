/* eslint-disable @next/next/no-img-element */
import { clerkClient } from "@clerk/nextjs";
import { Flex } from "@radix-ui/themes"

export default async function UserProfile({ userId }: { userId: string }) {
    const userInfo = await clerkClient.users.getUser(userId);

    return <Flex direction="row" align="center" gap="2">
        <img src={userInfo.imageUrl} alt={userInfo.emailAddresses[0].emailAddress} style={{display: 'block', borderRadius: '50%'}} width={24} height={24}/>
        <h5 style={{margin: 0}}>{userInfo.firstName} {userInfo.lastName}</h5>
    </Flex>;
}