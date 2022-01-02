import styles from "@~/styles/AppNav.module.css";
import { useSession, signOut, signIn } from "next-auth/react";
import dynamic from "next/dynamic";
import { ComponentType } from "react";
import LoadingIndicator from "./LoadingIndicator";

export type NavProps = {
}

const AppNav: ComponentType<NavProps> = dynamic(async () => (props) => {
    const { data: session, status } = useSession();
    return <div className={styles.navbar}>
        <div></div>
        <h2>
            harknology
        </h2>
        <div>
            {status == 'unauthenticated' ? <button onClick={() => signIn()} className="btn primary hover-white">Sign In</button> :
                (status == 'loading' ?
                    <LoadingIndicator borderColor="white" />
                    :
                    <>
                        <img src={session!.user?.image!} className={styles.profileImg} alt={session!.user?.name!} tabIndex={0}></img>
                        <div className={styles.authPopup}>
                            <span>{session!.user?.name}</span>
                            <button onClick={() => signOut()}>Log Out</button>
                        </div>
                    </>
                )
            }
        </div>
    </div>
}, { ssr: false });
export default AppNav;