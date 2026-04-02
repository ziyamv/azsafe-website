'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function WhatsAppButton() {
  const { lang } = useLanguage()
  const [hovered, setHovered] = useState(false)

  const message = lang === 'az'
    ? 'Salam! AZSAFE haqqında məlumat almaq istəyirəm.'
    : 'Hello! I would like to get information about AZSAFE.'

  const url = `https://wa.me/994502709196?text=${encodeURIComponent(message)}`

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 group"
      aria-label="WhatsApp"
    >
      {/* Tooltip */}
      <span
        className={`bg-gray-900 text-white text-xs font-medium px-3 py-2 rounded-lg shadow-lg whitespace-nowrap transition-all duration-200 ${
          hovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2 pointer-events-none'
        }`}
      >
        {lang === 'az' ? 'WhatsApp ilə yazın' : 'Chat on WhatsApp'}
      </span>

      {/* Button */}
      <div className="relative w-14 h-14 bg-green-500 hover:bg-green-400 rounded-full shadow-lg shadow-green-500/40 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-green-400/60">
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-25" />
        {/* WhatsApp SVG icon */}
        <svg viewBox="0 0 32 32" className="w-7 h-7 fill-white" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.002 2.667C8.638 2.667 2.669 8.636 2.669 16c0 2.34.634 4.625 1.836 6.625L2.004 29.333l6.924-1.815A13.267 13.267 0 0016.002 29.333c7.364 0 13.333-5.97 13.333-13.333S23.366 2.667 16.002 2.667zm0 24.267a11.023 11.023 0 01-5.62-1.543l-.403-.24-4.108 1.077 1.096-4.003-.262-.41A10.934 10.934 0 015.002 16c0-6.066 4.935-11.003 11-11.003S27.005 9.934 27.005 16s-4.934 11.003-11.003 11.003v-.07zm6.038-8.25c-.33-.165-1.955-.965-2.258-1.074-.303-.11-.524-.165-.745.165-.22.33-.855 1.074-1.048 1.293-.193.22-.386.248-.716.083-.33-.165-1.393-.514-2.654-1.638-.981-.875-1.643-1.956-1.836-2.286-.193-.33-.021-.508.145-.673.15-.148.33-.386.496-.579.165-.193.22-.33.33-.55.11-.22.055-.413-.028-.578-.083-.165-.745-1.797-1.021-2.461-.27-.648-.544-.56-.745-.57l-.634-.01a1.214 1.214 0 00-.88.413c-.303.33-1.155 1.129-1.155 2.757s1.183 3.197 1.348 3.417c.165.22 2.329 3.556 5.645 4.987.79.34 1.406.544 1.886.696.792.252 1.514.217 2.084.132.636-.096 1.955-.8 2.231-1.572.275-.772.275-1.434.193-1.572-.082-.138-.303-.22-.634-.386z" />
        </svg>
      </div>
    </a>
  )
}
