import React from "react"
import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, Orbitron } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: '--font-sans'
});

const _orbitron = Orbitron({ 
  subsets: ["latin"],
  variable: '--font-display'
});

export const metadata: Metadata = {
  title: 'Nexus Cósmico - Un Viaje a la Conciencia',
  description: 'Una experiencia psicodélica e introspectiva hacia las profundidades de la mente',
  generator: 'v0.app',
  icons: {
    icon: '/nebulosa.png', // Apunta directamente a tu nueva imagen en public/
    apple: '/nebulosa.png', // Esto es para cuando alguien guarda tu web en la pantalla de inicio de un iPhone
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0512',
  width: 'device-width',
  initialScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className="font-sans antialiased overflow-hidden">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
