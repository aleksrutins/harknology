import { FunctionComponent } from "react";

const ToggleButton: FunctionComponent<{[name: string]: any, buttonStyle?: 'base' | 'primary' | 'danger', active?: boolean}> = (props) => {
    const style = {
        base: 'hover:bg-gray-200 rounded-md transition p-2 m-1',
        primary: 'text-white bg-green-500 hover:bg-green-600 transition hover:shadow-md hover:shadow-green-600/50 rounded-md p-2 m-1',
        danger: 'text-white bg-red-500 hover:bg-red-600 transition hover:shadow-md hover:shadow-red-600/50 rounded-md p-2 m-1'
    };
    const styleChosen = props.buttonStyle || 'base';
    return <button {...props} className={(props.active? style[styleChosen] : style.base) + ' ' + (props.className || '')}>{props.children}</button>
}
export default ToggleButton;