import Link from "next/link";
import { useRouter } from "next/router";
import { FunctionComponent, useState } from "react";
import links from "@/links.json";
import { useSession } from "next-auth/react";
import useUiLayout from "@/functions/useUiLayout";
import { PopupMenu } from "./PopupMenu";
import Button from "./Button";
import { MenuIcon } from "@heroicons/react/outline";

const SidebarLink: FunctionComponent<{href: string, isActive: boolean, isMobile: boolean}> = (props) => {
    
    return <Link href={props.href}><a className={(props.isActive ? "bg-green-500 hover:bg-green-700 hover:shadow-green-700/50 text-white shadow-green-500/50 shadow-md" : "hover:bg-gray-200") + ` transition ${props.isMobile && 'py-2 px-3' || 'rounded-lg p-3 m-1'} block text-center`}>{props.children}</a></Link>;
}

export default function Sidebar() {
    const {status} = useSession();
    const router = useRouter();
    const uiLayout = useUiLayout();
    const [isMobileMenuVisible, setMobileMenuVisible] = useState(false);
    return status == 'authenticated'? (
        uiLayout == 'horizontal'?
        <div className="flex flex-col p-3 justify-between border-r border-green-600">
            {links.map((section, i) =>
            <div className="flex flex-col" key={i}>
                {section.map(link => <SidebarLink isMobile={false} key={link[1]} href={link[1]} isActive={new RegExp(link[2]).test(router.asPath)}>{link[0]}</SidebarLink>)}
            </div>
            )}
        </div>
        :
        <>
        <PopupMenu position={{top: '56px', left: '15px'}} isOpen={isMobileMenuVisible}>
            {links.map((section, i) =>
            <div className="flex flex-col" key={i}>
                {section.map(link => <SidebarLink isMobile={true} key={link[1]} href={link[1]} isActive={new RegExp(link[2]).test(router.asPath)}>{link[0]}</SidebarLink>)}
            </div>
            )}
        </PopupMenu>
        <Button buttonStyle="primary" className="absolute top-[7px] left-[15px]" onClick={() => setMobileMenuVisible(!isMobileMenuVisible)}><MenuIcon className="h-5 w-5"></MenuIcon></Button>
        </>
    ) : null;
}