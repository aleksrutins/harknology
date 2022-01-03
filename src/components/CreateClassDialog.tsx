import { useInput } from "@/input";
import { FunctionComponent, MouseEventHandler } from "react";
import Button from "./Button";
import Modal, { ModalButtons } from "./Modal";

export const CreateClassDialog: FunctionComponent<{ open: boolean, onSubmit: (name: string, description: string) => void, onCancel: MouseEventHandler<HTMLButtonElement> }> = (props) => {
    const [name, nameChange] = useInput('');
    const [description, descriptionChange] = useInput('');

    return <Modal title="Create Class" open={props.open}>
        <form className="mx-5 mb-2">
        <label htmlFor="name" className="block">Name</label>
        <input name="name" value={name} onChange={nameChange} className="block w-full rounded-md border border-gray-200 focus:border-green-500 focus:ring-green-400/50 focus:ring appearance-none focus:outline-none transition p-2"/>
        <label htmlFor="description" className="mt-3 block">Description</label>
        <textarea name="description" value={description} onChange={descriptionChange} className="block w-full rounded-md border border-gray-200 focus:border-green-500 focus:ring focus:ring-green-400/50 p-2 transition"></textarea>
        </form>
        <ModalButtons>
            <Button onClick={props.onCancel}>Close</Button>
            <Button buttonStyle="primary" onClick={() => props.onSubmit(name, description)}>Create</Button>
        </ModalButtons>
    </Modal>
}