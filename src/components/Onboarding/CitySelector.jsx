import { useState } from 'react'

// Svi gradovi Srbije koji imaju srednju školu + mapiranje na regionalni centar za bazu podataka
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
  'Novi Kneževac', 'Novi Pazar', 'Novi Sad', 'Novo Mesto', 'Odžaci',
  'Osečina', 'Pančevo', 'Paraćin', 'Pećinci', 'Petrovac na Mlavi',
  'Pirot', 'Požarevac', 'Požega', 'Preševo', 'Priboj', 'Prijepolje',
  'Prokuplje', 'Rača', 'Raška', 'Rekovac', 'Rit', 'Ruma', 'Šabac',
  'Šid', 'Smederevo', 'Smederevska Palanka', 'Sokobanja', 'Sombor',
  'Srbobran', 'Sremska Mitrovica', 'Sremski Karlovci', 'Stara Pazova',
  'Subotica', 'Surdulica', 'Svilajnac', 'Svrljig', 'Titel', 'Topola',
  'Trgovište', 'Trstenik', 'Tutin', 'Ub', 'Užice', 'Valjevo', 'Varvarin',
  'Velika Plana', 'Veliko Gradište', 'Vladičin Han', 'Vladimirci', 'Vlasotince',
  'Vranje', 'Vrnjačka Banja', 'Vršac', 'Zaječar', 'Žabari', 'Žagubica',
  'Žitište', 'Žitorađa', 'Zrenjanin', 'Zvezdara',
]

// Mapiranje manjih gradova na regionalni centar za bazu škola
export const gradToRegion = {
  // Beograd region
  'Pančevo': 'Beograd', 'Smederevo': 'Beograd', 'Požarevac': 'Beograd',
  'Mladenovac': 'Beograd', 'Obrenovac': 'Beograd', 'Lazarevac': 'Beograd',
  'Velika Plana': 'Beograd', 'Smederevska Palanka': 'Beograd',
  'Petrovac na Mlavi': 'Beograd', 'Golubac': 'Beograd', 'Malo Crniće': 'Beograd',
  'Stara Pazova': 'Beograd', 'Inđija': 'Beograd', 'Sremska Mitrovica': 'Beograd',
  'Ruma': 'Beograd', 'Šid': 'Beograd', 'Pećinci': 'Beograd',
  'Sremski Karlovci': 'Novi Sad', 'Zvezdara': 'Beograd',

  // Vojvodina – Novi Sad
  'Bačka Palanka': 'Novi Sad', 'Bačka Topola': 'Novi Sad', 'Bački Petrovac': 'Novi Sad',
  'Bečej': 'Novi Sad', 'Srbobran': 'Novi Sad', 'Temerin': 'Novi Sad',
  'Odžaci': 'Novi Sad', 'Apatin': 'Novi Sad', 'Sombor': 'Novi Sad',
  'Kula': 'Novi Sad', 'Vrbas': 'Novi Sad',

  // Vojvodina – Subotica
  'Kanjiža': 'Subotica', 'Ada': 'Subotica', 'Mali Iđoš': 'Subotica',
  'Novi Kneževac': 'Subotica', 'Čoka': 'Subotica',

  // Vojvodina – Zrenjanin / Kikinda
  'Zrenjanin': 'Novi Sad', 'Kikinda': 'Novi Sad', 'Nova Crnja': 'Novi Sad',
  'Žitište': 'Novi Sad', 'Novi Bečej': 'Novi Sad',

  // Vojvodina – Pančevo / Vršac
  'Vršac': 'Beograd', 'Bela Crkva': 'Beograd', 'Alibunar': 'Beograd',
  'Kovin': 'Beograd', 'Kovačica': 'Beograd', 'Titel': 'Novi Sad',

  // Šumadija i Zapadna Srbija – Kragujevac
  'Aranđelovac': 'Kragujevac', 'Batočina': 'Kragujevac', 'Knić': 'Kragujevac',
  'Lapovo': 'Kragujevac', 'Rača': 'Kragujevac', 'Topola': 'Kragujevac',
  'Jagodina': 'Kragujevac', 'Ćuprija': 'Kragujevac', 'Paraćin': 'Kragujevac',
  'Svilajnac': 'Kragujevac', 'Despotovac': 'Kragujevac', 'Rekovac': 'Kragujevac',
  'Ub': 'Kragujevac', 'Lajkovac': 'Valjevo', 'Mionica': 'Valjevo',
  'Osečina': 'Valjevo', 'Krupanj': 'Šabac', 'Mali Zvornik': 'Šabac',
  'Bogatić': 'Šabac', 'Vladimirci': 'Šabac',

  // Čačak region
  'Gornji Milanovac': 'Čačak', 'Lučani': 'Čačak', 'Ivanjica': 'Čačak',
  'Arilje': 'Čačak', 'Kosjerić': 'Čačak',

  // Moravički / Raški – Kraljevo / Kruševac
  'Vrnjačka Banja': 'Kruševac', 'Trstenik': 'Kruševac', 'Aleksandrovac': 'Kruševac',
  'Brus': 'Kruševac', 'Ćićevac': 'Kruševac', 'Varvarin': 'Kruševac',
  'Raška': 'Kraljevo', 'Tutin': 'Novi Pazar', 'Novi Pazar': 'Novi Pazar',

  // Zapadna Srbija – Užice
  'Bajina Bašta': 'Užice', 'Požega': 'Užice', 'Čajetina': 'Užice',
  'Priboj': 'Užice', 'Prijepolje': 'Užice', 'Nova Varoš': 'Užice',

  // Loznica
  'Ljubovija': 'Loznica',

  // Niš region
  'Aleksinac': 'Niš', 'Merošina': 'Niš', 'Doljevac': 'Niš',
  'Gadžin Han': 'Niš', 'Ražanj': 'Niš', 'Svrljig': 'Niš',
  'Bela Palanka': 'Pirot', 'Babušnica': 'Pirot', 'Dimitrovgrad': 'Pirot',

  // Leskovac region
  'Vlasotince': 'Leskovac', 'Lebane': 'Leskovac', 'Medveđa': 'Leskovac',
  'Bojnik': 'Leskovac',

  // Vranje region
  'Vladičin Han': 'Vranje', 'Surdulica': 'Vranje', 'Bosilegrad': 'Vranje',
  'Preševo': 'Vranje', 'Bujanovac': 'Vranje', 'Trgovište': 'Vranje',

  // Zaječar / Bor region
  'Knjaževac': 'Zaječar', 'Sokobanja': 'Zaječar', 'Boljevac': 'Zaječar',
  'Negotin': 'Zaječar', 'Kladovo': 'Zaječar', 'Majdanpek': 'Bor',
  'Kučevo': 'Bor', 'Žagubica': 'Bor', 'Žabari': 'Bor',

  // Prokuplje / Kuršumlija → Niš
  'Prokuplje': 'Niš', 'Kuršumlija': 'Niš', 'Blace': 'Niš', 'Žitorađa': 'Niš',

  // Bač / Bačka → Novi Sad
  'Bač': 'Novi Sad',
}

