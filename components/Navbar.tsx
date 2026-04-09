'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const { lang, setLang, t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Intersection observer for active section
  useEffect(() => {
    const sections = ['home', 'about', 'azsafe', 'azsafe-kran', 'after-sales', 'gallery', 'contact']
    const observers: IntersectionObserver[] = []
    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { rootMargin: '-40% 0px -55% 0px' }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  const links = [
    { href: '#home',        label: lang === 'az' ? 'Ana Səhifə'    : 'Home'         },
    { href: '#about',       label: lang === 'az' ? 'Haqqımızda'    : 'About'        },
    { href: '#azsafe',      label: 'AZSAFE'                                          },
    { href: '#azsafe-kran', label: 'AZSAFE Kran'                                     },
    { href: '#after-sales', label: lang === 'az' ? 'Satış Sonrası' : 'After Sales'  },
    { href: '#gallery',     label: lang === 'az' ? 'Layihələr'     : 'Projects'      },
    { href: '#contact',     label: lang === 'az' ? 'Əlaqə'         : 'Contact'       },
  ]

  const sectionId = (href: string) => href.replace('#', '')

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md shadow-navy-900/8' : 'bg-white/95 backdrop-blur'
      }`}
    >
      <div className="container-xl">
        <div className="flex items-center justify-between h-[72px]">

          <a href="#home" className="shrink-0" aria-label="AZSAFE">
            <img src="/images/logo.png" alt="AZSAFE" className="h-10 w-auto" />
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setIsOpen(false)}
                className={`px-3 py-2 text-xs font-600 rounded-md transition-colors relative whitespace-nowrap ${
                  activeSection === sectionId(l.href)
                    ? 'text-blue-brand font-bold'
                    : 'text-navy-900 hover:text-blue-brand font-medium'
                }`}
              >
                {l.label}
                {activeSection === sectionId(l.href) && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-blue-brand rounded-full" />
                )}
              </a>
            ))}
          </nav>

          {/* Right: lang toggle + mobile menu */}
          <div className="flex items-center gap-3">
            {/* Language toggle */}
            <div className="flex items-center border border-slate-200 rounded-full p-0.5 bg-slate-50">
              <button
                onClick={() => setLang('az')}
                className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${
                  lang === 'az' ? 'bg-navy-900 text-white shadow' : 'text-slate-500 hover:text-navy-900'
                }`}
              >
                AZ
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${
                  lang === 'en' ? 'bg-navy-900 text-white shadow' : 'text-slate-500 hover:text-navy-900'
                }`}
              >
                EN
              </button>
            </div>

            <a href="#contact" className="hidden lg:inline-flex btn-primary text-sm py-2 px-5">
              {lang === 'az' ? 'Əlaqə Saxla' : 'Contact Us'}
            </a>

            <button
              className="lg:hidden p-2 text-navy-900"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Menu"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`lg:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="border-t border-slate-100 bg-white px-4 py-4 space-y-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 text-sm font-semibold text-navy-900 hover:text-blue-brand hover:bg-blue-pale rounded-lg transition-colors"
            >
              {l.label}
            </a>
          ))}
          <div className="pt-3 border-t border-slate-100">
            <a href="#contact" onClick={() => setIsOpen(false)} className="btn-primary w-full justify-center text-sm">
              {lang === 'az' ? 'Əlaqə Saxla' : 'Contact Us'}
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
