'use client'

import { useState, useEffect, useRef } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import {
  ArrowRight, CheckCircle, Phone, Mail, MapPin, Clock,
  Wrench, Package, Headphones, ChevronRight
} from 'lucide-react'

/* ─── Image paths ──────────────────────────────────────────────
   Drop your photos into: azsafe-website/public/images/

   hero-bg.jpg        → BAUER BG50 drilling rig on waterfront (dramatic sky)
   workshop.jpg       → Workshop interior with yellow equipment & workers
   drilling-baku.jpg  → BAUER rig with Baku glass tower in background
   logo.png           → AZSAFE logo (already used in Navbar)
──────────────────────────────────────────────────────────────── */

const IMG = {
  hero:     '/images/hero-bg.jpg',
  workshop: '/images/workshop.jpg',
  baku:     '/images/drilling-baku.jpg',
}

function PhotoOrPlaceholder({
  src, alt, className, label,
}: { src: string; alt: string; className?: string; label?: string }) {
  return (
    <div className={`relative overflow-hidden ${className ?? ''}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        onError={(e) => {
          const t = e.currentTarget
          t.style.display = 'none'
          const ph = t.nextElementSibling as HTMLElement | null
          if (ph) ph.style.display = 'flex'
        }}
      />
      {/* Fallback placeholder shown only if image fails to load */}
      <div className="img-ph w-full h-full absolute inset-0" style={{ display: 'none' }}>
        <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="#1557BF" strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2"/>
          <circle cx="8.5" cy="8.5" r="1.5"/>
          <path d="M21 15l-5-5L5 21"/>
        </svg>
        <span className="text-blue-brand text-xs font-semibold">{label ?? alt}</span>
      </div>
    </div>
  )
}

export default function HomePage() {
  const { lang } = useLanguage()

  const az = lang === 'az'

  /* ─── hero slider state ─── */
  const heroSlides = [
    {
      img: '/images/hero-bg.jpg',
      titleAz: <><span>Svay texnikasında</span><span className="block mt-4 text-blue-light">Etibarlı Həllər</span></>,
      titleEn: <><span>Reliable Solutions</span><span className="block mt-4 text-blue-light">in Heavy Equipment</span></>,
      subAz: 'Qazma avadanlıqları satışı, satış sonrası xidmət, peşəkar kran və svay icarəsi — AZSAFE MMC.',
      subEn: 'Drilling equipment sales, after-sales service, professional crane and pile rental — AZSAFE MMC.',
    },
    {
      img: '/images/slide-icare.jpg',
      titleAz: <span>Kranların İcarəsi</span>,
      titleEn: <span>Crane Rental Services</span>,
      subAz: 'Müasir kran flotu ilə hər növ yükqaldırma tapşırığı üçün qısamüddətli və uzunmüddətli icarə.',
      subEn: 'Short and long-term crane rental for all lifting tasks with our modern fleet.',
    },
    {
      img: '/images/slide-svay.jpg',
      titleAz: <span>Svay və bərkitmə avadanlığı texnikası və servisi</span>,
      titleEn: <span>Pile & Foundation Equipment Supply and Service</span>,
      subAz: 'BAUER, COMACCHIO və digər dünya brendlərinin svay və zəmin möhkəmləndirmə avadanlıqları.',
      subEn: 'BAUER, COMACCHIO and other world-class pile driving and ground consolidation equipment.',
    },
    {
      img: '/images/slide-service.jpg',
      titleAz: <span>Satış sonrası servis və avadanlıqlara xidmət</span>,
      titleEn: <span>After-Sales Service & Equipment Maintenance</span>,
      subAz: 'Sertifikatlı texniki komandamız avadanlıqlarınızın fasiləsiz işləməsini təmin edir.',
      subEn: 'Our certified technical team ensures your equipment runs without interruption.',
    },
  ]
  const [slideIndex, setSlideIndex] = useState(0)
  const [galleryIndex, setGalleryIndex] = useState(0)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  const galleryMedia: { src: string; type: 'image' | 'video'; caption: string }[] = [
    { src: '/images/gallery-1.jpg',        type: 'image', caption: az ? 'Layihə fotoları' : 'Project photos' },
    { src: '/images/gallery-2.jpg',        type: 'image', caption: az ? 'Layihə fotoları' : 'Project photos' },
    { src: '/images/gallery-3.jpg',        type: 'image', caption: az ? 'Layihə fotoları' : 'Project photos' },
    { src: '/images/gallery-4.jpg',        type: 'image', caption: az ? 'Layihə fotoları' : 'Project photos' },
    { src: '/images/gallery-5.jpg',        type: 'image', caption: az ? 'Layihə fotoları' : 'Project photos' },
    { src: '/images/gallery-6.jpg',        type: 'image', caption: az ? 'Layihə fotoları' : 'Project photos' },
    { src: '/images/gallery-7.jpg',        type: 'image', caption: az ? 'Layihə fotoları' : 'Project photos' },
    { src: '/images/gallery-8.jpg',        type: 'image', caption: az ? 'Layihə fotoları' : 'Project photos' },
    { src: '/images/gallery-9.jpg',        type: 'image', caption: az ? 'Layihə fotoları' : 'Project photos' },
    { src: '/images/gallery-10.jpg',       type: 'image', caption: az ? 'Layihə fotoları' : 'Project photos' },
    { src: '/images/gallery-11.jpg',       type: 'image', caption: az ? 'Layihə fotoları' : 'Project photos' },
    { src: '/images/drilling-baku.jpg',    type: 'image', caption: az ? 'Qazma işləri — Bakı' : 'Drilling works — Baku' },
    { src: '/images/slide-icare.jpg',      type: 'image', caption: az ? 'Kran icarəsi' : 'Crane rental' },
    { src: '/images/slide-svay.jpg',       type: 'image', caption: az ? 'Svay işləri' : 'Piling works' },
    { src: '/videos/gallery-vid-1.mp4',    type: 'video', caption: az ? 'Layihə videosu' : 'Project video' },
    { src: '/videos/gallery-vid-2.mp4',    type: 'video', caption: az ? 'Layihə videosu' : 'Project video' },
    { src: '/videos/gallery-vid-3.mp4',    type: 'video', caption: az ? 'Layihə videosu' : 'Project video' },
    { src: '/videos/gallery-vid-4.mp4',    type: 'video', caption: az ? 'Layihə videosu' : 'Project video' },
  ]
  useEffect(() => {
    const t = setInterval(() => setSlideIndex((i) => (i + 1) % heroSlides.length), 5000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    videoRefs.current.forEach((vid, i) => {
      if (!vid) return
      if (i === galleryIndex) {
        vid.play().catch(() => {})
      } else {
        vid.pause()
        vid.currentTime = 0
      }
    })
  }, [galleryIndex])

  /* ─── contact form state ─── */
  const [form, setForm] = useState({ name: '', company: '', phone: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [errs, setErrs] = useState<Record<string, boolean>>({})

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrs: Record<string, boolean> = {}
    if (!form.name)    newErrs.name = true
    if (!form.phone)   newErrs.phone = true
    if (!form.message) newErrs.message = true
    if (Object.keys(newErrs).length) { setErrs(newErrs); return }
    setSent(true)
  }

  /* ─── brand data ─── */
  const brands = [
    {
      name: 'BAUER',
      origin: az ? 'Almaniya' : 'Germany',
      desc: az
        ? 'Dünyanın aparıcı xüsusi təməl mühəndisliyi avadanlıqları istehsalçısı. Rotari qazma dəzgahları, kazık qovucu sistemlər.'
        : "World's leading manufacturer of specialist foundation engineering equipment. Rotary drilling rigs, pile driving systems.",
      items: az
        ? ['Rotari qazma dəzgahları', 'Kazık sürücü avadanlığı', 'Beton hərəkət avadanlığı', 'Zəmin möhkəmləndirmə']
        : ['Rotary drilling rigs', 'Pile driving equipment', 'Concrete movement machinery', 'Ground consolidation'],
      /* Brand logo banner — bg color + text color matching corporate identity */
      website: 'https://www.bauer.de',
      logo: '/images/bauer.png',
      img: IMG.baku,
    },
    {
      name: 'BETEK',
      origin: az ? 'Almaniya' : 'Germany',
      desc: az
        ? 'Yüksək keyfiyyətli qazma aləti və karbid məhsulları. PDC qazma tacları, qazma borular, karbid uçlar.'
        : 'High-quality drilling tools and carbide products. PDC drill bits, drill pipes, carbide tips.',
      items: az
        ? ['PDC qazma tacları', 'Karbid uçlar', 'Qazma borular', 'Xüsusi qazma alətləri']
        : ['PDC drill bits', 'Carbide tips', 'Drill pipes', 'Special drilling tools'],
      website: 'https://www.betek.de',
      logo: '/images/BETEK.png',
      img: '',
    },
    {
      name: 'COMACCHIO',
      origin: az ? 'İtaliya' : 'Italy',
      desc: az
        ? 'Hidrolik qazma qurğuları istehsalında ixtisaslaşan italyan şirkəti. Geotexniki tədqiqat, su quyusu, fondament qazma.'
        : 'Italian specialist in hydraulic drilling rigs. Geotechnical investigation, water wells, foundation drilling.',
      items: az
        ? ['Geotexniki qazma', 'Su quyusu qazma', 'Fondament qazma', 'Çətin ərazilər üçün']
        : ['Geotechnical drilling', 'Water well drilling', 'Foundation drilling', 'Difficult terrain'],
      website: 'https://www.comacchio.com',
      logo: '/images/commacchio.png',
      img: '',
    },
    {
      name: 'TECHNIWELL',
      origin: az ? 'İtaliya' : 'Italy',
      desc: az
        ? '30 ildən çox təcrübəyə malik italyan istehsalçısı. Jet-qazıma, ineksiya, qarışdırma və nasos sistemlərinin istehsalında dünya lideri.'
        : 'Italian manufacturer with over 30 years of experience. World leader in jet-grouting, injection, mixing, and pumping systems.',
      items: az
        ? ['Jet-qazıma avadanlığı', 'Qrauting nasos sistemləri', 'İneksiya və qarışdırma', 'Zəmin möhkəmləndirmə texnikası']
        : ['Jet-grouting equipment', 'Grouting pump systems', 'Injection & mixing', 'Soil consolidation machinery'],
      website: 'https://www.tecniwell.it/en/',
      logo: '/images/techniwell-logo.webp',
      img: '',
    },
  ]

  /* ─── crane data ─── */
  const cranes = [
    {
      title: az ? 'Mobil Kranlar'           : 'Mobile Cranes',
      img: '/images/mobil-kran.jpg',
      capacity: '25t – 500t',
      desc: az
        ? 'Müxtəlif yük tutumu olan avtomobil kranları. Sürətli qurulum, şəhər daxilində yüksək manevrelik.'
        : 'Truck-mounted cranes with various capacities. Fast setup, high maneuverability in urban environments.',
      feats: az
        ? ['Sürətli yerləşdirmə', 'Şəhər daxilində uyğun', 'Geniş bom diapazonu', 'Yüksək manevrelik']
        : ['Fast deployment', 'Suitable for urban use', 'Wide boom range', 'High maneuverability'],
    },
    {
      title: az ? 'Dağlıq Ərazi Kranları'   : 'Rough Terrain Cranes',
      img: '/images/dagliq-kran.jpg',
      capacity: '50t – 200t',
      desc: az
        ? 'Çətin relyef şəraitində işləmək üçün xüsusi hazırlanmış. Pis yollarda, dağlıq ərazilərdə effektiv.'
        : 'Specially designed for difficult terrain and off-road conditions. Effective in mountainous areas.',
      feats: az
        ? ['Dağlıq ərazilər', 'Pis yol şəraiti', 'Kompakt ölçü', 'Çevik hərəkət']
        : ['Mountainous areas', 'Poor road conditions', 'Compact size', 'Agile movement'],
    },
  ]

  /* ─── after-sales services ─── */
  const services = [
    {
      icon: Wrench,
      title: az ? 'Texniki Baxım'     : 'Technical Maintenance',
      desc:  az ? 'Planlaşdırılmış profilaktik baxım proqramları ilə avadanlıqlarınızın daim işlək vəziyyətdə saxlanması.' : 'Scheduled preventive maintenance programs to keep your equipment always operational.',
    },
    {
      icon: Package,
      title: az ? 'Ehtiyat Hissələri' : 'Spare Parts',
      desc:  az ? 'Bütün distribütor brendlər üçün orijinal ehtiyat hissələrinin sürətli tədarükü.' : 'Fast supply of genuine spare parts for all distributor brands.',
    },
    {
      icon: Headphones,
      title: az ? '7/24 Texniki Dəstək' : '24/7 Technical Support',
      desc:  az ? 'Sertifikatlı mütəxəssislərimiz hər zaman telefon, uzaqdan diaqnostika və yerindəcə xidmət üçün hazırdır.' : 'Certified specialists always ready for phone support, remote diagnostics, and on-site service.',
    },
  ]

  /* ─── crane rental services row ─── */
  const craneServices = az
    ? ['Qısamüddətli İcarə', 'Uzunmüddətli İcarə', 'Operator Daxil', 'Kran Daşınması', 'Layihə Müqaviləsi']
    : ['Short-term Rental', 'Long-term Rental', 'Operator Included', 'Crane Transport', 'Project Contract']

  return (
    <>
      {/* ════════════════════════════════════════════════════════
          1. HERO
      ════════════════════════════════════════════════════════ */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
        {/* Slider images */}
        {heroSlides.map((slide, i) => (
          <img
            key={slide.img}
            src={slide.img}
            alt=""
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
            style={{ opacity: i === slideIndex ? 1 : 0 }}
          />
        ))}

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900/90 via-navy-900/70 to-navy-900/30" />

        <div className="container-xl relative z-10 pt-24 pb-16">
          <div className="max-w-[640px]">
            {/* Eyebrow */}
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <span className="w-8 h-0.5 bg-blue-brand" />
              <span className="text-blue-light font-semibold text-xs sm:text-sm tracking-wider uppercase">
                {az ? 'Azərbaycanda Etibarlı Tərəfdaş' : 'Trusted Partner in Azerbaijan'}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[3.25rem] font-black text-white leading-tight mb-4 sm:mb-6">
              {az ? heroSlides[slideIndex].titleAz : heroSlides[slideIndex].titleEn}
            </h1>

            <p className="text-base sm:text-lg text-white/80 leading-relaxed mb-8 sm:mb-10">
              {az ? heroSlides[slideIndex].subAz : heroSlides[slideIndex].subEn}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a href="#azsafe" className="btn-primary text-sm sm:text-base justify-center">
                {az ? 'Avadanlıqları Kəşf Et' : 'Explore Equipment'}
                <ArrowRight size={18} />
              </a>
              <a href="#azsafe-kran" className="btn-outline-white text-sm sm:text-base justify-center">
                {az ? 'Kran İcarəsi' : 'Crane Rental'}
              </a>
            </div>

            {/* Slide dots */}
            <div className="flex gap-2 mt-8">
              {heroSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSlideIndex(i)}
                  className={`h-1.5 rounded-full transition-all ${i === slideIndex ? 'w-8 bg-white' : 'w-2 bg-white/40'}`}
                />
              ))}
            </div>
          </div>
        </div>

      </section>

      {/* ── Stats strip — dark navy, seamlessly continues the hero ── */}
      <section className="bg-white border-b border-slate-100">
        <div className="container-xl py-32">
          <div className="grid grid-cols-3 divide-x divide-slate-200">
            {[
              { v: '2007', l: az ? 'dən bəri'        : 'Since 2007'          },
              { v: '5',    l: az ? 'Dünya Brendi'    : 'World Brands'        },
              { v: '24/7', l: az ? 'Texniki Dəstək'  : 'Technical Support'   },
            ].map((s) => (
              <div key={s.v} className="text-center px-6">
                <div className="text-3xl sm:text-4xl font-black text-navy-900 mb-1">{s.v}</div>
                <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          2. ABOUT US
      ════════════════════════════════════════════════════════ */}
      <section id="about" className="section-pad bg-white">
        <div className="container-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text */}
            <div>
              <p className="section-label">{az ? 'Haqqımızda' : 'About Us'}</p>
              <h2 className="text-4xl font-black text-navy-900 mb-6 leading-tight">
                {az ? 'Azərbaycanda Ağır Texnika Sahəsinin Etibarlı Adı' : 'The Trusted Name in Heavy Equipment in Azerbaijan'}
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed text-base">
                <p>
                  {az
                    ? 'AZSAFE MMC Azərbaycanın aparıcı ağır texnika şirkətlərindən biridir. Xırdalan şəhərindəki mərkəzimizlə iki əsas istiqamətdə fəaliyyət göstəririk: AZSAFE brendi altında qazma və təməl avadanlıqları, AZSAFE Kran brendi altında isə kran icarəsi xidmətləri.'
                    : 'AZSAFE MMC is one of Azerbaijan\'s leading heavy equipment companies. Based in Khirdalan, we operate in two directions: under the AZSAFE brand in drilling and foundation equipment, and under AZSAFE Kran in crane rental services.'}
                </p>
                <p>
                  {az
                    ? 'Müştərilərimizə ən yüksək keyfiyyətdə avadanlıq və xidmət təqdim etmək əsas məqsədimizdir. BAUER, BETEK, COMACCHIO və TECHNIWELL kimi dünya brendlərinin Azərbaycandakı distribütoru kimi, satış və satış sonrası xidmətlər sahəsində tam həll yolları təklif edirik.'
                    : 'Our primary goal is to provide customers with the highest quality equipment and service. As distributor of BAUER, BETEK, COMACCHIO and TECHNIWELL in Azerbaijan, we offer complete solutions in sales and after-sales services.'}
                </p>
              </div>

              {/* Key points */}
              <div className="mt-8 space-y-3">
                {(az
                  ? ['Dünya brendlərinin Azərbaycandakı distribütoru', '2007-dən bəri sənaye təcrübəsi', 'Satış sonrası tam xidmət dəstəyi', 'Kran icarəsi — AZSAFE Kran']
                  : ['Authorized distributor of world brands in Azerbaijan', 'Industry experience since 2007', 'Complete after-sales service support', 'Crane rental — AZSAFE Kran']
                ).map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-blue-brand mt-0.5 shrink-0" />
                    <span className="text-slate-700 font-medium text-sm">{item}</span>
                  </div>
                ))}
              </div>

              <a href="#azsafe" className="btn-primary mt-8 inline-flex">
                {az ? 'Məhsullarımız' : 'Our Products'}
                <ArrowRight size={18} />
              </a>
            </div>

            {/* Photo */}
            <div className="relative">
              <PhotoOrPlaceholder
                src={IMG.workshop}
                alt={az ? 'AZSAFE emalatxanası' : 'AZSAFE workshop'}
                label={az ? 'workshop.jpg — Public/images/ qovluğuna əlavə edin' : 'workshop.jpg — Add to public/images/'}
                className="rounded-2xl h-[480px] shadow-2xl shadow-navy-900/15"
              />
              {/* Floating badge */}
              <div className="absolute -bottom-5 -left-5 bg-navy-900 text-white rounded-xl px-6 py-4 shadow-xl">
                <div className="text-2xl font-black">19+</div>
                <div className="text-xs text-white/60 font-medium mt-0.5">
                  {az ? 'İl Təcrübə' : 'Years Experience'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          3. AZSAFE EQUIPMENT SALES
      ════════════════════════════════════════════════════════ */}
      <section id="azsafe" className="section-pad bg-slate-50">
        <div className="container-xl">
          {/* Header */}
          <div className="text-center mb-14">
            <p className="section-label justify-center">{az ? 'AZSAFE Avadanlıqları' : 'AZSAFE Equipment'}</p>
            <h2 className="text-4xl font-black text-navy-900 mb-4">{az ? 'Avadanlıq Satışı' : 'Equipment Sales'}</h2>
            <p className="text-slate-500 max-w-xl mx-auto text-base">
              {az
                ? 'Dünya brendlərinin keyfiyyətli qazma və təməl avadanlıqları — Azərbaycanda distribütor satışı.'
                : 'Quality drilling and foundation equipment from world brands — authorized distributor sales in Azerbaijan.'}
            </p>
          </div>

          {/* Brand cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brands.map((brand) => (
              <div key={brand.name} className="card flex flex-col">
                {/* Brand logo banner */}
                <div className="h-40 flex items-center justify-center bg-white border-b border-slate-100 p-6">
                  <img src={brand.logo} alt={brand.name} className="max-h-20 max-w-full object-contain" />
                </div>

                <div className="p-7 flex flex-col flex-1">
                  {/* Brand header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-black text-navy-900">{brand.name}</h3>
                      <span className="text-xs text-blue-brand font-semibold">{brand.origin}</span>
                    </div>
                    <span className="bg-blue-pale text-blue-brand text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
                      {az ? 'Distribütor' : 'Distributor'}
                    </span>
                  </div>

                  <p className="text-slate-500 text-sm leading-relaxed mb-5">{brand.desc}</p>

                  <ul className="space-y-1.5 mb-6 flex-1">
                    {brand.items.map((item) => (
                      <li key={item} className="flex items-center gap-2.5 text-sm text-slate-700">
                        <ChevronRight size={14} className="text-blue-brand shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <a
                    href={brand.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center gap-2 text-blue-brand font-bold text-sm hover:gap-3 transition-all"
                  >
                    {az ? 'Rəsmi Sayt' : 'Official Website'} <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          4. AZSAFE KRAN RENTAL
      ════════════════════════════════════════════════════════ */}
      <section id="azsafe-kran" className="section-pad bg-white">
        <div className="container-xl">
          {/* Header */}
          <div className="text-center mb-10">
            <p className="section-label justify-center">AZSAFE Kran</p>
            <h2 className="text-4xl font-black text-navy-900 mb-4">
              {az ? 'İcarə Xidmətlərimiz' : 'Our Rental Services'}
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto text-base">
              {az
                ? 'Müasir kran flotu ilə hər növ yükqaldırma tapşırığı. Qısamüddətli, uzunmüddətli icarə, operator daxil xidmət.'
                : 'Every type of lifting task with our modern crane fleet. Short-term, long-term rental, operator-included service.'}
            </p>
          </div>

          {/* Services row — above cards */}
          <div className="bg-navy-900 rounded-2xl p-8 mb-10">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {craneServices.map((s) => (
                <div key={s} className="text-center p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
                  <div className="w-10 h-10 bg-blue-brand/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <CheckCircle size={18} className="text-blue-light" />
                  </div>
                  <span className="text-white text-xs font-semibold leading-tight block">{s}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Crane cards — 2 cols centered */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto mb-10">
            {cranes.map((crane) => (
              <div key={crane.title} className="card group">
                <div className="h-56 overflow-hidden rounded-t-2xl">
                  <img src={crane.img} alt={crane.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-7">
                  <div className="inline-block bg-navy-900 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
                    {crane.capacity}
                  </div>
                  <h3 className="text-lg font-black text-navy-900 mb-2">{crane.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-5">{crane.desc}</p>
                  <ul className="space-y-1.5 mb-6">
                    {crane.feats.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-slate-700">
                        <CheckCircle size={13} className="text-blue-brand shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a href="#contact" className="btn-primary w-full justify-center text-sm py-2.5">
                    {az ? 'Qiymət Al' : 'Get Quote'}
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Special Projects */}
          <div className="mt-10">
            <h3 className="text-2xl font-black text-navy-900 mb-6 text-center">
              {az ? 'Xüsusi Layihələr' : 'Special Projects'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  titleAz: 'Vibro Çəkic Xidməti',
                  titleEn: 'Vibratory Hammer Service',
                  descAz: 'Torpaq və zəmin işlərində yüksək məhsuldarlıqlı vibro çəkic avadanlığının icarəsi və texniki xidməti.',
                  descEn: 'Rental and technical service of high-productivity vibratory hammer equipment for earthwork and ground works.',
                },
                {
                  titleAz: 'Svay və Şpunt Layihələri',
                  titleEn: 'Pile & Sheet Pile Projects',
                  descAz: 'Bina təməlləri, dəniz tikililər və neft-qaz obyektləri üçün svay çırpma və şpunt layihələrinin icrası.',
                  descEn: 'Pile driving and sheet piling for building foundations, marine structures, and oil & gas facilities.',
                },
                {
                  titleAz: 'Texnika və Dəstək',
                  titleEn: 'Equipment & Support',
                  descAz: 'Layihə müddətinə uyğun olaraq operator daxil texnika icarəsi, yerindəcə texniki dəstək və hissə təchizatı.',
                  descEn: 'Operator-included equipment rental tailored to project duration, on-site technical support and parts supply.',
                },
              ].map((p) => (
                <div key={p.titleAz} className="card p-7">
                  <div className="w-10 h-10 bg-blue-pale rounded-lg flex items-center justify-center mb-4">
                    <CheckCircle size={20} className="text-blue-brand" />
                  </div>
                  <h4 className="text-lg font-black text-navy-900 mb-2">{az ? p.titleAz : p.titleEn}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed mb-5">{az ? p.descAz : p.descEn}</p>
                  <a href="#contact" className="btn-primary w-full justify-center text-sm py-2.5">
                    {az ? 'Ətraflı Məlumat' : 'Learn More'}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          5. AFTER SALES SERVICE
      ════════════════════════════════════════════════════════ */}
      <section id="after-sales" className="section-pad bg-navy-900 relative overflow-hidden">
        {/* Subtle pattern */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '28px 28px' }}
        />

        <div className="container-xl relative">
          <div className="text-center mb-14">
            <p className="section-label justify-center" style={{ color: '#60A5FA' }}>
              <span className="w-8 h-0.5 bg-blue-400 inline-block" />
              {az ? 'Satış Sonrası Xidmət' : 'After Sales Service'}
            </p>
            <h2 className="text-4xl font-black text-white mb-4">
              {az ? 'Avadanlığınızı Qoruyun' : 'Protect Your Equipment'}
            </h2>
            <p className="text-white/50 max-w-xl mx-auto text-base">
              {az
                ? 'AZSAFE servis komandası avadanlıqlarınızın daim işlək vəziyyətdə saxlanması üçün tam dəstək təmin edir.'
                : 'The AZSAFE service team provides complete support to keep your equipment always operational.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
            {services.map((s) => {
              const Icon = s.icon
              return (
                <div key={s.title} className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/8 hover:border-white/20 transition-all">
                  <div className="w-14 h-14 bg-blue-brand/20 rounded-xl flex items-center justify-center mb-5">
                    <Icon size={26} className="text-blue-light" />
                  </div>
                  <h3 className="text-white font-black text-lg mb-3">{s.title}</h3>
                  <p className="text-white/55 text-sm leading-relaxed">{s.desc}</p>
                </div>
              )
            })}
          </div>

          {/* CTA */}
          <div className="text-center">
            <p className="text-white/60 text-sm mb-4">
              {az ? 'Avadanlığınız üçün texniki xidmət tələb edirsiniz?' : 'Need technical service for your equipment?'}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="tel:+994123493920" className="inline-flex items-center gap-2 bg-white text-navy-900 font-bold px-7 py-3.5 rounded-xl hover:bg-blue-pale transition-colors">
                <Phone size={18} />
                +994 12 349 3920
              </a>
              <a href="#contact" className="btn-outline-white">
                {az ? 'Sorğu Göndər' : 'Send Request'}
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          6. PROJECT GALLERY
      ════════════════════════════════════════════════════════ */}
      <section id="gallery" className="section-pad bg-slate-50">
        <div className="container-xl">
          <div className="text-center mb-12">
            <p className="section-label justify-center">{az ? 'Fotoqalereya' : 'Photo Gallery'}</p>
            <h2 className="text-4xl font-black text-navy-900 mb-4">
              {az ? 'Layihə Qalereyası' : 'Project Gallery'}
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto text-base">
              {az ? 'Azərbaycan və regiondakı tamamlanmış layihələrimizdən görüntülər.' : 'Images from our completed projects across Azerbaijan and the region.'}
            </p>
          </div>

          {/* Main slider */}
          <div className="relative rounded-2xl overflow-hidden bg-navy-900 mb-6" style={{ height: '700px' }}>
            {galleryMedia.map((item, i) => (
              item.type === 'video' ? (
                <video
                  key={item.src}
                  ref={(el) => { videoRefs.current[i] = el }}
                  src={item.src}
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
                  style={{ opacity: i === galleryIndex ? 1 : 0 }}
                />
              ) : (
                <img
                  key={item.src}
                  src={item.src}
                  alt={item.caption}
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
                  style={{ opacity: i === galleryIndex ? 1 : 0 }}
                />
              )
            ))}
            {/* Caption */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-navy-900/80 to-transparent px-8 py-6">
              <p className="text-white font-semibold text-sm">{galleryMedia[galleryIndex].caption}</p>
              <p className="text-white/50 text-xs">{galleryIndex + 1} / {galleryMedia.length}</p>
            </div>
            {/* Prev/Next */}
            <button
              onClick={() => setGalleryIndex((i) => (i - 1 + galleryMedia.length) % galleryMedia.length)}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all"
            >‹</button>
            <button
              onClick={() => setGalleryIndex((i) => (i + 1) % galleryMedia.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all"
            >›</button>
          </div>

          {/* Thumbnail strip */}
          <div className="grid grid-cols-5 sm:grid-cols-9 gap-3">
            {galleryMedia.map((item, i) => (
              <button
                key={item.src}
                onClick={() => setGalleryIndex(i)}
                className={`rounded-xl overflow-hidden h-24 border-2 transition-all ${i === galleryIndex ? 'border-blue-brand scale-105' : 'border-transparent opacity-60 hover:opacity-100'}`}
              >
                {item.type === 'video' ? (
                  <div className="w-full h-full bg-navy-900 flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                ) : (
                  <img src={item.src} alt="" className="w-full h-full object-cover" />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          7. CLIENT LOGOS
      ════════════════════════════════════════════════════════ */}
      <section className="py-16 bg-white border-y border-slate-100">
        <div className="container-xl">
          <p className="text-center text-slate-400 text-xs font-bold uppercase tracking-widest mb-10">
            {az ? 'Müştərilərimiz' : 'Our Clients'}
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-16 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center">
                <span className="text-[10px] font-semibold text-slate-300 uppercase tracking-wider">
                  {az ? 'Müştəri Loqosu' : 'Client Logo'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          7. CONTACT
      ════════════════════════════════════════════════════════ */}
      <section id="contact" className="section-pad bg-slate-50">
        <div className="container-xl">
          <div className="text-center mb-14">
            <p className="section-label justify-center">{az ? 'Əlaqə' : 'Contact'}</p>
            <h2 className="text-4xl font-black text-navy-900 mb-4">
              {az ? 'Bizimlə Əlaqə Saxlayın' : 'Get in Touch'}
            </h2>
            <p className="text-slate-500 max-w-md mx-auto">
              {az ? 'Layihəniz üçün ən yaxşı həli birlikdə tapaq.' : 'Let\'s find the best solution for your project together.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Form */}
            <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-slate-100 p-8 sm:p-10">
              {sent ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-50 border border-green-200 rounded-full flex items-center justify-center mx-auto mb-5">
                    <CheckCircle size={32} className="text-green-500" />
                  </div>
                  <h3 className="text-2xl font-black text-navy-900 mb-2">
                    {az ? 'Təşəkkürlər!' : 'Thank you!'}
                  </h3>
                  <p className="text-slate-500 mb-6">
                    {az ? 'Mesajınız alındı. Tezliklə sizinlə əlaqə saxlayacağıq.' : 'Your message was received. We will contact you shortly.'}
                  </p>
                  <button onClick={() => { setSent(false); setForm({ name: '', company: '', phone: '', email: '', message: '' }) }} className="btn-outline-navy text-sm py-2 px-5">
                    {az ? 'Yeni Mesaj' : 'New Message'}
                  </button>
                </div>
              ) : (
                <form onSubmit={submitForm} className="space-y-5">
                  <h3 className="text-xl font-black text-navy-900 mb-6">
                    {az ? 'Mesaj Göndər' : 'Send a Message'}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-navy-900 mb-1.5">
                        {az ? 'Ad Soyad' : 'Full Name'} <span className="text-blue-brand">*</span>
                      </label>
                      <input
                        type="text" value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder={az ? 'Ad Soyad' : 'Full Name'}
                        className={`w-full border rounded-lg px-4 py-3 text-sm text-navy-900 placeholder-slate-400 outline-none transition-colors focus:border-blue-brand ${errs.name ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-white'}`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-navy-900 mb-1.5">
                        {az ? 'Şirkət' : 'Company'}
                      </label>
                      <input
                        type="text" value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        placeholder={az ? 'Şirkət adı' : 'Company name'}
                        className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm text-navy-900 placeholder-slate-400 outline-none focus:border-blue-brand transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-navy-900 mb-1.5">
                        {az ? 'Telefon' : 'Phone'} <span className="text-blue-brand">*</span>
                      </label>
                      <input
                        type="tel" value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+994 xx xxx xx xx"
                        className={`w-full border rounded-lg px-4 py-3 text-sm text-navy-900 placeholder-slate-400 outline-none transition-colors focus:border-blue-brand ${errs.phone ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-white'}`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-navy-900 mb-1.5">
                        {az ? 'E-poçt' : 'Email'}
                      </label>
                      <input
                        type="email" value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="email@company.com"
                        className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm text-navy-900 placeholder-slate-400 outline-none focus:border-blue-brand transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-navy-900 mb-1.5">
                      {az ? 'Mesaj' : 'Message'} <span className="text-blue-brand">*</span>
                    </label>
                    <textarea
                      rows={5} value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder={az ? 'Mesajınızı buraya yazın...' : 'Write your message here...'}
                      className={`w-full border rounded-lg px-4 py-3 text-sm text-navy-900 placeholder-slate-400 outline-none transition-colors focus:border-blue-brand resize-none ${errs.message ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-white'}`}
                    />
                  </div>

                  <button type="submit" className="btn-primary w-full justify-center py-3.5">
                    {az ? 'Göndər' : 'Send'}
                    <ArrowRight size={18} />
                  </button>
                </form>
              )}
            </div>

            {/* Info + Map */}
            <div className="lg:col-span-2 space-y-5">
              {/* Contact info cards */}
              {[
                { icon: MapPin,  label: az ? 'Ünvan' : 'Address',       value: 'H.Aliyev 1/8, Xırdalan AZ0100',   href: 'https://maps.google.com/?q=Khirdalan+Azerbaijan' },
                { icon: Phone,   label: az ? 'Telefon' : 'Phone',       value: '+994 12 349 3920',                  href: 'tel:+994123493920' },
                { icon: Phone,   label: az ? 'Mobil' : 'Mobile',        value: '+994 50 270 9196',                  href: 'tel:+994502709196' },
                { icon: Mail,    label: az ? 'E-poçt' : 'Email',        value: 'office@safe-az.com',               href: 'mailto:office@safe-az.com' },
                { icon: Clock,   label: az ? 'İş Saatları' : 'Hours',   value: az ? 'B.e – Cümə: 09:00–18:00' : 'Mon–Fri: 09:00–18:00', href: null },
              ].map((c, i) => {
                const Icon = c.icon
                const inner = (
                  <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-slate-100 hover:border-blue-brand/30 hover:shadow-sm transition-all">
                    <div className="w-9 h-9 bg-blue-pale rounded-lg flex items-center justify-center shrink-0">
                      <Icon size={16} className="text-blue-brand" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{c.label}</div>
                      <div className="text-navy-900 font-semibold text-sm mt-0.5">{c.value}</div>
                    </div>
                  </div>
                )
                return c.href
                  ? <a key={i} href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="block">{inner}</a>
                  : <div key={i}>{inner}</div>
              })}

              {/* Map */}
              <div className="rounded-xl overflow-hidden border border-slate-100 h-44">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3037.7!2d49.7508!3d40.4456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDI2JzQ0LjIiTiA0OcKwNDUnMDMuMCJF!5e0!3m2!1sen!2saz!4v1700000000000"
                  width="100%" height="100%"
                  style={{ border: 0 }}
                  allowFullScreen loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={az ? 'AZSAFE Ünvanı' : 'AZSAFE Location'}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
