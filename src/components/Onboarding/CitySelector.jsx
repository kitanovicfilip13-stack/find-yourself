import { gradovi } from '../../i18n/schoolsDB'

export default function CitySelector({ segment, onSelect, onBack }) {
  const label = segment === 'srednja'
    ? 'U kom gradu želiš da upišeš srednju školu?'
    : 'U kom gradu želiš da studiraš?'

  const icons = {
    'Beograd': '🏙️',
    'Novi Sad': '🌇',
    'Niš': '🏛️',
    'Kragujevac': '🏫',
    'Čačak': '🌿',
    'Subotica': '🏰',
  }

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
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-10">
            <span className="text-violet-400 text-xs font-medium tracking-widest uppercase mb-4 block">Korak 2 od 2</span>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">{label}</h1>
            <p className="text-white/40 text-sm">Na osnovu toga dajemo ti konkretne preporuke iz tvog grada.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {gradovi.map((grad) => (
              <button
                key={grad}
                onClick={() => onSelect(grad)}
                className="glass glass-hover rounded-2xl p-5 border border-white/8 hover:border-violet-500/30 transition-all duration-200 text-left group"
              >
                <div className="text-2xl mb-2">{icons[grad]}</div>
                <p className="text-white font-medium text-base">{grad}</p>
              </button>
            ))}
          </div>

          <p className="text-white/20 text-xs text-center mt-6">
            Ako tvoj grad nije na listi, odaberi najbliži veći grad.
          </p>
        </div>
      </div>
    </div>
  )
}
