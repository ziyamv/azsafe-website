'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { Phone, Mail, MapPin, Clock, CheckCircle, ArrowRight, MessageCircle } from 'lucide-react'

export default function ContactPage() {
  const { t, lang } = useLanguage()
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', subject: '', message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, boolean>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, boolean> = {}
    const required = ['name', 'email', 'message']
    required.forEach((f) => { if (!formData[f as keyof typeof formData]) newErrors[f] = true })
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return }
    setSubmitted(true)
  }

  const contactItems = [
    {
      icon: MapPin,
      label: t.contact.info.address,
      value: t.contact.info.addressValue,
      href: 'https://maps.google.com/?q=H.Aliyev+1/8,Khirdalan,Azerbaijan',
    },
    {
      icon: Phone,
      label: t.contact.info.phone,
      value: t.contact.info.phoneValue,
      href: 'tel:+994123493920',
    },
    {
      icon: Phone,
      label: t.contact.info.mobile,
      value: t.contact.info.mobileValue,
      href: 'tel:+994502709196',
    },
    {
      icon: Mail,
      label: t.contact.info.email,
      value: t.contact.info.emailValue,
      href: 'mailto:office@safe-az.com',
    },
    {
      icon: Clock,
      label: t.contact.info.workHours,
      value: t.contact.info.workHoursValue,
      href: null,
    },
  ]

  return (
    <div className="min-h-screen pt-20">
      {/* ─── HERO ─── */}
      <section className="relative py-24 bg-hero-gradient overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: `linear-gradient(rgba(240,124,26,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(240,124,26,0.5) 1px, transparent 1px)`, backgroundSize: '60px 60px' }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-brand-orange/10 border border-brand-orange/30 text-brand-orange text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
            <Mail size={12} />
            AZSAFE MMC
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">{t.contact.title}</h1>
          <p className="text-gray-300 text-xl">{t.contact.subtitle}</p>
        </div>
      </section>

      {/* ─── MAIN CONTENT ─── */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact Info — left */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-black text-white mb-6">{t.contact.info.title}</h2>
                <div className="space-y-5">
                  {contactItems.map((item, i) => {
                    const Icon = item.icon
                    const content = (
                      <div key={i} className="flex items-start gap-4 p-5 bg-navy-800 border border-white/5 rounded-xl hover:border-brand-orange/20 transition-colors">
                        <div className="w-10 h-10 bg-brand-orange/10 border border-brand-orange/20 rounded-lg flex items-center justify-center shrink-0">
                          <Icon size={18} className="text-brand-orange" />
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">{item.label}</div>
                          <div className="text-gray-200 font-medium leading-relaxed">{item.value}</div>
                        </div>
                      </div>
                    )
                    return item.href ? (
                      <a key={i} href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="block">
                        {content}
                      </a>
                    ) : <div key={i}>{content}</div>
                  })}
                </div>
              </div>

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/994502709196"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 bg-green-600/10 border border-green-600/30 rounded-xl hover:bg-green-600/20 transition-colors"
              >
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center shrink-0">
                  <MessageCircle size={22} className="text-white" />
                </div>
                <div>
                  <div className="text-white font-bold mb-0.5">WhatsApp</div>
                  <div className="text-green-400 text-sm">+994 50 270 9196</div>
                </div>
                <ArrowRight size={18} className="text-green-400 ml-auto" />
              </a>
            </div>

            {/* Form — right */}
            <div className="lg:col-span-3">
              <div className="bg-navy-800 border border-white/5 rounded-2xl p-8 sm:p-10">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle size={36} className="text-green-400" />
                    </div>
                    <h3 className="text-2xl font-black text-white mb-3">
                      {lang === 'az' ? 'Təşəkkürlər!' : 'Thank you!'}
                    </h3>
                    <p className="text-gray-300 mb-8">{t.contact.form.success}</p>
                    <button
                      onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', phone: '', subject: '', message: '' }) }}
                      className="btn-outline"
                    >
                      {lang === 'az' ? 'Yeni Mesaj' : 'New Message'}
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-black text-white mb-8">{t.contact.form.title}</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            {t.contact.form.name} <span className="text-brand-orange">*</span>
                          </label>
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className={`w-full bg-navy-900 border rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange transition-colors ${errors.name ? 'border-red-500' : 'border-white/10'}`}
                            placeholder={t.contact.form.name}
                          />
                          {errors.name && <p className="text-red-400 text-xs mt-1">{t.contact.form.required}</p>}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            {t.contact.form.phone}
                          </label>
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full bg-navy-900 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange transition-colors"
                            placeholder="+994 xx xxx xx xx"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          {t.contact.form.email} <span className="text-brand-orange">*</span>
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className={`w-full bg-navy-900 border rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange transition-colors ${errors.email ? 'border-red-500' : 'border-white/10'}`}
                          placeholder="email@example.com"
                        />
                        {errors.email && <p className="text-red-400 text-xs mt-1">{t.contact.form.required}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          {t.contact.form.subject}
                        </label>
                        <input
                          type="text"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="w-full bg-navy-900 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange transition-colors"
                          placeholder={t.contact.form.subject}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          {t.contact.form.message} <span className="text-brand-orange">*</span>
                        </label>
                        <textarea
                          rows={5}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className={`w-full bg-navy-900 border rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange transition-colors resize-none ${errors.message ? 'border-red-500' : 'border-white/10'}`}
                          placeholder={lang === 'az' ? 'Mesajınızı buraya yazın...' : 'Write your message here...'}
                        />
                        {errors.message && <p className="text-red-400 text-xs mt-1">{t.contact.form.required}</p>}
                      </div>

                      <button type="submit" className="btn-primary w-full justify-center text-base py-4">
                        {t.contact.form.submit}
                        <ArrowRight size={18} />
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MAP ─── */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-white mb-6">{t.contact.map.title}</h2>
          <div className="rounded-2xl overflow-hidden border border-white/10 h-96">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3037.7!2d49.7508!3d40.4456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d9c5765b635%3A0x0!2sH.Aliyev+1%2F8%2C+Khirdalan%2C+Azerbaijan!5e0!3m2!1sen!2saz!4v1700000000000!5m2!1sen!2saz"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={lang === 'az' ? 'AZSAFE MMC Ünvanı' : 'AZSAFE MMC Location'}
            />
          </div>
          <div className="mt-4 text-center">
            <a
              href="https://maps.google.com/?q=H.Aliyev+1/8,Khirdalan,Azerbaijan"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-brand-orange text-sm font-semibold hover:underline"
            >
              <MapPin size={14} />
              {lang === 'az' ? 'Google Maps-da Aç' : 'Open in Google Maps'}
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
