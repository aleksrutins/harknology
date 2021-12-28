import AppNav from "@/components/AppNav";
import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import { useEffect } from "react";


export default function Dashboard() {
    return <div>
        <Head>
            <title>Dashboard | Harknology</title>
        </Head>
        <AppNav></AppNav>
    </div>
}