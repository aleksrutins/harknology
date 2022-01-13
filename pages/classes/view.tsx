import Loader from "@/components/Loader";
import json from "@/json";
import { Class } from "@prisma/client";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import useSWR from "swr";
import { ClassResponse } from "../api/classes/[id]";
import UserDisplay from "@/components/UserDisplay";
import { TrashIcon, UserAddIcon } from "@heroicons/react/outline";
import Button from "@/components/Button";
import { FunctionComponent, useState } from "react";
import Modal, { ModalButtons } from "@/components/Modal";
import { useAuth } from "@/auth";
import Link from "next/link";
import styles from "@~/styles/ClassView.module.css";

const DeleteClassDialog: FunctionComponent<{ name: string, open?: boolean, onDelete: (...args: any) => any, onCancel: (...args: any) => any }> = props => {
    return <Modal title="Delete Class" {...props}>
        Are you sure that you want to delete the class &ldquo;{props.name}&rdquo;?
        <ModalButtons>
            <Button onClick={props.onCancel}>Cancel</Button>
            <Button onClick={props.onDelete} buttonStyle="danger">Delete</Button>
        </ModalButtons>
    </Modal>
}

const JoinCodeDialog: FunctionComponent<{ code: string, expires: string, open?: boolean, setOpen: (isOpen: boolean) => any }> = props => {
    const timeDifference = new Date(new Date(props.expires).getTime() - new Date().getTime());
    return <Modal title="Join Class" open={props.open}>
        <p className="block text-center">Here is your join link. It expires in {timeDifference.getHours()} hours and {timeDifference.getMinutes()} minutes.</p>
        <span className="block text-center text-3xl mt-4 mx-4"><Link href={`/classes/join?code=${props.code}`}>Join Class</Link></span>
        <ModalButtons>
            <Button onClick={() => props.setOpen(false)}>Close</Button>
        </ModalButtons>
    </Modal>
}

export default function ClassView() {
    const router = useRouter();

    const { data, error } = useSWR<ClassResponse>('/api/classes/' + router.query.id, json);
    useAuth();
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [joinOpen, setJoinOpen] = useState(false);
    const [joinCode, setJoinCode] = useState('');
    const [joinExpires, setJoinExpires] = useState(new Date().toString());

    async function joinClass() {
        const code: any = await (await fetch(`/api/classes/${data?.id}/join/code`)).json();
        setJoinCode(code.code);
        setJoinExpires(code.expires);
        setJoinOpen(true);
    }

    return <>
        {error && <span className="block text-center pt-3">Error loading class</span>}
        <Loader borderColor="black" depends={data} center>
            <Head>
                <title>{data?.name} | Harknology</title>
            </Head>

            <div className="block fixed right-[2px] mt-[-13px] flex flex-col">

                
            </div>
            <div className="h-full p-0 m-0 grow flex flex-row">
                <div className={`overflow-auto h-full p-3 grow resize-x`}>
                    <h1 className="text-2xl text-center font-light mb-0 pb-0">
                        {data?.name}
                        <Button buttonStyle="danger" className="float-right" onClick={() => setDeleteOpen(true)}><TrashIcon className="h-5 w-5" /></Button>
                    </h1>

                    <span className="text-center block mb-4 text-[0.75rem]">
                        <UserDisplay email={data?.teacherEmail!} />
                    </span>
                    <p className="max-w-2xl mx-auto whitespace-pre-wrap">{data?.description}</p>
                </div>
                <div className="h-full p-3 grow shrink border-l border-green-500">
                    <h1 className="text-xl text-center font-light mb-0 pb-0">
                        Students
                        <Button buttonStyle="primary" className="float-right" onClick={joinClass}><UserAddIcon className="h-5 w-5" /></Button>
                    </h1>
                    {data?.students?.length! > 0 ? data?.students.map(student => <UserDisplay key={student.email} email={student.email} />) : <span className="text-gray-400 text-center">No students</span>}
                </div>
            </div>

            <DeleteClassDialog name={data?.name!} open={deleteOpen} onCancel={() => setDeleteOpen(false)} onDelete={async () => {
                await fetch(`/api/classes/${data?.id}/delete`);
                setDeleteOpen(false);
                router.push('/classes');
            }} />

            <JoinCodeDialog code={joinCode} open={joinOpen} setOpen={setJoinOpen} expires={joinExpires} />
        </Loader>
    </>
}
