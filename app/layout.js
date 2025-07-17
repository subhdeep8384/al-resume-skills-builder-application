// "use-client "

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header  from "@/components/header.jsx"
import { ClerkProvider } from "@clerk/nextjs";
import { neobrutalism ,dark } from '@clerk/themes';
import {useTheme} from "next-themes"
import { Toaster } from "sonner";

import {toaster } from "@/components/ui/sonner"


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Ai skills",
  description: "This is a app where you can anylyse yourself and train youself according to the market trends ",
};

export default function RootLayout({ children }) {
  // const {theme} = useTheme()
  return (
    <ClerkProvider  appearance={{
      baseTheme:  "dark",
      signIn: { baseTheme: neobrutalism },
      signUp: { baseTheme: neobrutalism }
    }}  >
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
          >
           <Header></Header>
           <Toaster richColors/>
            <main className="min-h-screen">{children}</main>
             <footer className="bg-muted/50 py-12 ">
              <div className="container mx-auto px-4 text-center text-gray-300">
                made by subhdeep pal 
              </div>
             </footer>


          </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
