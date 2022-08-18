import { useSession, signOut, signIn } from "next-auth/react";
import dynamic from "next/dynamic";
import { ComponentType, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import LoadingIndicator from "./LoadingIndicator";
import { PopupMenu } from "./PopupMenu";
import styles from "@~/styles/AppNav.module.css";

export type NavProps = {
}

const AppNav: ComponentType<NavProps> = dynamic(async () => (props) => {
  const { data: session, status } = useSession();
  const [authPopupVisible, setAuthPopupVisible] = useState(false);
  return <div className={`bg-gray-100 flex flex-row justify-between items-center ${styles.titlebar}`}>
    <div></div>
    <h2 className="font-[Raleway]">
      harknology
    </h2>
    <div>
      {status == 'unauthenticated' ? <button onClick={() => signIn()} className="bg-gray-200 hover:bg-green-300 py-1 px-2 border-none rounded-md transition [app-region:no-drag]">Sign In</button> :
        (status == 'loading' ?
          <LoadingIndicator borderColor="white" />
          :
          <>
            <img src={session!.user?.image!} className='rounded-full h-[32px] cursor-pointer [app-region:no-drag]' alt={session!.user?.email!} onClick={() => setAuthPopupVisible(!authPopupVisible)}></img>
            <OutsideClickHandler useCapture={false} onOutsideClick={() => setAuthPopupVisible(false)}>
              <PopupMenu isOpen={authPopupVisible} position={{ top: '56px', right: 'calc(100vw-(env(titlebar-area-x)+env(titlebar-area-width)))' }}>
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
}, { ssr: false });
export default AppNav;
