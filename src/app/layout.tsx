import type { Metadata } from "next"
import { Geist_Mono, Inter } from "next/font/google"

import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster } from "@/components/ui/sonner"

import "./globals.css"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "MK11 Learning Hub",
  description: "Clean content-first MK11 learning website scaffolded with shadcn/ui.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${geistMono.variable} bg-background text-foreground antialiased`}>
        <TooltipProvider>
          {children}
          <Toaster />
        </TooltipProvider>
      </body>
    </html>
  )
}
