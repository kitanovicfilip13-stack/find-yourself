import { useState, useEffect } from 'react'
import { useLanguage } from '../../LanguageContext'

export default function Navbar({ onStart }) {
  const { t, lang, toggle } = useLanguage()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'py-3 bg-[#080810]/90 backdrop-blur-xl border-b border-white/5' : 'py-5'
    }`}>
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center">
            <span className="text-white text-xs font-bold">{lang === 'sr' ? 'P' : 'F'}</span>
          </div>
          <span className="font-semibold text-white text-sm tracking-tight">{t.nav.brand}</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {t.nav.links.map((label) => (
            <a
              key={label}
              href="#"
              className="text-white/50 hover:text-white text-sm transition-colors duration-200"
            >
              {label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {/* Language switcher */}
          <button
            onClick={toggle}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 hover:border-violet-500/40 transition-all duration-200 group"
          >
            <span className={`text-xs font-semibold transition-colors ${lang === 'en' ? 'text-white' : 'text-white/30'}`}>EN</span>
            <span className="text-white/20 text-xs">/</span>
            <span className={`text-xs font-semibold transition-colors ${lang === 'sr' ? 'text-white' : 'text-white/30'}`}>SR</span>
          </button>

          <button className="text-white/50 hover:text-white text-sm transition-colors duration-200 hidden md:block">
            {t.nav.signin}
          </button>
          <button
            onClick={onStart}
            className="bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-violet-500/20"
          >
            {t.nav.start}
          </button>
        </div>
      </div>
    </nav>
  )
}
