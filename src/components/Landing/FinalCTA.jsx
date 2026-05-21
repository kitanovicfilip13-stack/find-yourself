import { useLanguage } from '../../LanguageContext'

export default function FinalCTA({ onStart }) {
  const { t } = useLanguage()
  const c = t.cta

  return (
    <section className="py-28 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden p-12 md:p-16 text-center"
          style={{ background: 'linear-gradient(135deg, rgba(109,40,217,0.15) 0%, rgba(37,99,235,0.1) 50%, rgba(109,40,217,0.15) 100%)', border: '1px solid rgba(139,92,246,0.2)' }}>

          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)', filter: 'blur(30px)' }} />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)', filter: 'blur(30px)' }} />
          </div>

          <div className="relative">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/30 bg-violet-500/10 mb-8">
              <span className="text-violet-300 text-xs font-medium tracking-wide uppercase">{c.badge}</span>
            </div>

            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight mb-6">
              {c.title1}
              <br />
              <span className="gradient-text">{c.title2}</span>
            </h2>

            <p className="text-white/50 text-lg max-w-xl mx-auto mb-10 leading-relaxed">{c.sub}</p>

            <button onClick={onStart}
              className="group inline-flex items-center gap-3 px-10 py-5 bg-white text-gray-900 font-bold rounded-2xl text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-white/20 hover:-translate-y-1 hover:bg-white/90">
              {c.btn}
              <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
            </button>

            <p className="text-white/20 text-sm mt-6">{c.fine}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
