"use client";
import { SessionProvider } from "next-auth/react";
import Navbar from "./components/Navbar";
import "./globals.css";
import ChatbotWidget from "./components/ChatbotWidget";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
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
