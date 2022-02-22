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
    response: Response
};
const ResponseDisplay: FC<Props> = (props) => {
    const responses = useSWR<Response[]>(`/api/responses/${props.response.id}/responses`, json);
    
    return <div className="rounded border hover:shadow bg-white transition p-3 my-3">
        <UserDisplay email={props.response.userEmail} badge/>
        <p>{props.response.content}</p>
        <Accordion initiallyOpen={false} title="Responses">
            {responses.data?.map(response => <ResponseDisplay key={response.id} {...{response}}></ResponseDisplay>)}
        </Accordion>
        <ResponseEditor discussion={props.response.discussionId!} parent={props.response.id}/>
    </div>;
}

export default ResponseDisplay;