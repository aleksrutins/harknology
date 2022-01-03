import Link from "next/link";
import { useRouter } from "next/router";
import { FunctionComponent } from "react";
import links from "@/links.json";
import { useSession } from "next-auth/react";

const SidebarLink: FunctionComponent<{href: string}> = (props) => {
    const router = useRouter();
    return <Link href={props.href}><a className={(router.asPath.startsWith(props.href) ? "bg-green-500 hover:bg-green-700 hover:shadow-green-700/50 text-white shadow-green-500/50 shadow-md" : "hover:bg-gray-200") + ' transition rounded-lg p-3 m-1 block text-center'}>{props.children}</a></Link>;
}

export default function Sidebar() {
    const {status} = useSession();
    return status == 'authenticated'? <div className="flex flex-col p-3 justify-between border-r border-green-600">
        <div className="flex flex-col">
        {links.top.map(link => <SidebarLink key={link[1]} href={link[1]}>{link[0]}</SidebarLink>)}
        </div>
        <div className="flex flex-col">
        {links.bottom.map(link => <SidebarLink key={link[1]} href={link[1]}>{link[0]}</SidebarLink>)}
        </div>
    </div> : null;
}