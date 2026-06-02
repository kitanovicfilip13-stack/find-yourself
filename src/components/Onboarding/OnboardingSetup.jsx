import { useState } from 'react'
import { useAuth } from '../../AuthContext'
import { gradToRegion } from './CitySelector'
import { upsertProfile } from '../../supabase'

const sviGradovi = [
  'Ada', 'Aleksinac', 'Alibunar', 'Apatin', 'Aranđelovac', 'Arilje', 'Babušnica',
  'Bač', 'Bačka Palanka', 'Bačka Topola', 'Bački Petrovac', 'Bajina Bašta',
  'Batočina', 'Bečej', 'Bela Crkva', 'Bela Palanka', 'Beograd', 'Blace',
  'Bogatić', 'Bojnik', 'Boljevac', 'Bor', 'Bosilegrad', 'Brus', 'Bujanovac',
  'Čačak', 'Čajetina', 'Ćićevac', 'Ćuprija', 'Despotovac', 'Dimitrovgrad',
  'Doljevac', 'Gadžin Han', 'Golubac', 'Gornji Milanovac', 'Ivanjica',
  'Jagodina', 'Kanjiža', 'Kikinda', 'Kladovo', 'Knić', 'Knjaževac',
  'Kosjerić', 'Kovačica', 'Kovin', 'Kragujevac', 'Kraljevo', 'Krupanj',
  'Kruševac', 'Kuršumlija', 'Kučevo', 'Lajkovac', 'Lapovo', 'Lebane',
  'Leskovac', 'Loznica', 'Lučani', 'Ljubovija', 'Majdanpek', 'Mali Iđoš',
  'Mali Zvornik', 'Malo Crniće', 'Medveđa', 'Merošina', 'Mionica',
  'Mladenovac', 'Negotin', 'Niš', 'Nova Crnja', 'Nova Varoš', 'Novi Bečej',
  'Novi Kneževac', 'Novi Pazar', 'Novi Sad', 'Odžaci', 'Osečina', 'Pančevo',
  'Paraćin', 'Pećinci', 'Petrovac na Mlavi', 'Pirot', 'Požarevac', 'Požega',
  'Preševo', 'Priboj', 'Prijepolje', 'Prokuplje', 'Rača', 'Raška', 'Ruma',
  'Šabac', 'Šid', 'Smederevo', 'Smederevska Palanka', 'Sokobanja', 'Sombor',
  'Srbobran', 'Sremska Mitrovica', 'Sremski Karlovci', 'Stara Pazova',
  'Subotica', 'Surdulica', 'Svilajnac', 'Svrljig', 'Titel', 'Topola',
  'Trstenik', 'Tutin', 'Ub', 'Užice', 'Valjevo', 'Varvarin',
  'Velika Plana', 'Veliko Gradište', 'Vladičin Han', 'Vladimirci', 'Vlasotince',
  'Vranje', 'Vrnjačka Banja', 'Vršac', 'Zaječar', 'Žabari', 'Žagubica',
  'Žitište', 'Žitorađa', 'Zrenjanin',
]

