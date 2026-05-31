export default function SegmentSelector({ onSelect, onBack }) {
  const segments = [
    {
      id: 'srednja',
      title: 'Srednja škola',
      desc: 'Pomažemo ti da izabereš najbolju moguću srednju školu na osnovu tvojih interesovanja i načina razmišljanja.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 3.741-1.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
        </svg>
      ),
      color: '#8b5cf6',
      tag: '20 pitanja',
    },
    {
      id: 'fakultet',
      title: 'Fakultet',
      desc: 'Otkrij koji fakultet ili smer najviše odgovara tvom profilu, interesovanjima i dugoročnim ciljevima.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
        </svg>
      ),
      color: '#3b82f6',
      tag: '20 pitanja',
    },
    {
      id: 'posao',
      title: 'Posao i karijera',
      desc: 'Pronađi karijerni pravac koji odgovara tvojoj ličnosti, potencijalima i vrednostima.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
        </svg>
      ),
      color: '#06b6d4',
      tag: '20 pitanja',
    },
  ]

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#080810' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
        <button onClick={onBack} className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Nazad
        </button>
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="logo" className="w-5 h-5" />
          <span className="text-white/50 text-sm">Pronađi Sebe</span>
        </div>
        <div className="w-16" />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-12">
            <span className="text-violet-400 text-xs font-medium tracking-widest uppercase mb-4 block">Korak 1 od 2</span>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">U kojoj oblasti ti je potrebna naša podrška</h1>
            <p className="text-white/40 text-base">Odaberi oblast i dobijaš pitanja i preporuke prilagođene tvojoj situaciji.</p>
          </div>

          <div className="space-y-4">
            {segments.map((seg) => (
              <button
                key={seg.id}
                onClick={() => onSelect(seg.id)}
                className="w-full text-left glass glass-hover rounded-2xl p-6 border border-white/8 hover:border-violet-500/30 transition-all duration-200 group"
              >
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200"
                    style={{ background: `${seg.color}18`, color: seg.color }}>
                    {seg.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-white font-semibold text-lg">{seg.title}</h3>
                      <span className="text-xs text-white/25 border border-white/10 rounded-full px-2 py-0.5">{seg.tag}</span>
                    </div>
                    <p className="text-white/40 text-sm leading-relaxed">{seg.desc}</p>
                  </div>
                  <svg className="w-5 h-5 text-white/20 group-hover:text-white/60 transition-colors flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
