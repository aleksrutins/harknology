import { useAuth } from "@/auth";
import Loader from "@/components/Loader";
import LoadingIndicator from "@/components/LoadingIndicator";
import ResponseDisplay from "@/components/ResponseDisplay";
import ResponseEditor from "@/components/ResponseEditor";
import { Toast } from "@/components/Toast";
import json from "@/json";
import { Discussion, Response } from "@prisma/client";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function DiscussionView() {
    const { session, status } = useAuth();
    const router = useRouter();
    const { data, error } = useSWR<Discussion>(`/api/discussions/${router.query.id}`, json);
    const { data: responses, error: respError } = useSWR<Response[]>(`/api/discussions/${router.query.id}/responses`, json);
    return <>
        {error && <Toast background="#ef4444">Error loading discussion</Toast>}
        <Loader depends={data} borderColor="black" center>
            <div className="max-w-3xl mx-auto px-2">
                <h1 className="text-2xl text-center font-light mb-0 pb-0">{data?.name}</h1>
                <p className="max-w-2xl mx-auto whitespace-pre-wrap">{data?.description}</p>
                {respError && <div className="bg-red-300 rounded-xl p-3">Failed to load responses</div> }
                <Loader depends={responses} borderColor="black" center>
                    {(responses ?? []).map(resp => <ResponseDisplay response={resp}/>)}
                </Loader>
                <ResponseEditor discussion={data?.id!} />
            </div>
        </Loader>
    </>;
}

