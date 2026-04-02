'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { Wrench, Package, Headphones, Settings, ArrowRight, CheckCircle, Phone } from 'lucide-react'

const serviceIcons = [Wrench, Package, Headphones, Settings]

export default function AfterSalesPage() {
  const { t, lang } = useLanguage()

  return (
    <div className="min-h-screen pt-20">
      {/* ─── HERO ─── */}
      <section className="relative py-24 bg-hero-gradient overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: `linear-gradient(rgba(240,124,26,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(240,124,26,0.5) 1px, transparent 1px)`, backgroundSize: '60px 60px' }}
        />
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-orange/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-brand-orange/10 border border-brand-orange/30 text-brand-orange text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
            <Wrench size={12} />
            AZSAFE
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">{t.afterSales.title}</h1>
          <p className="text-gray-300 text-xl max-w-2xl mx-auto">{t.afterSales.subtitle}</p>
        </div>
      </section>

      {/* ─── INTRO ─── */}
      <section className="py-12 bg-navy-800/30 border-y border-white/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-300 text-lg leading-relaxed">{t.afterSales.intro}</p>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {(Object.keys(t.afterSales.services) as Array<keyof typeof t.afterSales.services>).map((key, i) => {
              const service = t.afterSales.services[key]
              const Icon = serviceIcons[i]
              return (
                <div key={key} className="bg-navy-800 border border-white/5 hover:border-brand-orange/20 rounded-2xl overflow-hidden card-hover transition-all duration-300">
                  {/* Image placeholder */}
                  <div className="h-44 img-placeholder flex-col gap-2">
                    {/* TODO: Replace with service-relevant photo */}
                    <Icon size={32} className="text-brand-orange/40" />
                    <span className="text-[11px] text-brand-orange/40">
                      {lang === 'az' ? `${service.title} şəkli` : `${service.title} image`}
                    </span>
                  </div>
                  <div className="p-8">
                    <div className="flex items-center gap-4 mb-5">
                      <div className="w-12 h-12 bg-brand-orange/10 border border-brand-orange/20 rounded-xl flex items-center justify-center shrink-0">
                        <Icon size={22} className="text-brand-orange" />
                      </div>
                      <h3 className="text-xl font-black text-white">{service.title}</h3>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed mb-6">{service.desc}</p>
                    <ul className="space-y-2">
                      {service.items.map((item, j) => (
                        <li key={j} className="flex items-center gap-3 text-sm text-gray-300">
                          <CheckCircle size={14} className="text-brand-orange shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── PROCESS ─── */}
      <section className="section-padding bg-navy-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-black text-white mb-3">{t.afterSales.process.title}</h2>
          </div>

          <div className="relative">
            {/* Connector line */}
            <div className="absolute top-10 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-brand-orange/30 to-transparent hidden lg:block" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {t.afterSales.process.steps.map((step, i) => (
                <div key={i} className="relative text-center">
                  {/* Step number circle */}
                  <div className="w-20 h-20 bg-brand-orange text-white rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-black shadow-lg shadow-brand-orange/30 relative z-10">
                    {step.step}
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{step.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── BRANDS SUPPORTED ─── */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-black text-white mb-3">
              {lang === 'az' ? 'Xidmət Göstərdiyimiz Brendlər' : 'Brands We Service'}
            </h2>
            <p className="text-gray-400">
              {lang === 'az'
                ? 'Bütün distribütor brendlərimiz üzrə tam servis dəstəyi'
                : 'Full service support for all our distributor brands'}
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {['BAUER', 'BETEK', 'COMACCHIO', 'METAX', 'DRILLING HI-TECH'].map((brand) => (
              <div
                key={brand}
                className="bg-navy-800 border border-white/5 hover:border-brand-orange/30 px-6 py-3 rounded-xl text-white font-bold text-sm transition-all"
              >
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gradient-to-r from-brand-orange-dark to-brand-orange rounded-3xl p-10 sm:p-14 overflow-hidden">
            <div className="absolute -right-16 -top-16 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
            <div className="relative flex flex-col sm:flex-row items-center justify-between gap-8">
              <div>
                <h2 className="text-3xl font-black text-white mb-2">{t.afterSales.cta.title}</h2>
                <p className="text-orange-100 text-lg">{t.afterSales.cta.desc}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 shrink-0">
                <a href="tel:+994123493920" className="inline-flex items-center gap-2 bg-white text-brand-orange font-bold px-6 py-3 rounded-xl hover:bg-orange-50 transition-colors">
                  <Phone size={18} />
                  +994 12 349 3920
                </a>
                <Link href="/contact" className="inline-flex items-center gap-2 bg-white/20 text-white font-bold px-6 py-3 rounded-xl hover:bg-white/30 transition-colors border border-white/30">
                  {t.afterSales.cta.button}
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
