import { useInput } from "@/input";
import json from "@/json";
import { PencilIcon, PlusIcon } from "@heroicons/react/solid";
import { Response } from "@prisma/client";
import { FC, useRef, useState } from "react";
import useSWR from "swr";
import Accordion from "./Basic/Accordion";
import Button from "./Basic/Button";
import ToggleButton from "./Basic/ToggleButton";
import ResponseEditor from "./ResponseEditor";
import UserDisplay from "./UserDisplay";

export type Props = {
    response: Response,
    depth: number
};
const ResponseDisplay: FC<Props> = (props) => {
    const responses = useSWR<Response[]>(`/api/responses/${props.response.id}/responses`, json);
    const [editing, setEditing] = useState(false);

    return <div className={`rounded hover:border-gray-400 bg-white transition my-3 border ${editing && '!border-gray-600'}`}>
        <div className={`sticky w-100 bg-white backdrop-blur-sm p-3 border-b ${editing && 'border-gray-600'} rounded-t`} style={{top: props.depth * 40, zIndex: 99 - props.depth}}>
            <UserDisplay email={props.response.userEmail}/>
            <ToggleButton active={editing} className="group float-right mt-[-9px] mr-[-9px]" buttonStyle="primary" onClick={(e: MouseEvent) => {e.stopPropagation(); setEditing(!editing)}}>
                    <PlusIcon className="inline w-5 h-5 align-middle"/>
                    <span className="hidden group-hover:inline align-middle pl-1">Respond</span>
                </ToggleButton>
        </div>
        <div className="p-2">
            <p dangerouslySetInnerHTML={{__html: props.response.content}}></p>
            {(responses.data?.length ?? 0 > 0) ?
            <Accordion initiallyOpen={false} title={`Responses${(responses.data?.length ?? 0) > 0? ` (${responses.data?.length})` : ``}`}>
                {responses.data?.map(response => <ResponseDisplay key={response.id} {...{response}} depth={props.depth + 1}></ResponseDisplay>)}
            </Accordion>
            : ''}
            {editing && <ResponseEditor discussion={props.response.discussionId!} parent={props.response.id} swr={responses}/>}
        </div>
    </div>;
}

export default ResponseDisplay;