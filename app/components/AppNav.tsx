import { useSession, signOut, signIn } from "next-auth/react";
import dynamic from "next/dynamic";
import { ComponentType, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import LoadingIndicator from "./LoadingIndicator";
import { PopupMenu } from "./PopupMenu";
import styles from "@~/styles/AppNav.module.css";
import { ChevronLeftIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";

export type NavProps = {
}

const AppNav: ComponentType<NavProps> = dynamic(async () => (props) => {
  const { data: session, status } = useSession();
  const [authPopupVisible, setAuthPopupVisible] = useState(false);
  const router = useRouter();
  return <div className="mt-[env(titlebar-area-y)] pb-[env(titlebar-area-height,48px)]">
  <div className={`bg-gray-100 flex flex-row justify-between items-center ${styles.titlebar}`}>
    <button className="hover:bg-gray-200 block rounded p-1 transition [app-region:no-drag]" onClick={() => router.back()}>
      <ChevronLeftIcon className="h-5 w-5"></ChevronLeftIcon>
    </button>
    <h2 className="font-[Raleway]">
      harknology
    </h2>
    <div className="relative">
      {status == 'unauthenticated' ? <button onClick={() => signIn()} className="bg-gray-200 hover:bg-green-300 py-1 px-2 border-none rounded-md transition [app-region:no-drag]">Sign In</button> :
        (status == 'loading' ?
          <LoadingIndicator borderColor="white" />
          :
          <>
            <img referrerPolicy="no-referrer" src={session!.user?.image!} className='rounded-full max-h-[37px] p-[5px] cursor-pointer [app-region:no-drag]' alt={session!.user?.email!} onClick={() => setAuthPopupVisible(!authPopupVisible)}></img>
            <OutsideClickHandler useCapture={false} onOutsideClick={() => setAuthPopupVisible(false)}>
              <PopupMenu isOpen={authPopupVisible} position={{ top: '40px', right: '0px', width: 'max-content' }}>
                <span className="m-2 block">
                  <img src={session!.user?.image!} className='inline rounded-full h-[1rem] align-middle' alt={session!.user?.email!}></img>
                  <span className="ml-[3px] text-[1rem] align-middle">{session!.user?.name}</span>
                </span>
                <button className="text-[0.8rem] hover:bg-gray-200 transition cursor-pointer p-1" onClick={() => signOut()}>Log Out</button>
              </PopupMenu>
            </OutsideClickHandler>
          </>
        )
      }
    </div>
  </div>
  </div>
}, { ssr: false });
export default AppNav;
