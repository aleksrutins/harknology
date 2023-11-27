import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Theme, ThemePanel } from '@radix-ui/themes'
import { ClerkProvider } from '@clerk/nextjs'
import { Providers } from './providers'
import { PageSuspense } from './components/Loader'

const inter = Inter({ subsets: ['latin'] })

const APP_NAME = "Harknology";
const APP_DEFAULT_TITLE = "Harknology";
const APP_TITLE_TEMPLATE = "%s - Harknology";
const APP_DESCRIPTION = "Easily manage your class discussions.";

export const metadata: Metadata = {
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,

  applicationName: APP_NAME,
  manifest: '/manifest.json',

  metadataBase: process.env.NODE_ENV == 'production' ? new URL('https://harknology-production.up.railway.app/') : undefined,

  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
}

export const viewport: Viewport = {
  themeColor: "color(display-p3 0.319 0.63 0.521)",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider appearance={{
      variables: {
        colorPrimary: 'green'
      }
    }}>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className} style={{padding: 0, margin: 0}}>
          <Providers>
            <Theme accentColor="jade" radius="large">
              <PageSuspense>
                {children}
              </PageSuspense>
            </Theme>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  )
}
