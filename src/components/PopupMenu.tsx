import { FunctionComponent } from "react";
import OutsideClickHandler from "react-outside-click-handler";

export const PopupMenu: FunctionComponent<{
    isOpen: boolean,
    position: {
        top?: string,
        left?: string,
        right?: string,
        bottom?: string
    }
}> = props =>

<div className={props.isOpen? 'z-[102] flex flex-col py-1 rounded-md shadow-2xl bg-white absolute text-black' : 'hidden'} style={props.position}>
    {props.children}
</div>