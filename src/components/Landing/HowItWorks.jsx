import { useLanguage } from '../../LanguageContext'
import { FadeUp } from '../shared/ScrollReveal'

export default function HowItWorks() {
  const { t } = useLanguage()
  const h = t.how

  return (
    <section id="how-it-works" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <FadeUp className="text-center mb-16">
          <span className="text-violet-400 text-sm font-medium tracking-widest uppercase mb-4 block">{h.tag}</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">{h.title}</h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto">{h.sub}</p>
        </FadeUp>

        <div className="relative">
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-violet-500/20 to-transparent -translate-y-1/2" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {h.steps.map((step, i) => (
              <FadeUp key={i} delay={i * 0.15}>
                <div className="glass rounded-2xl p-7 h-full group hover:border-violet-500/30 transition-all duration-300 hover:-translate-y-1">
                  <div className={`text-6xl font-black tracking-tighter mb-4 ${step.accent} opacity-20 group-hover:opacity-40 transition-opacity`}>
                    {step.number}
                  </div>
                  <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 ${step.accent} border border-current/20 bg-current/5`}>
                    {step.tag}
                  </div>
                  <h3 className="text-white font-semibold text-xl mb-3">{step.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
