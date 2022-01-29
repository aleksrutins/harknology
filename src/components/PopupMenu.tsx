import { FunctionComponent } from "react";

export const PopupMenu: FunctionComponent<{
    isOpen: boolean,
    position: {
        top?: string,
        left?: string,
        right?: string,
        bottom?: string
    }
}> = props => <div className={props.isOpen? 'z-30 flex flex-col py-2 rounded-md shadow-xl bg-white absolute text-black' : 'hidden'} style={props.position}>
{props.children}
</div>