import { ReactNode, Suspense } from 'react';
import styles from './Loader.module.css';

export default function Loader({ center, pad }: {center?: boolean, pad?: boolean}) {
    return <span className={`${styles.loadingIndicator} ${center && styles.center} ${pad && styles.padded}`}>
        <span className={styles.loadingIndicatorCenter}></span>
    </span>
}

export function PageSuspense({ children }: { children: ReactNode}) {
    return <Suspense fallback={<Loader pad center/>}>{children}</Suspense>
}