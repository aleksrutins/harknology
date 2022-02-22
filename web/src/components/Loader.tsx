import { FunctionComponent } from "react";
import LoadingIndicator, {Props as IndicatorProps} from "./LoadingIndicator";

export type Props = IndicatorProps & {
    depends: any
}

const Loader: FunctionComponent<Props> = (props) => {
    return <>
        {props.depends == null? <LoadingIndicator {...props}/>
        : props.children}
    </>;
}
export default Loader;