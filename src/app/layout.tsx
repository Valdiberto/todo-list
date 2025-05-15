import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { TaskProvider } from '@/context/TaskContext'

// Carrega a fonte Inter com os pesos desejados
const inter = Inter({
  subsets: ['latin'],
  display: 'swap', // melhora a renderização
  variable: '--font-inter', // define como CSS custom property
})

export const metadata: Metadata = {
  title: 'Todo List',
  description: 'Lista de Tarefas',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`antialiased ${inter.variable}`}>
      <body className="font-sans">
        <TaskProvider>
          <div className="min-h-screen">{children}</div>
        </TaskProvider>
      </body>
    </html>
  )
}
