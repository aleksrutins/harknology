import { FunctionComponent, PropsWithChildren } from "react";
import LoadingIndicator, {Props as IndicatorProps} from "./LoadingIndicator";

export type Props = IndicatorProps & {
    depends: any
}

const Loader: FunctionComponent<PropsWithChildren<Props>> = (props) => {
    return <>
        {!props.depends? <LoadingIndicator {...props}/>
        : props.children}
    </>;
}
export default Loader;
