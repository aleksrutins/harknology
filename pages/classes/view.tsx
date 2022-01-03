import Loader from "@/components/Loader";
import json from "@/json";
import { Class } from "@prisma/client";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import useSWR from "swr";
import { ClassResponse } from "../api/classes/[id]";
import UserDisplay from "@/components/UserDisplay";
import { TrashIcon } from "@heroicons/react/outline";
import Button from "@/components/Button";
import { FunctionComponent, useState } from "react";
import Modal, { ModalButtons } from "@/components/Modal";

const DeleteClassDialog: FunctionComponent<{name: string, open?: boolean, onDelete: (...args: any) => any, onCancel: (...args: any) => any}> = props => {
    return <Modal title="Delete Class" {...props}>
        Are you sure that you want to delete the class &ldquo;{props.name}&rdquo;?
        <ModalButtons>
            <Button onClick={props.onCancel}>Close</Button>
            <Button onClick={props.onDelete} buttonStyle="danger">Delete</Button>
        </ModalButtons>
    </Modal>
}

export default function ClassView() {
    const router = useRouter();
    const {data, error} = useSWR<ClassResponse>('/api/classes/' + router.query.id, json);
    const [deleteOpen, setDeleteOpen] = useState(false);
    
    return <Loader borderColor="black" depends={data} center>
        <Head>
            <title>{data?.name} | Harknology</title>
        </Head>
        <h1 className="text-2xl text-center font-light mb-0 pb-0">{data?.name}</h1>
        <Button buttonStyle="danger" className="block float-right mt-[-32px]" onClick={() => setDeleteOpen(true)}><TrashIcon className="h-5 w-5"/></Button>
        <span className="text-center block mb-4 text-[0.75rem]">
            <UserDisplay email={data?.teacherEmail!} />
        </span>
        <p className="max-w-2xl mx-auto whitespace-pre-wrap">{data?.description}</p>
        <p className="max-w-xl mx-auto flex flex-row flex-wrap justify-center">
            {data?.students?.length! > 0? data?.students.map(student => <UserDisplay key={student.email} email={student.email} badge />) : <span className="text-gray-400">No students</span>}
        </p>
        <DeleteClassDialog name={data?.name!} open={deleteOpen} onCancel={() => setDeleteOpen(false)} onDelete={async () => {
            await fetch(`/api/classes/${data?.id}/delete`);
            setDeleteOpen(false);
            router.push('/classes');
        }}/>
    </Loader>
}