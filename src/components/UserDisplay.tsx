import { FunctionComponent } from "react";
import useSWR from "swr";
import json from "@/json";
import { UserResponse } from "@~/pages/api/user/[email]";

const UserDisplay: FunctionComponent<{email: string}> = (props) => {
    const {data, error} = useSWR<UserResponse>('/api/user/' + props.email, json);
    return error ? <span>Error fetching user {props.email}</span> : 
    (data? <span className="text-[0.75rem]">
        <img className="inline rounded-full h-[0.75rem] mr-[2px]" src={data?.image} alt={data?.email}/>
        <span>{data?.name}</span>
    </span> : <span>{props.email}</span>)
};

export default UserDisplay;