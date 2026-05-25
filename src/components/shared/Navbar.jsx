import { useState, useEffect } from 'react'
import { useLanguage } from '../../LanguageContext'
import { useAuth } from '../../AuthContext'
import AuthModal from '../Auth/AuthModal'

export default function Navbar({ onStart, onDashboard }) {
  const { t, lang, toggle } = useLanguage()
  const { user, signOut } = useAuth()
  const [scrolled, setScrolled] = useState(false)
  const [showAuth, setShowAuth] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const shortEmail = user?.email?.split('@')[0]

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-3 bg-[#080810]/90 backdrop-blur-xl border-b border-white/5' : 'py-5'
      }`}>
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="logo" className="w-7 h-7" />
            <span className="font-semibold text-white text-sm tracking-tight">{t.nav.brand}</span>
          </div>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-8">
            {t.nav.links.map((label, i) => {
              const anchors = ['how-it-works', 'what-you-get', 'example']
              return (
                <button
                  key={label}
                  onClick={() => document.getElementById(anchors[i])?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-white/50 hover:text-white text-sm transition-colors duration-200"
                >
                  {label}
                </button>
              )
            })}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Language switcher */}
            <button
              onClick={toggle}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 hover:border-violet-500/40 transition-all duration-200"
            >
              <span className={`text-xs font-semibold transition-colors ${lang === 'en' ? 'text-white' : 'text-white/30'}`}>EN</span>
              <span className="text-white/20 text-xs">/</span>
              <span className={`text-xs font-semibold transition-colors ${lang === 'sr' ? 'text-white' : 'text-white/30'}`}>SR</span>
            </button>

            {user ? (
              // Ulogovan korisnik
              <div className="flex items-center gap-3">
                {onDashboard && (
                  <button
                    onClick={onDashboard}
                    className="bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-violet-500/20 hidden md:block"
                  >
                    {lang === 'sr' ? 'Moj profil' : 'My profile'}
                  </button>
                )}
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 hover:border-violet-500/30 transition-all"
                  >
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center text-[10px] font-bold text-white">
                      {shortEmail?.[0]?.toUpperCase()}
                    </div>
                    <span className="text-white/70 text-sm hidden md:block">{shortEmail}</span>
                    <svg className="w-3 h-3 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 top-10 w-44 glass rounded-xl border border-white/10 py-2 shadow-xl shadow-black/30 z-50">
                      <div className="px-3 py-2 border-b border-white/5">
                        <p className="text-white/30 text-xs truncate">{user.email}</p>
                      </div>
                      {onDashboard && (
                        <button
                          onClick={() => { setShowUserMenu(false); onDashboard() }}
                          className="w-full text-left px-3 py-2 text-white/60 hover:text-white text-sm transition-colors"
                        >
                          {lang === 'sr' ? 'Moj profil' : 'My profile'}
                        </button>
                      )}
                      <button
                        onClick={() => { signOut(); setShowUserMenu(false) }}
                        className="w-full text-left px-3 py-2 text-white/60 hover:text-white text-sm transition-colors"
                      >
                        {lang === 'sr' ? 'Odjava' : 'Sign out'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              // Nije ulogovan
              <>
                <button
                  onClick={() => setShowAuth(true)}
                  className="text-white/50 hover:text-white text-sm transition-colors duration-200 hidden md:block"
                >
                  {t.nav.signin}
                </button>
                <button
                  onClick={onStart}
                  className="bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-violet-500/20"
                >
                  {t.nav.start}
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </>
  )
}
