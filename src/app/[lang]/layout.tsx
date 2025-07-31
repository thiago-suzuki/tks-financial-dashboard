import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

import { Toaster } from "@/components/ui";
import { ThemeProvider } from "@/providers";


const inter= Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "TKS Financial",
  icons: {
    icon: "/financial.svg",
  }
};

type Params = Promise<{ lang: string }>

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Params
}>) {
  const { lang } = await params

  const messages = await getMessages()
  
  return (
    <html lang={lang} suppressHydrationWarning>
      <body className={inter.variable} >
        <NextIntlClientProvider locale={lang} messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
          <Toaster richColors />
        </NextIntlClientProvider>      
      </body>
    </html>
  );
}
