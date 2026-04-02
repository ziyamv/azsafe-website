'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { translations, Lang, Translations } from '@/lib/translations'

interface LanguageContextType {
  lang: Lang
  setLang: (lang: Lang) => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'az',
  setLang: () => {},
  t: translations.az,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('az')

  useEffect(() => {
    const stored = localStorage.getItem('azsafe-lang') as Lang | null
    if (stored === 'az' || stored === 'en') {
      setLangState(stored)
    }
  }, [])

  const setLang = (newLang: Lang) => {
    setLangState(newLang)
    localStorage.setItem('azsafe-lang', newLang)
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
