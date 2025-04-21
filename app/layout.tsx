"use client";

import { SessionProvider } from "next-auth/react";
import Navbar from "./components/Navbar";
import "./globals.css";
import ChatbotWidget from "./components/ChatbotWidget";
import Script from "next/script";

// Replace with your Measurement ID from GA4
const GA_TRACKING_ID = "G-J9Z0E5QMLS";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {GA_TRACKING_ID && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_TRACKING_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}
      </head>
      <body>
        <SessionProvider>
          <Navbar />
          {children}
          <ChatbotWidget />
        </SessionProvider>
      </body>
    </html>
  );
}
