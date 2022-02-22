import { FunctionComponent, useState } from "react";
import useSWR from "swr";
import json from "@/json";
import { UserResponse } from "@~/pages/api/user/[email]";

const UserDisplay: FunctionComponent<{email: string, badge?: boolean}> = (props) => {
    const {data, error} = useSWR<UserResponse>('/api/user/' + props.email, json);
    const [nameVisible, setNameVisible] = useState(!!!props.badge);
    return error ? <span>Error fetching user {props.email}</span> : 
    (data? <span className={`leading-3 ${props.badge ? 'hover:p-1 rounded-full hover:border border-gray-200 text-base' : 'text-xs'}`} onMouseEnter={() => setNameVisible(true)} onMouseLeave={props.badge ? () => setNameVisible(false) : () => {}}>
        <img className={`inline rounded-full mr-[2px] ${props.badge? 'h-4' : 'h-3'} align-center`} src={data?.image} alt={data?.email} />
        {nameVisible? <span className="align-center">{data?.name}</span> : null}
    </span> : <span>{props.email}</span>)
};

export default UserDisplay;