import { useLanguage } from '../../LanguageContext'

export default function Footer() {
  const { t, lang } = useLanguage()
  const f = t.footer

  return (
    <footer className="border-t border-white/5 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center">
              <span className="text-white text-xs font-bold">{lang === 'sr' ? 'P' : 'F'}</span>
            </div>
            <span className="font-semibold text-white text-sm tracking-tight">{f.brand}</span>
          </div>

          <div className="flex items-center gap-8">
            {f.links.map((item) => (
              <a key={item} href="#" className="text-white/30 hover:text-white/70 text-sm transition-colors duration-200">
                {item}
              </a>
            ))}
          </div>

          <p className="text-white/20 text-sm">{f.copy}</p>
        </div>

        <div className="mt-10 pt-8 border-t border-white/5">
          <p className="text-white/20 text-xs text-center mb-4 uppercase tracking-widest">{f.comingSoon}</p>
          <div className="flex flex-wrap gap-3 justify-center">
            {f.upcoming.map((item) => (
              <span key={item} className="px-3 py-1.5 rounded-full text-xs text-white/20 border border-white/5">{item}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
