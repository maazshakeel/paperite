import type { Metadata } from "next";
import { Chakra_Petch as FontSans } from "next/font/google";
import "@/app/globals.css";

import { cn } from "@/lib/utils";

import { ThemeProvider } from "@/components/theme-provider";
import SessionProvider from "@/components/session-provider";
import { getServerSession } from "next-auth";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/navbar";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: "500",
});

export const metadata: Metadata = {
  title: "Paperite",
  description: "Website to create your own blogs",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider session={session}>
            <Navbar />
            {children}
            <Toaster />
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
