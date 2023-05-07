import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
    return <html lang="en">
        <head>
            <link rel="icon" href="/logo.192.png" />
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

            <link rel="icon" type="image/svg+xml" sizes="32x32" href="/logo.32.png" />
            <link rel="apple-touch-icon" type="image/svg+xml" sizes="32x32" href="/logo.32.png" />
            <link rel="icon" type="image/svg+xml" sizes="16x16" href="/logo.16.png" />
            <link rel="apple-touch-icon" type="image/svg+xml" sizes="16x16" href="/logo.16.png" />
            <link rel="icon" type="image/svg+xml" sizes="192x192" href="/logo.192.png" />
            <link rel="apple-touch-icon" type="image/svg+xml" sizes="192x192" href="/logo.192.png" />
            <link rel="icon" type="image/svg+xml" sizes="256x256" href="/logo.256.png" />
            <link rel="apple-touch-icon" type="image/svg+xml" sizes="256x256" href="/logo.256.png" />
        </head>
        <body>
            {children}
        </body>
    </html>
}