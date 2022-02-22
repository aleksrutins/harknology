import { ChevronDoubleDownIcon, ChevronDoubleLeftIcon } from "@heroicons/react/outline";
import { FC, useState } from "react";

const Accordion: FC<{
    initiallyOpen: boolean,
    title: string
}> = props => {
    const [isOpen, setOpen] = useState(props.initiallyOpen);
    return <div className="rounded-md border">
        <h2 className={`p-2 cursor-pointer ${isOpen? 'border-b' : ''}`} onClick={() => setOpen(!isOpen)}>
            <span>{props.title}</span>
            <span className="float-right w-5 h-5 align-middle my-auto">{isOpen? <ChevronDoubleDownIcon/> : <ChevronDoubleLeftIcon/>}</span>
        </h2>
        <div className={`p-1 ${isOpen? 'block' : 'hidden'}`}>
            {props.children}
        </div>
    </div>
}

export default Accordion;