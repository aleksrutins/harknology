import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';
import DashboardLayout from '@/components/DashboardLayout';
import { useEffect } from 'react';
import { withTRPC } from '@trpc/next';
import { AppRouter } from '@~/server/router';
import superjson from 'superjson';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js');
    }
  })
  return (
    <SessionProvider>
      <Head>
        <link rel="icon" href="/logo.svg" />
        <link rel="manifest" href="/manifest.json" />

        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="Harknology" />
        <meta name="apple-mobile-web-app-title" content="Harknology" />
        <meta name="theme-color" content="rgb(243 244 246)" />
        <meta name="msapplication-navbutton-color" content="rgb(243 244 246)" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="msapplication-starturl" content="/" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

        <link rel="icon" type="image/svg+xml" sizes="192x192 32x32 16x16 256x256" href="/logo.svg" />
        <link rel="apple-touch-icon" type="image/svg+xml" sizes="192x192 32x32 16x16 256x256" href="/logo.svg" />
      </Head>
      <DashboardLayout>
        <Component {...pageProps} />
      </DashboardLayout>
    </SessionProvider>
  );
}

function getBaseUrl() {
  if (typeof window !== 'undefined') {
    return '';
  }
  // reference for vercel.com
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  // reference for render.com
  if (process.env.RENDER_INTERNAL_HOSTNAME) {
    return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`;
  }

  // assume localhost
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export default withTRPC<AppRouter>({
  config(_opts) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    return {
      url: `${getBaseUrl()}/api/trpc`,
      transformer: superjson,
      /**
       * @link https://react-query-v3.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: true,
  /**
   * @link https://trpc.io/docs/caching
   */
  responseMeta({ ctx, clientErrors }) {
    if (clientErrors.length) {
      // propagate http first error from API calls
      return {
        status: clientErrors[0].data?.httpStatus ?? 500,
      };
    }

    // cache request for 1 day + revalidate once every second
    const ONE_DAY_IN_SECONDS = 60 * 60 * 24;
    return {
      headers: {
        'cache-control': `s-maxage=1, stale-while-revalidate=${ONE_DAY_IN_SECONDS}`,
      }
    };
  },
})(MyApp);
