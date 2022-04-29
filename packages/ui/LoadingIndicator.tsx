import { FunctionComponent } from "react";
import styles from '@~/styles/LoadingIndicator.module.css';

export type Props = {
    borderColor: 'white' | 'black',
    center?: boolean
}

const LoadingIndicator: FunctionComponent<Props> = (props) => <span className={`${styles.loadingIndicator} ${props.center && styles.center}`} style={{borderColor: props.borderColor}}/>

export default LoadingIndicator;