import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';
import DashboardLayout from '@/components/DashboardLayout';

function MyApp({ Component, pageProps: {session, ...pageProps} }: AppProps) {
  return (
  <SessionProvider session={session}>
    <Head>
        <link rel="icon" href="/logo.svg" />
    </Head>
    <DashboardLayout>
    <Component {...pageProps} />
    </DashboardLayout>
  </SessionProvider>
  );
}

export default MyApp
