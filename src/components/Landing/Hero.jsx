import { useLanguage } from '../../LanguageContext'

export default function Hero({ onStart, hasProgress }) {
  const { t, lang } = useLanguage()
  const h = t.hero

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20 overflow-hidden">
      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full animate-orb"
          style={{ background: 'radial-gradient(circle, rgba(109,40,217,0.15) 0%, transparent 70%)', filter: 'blur(40px)' }} />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full animate-orb-delay"
          style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)', filter: 'blur(40px)' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 60%)', filter: 'blur(60px)' }} />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }} />

      {/* Badge */}
      <div className="relative animate-fade-in mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-violet-500/20">
          <div className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
          <span className="text-violet-300 text-xs font-medium tracking-wide uppercase">{h.badge}</span>
        </div>
      </div>

      {/* Headline */}
      <div className="relative text-center max-w-4xl">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.05] mb-6 animate-slide-up">
          {lang === 'sr' ? (
            <>
              <span className="text-white">Saznaj </span>
              <span className="gradient-text">ko si</span>
              <span className="text-white">, šta te </span>
              <span className="gradient-text">pokreće</span>
              <br />
              <span className="text-white">i u čemu možeš postati </span>
              <span className="gradient-text">najbolji.</span>
            </>
          ) : (
            <>
              <span className="text-white">Find out </span>
              <span className="gradient-text">who you are</span>
              <span className="text-white">, what </span>
              <span className="gradient-text">drives you</span>
              <br />
              <span className="text-white">and what you can be </span>
              <span className="gradient-text">best at.</span>
            </>
          )}
        </h1>

        <p className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed animate-slide-up mb-10" style={{ animationDelay: '0.1s' }}>
          {h.sub}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <button
            onClick={onStart}
            className="group relative px-8 py-4 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-violet-500/30 hover:-translate-y-0.5 text-base"
          >
            {hasProgress ? (lang === 'sr' ? '▶ Nastavi test' : '▶ Continue test') : h.cta}
          </button>
          {hasProgress && (
            <button
              onClick={() => { localStorage.removeItem('fy_progress'); onStart() }}
              className="px-8 py-4 glass glass-hover text-white/50 hover:text-white font-medium rounded-xl text-base border border-white/10"
            >
              {lang === 'sr' ? 'Počni ispočetka' : 'Start over'}
            </button>
          )}
          {!hasProgress && (
            <button
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 glass glass-hover text-white/70 hover:text-white font-medium rounded-xl text-base border border-white/10"
            >
              {h.ctaSub}
            </button>
          )}
        </div>

        {/* Social proof */}
        <div className="mt-12 flex items-center justify-center gap-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="flex -space-x-2">
            {['#8b5cf6', '#3b82f6', '#06b6d4', '#10b981'].map((color, i) => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-[#080810] flex items-center justify-center text-xs font-bold text-white"
                style={{ backgroundColor: color }}>
                {['A', 'M', 'J', 'S'][i]}
              </div>
            ))}
          </div>
          <p className="text-white/40 text-sm">
            <span className="text-white/70 font-medium">2,400+</span> {h.social}
          </p>
        </div>
      </div>

    </section>
  )
}
