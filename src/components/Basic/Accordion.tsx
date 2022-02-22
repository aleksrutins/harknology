import { ChevronDoubleDownIcon, ChevronDoubleLeftIcon } from "@heroicons/react/outline";
import { ComponentType, ElementRef, FC, useState } from "react";
import Button from "./Button";

const Accordion: FC<{
    initiallyOpen: boolean,
    title: string,
    action?: ElementRef<typeof Button>
}> = props => {
    const [isOpen, setOpen] = useState(props.initiallyOpen);
    return <div className="rounded-md border">
        <h2 className={`flex flex-row items-center justify-between p-2 cursor-pointer ${isOpen? 'border-b' : ''}`} onClick={() => setOpen(!isOpen)}>
            <span>{props.title}</span>
            <div className="flex flex-row items-center">
                {props.action}
                <span className="w-5 h-5 align-middle ml-2">{isOpen? <ChevronDoubleDownIcon/> : <ChevronDoubleLeftIcon/>}</span>
            </div>
        </h2>
        <div className={`p-1 ${isOpen? 'block' : 'hidden'}`}>
            {props.children}
        </div>
    </div>
}

export default Accordion;