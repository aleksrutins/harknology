import styles from "@~/styles/AppNav.module.css";
import { Session } from "next-auth";
import { useSession, signOut, signIn } from "next-auth/react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { ComponentType } from "react";

export type NavProps = {
}

const AppNav: ComponentType<NavProps> = dynamic(async () => (props) => {
    const {data: session, status} = useSession();
    if(status == 'unauthenticated') signIn();
    return <div className={styles.navbar}>
        <div></div>
        <h2>Harknology</h2>
        <div>
            {status == 'loading'? 'loading...' : 
            <img src={session!.user?.image as string} className={styles.profileImg} tabIndex={0}></img>
            }
            <div className={styles.authPopup}>
                <span>{status == 'loading'? 'Loading...' : session!.user?.name}</span>
                <button onClick={() => signOut()}>Log Out</button>
            </div>
        </div>
    </div>
}, {ssr: false});
export default AppNav;