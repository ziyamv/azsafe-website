'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { Phone, Mail, MapPin } from 'lucide-react'

export default function Footer() {
  const { lang } = useLanguage()
  const az = lang === 'az'

  const links = [
    { href: '#home',        label: az ? 'Ana Səhifə'    : 'Home'        },
    { href: '#about',       label: az ? 'Haqqımızda'    : 'About'       },
    { href: '#azsafe',      label: az ? 'Avadanlıqlar'  : 'Equipment'   },
    { href: '#azsafe-kran', label: az ? 'Kran İcarəsi'  : 'Crane Rental'},
    { href: '#after-sales', label: az ? 'Satış Sonrası' : 'After Sales' },
    { href: '#contact',     label: az ? 'Əlaqə'         : 'Contact'     },
  ]

  return (
    <footer className="bg-navy-900 text-white">
      <div className="container-xl pt-32 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-5">
              {/* Logo on dark bg — invert to white */}
              <img src="/images/logo.png" alt="AZSAFE" className="h-10 w-auto brightness-0 invert mb-2" />
              <div className="text-[10px] text-white/30 font-medium tracking-widest uppercase">
                + AZSAFE Kran
              </div>
            </div>
            <p className="text-white/45 text-sm leading-relaxed">
              {az
                ? 'Azərbaycanda ağır texnika sahəsinin etibarlı tərəfdaşı.'
                : 'Trusted partner in heavy equipment in Azerbaijan.'}
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-white font-bold text-xs uppercase tracking-widest mb-5">
              {az ? 'Sürətli Keçidlər' : 'Quick Links'}
            </h3>
            <ul className="space-y-3">
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-white/45 text-sm hover:text-white transition-colors flex items-center gap-2 group">
                    <span className="w-3 h-px bg-white/20 group-hover:bg-blue-light group-hover:w-5 transition-all" />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Brands */}
          <div>
            <h3 className="text-white font-bold text-xs uppercase tracking-widest mb-5">
              {az ? 'Brendlər' : 'Brands'}
            </h3>
            <ul className="space-y-2">
              {['BAUER', 'BETEK', 'COMACCHIO', 'METAX'].map((b) => (
                <li key={b}>
                  <a href="#azsafe" className="text-white/45 text-sm hover:text-white transition-colors">{b}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-xs uppercase tracking-widest mb-5">
              {az ? 'Əlaqə' : 'Contact'}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={14} className="text-blue-light mt-0.5 shrink-0" />
                <span className="text-white/45 text-sm leading-relaxed">H.Aliyev 1/8, {az ? 'Xırdalan' : 'Khirdalan'}, AZ0100</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={14} className="text-blue-light shrink-0" />
                <a href="tel:+994123493920" className="text-white/45 text-sm hover:text-white transition-colors">+994 12 349 3920</a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={14} className="text-blue-light shrink-0" />
                <a href="tel:+994502709196" className="text-white/45 text-sm hover:text-white transition-colors">+994 50 270 9196</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={14} className="text-blue-light shrink-0" />
                <a href="mailto:office@safe-az.com" className="text-white/45 text-sm hover:text-white transition-colors">office@safe-az.com</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="container-xl py-16 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/25 text-xs">© 2026 AZSAFE MMC. {az ? 'Bütün hüquqlar qorunur.' : 'All rights reserved.'}</p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-light animate-pulse" />
            <span className="text-white/25 text-xs">{az ? 'Azərbaycanda hazırlanıb' : 'Made in Azerbaijan'}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
