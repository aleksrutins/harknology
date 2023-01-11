import { ArrowRightIcon } from "@heroicons/react/outline";
import { Connection, Response } from "@prisma/client";
import { FC } from "react";
import { UseQueryResult } from "react-query";
import UserDisplay from "./UserDisplay";

type Connections = { connectsTo: Connection[], connectsFrom: Connection[] }

export type Props = {
    response: Response & Connections,
    query: UseQueryResult<(Response & Connections)[]>
};
const ResponseDisplay: FC<Props> = (props) => {
    const responses = props.query.data?.filter(r => r.connectsFrom.some(conn => conn.fromId == props.response.id));

    return (
        <div>
            <div>
                {
                    props.response.connectsFrom.map(conn => {
                        const response = props.query.data?.find((resp) => resp.id == conn.fromId);
                        if(!response) return <></>
                        return (
                            <a key={conn.id} className="text-xs text-green-300 overflow-hidden block" href={`#response-${response.id}`}>
                            <ArrowRightIcon className="w-2 h-2 mr-1 inline"></ArrowRightIcon>
                            {response.userEmail}
                            <span className="text-xs text-gray-600 overflow-ellipsis"> {response.content.replace(/(<([^>]+)>)/ig, "").substring(0, 70)}</span>
                        </a>
                        );})
                }
            </div>
            <div>
                <UserDisplay email={props.response.userEmail}></UserDisplay>
            </div>
            <p dangerouslySetInnerHTML={{__html: props.response.content}}></p>
        </div>
    );
}

export default ResponseDisplay;
