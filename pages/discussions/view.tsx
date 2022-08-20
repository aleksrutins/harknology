import ToggleButton from "@/components/Basic/ToggleButton";
import { DashboardContent } from "@/components/DashboardLayout";
import Loader from "@/components/Loader";
import ResponseDisplay from "@/components/ResponseDisplay";
import ResponseEditor from "@/components/ResponseEditor";
import { Toast } from "@/components/Toast";
import { trpc } from "@/util/trpc";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

export default function DiscussionView() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const { data, error } = trpc.useQuery(['discussion.get', router.query.id as string]);
    const responses = trpc.useQuery(['discussion.responses', router.query.id as string]);
    const [parents, setParents] = useState(new Map<string, boolean>())
    return <DashboardContent>
        {error && <Toast background="#ef4444">Error loading discussion</Toast>}
        <Loader depends={data} borderColor="black" center>
            <div className="max-w-3xl mx-auto px-2">
                <h1 className="text-2xl text-center font-light mb-0 pb-0">{data?.name}</h1>
                <p className="max-w-2xl mx-auto whitespace-pre-wrap">{data?.description}</p>
                {responses.error && <div className="bg-red-300 rounded-xl p-3">Failed to load responses</div> }
                <Loader depends={responses} borderColor="black" center>
                    {(responses.data ?? []).map(resp => <div key={resp.id} className="bg-gray-100 rounded m-2 p-3" id={`response-${resp.id}`}>
                        <ResponseDisplay key={resp.id} response={resp} query={responses} />
                        <ToggleButton buttonStyle="primary" active={parents.get(resp.id) == true} onClick={() => {
                            setParents(new Map(parents.set(resp.id, !(parents.get(resp.id) ?? false))));
                        }}>Reply</ToggleButton>
                    </div>)}
                </Loader>
                <ResponseEditor discussion={data?.id!} query={responses} parents={[...parents].filter(([id, editing]) => editing).map(([id,]) => id)} />
            </div>
        </Loader>
    </DashboardContent>;
}

