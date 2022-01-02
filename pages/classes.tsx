import { useClasses } from "@/api";
import { useAuth } from "@/auth";
import { CreateClassDialog } from "@/components/CreateClassDialog";
import Loader from "@/components/Loader";
import Modal, { ModalButtons } from "@/components/Modal";
import { useInput } from "@/input";
import truncate from "@/truncate";
import { Session } from "next-auth";
import Head from "next/head";
import { useState } from "react";
import Link from "next/link";
import UserDisplay from "@/components/UserDisplay";

export default function Classes() {
    const {session, status} = useAuth();
    const {data: classes, error, createClass: apiCreateClass} = useClasses();
    const [createClassOpen, setCreateClassOpen] = useState(false);
    const createClass = async (name: string, description: string) => {
        await apiCreateClass({name, description})
        setCreateClassOpen(false);
    }
    return <>
        <Head>
            <title>Classes | Harknology</title>
        </Head>
        <h1 className="pageTitle">Classes</h1>
        <h2>Classes You Teach</h2>
        <Loader depends={classes} borderColor="black" center>
            <div className="grid">
            {classes?.classesTeaching.map(classroom => <Link key={classroom.id} href={"/classes/view?id=" + classroom.id}>
            <a className="card class-card">
                <h2>
                <span className="title">{classroom.name}</span>
                <span className="subtitle">
                    <UserDisplay email={classroom.teacherEmail}/>
                </span>
                </h2>
                <p>{truncate(classroom.description, 100)}</p>
            </a>
            </Link>)}
            <a className="card dashed center-content placeholder" onClick={() => setCreateClassOpen(true)}>
                Create Class
            </a>
            </div>
        </Loader>

        <CreateClassDialog open={createClassOpen} onSubmit={createClass} onCancel={() => setCreateClassOpen(false)}/>
        </>
}