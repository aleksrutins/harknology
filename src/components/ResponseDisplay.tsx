import { useInput } from "@/input";
import json from "@/json";
import { formatDate } from "@/util/dateFmt";
import { PencilIcon, PlusIcon } from "@heroicons/react/solid";
import { Response } from "@prisma/client";
import { FC, useRef, useState } from "react";
import useSWR, { SWRResponse } from "swr";
import Accordion from "./Basic/Accordion";
import Button from "./Basic/Button";
import ToggleButton from "./Basic/ToggleButton";
import ResponseEditor from "./ResponseEditor";
import UserDisplay from "./UserDisplay";

export type Props = {
    response: Response,
    swr: SWRResponse<Response[]>,
    depth: number
};
const ResponseDisplay: FC<Props> = (props) => {
    const responses = props.swr.data?.filter(r => r.parentId == props.response.id);;
    const [editing, setEditing] = useState(false);

    return <div className={`rounded hover:border-gray-400 bg-white transition my-3 border ${editing && '!border-gray-600'}`}>
        <div className={`sticky w-100 bg-white backdrop-blur-sm p-3 border-b ${editing && 'border-gray-600'} rounded-t`} style={{ top: props.depth * 40, zIndex: 99 - props.depth }}>
            <UserDisplay email={props.response.userEmail} />
            <div className="float-right">
                <small>{formatDate(new Date(props.response.lastModified))}</small>
                <ToggleButton active={editing} className="group float-right mt-[-9px] mr-[-9px]" buttonStyle="primary" onClick={(e: MouseEvent) => { e.stopPropagation(); setEditing(!editing) }}>
                    <PlusIcon className="inline w-5 h-5 align-middle" />
                    <span className="hidden group-hover:inline align-middle pl-1">Respond</span>
                </ToggleButton>
            </div>
        </div>
        <div className="p-2">
            <p dangerouslySetInnerHTML={{ __html: props.response.content }}></p>
            {(responses?.length ?? 0 > 0) ?
                <Accordion initiallyOpen={false} title={`Responses${(responses?.length ?? 0) > 0 ? ` (${responses?.length})` : ``}`}>
                    {responses?.map(response => <ResponseDisplay key={response.id} {...{ response }} swr={props.swr} depth={props.depth + 1}></ResponseDisplay>)}
                </Accordion>
                : ''}
            {editing && <ResponseEditor discussion={props.response.discussionId!} parent={props.response.id} swr={props.swr} />}
        </div>
    </div>;
}

export default ResponseDisplay;