import { useSession, signOut, signIn } from "next-auth/react";
import dynamic from "next/dynamic";
import { ComponentType, useState } from "react";
import LoadingIndicator from "./LoadingIndicator";
import { PopupMenu } from "./PopupMenu";

export type NavProps = {
}

const AppNav: ComponentType<NavProps> = dynamic(async () => (props) => {
    const { data: session, status } = useSession();
    const [authPopupVisible, setAuthPopupVisible] = useState(false);
    return <div className="bg-green-600 text-white flex flex-row justify-between items-center p-3">
        <div></div>
        <h2>
            harknology
        </h2>
        <div>
            {status == 'unauthenticated' ? <button onClick={() => signIn()} className="bg-green-600 text-white hover:bg-white hover:shadow-md hover:shadow-gray-100/30 p-2 border-none hover:text-black rounded-md transition">Sign In</button> :
                (status == 'loading' ?
                    <LoadingIndicator borderColor="white" />
                    :
                    <>
                        <img src={session!.user?.image!} className='rounded-full h-[32px] cursor-pointer' alt={session!.user?.email!} onClick={() => setAuthPopupVisible(!authPopupVisible)}></img>
                        <PopupMenu isOpen={authPopupVisible} position={{top: '56px', right: '15px'}}>
                        <span className="m-2 block">
                                <img src={session!.user?.image!} className='inline rounded-full h-[1rem] align-middle' alt={session!.user?.email!}></img>
                                <span className="ml-[3px] text-[1rem] align-middle">{session!.user?.name}</span>
                            </span>
                            <button className="text-[0.8rem] hover:bg-gray-200 transition cursor-pointer p-1" onClick={() => signOut()}>Log Out</button>
                        </PopupMenu>
                    </>
                )
            }
        </div>
    </div>
}, { ssr: false });
export default AppNav;