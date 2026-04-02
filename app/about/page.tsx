'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { ArrowRight, Drill, Truck, CheckCircle, Target, Users, Award, Clock } from 'lucide-react'

const valueIcons = [Award, CheckCircle, Users, Target]
const statIcons = [Clock, Award, Drill, Users]

export default function AboutPage() {
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
            <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
            AZSAFE MMC
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">{t.about.title}</h1>
          <p className="text-gray-300 text-xl max-w-2xl mx-auto">{t.about.subtitle}</p>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="py-12 bg-navy-800/50 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {t.about.stats.map((s, i) => {
              const Icon = statIcons[i]
              return (
                <div key={i} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-brand-orange/10 rounded-xl mb-3">
                    <Icon size={22} className="text-brand-orange" />
                  </div>
                  <div className="text-3xl font-black text-gradient mb-1">{s.value}</div>
                  <div className="text-sm text-gray-400">{s.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── STORY ─── */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image placeholder */}
            <div className="relative">
              <div className="h-96 img-placeholder rounded-2xl flex-col gap-3">
                {/* TODO: Replace with company headquarters / team photo */}
                <Drill size={48} className="text-brand-orange/40" />
                <span className="text-brand-orange/40 text-sm px-8 text-center">
                  {lang === 'az' ? 'Şirkət / Komanda şəkli' : 'Company / Team photo'}
                </span>
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-brand-orange/10 border border-brand-orange/20 rounded-xl" />
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-brand-orange/5 border border-brand-orange/10 rounded-xl" />
            </div>

            <div>
              <h2 className="text-3xl font-black text-white mb-6">{t.about.story.title}</h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>{t.about.story.p1}</p>
                <p>{t.about.story.p2}</p>
              </div>

              {/* Mission box */}
              <div className="mt-8 p-6 bg-brand-orange/5 border border-brand-orange/20 rounded-xl">
                <div className="flex items-start gap-3">
                  <Target size={20} className="text-brand-orange mt-0.5 shrink-0" />
                  <div>
                    <div className="text-white font-bold mb-2">{t.about.mission.title}</div>
                    <p className="text-gray-300 text-sm leading-relaxed">{t.about.mission.desc}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── DIVISIONS ─── */}
      <section className="section-padding bg-navy-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-black text-white mb-3">{t.about.divisions.title}</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* AZSAFE */}
            <div className="bg-navy-800 border border-white/5 rounded-2xl overflow-hidden">
              <div className="h-48 img-placeholder flex-col gap-2">
                {/* TODO: Replace with drilling equipment operation photo */}
                <Drill size={36} className="text-brand-orange/40" />
                <span className="text-[11px] text-brand-orange/40">
                  {lang === 'az' ? 'Qazma avadanlığı şəkli' : 'Drilling equipment photo'}
                </span>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-brand-orange/10 border border-brand-orange/20 rounded-lg flex items-center justify-center">
                    <Drill size={18} className="text-brand-orange" />
                  </div>
                  <h3 className="text-xl font-black text-white">{t.about.divisions.azsafe.title}</h3>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">{t.about.divisions.azsafe.desc}</p>
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {t.about.divisions.azsafe.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-gray-300">
                      <CheckCircle size={14} className="text-brand-orange shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>
                <Link href="/products" className="inline-flex items-center gap-2 text-brand-orange text-sm font-semibold hover:gap-3 transition-all">
                  {t.common.learnMore} <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Vera Crane */}
            <div className="bg-navy-800 border border-white/5 rounded-2xl overflow-hidden">
              <div className="h-48 img-placeholder flex-col gap-2">
                {/* TODO: Replace with crane operation photo */}
                <Truck size={36} className="text-brand-orange/40" />
                <span className="text-[11px] text-brand-orange/40">
                  {lang === 'az' ? 'Kran şəkli' : 'Crane photo'}
                </span>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-brand-orange/10 border border-brand-orange/20 rounded-lg flex items-center justify-center">
                    <Truck size={18} className="text-brand-orange" />
                  </div>
                  <h3 className="text-xl font-black text-white">{t.about.divisions.vera.title}</h3>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">{t.about.divisions.vera.desc}</p>
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {t.about.divisions.vera.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-gray-300">
                      <CheckCircle size={14} className="text-brand-orange shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>
                <Link href="/vera-crane" className="inline-flex items-center gap-2 text-brand-orange text-sm font-semibold hover:gap-3 transition-all">
                  {t.common.learnMore} <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── VALUES ─── */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-black text-white mb-3">{t.about.values.title}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.about.values.items.map((v, i) => {
              const Icon = valueIcons[i]
              return (
                <div key={i} className="text-center p-8 bg-navy-800 border border-white/5 rounded-xl hover:border-brand-orange/20 transition-all">
                  <div className="w-14 h-14 bg-brand-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon size={24} className="text-brand-orange" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{v.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{v.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-navy-800 border border-brand-orange/20 rounded-2xl p-12">
            <h2 className="text-3xl font-black text-white mb-4">
              {lang === 'az' ? 'Bizimlə əlaqə saxlayın' : 'Get in Touch'}
            </h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              {lang === 'az'
                ? 'Layihəniz üçün ən yaxşı həli birlikdə tapaq.'
                : 'Let\'s find the best solution for your project together.'}
            </p>
            <Link href="/contact" className="btn-primary text-base mx-auto">
              {t.common.contactUs}
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
