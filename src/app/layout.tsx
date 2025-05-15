import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { TaskProvider } from '@/context/TaskContext'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Todo List',
  description: 'A to-do list app',
  icons: {
    icon: '/favicon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`antialiased ${inter.variable}`}>
      <body className="font-sans">
        <TaskProvider>
          <div className="min-h-screen">{children}</div>
        </TaskProvider>
      </body>
    </html>
  )
}
