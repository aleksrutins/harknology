import { FunctionComponent } from "react";

export const Toast: FunctionComponent<{background?: string}> = props => {
    return <div className={`rounded-lg z-50 fixed top-[3px] left-1/2 translate-x-[-50%] p-3 inline-block`} style={{
        backgroundColor: props.background ?? 'rgba(14, 165, 233, 0.7)'
    }}>{props.children}</div>
}