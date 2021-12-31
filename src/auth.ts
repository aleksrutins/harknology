import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export function useAuth() {
    const {data: session, status} = useSession();
    const router = useRouter();
    useEffect(() => {
        if(status == 'unauthenticated') router.push('/');
    });
    return {session, status};
}