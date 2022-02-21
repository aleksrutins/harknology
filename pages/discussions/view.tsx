import { useAuth } from "@/auth";
import Loader from "@/components/Loader";
import LoadingIndicator from "@/components/LoadingIndicator";
import { Toast } from "@/components/Toast";
import { Discussion } from "@prisma/client";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function DiscussionView() {
    const { session, status } = useAuth();
    const router = useRouter();
    const { data, error } = useSWR<Discussion>(`/api/discussions/${router.query.id}`);
    return <>
        {error && <Toast background="#ef4444">Error loading discussion</Toast>}
        <Loader depends={data} borderColor="black" center>
            <h1 className="text-2xl text-center font-light mb-0 pb-0">{data?.name}</h1>
            <p className="max-w-2xl mx-auto whitespace-pre-wrap">{data?.description}</p>

        </Loader>
    </>;
}

