import { Inter } from 'next/font/google'
import './globals.css'

import Navbar from './components/navbar/Navbar'
import Modal from './components/modals/Modal'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb clone',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Modal isOpen />
        <Navbar />
        {children}
      </body>
    </html>
  )
}
