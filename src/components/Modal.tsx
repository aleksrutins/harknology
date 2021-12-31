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
        <div className={styles.modalBg}></div>
        <div className={styles.modal}>
            <h2 className={styles.title}>{props.title}</h2>
            <div className={styles.content}>
            {props.children}
            </div>
        </div>
    </> : null);
};

export default Modal;