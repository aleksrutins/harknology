import { ChevronDoubleDownIcon, ChevronDoubleLeftIcon } from "@heroicons/react/outline";
import { FC, useState } from "react";

const Accordion: FC<{
    initiallyOpen: boolean,
    title: string
}> = props => {
    const [isOpen, setOpen] = useState(props.initiallyOpen);
    return <div className="rounded border">
        <h2 className={`p-2 ${isOpen && 'border-b'} cursor-pointer`} onClick={() => setOpen(!isOpen)}>
            <span>{props.title}</span>
            <span className="float-right">{isOpen? <ChevronDoubleDownIcon/> : <ChevronDoubleLeftIcon/>}</span>
        </h2>
        <div className={`p-3 ${isOpen? 'block' : 'hidden'}`}>
            {props.children}
        </div>
    </div>
}

export default Accordion;