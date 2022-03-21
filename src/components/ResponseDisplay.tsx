import { useInput } from "@/input";
import json from "@/json";
import { Response } from "@prisma/client";
import { FC, useRef } from "react";
import useSWR, { SWRResponse } from "swr";
import Accordion from "./Basic/Accordion";
import Button from "./Basic/Button";
import ResponseEditor from "./ResponseEditor";
import UserDisplay from "./UserDisplay";

export type Props = {
    response: Response,
    swr: SWRResponse<Response[]>
};
const ResponseDisplay: FC<Props> = (props) => {
    const responses = props.swr.data?.filter(r => r.parentId == props.response.id);
    
    return <div className="rounded border hover:shadow bg-white transition p-3 my-3">
        <UserDisplay email={props.response.userEmail}/>
        <p dangerouslySetInnerHTML={{__html: props.response.content}}></p>
        {(responses?.length ?? 0 > 0) ?
        <Accordion initiallyOpen={false} title={`Responses${(responses?.length ?? 0) > 0? ` (${responses?.length})` : ``}`}>
            {responses?.map(response => <ResponseDisplay key={response.id} {...{response}} swr={props.swr}></ResponseDisplay>)}
        </Accordion>
        : ''}
        <ResponseEditor discussion={props.response.discussionId!} parent={props.response.id} swr={props.swr}/>
    </div>;
}

export default ResponseDisplay;