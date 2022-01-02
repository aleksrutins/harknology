import AppNav from "@component:AppNav";
import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import { FunctionComponent, useEffect } from "react";
import Sidebar from "./Sidebar";
import styles from '@~/styles/DashboardLayout.module.css';


const DashboardLayout: FunctionComponent = (props) => {
    let {status} = useSession();
    // if(status == 'unauthenticated') signIn();
    return <div className={styles.content}>
        <Head>
            <title>Harknology</title>
        </Head>
        <AppNav></AppNav>
        <main className={styles.mainArea}>
            <Sidebar/>
            <div className={styles.contentView}>
                {props.children}
            </div>
        </main>
    </div>
}
export default DashboardLayout;