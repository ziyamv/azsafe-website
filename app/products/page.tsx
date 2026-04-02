'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { Drill, CheckCircle, ArrowRight, Globe, MessageCircle } from 'lucide-react'

type BrandKey = 'bauer' | 'betek' | 'comacchio' | 'metax' | 'drillingHiTech'

const brandKeys: BrandKey[] = ['bauer', 'betek', 'comacchio', 'metax', 'drillingHiTech']

const brandColors: Record<BrandKey, string> = {
  bauer: 'from-blue-900/30 to-blue-800/10',
  betek: 'from-red-900/30 to-red-800/10',
  comacchio: 'from-green-900/30 to-green-800/10',
  metax: 'from-purple-900/30 to-purple-800/10',
  drillingHiTech: 'from-orange-900/30 to-orange-800/10',
}

export default function ProductsPage() {
  const { t, lang } = useLanguage()
  const [activeFilter, setActiveFilter] = useState<BrandKey | 'all'>('all')

  const displayedBrands = activeFilter === 'all' ? brandKeys : [activeFilter]

  return (
    <div className="min-h-screen pt-20">
      {/* ─── HERO ─── */}
      <section className="relative py-24 bg-hero-gradient overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: `linear-gradient(rgba(240,124,26,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(240,124,26,0.5) 1px, transparent 1px)`, backgroundSize: '60px 60px' }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-brand-orange/10 border border-brand-orange/30 text-brand-orange text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
            <Drill size={12} />
            AZSAFE
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">{t.products.title}</h1>
          <p className="text-gray-300 text-xl max-w-2xl mx-auto">{t.products.subtitle}</p>
        </div>
      </section>

      {/* ─── FILTER TABS ─── */}
      <section className="sticky top-20 z-30 bg-navy-900/95 backdrop-blur-md border-b border-white/5 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            <button
              onClick={() => setActiveFilter('all')}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                activeFilter === 'all'
                  ? 'bg-brand-orange text-white'
                  : 'bg-navy-800 text-gray-400 hover:text-white border border-white/10'
              }`}
            >
              {lang === 'az' ? 'Hamısı' : 'All'}
            </button>
            {brandKeys.map((key) => (
              <button
                key={key}
                onClick={() => setActiveFilter(key)}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeFilter === key
                    ? 'bg-brand-orange text-white'
                    : 'bg-navy-800 text-gray-400 hover:text-white border border-white/10'
                }`}
              >
                {t.products.brands[key].name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BRAND CARDS ─── */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {displayedBrands.map((key) => {
              const brand = t.products.brands[key]
              return (
                <div
                  key={key}
                  className="group bg-navy-800 border border-white/5 hover:border-brand-orange/30 rounded-2xl overflow-hidden card-hover transition-all duration-300"
                >
                  {/* Image area */}
                  <div className={`h-52 img-placeholder bg-gradient-to-br ${brandColors[key]} flex-col gap-2 relative`}>
                    {/* TODO: Replace with actual brand equipment photo */}
                    <Drill size={36} className="text-brand-orange/40" />
                    <span className="text-brand-orange/40 text-xs">
                      {brand.name} {t.products.imageNote}
                    </span>

                    {/* Brand badge */}
                    <div className="absolute top-4 left-4 bg-brand-orange text-white text-xs font-black px-3 py-1 rounded-full">
                      {brand.category}
                    </div>

                    {/* Origin badge */}
                    <div className="absolute top-4 right-4 bg-navy-900/80 border border-white/10 text-gray-300 text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1.5">
                      <Globe size={10} />
                      {brand.origin}
                    </div>
                  </div>

                  <div className="p-8">
                    {/* Brand name */}
                    <h2 className="text-2xl font-black text-white mb-1 group-hover:text-brand-orange transition-colors">
                      {brand.name}
                    </h2>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6">{brand.desc}</p>

                    {/* Product list */}
                    <div className="mb-6">
                      <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-3">
                        {lang === 'az' ? 'Məhsul Növləri' : 'Product Types'}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {brand.products.map((p, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
                            <CheckCircle size={14} className="text-brand-orange shrink-0" />
                            {p}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/5">
                      <Link
                        href={`/contact?brand=${brand.name}`}
                        className="btn-primary text-sm py-2.5 flex-1 justify-center"
                      >
                        <MessageCircle size={15} />
                        {t.products.inquire}
                      </Link>
                      <Link
                        href="/contact"
                        className="btn-outline text-sm py-2.5 flex-1 justify-center"
                      >
                        {t.products.contactForPrice}
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* CTA */}
          <div className="mt-16 text-center bg-navy-800 border border-brand-orange/20 rounded-2xl p-12">
            <h2 className="text-2xl font-black text-white mb-3">
              {lang === 'az' ? 'Lazım olan avadanlığı tapmadınız?' : 'Didn\'t find the equipment you need?'}
            </h2>
            <p className="text-gray-400 mb-6">
              {lang === 'az'
                ? 'Bizimlə əlaqə saxlayın, sizin üçün ən uyğun həli tapacağıq.'
                : 'Contact us and we will find the most suitable solution for you.'}
            </p>
            <Link href="/contact" className="btn-primary">
              {t.common.contactUs}
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
