import { useState } from 'react'

export default function UserInfoForm({ onNext, onBack }) {
  const [form, setForm] = useState({
    fullName: '',
    age: '',
    phone: '',
    comment: '',
  })

  const canContinue = form.fullName.trim().length >= 2 && form.age >= 13 && form.age <= 99

  const set = (key, val) => setForm(prev => ({ ...prev, [key]: val }))

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
        <div className="w-full max-w-lg">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-white mb-3">Pre nego što počnemo</h1>
            <p className="text-white/40 text-sm">Ove informacije nam pomažu da bolje razumemo ko koristi platformu.</p>
          </div>

          <div className="space-y-4">
            {/* Ime i prezime */}
            <div>
              <label className="text-white/40 text-xs uppercase tracking-widest mb-2 block">Ime i prezime</label>
              <input
                type="text"
                value={form.fullName}
                onChange={e => set('fullName', e.target.value)}
                placeholder="npr. Marko Petrović"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/20 text-sm outline-none focus:border-violet-500/50 transition-all"
              />
            </div>

            {/* Broj godina */}
            <div>
              <label className="text-white/40 text-xs uppercase tracking-widest mb-2 block">Broj godina</label>
              <input
                type="number"
                min={13}
                max={99}
                value={form.age}
                onChange={e => set('age', Number(e.target.value))}
                placeholder="npr. 19"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/20 text-sm outline-none focus:border-violet-500/50 transition-all"
              />
            </div>

            {/* Broj telefona */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-white/40 text-xs uppercase tracking-widest">Broj telefona</label>
                <span className="text-white/20 text-xs">Nije obavezno</span>
              </div>
              <input
                type="tel"
                value={form.phone}
                onChange={e => set('phone', e.target.value)}
                placeholder="npr. 063 123 456"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/20 text-sm outline-none focus:border-violet-500/50 transition-all"
              />
            </div>

            {/* Komentar */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-white/40 text-xs uppercase tracking-widest">Šta te je privuklo da uradiš test?</label>
                <span className="text-white/20 text-xs">Nije obavezno</span>
              </div>
              <textarea
                value={form.comment}
                onChange={e => set('comment', e.target.value)}
                placeholder="Kratko napiši šta te je dovelo ovde..."
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm outline-none focus:border-violet-500/50 transition-all resize-none"
              />
            </div>
          </div>

          <button
            onClick={() => onNext(form)}
            disabled={!canContinue}
            className={`w-full mt-6 py-4 rounded-xl font-semibold text-sm transition-all duration-200 ${
              canContinue
                ? 'bg-violet-600 hover:bg-violet-500 text-white hover:shadow-lg hover:shadow-violet-500/20'
                : 'bg-white/5 text-white/20 cursor-not-allowed'
            }`}>
            Počni test
          </button>

          {!canContinue && (form.fullName.trim().length < 2 || !form.age) && (
            <p className="text-white/25 text-xs text-center mt-3">Ime i prezime i broj godina su obavezni.</p>
          )}
        </div>
      </div>
    </div>
  )
}
