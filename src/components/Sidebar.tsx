import Link from "next/link";
import styles from "@~/styles/Sidebar.module.css";
import { useRouter } from "next/router";
import { FunctionComponent } from "react";
import links from "@/links.json";

const SidebarLink: FunctionComponent<{href: string}> = (props) => {
    const router = useRouter();
    return <Link href={props.href}><a className={router.asPath == props.href ? styles.active : undefined}>{props.children}</a></Link>;
}

export default function Sidebar() {
    return <div className={styles.sidebar}>
        {links.map(link => <SidebarLink key={link[1]} href={link[1]}>{link[0]}</SidebarLink>)}
    </div>
}