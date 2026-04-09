import type { Metadata } from 'next'
import './globals.css'
import { LanguageProvider } from '@/contexts/LanguageContext'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

export const metadata: Metadata = {
  title: 'AZSAFE MMC | Svay Avadanlıqları & AZSAFE Kran İcarəsi',
  description: 'AZSAFE MMC — Azərbaycanda svay və qazma avadanlıqları satışı, servis xidmətləri və AZSAFE Kran icarəsi. BAUER, BETEK, COMACCHIO, TECNIWELL distribütoru.',
  keywords: 'AZSAFE, svay avadanlığı, drilling equipment Azerbaijan, kran icarəsi, crane rental Azerbaijan, BAUER, BETEK, COMACCHIO, AZSAFE Kran, Xırdalan',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="az">
      <body>
        <LanguageProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton />
        </LanguageProvider>
      </body>
    </html>
  )
}
