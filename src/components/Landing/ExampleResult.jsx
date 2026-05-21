import { useLanguage } from '../../LanguageContext'

export default function ExampleResult({ onStart }) {
  const { t } = useLanguage()
  const e = t.example

  return (
    <section id="example" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-violet-400 text-sm font-medium tracking-widest uppercase mb-4 block">{e.tag}</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">{e.title}</h2>
          <p className="text-white/40 text-lg">{e.sub}</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="rounded-3xl overflow-hidden border border-white/8"
            style={{ background: 'linear-gradient(145deg, #0f0f1e 0%, #0a0a18 100%)' }}>

            {/* Header */}
            <div className="p-6 border-b border-white/5"
              style={{ background: 'linear-gradient(135deg, rgba(109,40,217,0.2) 0%, rgba(37,99,235,0.1) 100%)' }}>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                  style={{ background: 'rgba(139,92,246,0.2)' }}>🧠</div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-widest mb-1">{e.personalityLabel}</p>
                  <h3 className="text-white font-bold text-xl">{e.personalityName}</h3>
                </div>
              </div>
              <p className="text-white/60 text-sm leading-relaxed">{e.personalityDesc}</p>
            </div>

            {/* Strengths */}
            <div className="p-6 border-b border-white/5">
              <p className="text-white/40 text-xs uppercase tracking-widest mb-3">{e.strengthsLabel}</p>
              <div className="flex flex-wrap gap-2">
                {e.strengths.map((s) => (
                  <span key={s} className="px-3 py-1.5 rounded-lg text-xs font-medium text-violet-300 border border-violet-500/20 bg-violet-500/10">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Careers */}
            <div className="p-6 border-b border-white/5">
              <p className="text-white/40 text-xs uppercase tracking-widest mb-3">{e.careersLabel}</p>
              <div className="space-y-2">
                {e.careers.map((c) => (
                  <div key={c.label} className="flex items-center gap-3">
                    <span className="text-white/70 text-sm w-44 flex-shrink-0">{c.label}</span>
                    <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${c.match}%`, background: 'linear-gradient(90deg, #8b5cf6, #8b5cf688)' }} />
                    </div>
                    <span className="text-white/40 text-xs w-8 text-right">{c.match}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* First step */}
            <div className="p-6">
              <p className="text-white/40 text-xs uppercase tracking-widest mb-3">{e.firstStepLabel}</p>
              <div className="flex items-start gap-3 p-4 rounded-xl bg-violet-500/10 border border-violet-500/20">
                <span className="text-violet-400 text-lg mt-0.5">→</span>
                <p className="text-white/80 text-sm leading-relaxed">{e.firstStep}</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-white/30 text-sm mb-4">{e.note}</p>
            <button onClick={onStart}
              className="px-8 py-3 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-violet-500/20">
              {e.cta}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
