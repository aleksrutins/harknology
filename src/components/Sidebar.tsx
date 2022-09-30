import Link from "next/link";
import { useRouter } from "next/router";
import { FunctionComponent, PropsWithChildren, useState } from "react";
import links from "@/links.json";
import { useSession } from "next-auth/react";
import useUiLayout from "@/functions/useUiLayout";
import { PopupMenu } from "./PopupMenu";
import Button from "./Basic/Button";
import { MenuIcon } from "@heroicons/react/outline";
import styles from '@~/styles/Sidebar.module.css';

const SidebarLink: FunctionComponent<PropsWithChildren<{ href: string, isActive: boolean, isMobile: boolean }>> = (props) => {

  return <Link href={props.href}><a className={(props.isActive ? "bg-green-500 hover:bg-green-700 hover:shadow-green-700/50 text-white shadow-green-500/50 shadow-md" : "hover:bg-gray-200") + ` transition ${props.isMobile && 'py-2 px-3 my-1 rounded-md' || 'rounded-lg p-3 m-1'} block text-center`}>{props.children}</a></Link>;
}

export default function Sidebar() {
  const { status } = useSession();
  const router = useRouter();
  const uiLayout = useUiLayout();
  const [isMobileMenuVisible, setMobileMenuVisible] = useState(false);
  return status == 'authenticated' ? (
    uiLayout == 'horizontal' ?
      <div className="bg-gray-100 flex flex-col p-3 justify-between">
        {links.map((section, i) =>
          <div className="flex flex-col" key={i}>
            {section.map(link => <SidebarLink isMobile={false} key={link[1]} href={link[1]} isActive={new RegExp(link[2]).test(router.asPath)}>{link[0]}</SidebarLink>)}
          </div>
        )}
      </div>
      :
      <>
        <div className={`${isMobileMenuVisible && styles.slideIn || styles.slideOut} flex flex-col justify-between p-6 z-[104] bg-gray-100 absolute ${styles.mobileSidebar} border-r`}>
          {links.map((section, i) =>
            <div className="flex flex-col" key={i}>
              {section.map(link => <SidebarLink isMobile={true} key={link[1]} href={link[1]} isActive={new RegExp(link[2]).test(router.asPath)}>{link[0]}</SidebarLink>)}
            </div>
          )}
        </div>
        <button className="absolute top-[calc((env(titlebar-area-height,48px)/2)-14px)] left-[calc(env(titlebar-area-x,15px)+30px)] hover:bg-gray-200 cursor-pointer transition p-1 rounded [app-region:no-drag]" onClick={() => setMobileMenuVisible(!isMobileMenuVisible)}><MenuIcon className="h-5 w-5"></MenuIcon></button>
      </>
  ) : null;
}
