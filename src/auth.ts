import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";
import { trpc } from "./util/trpc";

export function useAuth(classId: string) {
    const {data: session, status} = useSession();
    const router = useRouter();
    useEffect(() => {
        if(status == 'unauthenticated') router.push('/');
    });
    const role = trpc.useQuery(['class.role', classId]);
    return {session, status, role: role.data};
}
