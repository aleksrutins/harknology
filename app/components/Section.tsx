import { FunctionComponent, PropsWithChildren } from "react"

export type Props = PropsWithChildren<{
    title: string
}>;
const Section: FunctionComponent<Props> = (props) =>
    <div className="shadow rounded-xl block p-3">
        {props.children}
    </div>

export default Section;