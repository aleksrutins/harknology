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
import Card from "@/components/Card";

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
            <Card title={classroom.name} href={`/classes/view?id=${classroom.id}`}>
                <UserDisplay email={classroom.teacherEmail}/>
                <p>{truncate(classroom.description, 100)}</p>
            </Card>
            </Link>)}
            <Card onClick={() => setCreateClassOpen(true)} title="Create Class" cardType="placeholder"/>
            </div>
        </Loader>

        <CreateClassDialog open={createClassOpen} onSubmit={createClass} onCancel={() => setCreateClassOpen(false)}/>
        </>
}