export default function OnboardingSetup({ segment, onNext, onBack }) {
  const { signUp, signIn, user } = useAuth()
  const isLoggedIn = !!user

  const needsCity = segment !== 'posao'
  const cityLabel = segment === 'srednja'
    ? 'U kom gradu želiš da upišeš srednju školu?'
    : 'U kom gradu želiš da studiraš?'

  const [form, setForm] = useState({
    city: '',
    fullName: '',
    age: '',
    phone: '',
    email: '',
    password: '',
    comment: '',
  })
  const [cityQuery, setCityQuery] = useState('')
  const [cityFocused, setCityFocused] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const set = (key, val) => setForm(prev => ({ ...prev, [key]: val }))

  const filteredCities = cityQuery.trim().length >= 1
    ? sviGradovi.filter(g => g.toLowerCase().startsWith(cityQuery.toLowerCase())).slice(0, 6)
    : []

  const handleSelectCity = (grad) => {
    set('city', grad)
    setCityQuery(grad)
    setCityFocused(false)
  }

  const canContinue = form.fullName.trim().length >= 2
    && Number(form.age) >= 13 && Number(form.age) <= 99
    && (isLoggedIn || (form.email.includes('@') && form.password.length >= 6))
    && (!needsCity || form.city)

  const handleSubmit = async () => {
    if (!canContinue || loading) return
    setLoading(true)
    setError('')

    let currentUserId = user?.id

    if (!isLoggedIn) {
      const { error: signUpErr } = await signUp(form.email, form.password)
      if (signUpErr && !signUpErr.message.includes('already registered')) {
        setError(signUpErr.message === 'Password should be at least 6 characters'
          ? 'Lozinka mora imati najmanje 6 karaktera.'
          : signUpErr.message)
        setLoading(false)
        return
      }
      const { data: signInData } = await signIn(form.email, form.password)
      currentUserId = signInData?.user?.id
    }

    // Sačuvaj profil u Supabase
    if (currentUserId) {
      await upsertProfile(currentUserId, {
        fullName: form.fullName,
        age: Number(form.age),
        phone: form.phone || null,
        city: form.city || null,
        comment: form.comment || null,
      })
    }

    setLoading(false)
    onNext({
      city: form.city || null,
      fullName: form.fullName,
      age: Number(form.age),
      phone: form.phone || null,
      email: form.email || user?.email || null,
      comment: form.comment || null,
    })
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
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-10">
        <div className="w-full max-w-lg">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">Pre početka napravi svoj profil</h1>
            <p className="text-white/40 text-sm">Kako bi se tvoj rezultat sačuvao na tvom profilu.</p>
          </div>

          <div className="space-y-4">
            {/* Grad */}
            {needsCity && (
              <div>
                <label className="text-white/40 text-xs uppercase tracking-widest mb-2 block">{cityLabel}</label>
                <div className="relative">
                  <div className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border transition-all ${cityFocused ? 'border-violet-500/50 bg-violet-500/5' : 'border-white/10 bg-white/5'}`}>
                    <svg className="w-4 h-4 text-white/30 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                    <input
                      type="text"
                      value={cityQuery}
                      onChange={e => { setCityQuery(e.target.value); set('city', '') }}
                      onFocus={() => setCityFocused(true)}
                      onBlur={() => setTimeout(() => setCityFocused(false), 150)}
                      placeholder="Ukucaj grad..."
                      className="flex-1 bg-transparent text-white placeholder-white/25 outline-none text-sm"
                    />
                  </div>
                  {cityFocused && filteredCities.length > 0 && (
                    <div className="absolute left-0 right-0 top-full mt-1 rounded-xl border border-white/10 overflow-hidden z-50" style={{ background: '#0f0f1e' }}>
                      {filteredCities.map((grad, i) => (
                        <button key={grad} onMouseDown={() => handleSelectCity(grad)}
                          className={`w-full text-left px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 transition-colors text-sm ${i < filteredCities.length - 1 ? 'border-b border-white/5' : ''}`}>
                          {grad}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Ime i prezime + godine u redu */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-white/40 text-xs uppercase tracking-widest mb-2 block">Ime i prezime</label>
                <input type="text" value={form.fullName} onChange={e => set('fullName', e.target.value)}
                  placeholder="Marko Petrović"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/20 text-sm outline-none focus:border-violet-500/50 transition-all" />
              </div>
              <div>
                <label className="text-white/40 text-xs uppercase tracking-widest mb-2 block">Broj godina</label>
                <input type="number" min={13} max={99} value={form.age} onChange={e => set('age', e.target.value)}
                  placeholder="19"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/20 text-sm outline-none focus:border-violet-500/50 transition-all" />
              </div>
            </div>

            {/* Telefon */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-white/40 text-xs uppercase tracking-widest">Broj telefona</label>
                <span className="text-white/20 text-xs">Nije obavezno</span>
              </div>
              <input type="tel" value={form.phone} onChange={e => set('phone', e.target.value)}
                placeholder="063 123 456"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/20 text-sm outline-none focus:border-violet-500/50 transition-all" />
            </div>

            {/* Email + lozinka — samo za nove korisnike */}
            {!isLoggedIn && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-white/40 text-xs uppercase tracking-widest mb-2 block">Email</label>
                  <input type="email" value={form.email} onChange={e => set('email', e.target.value)}
                    placeholder="ti@email.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/20 text-sm outline-none focus:border-violet-500/50 transition-all" />
                </div>
                <div>
                  <label className="text-white/40 text-xs uppercase tracking-widest mb-2 block">Lozinka</label>
                  <input type="password" value={form.password} onChange={e => set('password', e.target.value)}
                    placeholder="Min. 6 karaktera"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/20 text-sm outline-none focus:border-violet-500/50 transition-all" />
                </div>
              </div>
            )}

            {/* Komentar */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-white/40 text-xs uppercase tracking-widest">Zašto si došao/la na naš sajt?</label>
                <span className="text-white/20 text-xs">Nije obavezno</span>
              </div>
              <textarea value={form.comment} onChange={e => set('comment', e.target.value)}
                placeholder="Kratko napiši šta te je dovelo ovde..."
                rows={2}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm outline-none focus:border-violet-500/50 transition-all resize-none" />
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button onClick={handleSubmit} disabled={!canContinue || loading}
              className={`w-full py-4 rounded-xl font-semibold text-sm transition-all duration-200 ${
                canContinue && !loading
                  ? 'bg-violet-600 hover:bg-violet-500 text-white hover:shadow-lg hover:shadow-violet-500/20'
                  : 'bg-white/5 text-white/20 cursor-not-allowed'
              }`}>
              {loading ? 'Kreiranje profila...' : 'Počni test'}
            </button>

            {!canContinue && (
              <p className="text-white/20 text-xs text-center">
                {needsCity && !form.city ? 'Izaberi grad.' : ''} Ime, godine, email i lozinka su obavezni.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
