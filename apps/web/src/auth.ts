import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";

export function useAuth(classId?: string) {
    const {data: session, status} = useSession();
    const router = useRouter();
    useEffect(() => {
        if(status == 'unauthenticated') router.push('/');
    });
    const role = useSWR(`/api/classes/${classId}/role`, u => fetch(u).then(r => r.text())).data as 'student' | 'teacher' | 'none';
    return {session, status, role};
}