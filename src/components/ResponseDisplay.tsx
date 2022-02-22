import { useInput } from "@/input";
import json from "@/json";
import { Response } from "@prisma/client";
import { FC, useRef } from "react";
import useSWR from "swr";
import Accordion from "./Basic/Accordion";
import Button from "./Basic/Button";
import ResponseEditor from "./ResponseEditor";
import UserDisplay from "./UserDisplay";

export type Props = {
    response: Response,
    depth: number
};
const ResponseDisplay: FC<Props> = (props) => {
    const responses = useSWR<Response[]>(`/api/responses/${props.response.id}/responses`, json);
    
    return <div className="rounded bg-white transition my-3 border">
        <div className="sticky w-100 bg-white backdrop-blur-sm p-3 border-b rounded-t" style={{top: props.depth * 40, zIndex: 99 - props.depth}}>
            <UserDisplay email={props.response.userEmail}/>
        </div>
        <div className="p-2">
            <p dangerouslySetInnerHTML={{__html: props.response.content}}></p>
            {(responses.data?.length ?? 0 > 0) ?
            <Accordion initiallyOpen={false} title={`Responses${(responses.data?.length ?? 0) > 0? ` (${responses.data?.length})` : ``}`}>
                {responses.data?.map(response => <ResponseDisplay key={response.id} {...{response}} depth={props.depth + 1}></ResponseDisplay>)}
            </Accordion>
            : ''}
            <ResponseEditor discussion={props.response.discussionId!} parent={props.response.id} swr={responses}/>
        </div>
    </div>;
}

export default ResponseDisplay;