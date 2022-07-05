import { useClasses } from "@/api";
import { useAuth } from "@/auth";
import { CreateClassDialog } from "@/components/CreateClassDialog";
import Loader from "@/components/Loader";
import Modal, { ModalButtons } from "@/components/Basic/Modal";
import { useInput } from "@/input";
import truncate from "@/truncate";
import { Session } from "next-auth";
import Head from "next/head";
import { useState } from "react";
import Link from "next/link";
import UserDisplay from "@/components/UserDisplay";
import Card from "@component:Basic/Card";
import { AcademicCapIcon, PlusIcon } from "@heroicons/react/outline";
import { DashboardContent } from "@/components/DashboardLayout";

export default function Classes() {
    const { session, status } = useAuth();
    const { data: classes, error, createClass: apiCreateClass, mutate } = useClasses();
    const [createClassOpen, setCreateClassOpen] = useState(false);
    const createClass = async (name: string, description: string) => {
        await apiCreateClass({ name, description })
        setCreateClassOpen(false);
        mutate();
    }
    return <DashboardContent>
        <Head>
            <title>Classes | Harknology</title>
        </Head>
        <h1 className="text-2xl font-light text-center">Classes</h1>
        <h2 className="text-xl font-light text-center">Classes You Teach</h2>
        <Loader depends={classes} borderColor="black" center>
            <div className="flex flex-row flex-wrap max-w-[800px] mx-auto justify-center">
                {classes?.classesTeaching.map(classroom => <Link key={classroom.id} href={"/classes/view?id=" + classroom.id} passHref>
                    <Card title={classroom.name} href={`/classes/view?id=${classroom.id}`}>
                        <UserDisplay email={classroom.teacherEmail} />
                        <p>{truncate(classroom.description, 100)}</p>
                    </Card>
                </Link>)}
                <Card onClick={() => setCreateClassOpen(true)} title="Create Class" cardType="placeholder" icon={PlusIcon} />
            </div>
        </Loader>
        <h2 className="text-xl font-light text-center">Your Classes</h2>
        <Loader depends={classes} borderColor="black" center>
            <div className="flex flex-row flex-wrap max-w-[800px] mx-auto justify-center">
                {classes?.classes.map(classroom => <Link key={classroom.id} href={"/classes/view?id=" + classroom.id} passHref>
                    <Card title={classroom.name} href={`/classes/view?id=${classroom.id}`}>
                        <UserDisplay email={classroom.teacherEmail} />
                        <p>{truncate(classroom.description, 100)}</p>
                    </Card>
                </Link>)}
            </div>
        </Loader>

        <CreateClassDialog open={createClassOpen} onSubmit={createClass} onCancel={() => setCreateClassOpen(false)} />
    </DashboardContent>
}
