import { FunctionComponent, ReactNode } from "react";
import styles from "@~/styles/Modal.module.css";

export type Props = {
    title: string,
    subtitle?: string,
    buttons?: ReactNode[],
    open?: boolean
};

const Modal: FunctionComponent<Props> = (props) => {
    return (props.open? <>
        <div className="transition absolute top-0 left-0 bottom-0 right-0 bg-gray-700/50 backdrop-blur-sm"></div>
        <div className="transition rounded-lg bg-white shadow-lg top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 absolute sm:w-2xl">
            <h2 className={styles.title}>{props.title}</h2>
            <div className={styles.content}>
            {props.children}
            </div>
        </div>
    </> : null);
};

export const ModalButtons: FunctionComponent<{}> = (props) => {
    return <div className="flex flex-row-reverse">{props.children}</div>
}

export default Modal;