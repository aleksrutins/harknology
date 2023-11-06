import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Theme, ThemePanel } from '@radix-ui/themes'
import { ClerkProvider } from '@clerk/nextjs'
import { Providers } from './providers'
import { PageSuspense } from './components/Loader'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Harknology',
  description: 'Easily manage your class discussions.',
}

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
              {process.env.NODE_ENV == 'development' && <ThemePanel />}
            </Theme>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  )
}
