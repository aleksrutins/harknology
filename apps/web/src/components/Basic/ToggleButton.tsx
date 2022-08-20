import { ButtonHTMLAttributes, FunctionComponent, useState } from "react";

const ToggleButton: FunctionComponent<ButtonHTMLAttributes<HTMLButtonElement> & {buttonStyle?: 'base' | 'primary' | 'danger', active?: boolean, onClick?: () => void}> = (props) => {
    const style = {
        base: 'hover:bg-gray-200 rounded-md transition p-2 m-1',
        primary: 'text-white bg-green-500 hover:bg-green-600 transition hover:shadow-md hover:shadow-green-600/50 rounded-md p-2 m-1',
        danger: 'text-white bg-red-500 hover:bg-red-600 transition hover:shadow-md hover:shadow-red-600/50 rounded-md p-2 m-1'
    };
    const styleChosen = props.buttonStyle || 'base';
    const dummyState = useState(true);
    return <button {...props} className={(props.active? style[styleChosen] : style.base) + ' ' + (props.className || '')} onClick={() => {
        props.onClick?.();
        dummyState[1](!dummyState[0]);
    }}>{props.children}</button>
}
export default ToggleButton;
