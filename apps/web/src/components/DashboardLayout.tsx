import AppNav from "./AppNav";
import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import { FunctionComponent, PropsWithChildren, useEffect } from "react";
import Sidebar from "./Sidebar";
import styles from '@~/styles/DashboardLayout.module.css';
import { useUiLayout } from "misc/useUiLayout";
import Loader from "./Loader";
import React from "react";

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
      <Loader depends={'isGuest' in (props.children as object) && (props.children as any)?.['isGuest']? true : status != 'loading'} borderColor="black" center>
        {props.children}
        </Loader>
      </div>
    </main>
  </div>
}
export default DashboardLayout;
