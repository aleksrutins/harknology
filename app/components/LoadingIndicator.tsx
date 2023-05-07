import { FunctionComponent } from "react";
import styles from '@~/styles/LoadingIndicator.module.css';

export type Props = {
  borderColor: 'white' | 'black',
  center?: boolean,
  pad?: boolean
}

const LoadingIndicator: FunctionComponent<Props> = (props) =>
  <span className={`${styles.loadingIndicator} ${props.center && styles.center} ${props.pad && 'relative top-3'}`} style={{ borderColor: props.borderColor }}>
    <span className={styles.loadingIndicatorCenter} style={{ borderColor: props.borderColor }}></span>
  </span>

export default LoadingIndicator;