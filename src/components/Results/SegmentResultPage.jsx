import { computeSegmentResult } from '../../i18n/segmentScoring'

export default function SegmentResultPage({ answers, segment, onRestart }) {
  const result = computeSegmentResult(answers, segment)

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#080810' }}>
        <div className="text-center">
          <p className="text-white/40 mb-4">Nešto nije u redu sa rezultatima.</p>
          <button onClick={onRestart} className="text-violet-400 hover:text-white transition-colors">Pokušaj ponovo</button>
        </div>
      </div>
    )
  }

  const { primary, alternatives } = result
  const label = segment === 'srednja' ? 'Preporučena srednja škola' : 'Preporučeni fakultet'

  return (
    <div className="min-h-screen px-6 py-16" style={{ background: '#080810' }}>
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/20 bg-violet-500/10 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            <span className="text-violet-300 text-xs font-medium tracking-wide uppercase">Tvoj rezultat je spreman</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Evo šta smo otkrili</h1>
          <p className="text-white/40">Na osnovu tvojih odgovora, ovo ti najviše odgovara.</p>
        </div>

        {/* Primary result */}
        <div className="rounded-3xl overflow-hidden border border-white/8 mb-6"
          style={{ background: 'linear-gradient(145deg, #0f0f1e 0%, #0a0a18 100%)' }}>

          <div className="p-6 border-b border-white/5"
            style={{ background: `linear-gradient(135deg, ${primary.color}22 0%, transparent 100%)` }}>
            <p className="text-white/40 text-xs uppercase tracking-widest mb-1">{label}</p>
            <h2 className="text-white font-bold text-2xl mb-1">{primary.name}</h2>
            <p style={{ color: primary.color }} className="text-sm font-medium">{primary.smer}</p>
          </div>

          <div className="p-6 border-b border-white/5">
            <p className="text-white/60 text-sm leading-relaxed">{primary.desc}</p>
          </div>

          <div className="p-6">
            <p className="text-white/30 text-xs uppercase tracking-widest mb-3">Primeri</p>
            <div className="flex flex-wrap gap-2">
              {primary.examples.map((ex) => (
                <span key={ex} className="px-3 py-1.5 rounded-lg text-xs font-medium text-white/70 border border-white/10 bg-white/5">
                  {ex}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Alternatives */}
        {alternatives.length > 0 && (
          <div className="mb-10">
            <p className="text-white/30 text-xs uppercase tracking-widest mb-3 px-1">Takođe odgovaraju</p>
            <div className="space-y-3">
              {alternatives.map((alt) => (
                <div key={alt.name} className="glass rounded-2xl p-5 border border-white/5">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: alt.color }} />
                    <h3 className="text-white font-semibold text-base">{alt.name}</h3>
                    <span className="text-white/30 text-xs">{alt.smer}</span>
                  </div>
                  <p className="text-white/40 text-sm leading-relaxed pl-5">{alt.desc.split('.')[0]}.</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onRestart}
            className="flex-1 px-6 py-3.5 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-violet-500/20 text-sm"
          >
            Počni ispočetka
          </button>
          <button
            onClick={() => { localStorage.removeItem('fy_results'); localStorage.removeItem('fy_progress'); onRestart() }}
            className="flex-1 px-6 py-3.5 glass glass-hover text-white/50 hover:text-white font-medium rounded-xl text-sm border border-white/10"
          >
            Promeni segment
          </button>
        </div>
      </div>
    </div>
  )
}
