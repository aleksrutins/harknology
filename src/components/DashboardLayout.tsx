import AppNav from "@component:AppNav";
import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import { FunctionComponent, PropsWithChildren, useEffect } from "react";
import Sidebar from "./Sidebar";
import styles from '@~/styles/DashboardLayout.module.css';

export const DashboardContent: FunctionComponent<PropsWithChildren<{}>> = (props) => <div className="overflow-auto p-3 h-full">{props.children}</div>

const DashboardLayout: FunctionComponent<PropsWithChildren<{}>> = (props) => {
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