export default function CitySelector({ segment, onSelect, onBack }) {
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)

  const label = segment === 'srednja'
    ? 'U kom gradu želiš da upišeš srednju školu?'
    : 'U kom gradu želiš da studiraš?'

  const filtered = query.trim().length >= 1
    ? sviGradovi.filter(g => g.toLowerCase().startsWith(query.toLowerCase())).slice(0, 8)
    : []

  const handleSelect = (grad) => {
    setQuery(grad)
    setFocused(false)
    onSelect(grad)
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
        <div className="w-full max-w-lg">
          <div className="text-center mb-10">
            <span className="text-violet-400 text-xs font-medium tracking-widest uppercase mb-4 block">Korak 2 od 2</span>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">{label}</h1>
            <p className="text-white/40 text-sm">Ukucaj naziv svog grada.</p>
          </div>

          {/* Search input */}
          <div className="relative">
            <div className={`flex items-center gap-3 px-5 py-4 rounded-2xl border transition-all duration-200 ${
              focused ? 'border-violet-500/50 bg-violet-500/5' : 'border-white/10 bg-white/[0.03]'
            }`}>
              <svg className="w-5 h-5 text-white/30 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setTimeout(() => setFocused(false), 150)}
                placeholder="npr. Beograd, Niš, Kragujevac..."
                className="flex-1 bg-transparent text-white placeholder-white/25 outline-none text-base"
                autoComplete="off"
              />
              {query && (
                <button onClick={() => setQuery('')} className="text-white/25 hover:text-white/60 transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Dropdown */}
            {focused && filtered.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-2 rounded-2xl border border-white/10 overflow-hidden z-50"
                style={{ background: '#0f0f1e' }}>
                {filtered.map((grad, i) => (
                  <button
                    key={grad}
                    onMouseDown={() => handleSelect(grad)}
                    className={`w-full text-left px-5 py-3.5 text-white/70 hover:text-white hover:bg-white/5 transition-colors text-sm flex items-center gap-3 ${
                      i < filtered.length - 1 ? 'border-b border-white/5' : ''
                    }`}
                  >
                    <svg className="w-4 h-4 text-white/20 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                    {grad}
                  </button>
                ))}
              </div>
            )}
          </div>

          <p className="text-white/20 text-xs text-center mt-5">
            Ako tvoj grad nije na listi, izaberi najbliži veći grad.
          </p>
        </div>
      </div>
    </div>
  )
}
