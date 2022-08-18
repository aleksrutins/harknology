import AppNav from "@component:AppNav";
import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import { FunctionComponent, PropsWithChildren, useEffect } from "react";
import Sidebar from "./Sidebar";
import styles from '@~/styles/DashboardLayout.module.css';
import useUiLayout from "@/functions/useUiLayout";

export const DashboardContent: FunctionComponent<PropsWithChildren<{}>> = (props) => <div className="overflow-auto p-3 h-full">{props.children}</div>

const DashboardLayout: FunctionComponent<PropsWithChildren<{}>> = (props) => {
  let { status } = useSession();
  const layout = useUiLayout();
  // if(status == 'unauthenticated') signIn();
  return <div className={styles.content + " bg-gray-100"}>
    <Head>
      <title>Harknology</title>
    </Head>
    <AppNav></AppNav>
    <main className={styles.mainArea}>
      <Sidebar />
      <div className={`${styles.contentView} ${layout == 'horizontal' && status == 'authenticated' ? 'rounded-tl-xl' : ''} border-l border-t`}>
        {props.children}
      </div>
    </main>
  </div>
}
export default DashboardLayout;
