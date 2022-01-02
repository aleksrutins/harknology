import Link from "next/link";
import styles from "@~/styles/Sidebar.module.css";
import { useRouter } from "next/router";
import { FunctionComponent } from "react";
import links from "@/links.json";
import { useSession } from "next-auth/react";

const SidebarLink: FunctionComponent<{href: string}> = (props) => {
    const router = useRouter();
    return <Link href={props.href}><a className={router.asPath.startsWith(props.href) ? styles.active : undefined}>{props.children}</a></Link>;
}

export default function Sidebar() {
    const {status} = useSession();
    return status == 'authenticated'? <div className={styles.sidebar}>
        <div className={styles.sidebarSection}>
        {links.top.map(link => <SidebarLink key={link[1]} href={link[1]}>{link[0]}</SidebarLink>)}
        </div>
        <div className={styles.sidebarSection}>
        {links.bottom.map(link => <SidebarLink key={link[1]} href={link[1]}>{link[0]}</SidebarLink>)}
        </div>
    </div> : null;
}