import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';
import DashboardLayout from '@/components/DashboardLayout';
import { useEffect } from 'react';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
    return (
        <SessionProvider session={session}>
            <Head>
                <link rel="icon" href="/logo.svg" />
                <link rel="manifest" href="/manifest.json"/>

                <meta name="mobile-web-app-capable" content="yes"/>
                <meta name="apple-mobile-web-app-capable" content="yes"/>
                <meta name="application-name" content="Harknology"/>
                <meta name="apple-mobile-web-app-title" content="Harknology"/>
                <meta name="theme-color" content="rgb(243 244 246)"/>
                <meta name="msapplication-navbutton-color" content="rgb(243 244 246)"/>
                <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
                <meta name="msapplication-starturl" content="/"/>
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>

                <link rel="icon" type="image/svg+xml" sizes="192x192 32x32 16x16 256x256" href="/logo.svg"/>
                <link rel="apple-touch-icon" type="image/svg+xml" sizes="192x192 32x32 16x16 256x256" href="/logo.svg"/>
            </Head>
            <DashboardLayout>
                <Component {...pageProps} />
            </DashboardLayout>
        </SessionProvider>
    );
}

export default MyApp
