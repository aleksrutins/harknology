import { useInput } from "@/input";
import createClass from "@~/pages/api/createClass";
import { FunctionComponent, MouseEventHandler } from "react";
import Modal, { ModalButtons } from "./Modal";

export const CreateClassDialog: FunctionComponent<{ open: boolean, onSubmit: (name: string, description: string) => void, onCancel: MouseEventHandler<HTMLButtonElement> }> = (props) => {
    const [name, nameChange] = useInput('');
    const [description, descriptionChange] = useInput('');

    return <Modal title="Create Class" open={props.open}>
        <form>
        <input placeholder="Name" value={name} onChange={nameChange} />
        <textarea placeholder="Description" value={description} onChange={descriptionChange}></textarea>
        </form>
        <ModalButtons>
            <button className="btn white hover-primary" onClick={props.onCancel}>Close</button>
            <button className="btn primary hover-primary" onClick={() => props.onSubmit(name, description)}>Create</button>
        </ModalButtons>
    </Modal>
}