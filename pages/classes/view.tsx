import Loader from "@/components/Loader";
import json from "@/json";
import { Class } from "@prisma/client";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import useSWR from "swr";
import { ClassResponse } from "../api/classes/[id]";
import styles from '@~/styles/ClassView.module.css';
import UserDisplay from "@/components/UserDisplay";

export default function ClassView() {
    const router = useRouter();
    const {data, error} = useSWR<ClassResponse>('/api/classes/' + router.query.id, json);
    
    return <Loader borderColor="black" depends={data} center>
        <Head>
            <title>{data?.name} | Harknology</title>
        </Head>
        <h1 className="pageTitle">{data?.name}</h1>
        <span className={styles.teacherName}>
            <UserDisplay email={data?.teacherEmail!}/>
        </span>
        <p>{data?.description}</p>
    </Loader>
}