import Link from "next/link";
import { FunctionComponent } from "react"

const Card: FunctionComponent<{title: string, href?: string, onClick?: (...args: any[]) => any, cardType?: 'item' | 'placeholder'}> = (props) => {
    let a = <a onClick={props.onClick ?? (() => {})} className={`cursor-pointer block hover:shadow-green-500/50 rounded-md ${props.children != undefined || 'flex flex-col justify-center items-center'} w-[300px] h-[190px] p-6 m-6 hover:text-green-500 transition hover:shadow-lg border border-grey-400 hover:border-green-400 ${props.cardType == 'placeholder' && 'border-dashed text-gray-400 hover:border-solid'}`}>
        <h2 className="font-light text-lg">{props.title}</h2>
        {props.children}
    </a>;
    if(props.href != undefined) {
        return <Link href={props.href}>{a}</Link>;
    } else return a;
}

export default Card;