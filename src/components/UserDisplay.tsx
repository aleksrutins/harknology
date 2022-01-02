import { FunctionComponent } from "react";
import styles from '@~/styles/UserDisplay.module.css';
import useSWR from "swr";
import json from "@/json";
import { UserResponse } from "@~/pages/api/user/[email]";

const UserDisplay: FunctionComponent<{email: string}> = (props) => {
    const {data, error} = useSWR<UserResponse>('/api/user/' + props.email, json);
    return error ? <span>Error fetching user {props.email}</span> : 
    (data? <>
        <img className={styles.image} src={data?.image} alt={data?.email}/>
        <span className={styles.name}>{data?.name}</span>
    </> : <span>{props.email}</span>)
};

export default UserDisplay;