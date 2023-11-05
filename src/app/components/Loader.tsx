import { ReactNode, Suspense } from 'react';
import styles from './Loader.module.css';

export default function Loader({ center, pad, borderColor }: {center?: boolean, pad?: boolean, borderColor: 'white' | 'black'}) {
    return <span className={`${styles.loadingIndicator} ${center && styles.center} ${pad && styles.padded}`} style={{borderColor}}>
        <span className={styles.loadingIndicatorCenter} style={{borderColor}}></span>
    </span>
}

export function PageSuspense({ children, color }: { children: ReactNode, color: 'white' | 'black' }) {
    return <Suspense fallback={<Loader pad center borderColor={color}/>}>{children}</Suspense>
}