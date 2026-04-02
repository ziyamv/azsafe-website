'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import {
  Truck, CheckCircle, Calendar, Clock, User, ArrowRight,
  Shield, Star, FileText, Package
} from 'lucide-react'

const serviceIconMap: Record<string, React.ElementType> = {
  calendar: Calendar,
  clock: Clock,
  user: User,
  truck: Truck,
  file: FileText,
}

type CraneKey = 'mobile' | 'crawler' | 'roughTerrain'

export default function VeraCranePage() {
  const { t, lang } = useLanguage()
  const [formData, setFormData] = useState({
    name: '', company: '', phone: '', email: '',
    craneType: '', duration: '', location: '', description: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, boolean>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, boolean> = {}
    const required = ['name', 'phone', 'craneType', 'duration']
    required.forEach((f) => { if (!formData[f as keyof typeof formData]) newErrors[f] = true })
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return }
    setSubmitted(true)
  }

  const craneKeys: CraneKey[] = ['mobile', 'crawler', 'roughTerrain']

  return (
    <div className="min-h-screen pt-20">
      {/* ─── HERO ─── */}
      <section className="relative py-24 bg-hero-gradient overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: `linear-gradient(rgba(240,124,26,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(240,124,26,0.5) 1px, transparent 1px)`, backgroundSize: '60px 60px' }}
        />
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl" />

        {/* Hero image placeholder */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full img-placeholder">
            {/* TODO: Replace with hero crane/fleet image */}
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-brand-orange/10 border border-brand-orange/30 text-brand-orange text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
            <Truck size={12} />
            by AZSAFE
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4">{t.veraCrane.title}</h1>
          <p className="text-brand-orange text-xl font-semibold mb-4">{t.veraCrane.subtitle}</p>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">{t.veraCrane.desc}</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <a href="#quote" className="btn-primary text-base">
              {t.common.getQuote}
              <ArrowRight size={18} />
            </a>
            <a href="#fleet" className="btn-outline text-base">
              {lang === 'az' ? 'Flotu Kəşf Et' : 'Explore Fleet'}
            </a>
          </div>
        </div>
      </section>

      {/* ─── WHY VERA ─── */}
      <section className="py-14 bg-navy-800/40 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {t.veraCrane.whyVera.items.map((item, i) => {
              const icons = [Star, User, Clock, Shield]
              const Icon = icons[i]
              return (
                <div key={i} className="text-center">
                  <div className="w-12 h-12 bg-brand-orange/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Icon size={22} className="text-brand-orange" />
                  </div>
                  <div className="text-white font-bold text-sm mb-1">{item.title}</div>
                  <div className="text-gray-400 text-xs leading-relaxed">{item.desc}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── FLEET ─── */}
      <section id="fleet" className="section-padding scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">{t.veraCrane.fleet.title}</h2>
            <p className="text-gray-400">{t.veraCrane.fleet.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {craneKeys.map((key) => {
              const crane = t.veraCrane.fleet[key]
              return (
                <div key={key} className="group bg-navy-800 border border-white/5 hover:border-brand-orange/30 rounded-2xl overflow-hidden card-hover transition-all duration-300">
                  {/* Image placeholder */}
                  <div className="h-52 img-placeholder flex-col gap-2 relative">
                    {/* TODO: Replace with actual crane type photo */}
                    <Truck size={36} className="text-brand-orange/40" />
                    <span className="text-[11px] text-brand-orange/40 px-4 text-center">
                      {crane.title} {t.veraCrane.fleet.imageNote}
                    </span>
                  </div>

                  {/* Orange top line */}
                  <div className="h-1 bg-gradient-to-r from-brand-orange to-transparent" />

                  <div className="p-7">
                    <h3 className="text-xl font-black text-white mb-2 group-hover:text-brand-orange transition-colors">
                      {crane.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-5">{crane.desc}</p>

                    <div className="space-y-2">
                      {crane.specs.map((spec, i) => (
                        <div key={i} className="flex items-center gap-3 text-sm text-gray-300">
                          <div className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0" />
                          {spec}
                        </div>
                      ))}
                    </div>

                    <a
                      href="#quote"
                      className="mt-6 inline-flex items-center gap-2 text-brand-orange text-sm font-semibold hover:gap-3 transition-all"
                    >
                      {t.common.getQuote} <ArrowRight size={14} />
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section className="section-padding bg-navy-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-black text-white mb-3">{t.veraCrane.services.title}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.veraCrane.services.items.map((item, i) => {
              const Icon = serviceIconMap[item.icon] || Package
              return (
                <div key={i} className="bg-navy-800 border border-white/5 hover:border-brand-orange/20 rounded-xl p-7 transition-all duration-300">
                  <div className="w-12 h-12 bg-brand-orange/10 border border-brand-orange/20 rounded-xl flex items-center justify-center mb-4">
                    <Icon size={22} className="text-brand-orange" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── QUOTE FORM ─── */}
      <section id="quote" className="section-padding scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">{t.veraCrane.quote.title}</h2>
            <p className="text-gray-400 text-lg">{t.veraCrane.quote.subtitle}</p>
          </div>

          <div className="bg-navy-800 border border-white/5 rounded-2xl p-8 sm:p-12">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={36} className="text-green-400" />
                </div>
                <h3 className="text-2xl font-black text-white mb-3">
                  {lang === 'az' ? 'Təşəkkürlər!' : 'Thank you!'}
                </h3>
                <p className="text-gray-300 mb-8">{t.veraCrane.quote.form.success}</p>
                <button
                  onClick={() => { setSubmitted(false); setFormData({ name: '', company: '', phone: '', email: '', craneType: '', duration: '', location: '', description: '' }) }}
                  className="btn-outline"
                >
                  {lang === 'az' ? 'Yeni Sorğu' : 'New Request'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {t.veraCrane.quote.form.name} <span className="text-brand-orange">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full bg-navy-900 border rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange transition-colors ${errors.name ? 'border-red-500' : 'border-white/10'}`}
                      placeholder={t.veraCrane.quote.form.name}
                    />
                    {errors.name && <p className="text-red-400 text-xs mt-1">{t.veraCrane.quote.form.required}</p>}
                  </div>

                  {/* Company */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {t.veraCrane.quote.form.company}
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full bg-navy-900 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange transition-colors"
                      placeholder={t.veraCrane.quote.form.company}
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {t.veraCrane.quote.form.phone} <span className="text-brand-orange">*</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={`w-full bg-navy-900 border rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange transition-colors ${errors.phone ? 'border-red-500' : 'border-white/10'}`}
                      placeholder="+994 xx xxx xx xx"
                    />
                    {errors.phone && <p className="text-red-400 text-xs mt-1">{t.veraCrane.quote.form.required}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {t.veraCrane.quote.form.email}
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-navy-900 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange transition-colors"
                      placeholder="email@company.com"
                    />
                  </div>

                  {/* Crane Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {t.veraCrane.quote.form.craneType} <span className="text-brand-orange">*</span>
                    </label>
                    <select
                      value={formData.craneType}
                      onChange={(e) => setFormData({ ...formData, craneType: e.target.value })}
                      className={`w-full bg-navy-900 border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-orange transition-colors ${errors.craneType ? 'border-red-500' : 'border-white/10'}`}
                    >
                      <option value="" className="text-gray-500">{lang === 'az' ? 'Seçin' : 'Select'}</option>
                      {t.veraCrane.quote.form.craneTypes.map((ct) => (
                        <option key={ct} value={ct} className="bg-navy-900">{ct}</option>
                      ))}
                    </select>
                    {errors.craneType && <p className="text-red-400 text-xs mt-1">{t.veraCrane.quote.form.required}</p>}
                  </div>

                  {/* Duration */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {t.veraCrane.quote.form.duration} <span className="text-brand-orange">*</span>
                    </label>
                    <select
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      className={`w-full bg-navy-900 border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-orange transition-colors ${errors.duration ? 'border-red-500' : 'border-white/10'}`}
                    >
                      <option value="" className="text-gray-500">{lang === 'az' ? 'Seçin' : 'Select'}</option>
                      {t.veraCrane.quote.form.durations.map((d) => (
                        <option key={d} value={d} className="bg-navy-900">{d}</option>
                      ))}
                    </select>
                    {errors.duration && <p className="text-red-400 text-xs mt-1">{t.veraCrane.quote.form.required}</p>}
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {t.veraCrane.quote.form.location}
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full bg-navy-900 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange transition-colors"
                    placeholder={lang === 'az' ? 'Baku, Sumqayıt, ...' : 'Baku, Sumgayit, ...'}
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {t.veraCrane.quote.form.description}
                  </label>
                  <textarea
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-navy-900 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange transition-colors resize-none"
                    placeholder={lang === 'az' ? 'Layihəniz haqqında ətraflı məlumat...' : 'Details about your project...'}
                  />
                </div>

                <button type="submit" className="btn-primary w-full justify-center text-base py-4">
                  {t.veraCrane.quote.form.submit}
                  <ArrowRight size={18} />
                </button>

                <p className="text-center text-xs text-gray-500">
                  {lang === 'az'
                    ? 'Sorğunuzu aldıqdan sonra 1 iş günü ərzində sizinlə əlaqə saxlayacağıq.'
                    : 'We will contact you within 1 business day after receiving your request.'}
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
