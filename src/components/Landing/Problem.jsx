import { useLanguage } from '../../LanguageContext'

export default function Problem() {
  const { t } = useLanguage()
  const p = t.problem

  return (
    <section className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-violet-400 text-sm font-medium tracking-widest uppercase mb-4 block">{p.tag}</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">{p.title}</h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto">{p.sub}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {p.items.map((item, i) => (
            <div key={i} className="glass glass-hover rounded-2xl p-6 group">
              <div className="flex items-start gap-4">
                <div className="text-3xl flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-200">
                  {item.emoji}
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-white/30 text-sm">{p.footer}</p>
        </div>
      </div>
    </section>
  )
}
