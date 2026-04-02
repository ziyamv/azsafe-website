import type { Metadata } from 'next'
import './globals.css'
import { LanguageProvider } from '@/contexts/LanguageContext'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

export const metadata: Metadata = {
  title: 'AZSAFE MMC | Qazma Avadanlıqları & Vera Crane Kran İcarəsi',
  description: 'AZSAFE MMC — Azərbaycanda qazma avadanlıqları satışı, servis xidmətləri və Vera Crane kran icarəsi. BAUER, BETEK, COMACCHIO, METAX, DRILLING HI-TECH distribütoru.',
  keywords: 'AZSAFE, drilling equipment Azerbaijan, kran icarəsi, crane rental Azerbaijan, BAUER, BETEK, COMACCHIO, Vera Crane, Xırdalan',
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
