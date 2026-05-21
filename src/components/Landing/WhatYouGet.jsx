import { useLanguage } from '../../LanguageContext'

const accentColors = ['#8b5cf6', '#3b82f6', '#06b6d4', '#10b981', '#f59e0b', '#ec4899']

export default function WhatYouGet() {
  const { t } = useLanguage()
  const w = t.what

  return (
    <section id="what-you-get" className="py-28 px-6 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px]"
          style={{ background: 'radial-gradient(ellipse, rgba(109,40,217,0.06) 0%, transparent 70%)' }} />
      </div>

      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-16">
          <span className="text-violet-400 text-sm font-medium tracking-widest uppercase mb-4 block">{w.tag}</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">{w.title}</h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto">{w.sub}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {w.features.map((f, i) => (
            <div key={i} className="glass glass-hover rounded-2xl p-6 group relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                style={{ background: accentColors[i], filter: 'blur(20px)' }} />
              <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-200">{f.icon}</div>
              <h3 className="text-white font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
