import Loader from "@/components/Loader";
import json from "@/json";
import { Class } from "@prisma/client";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import useSWR from "swr";
import { ClassResponse } from "../api/classes/[id]";
import UserDisplay from "@/components/UserDisplay";
import { PlusCircleIcon, TrashIcon, UserAddIcon } from "@heroicons/react/outline";
import Button from "@component:Basic/Button";
import { FunctionComponent, useEffect, useState } from "react";
import Modal, { ModalButtons } from "@/components/Basic/Modal";
import { useAuth } from "@/auth";
import Link from "next/link";
import styles from "@~/styles/ClassView.module.css";
import Card from "@component:Basic/Card";
import Splitter, { SplitDirection } from "@devbookhq/splitter";
import { Toast } from "@/components/Toast";
import useUiLayout from "@/functions/useUiLayout";
import { DashboardContent } from "@/components/DashboardLayout";
import { CreateDiscussionDialog } from "@/components/CreateDiscussionDialog";

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
    const { role } = useAuth(router.query.id as string);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [createDiscussionOpen, setCreateDiscussionOpen] = useState(false);
    const [joinOpen, setJoinOpen] = useState(false);
    const [joinCode, setJoinCode] = useState('');
    const [joinExpires, setJoinExpires] = useState(new Date().toString());
    const [otherError, setOtherError] = useState<string | undefined>(undefined);
    const uiLayout = useUiLayout();

    async function joinClass() {
        const code: any = await (await fetch(`/api/classes/${data?.id}/join/code`)).json();
        setJoinCode(code.code);
        setJoinExpires(code.expires);
        setJoinOpen(true);
    }

    async function createDiscussion() {

    }

    return <>
        {error && <Toast background="#ef4444">Error loading class</Toast>}
        {otherError && <Toast background="#ef4444">{otherError}</Toast>}
        <Loader borderColor="black" depends={data} center>
            <Head>
                <title>{data?.name} | Harknology</title>
            </Head>

            <Splitter direction={
                uiLayout == 'vertical'? SplitDirection.Vertical : SplitDirection.Horizontal
            } gutterClassName="bg-green-600" draggerClassName="bg-green-500">
                {/* Main class view */}
                {/* className={`overflow-auto h-full p-3 grow resize-y sm:resize-x`} */}
                <DashboardContent>
                    <h1 className="text-2xl text-center font-light mb-0 pb-0">
                        {data?.name}
                        <Button buttonStyle="danger" className="float-right" onClick={() => setDeleteOpen(true)}><TrashIcon className="h-5 w-5" /></Button>
                    </h1>

                    <span className="text-center block mb-4 text-[0.75rem]">
                        <UserDisplay email={data?.teacherEmail!} />
                    </span>
                    <p className="max-w-2xl mx-auto whitespace-pre-wrap">{data?.description}</p>

                    <h2 className="text-xl font-light text-center mt-3">Discussions</h2>
                    <div className="flex flex-row flex-wrap max-w-[800px] mx-auto justify-center">
                    {data?.discussions.map(discussion =>
                        <Card key={discussion.id} title={discussion.name} href={`/discussions/view?id=${discussion.id}`}>
                            <p>{discussion.description}</p>
                        </Card>
                    )}
                    {
                        role == 'teacher' ? 
                        <Card title="Create Discussion" icon={PlusCircleIcon} cardType="placeholder" onClick={() => setCreateDiscussionOpen(true)}/>
                        : (
                            (data?.discussions.length ?? 0) == 0 && <span className="text-gray-700 font-light text-center block">No discussions</span>
                        )
                    }
                    </div>
                </DashboardContent>
                {/* Student list */}
                {/*className="h-full p-3 sm:grow shrink border-t sm:border-l sm:border-t-0 border-green-500 h-2xl sm:h-full"*/}
                <DashboardContent>
                    <h1 className="text-xl text-center font-light mb-0 pb-0">
                        Students
                        <Button buttonStyle="primary" className="float-right" onClick={joinClass}><UserAddIcon className="h-5 w-5" /></Button>
                    </h1>
                    <div className="max-w-2xl mx-auto">
                        {data?.students?.length! > 0 ? data?.students.map(student => <UserDisplay key={student.email} email={student.email} />) : <span className="text-gray-400 text-center">No students</span>}
                    </div>
                </DashboardContent>
            </Splitter>

            <DeleteClassDialog name={data?.name!} open={deleteOpen} onCancel={() => setDeleteOpen(false)} onDelete={async () => {
                await fetch(`/api/classes/${data?.id}/delete`);
                setDeleteOpen(false);
                router.push('/classes');
            }} />

            <CreateDiscussionDialog open={createDiscussionOpen} onCancel={() => setCreateDiscussionOpen(false)} onSubmit={async (name, description) => {
                const response = await fetch(`/api/classes/${data?.id}/discussions/create`, {
                    method: 'post',
                    body: JSON.stringify({
                        name, description
                    })
                });
                setCreateDiscussionOpen(false);
                if(response.status == 200) {
                    router.push(`/discussions/view?id=${await response.text()}`);
                } else {
                    setOtherError("Error creating discussion: " + await response.text());
                }
            }} />

            <JoinCodeDialog code={joinCode} open={joinOpen} setOpen={setJoinOpen} expires={joinExpires} />
        </Loader>
    </>
}
