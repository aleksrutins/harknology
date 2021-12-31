import { useClasses } from "@/api";
import { useAuth } from "@/auth";
import Loader from "@/components/Loader";
import Modal from "@/components/Modal";
import { Session } from "next-auth";
import { useState } from "react";

export default function Classes() {
    const {session, status} = useAuth();
    const {classes, error} = useClasses();
    const [createClassOpen, setCreateClassOpen] = useState(false);
    return <>
        <h1 className="pageTitle">Classes</h1>
        <h2>Classes You Teach</h2>
        <Loader depends={classes} borderColor="black" center>
            <div className="grid">
            <a className="card" onClick={() => setCreateClassOpen(true)}>
                Create Class
            </a>
            </div>
        </Loader>

        <Modal title="Create Class" open={createClassOpen}>
            <button className="btn" onClick={() => setCreateClassOpen(false)}>Close</button>
        </Modal>
        </>
}