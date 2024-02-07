import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AntConfig } from "./AntConfig"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "IED Hackathon - 2024",
  description: "IED Hackathon - 2024",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className} suppressHydrationWarning={true}>
        <AntConfig>{children}</AntConfig>
      </body>
    </html>
  )
}


