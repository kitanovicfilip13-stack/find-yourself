import { useState } from 'react'

export default function RadNaSebiLanding({ onPocni, onBack }) {
  const [openArea, setOpenArea] = useState(null)
  const [openFaq, setOpenFaq] = useState(null)

  const phases = [
    { num: '01', name: 'Stabilizacija', period: 'Nedelja 1-2', areas: ['Um i psihologija', 'Zdravlje i telo'] },
    { num: '02', name: 'Identitet', period: 'Mesec 1-2', areas: ['Karakter i disciplina', 'Duhovnost i smisao'] },
    { num: '03', name: 'Veze', period: 'Mesec 2-3', areas: ['Odnosi i ljubav', 'Društvene veštine'] },
    { num: '04', name: 'Rast', period: 'Mesec 3-5', areas: ['Znanje i obrazovanje', 'Kreativnost i hobiji'] },
    { num: '05', name: 'Svet', period: 'Mesec 4-6', areas: ['Karijera i posao', 'Finansije i biznis'] },
  ]

  const areas = [
    { name: 'Um i psihologija', desc: 'Razumevanje sopstvenih emocija, upravljanje stresom i razvijanje mentalnog zdravlja.' },
    { name: 'Zdravlje i telo', desc: 'Fizička aktivnost, ishrana, san i briga o telu kao temelj svega ostalog.' },
    { name: 'Odnosi i ljubav', desc: 'Zdravi odnosi, komunikacija sa partnerom i građenje duboke povezanosti.' },
    { name: 'Društvene veštine', desc: 'Komunikacija, networking, samopouzdanje u društvu i javni nastup.' },
    { name: 'Karijera i posao', desc: 'Pronalaženje pravog puta, napredovanje i izgradnja profesionalnog identiteta.' },
    { name: 'Finansije i biznis', desc: 'Upravljanje novcem, štednja, investiranje i finansijska nezavisnost.' },
    { name: 'Znanje i obrazovanje', desc: 'Učenje novih veština, čitanje, kursevi i konstantno napredovanje.' },
    { name: 'Karakter i disciplina', desc: 'Navike, rutine, samodisciplina i izgradnja čvrstog karaktera.' },
    { name: 'Kreativnost i hobiji', desc: 'Kreativno izražavanje, hobi projekti i bavljenje onim što te ispunjava.' },
    { name: 'Duhovnost i smisao', desc: 'Pronalaženje svrhe, meditacija, zahvalnost i unutrašnji mir.' },
  ]

  const features = [
    { name: 'Dnevni zadaci', desc: 'Svaki dan dobijaš konkretan zadatak prilagođen tvojoj fazi razvoja.' },
    { name: 'Zašto to radi', desc: 'Uz svaki zadatak dobijaš objašnjenje zasnovano na nauci i psihologiji.' },
    { name: 'Praćenje napretka', desc: 'Kalendar i vizuelni prikaz koliko si daleko stigao.' },
    { name: 'AI koji te poznaje', desc: 'Personalizovani saveti na osnovu tvog profila i dosadašnjeg napretka.' },
    { name: 'Email podsetnici', desc: 'Nežni podsetnici koji te drže na pravom putu bez pritiska.' },
    { name: 'Biblioteka znanja', desc: 'Članci, knjige i resursi za svaku oblast ličnog razvoja.' },
  ]

  const faqs = [
    { q: 'Koliko vremena treba dnevno?', a: 'Između 15 i 30 minuta dnevno. Zadaci su osmišljeni da budu kratki ali efektni, tako da možeš da ih uklopiš u bilo koji raspored.' },
    { q: 'Da li moram da idem redom kroz faze?', a: 'Preporučujemo da pratiš redosled jer je svaka faza temelj za sledeću. Ali imaš slobodu da prilagođavaš tempo sebi.' },
    { q: 'Šta ako preskočim neki dan?', a: 'Ništa strašno. Program se prilagođava tvom tempu. Bitno je da se vratiš, ne da budeš savršen.' },
    { q: 'Da li je ovo za mene ako sam potpuni početnik?', a: 'Apsolutno. Program kreće od osnova i vodi te korak po korak. Ne trebaš nikakvo predznanje.' },
  ]

  return (
    <div className="min-h-screen bg-[#080810]">
      <nav className="fixed top-0 left-0 right-0 z-50 py-4 bg-[#080810]/90 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            Pronađi Sebe
          </button>
          <button onClick={onPocni} className="bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium px-5 py-2 rounded-lg transition-all hover:shadow-lg hover:shadow-violet-500/20">
            Počni procenu
          </button>
        </div>
      </nav>

      <div className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/20 bg-violet-500/10 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            <span className="text-violet-300 text-xs font-medium uppercase tracking-widest">Personalni razvoj</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6">
            Život se ne menja<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">slučajno.</span>
          </h1>
          <p className="text-white/40 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Strukturisan program koji te vodi kroz 10 oblasti ličnog razvoja, korak po korak, sa zadacima prilagođenim tebi.
          </p>
          <button onClick={onPocni} className="px-8 py-4 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white font-bold rounded-xl transition-all hover:shadow-xl hover:shadow-violet-500/25 text-sm">
            Počni besplatnu procenu
          </button>
        </div>
      </div>

      <div className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-3 text-center">Zašto redosled menja sve</h2>
          <p className="text-white/30 text-sm text-center mb-12 max-w-lg mx-auto">Ne možeš graditi karijeru ako nemaš stabilnost. Ne možeš imati zdrave odnose ako ne poznaješ sebe. Redosled je ključ.</p>
          <div className="space-y-4">
            {phases.map((phase) => (
              <div key={phase.num} className="rounded-2xl border border-white/5 bg-white/[0.02] p-5 md:p-6 flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex items-center gap-4 md:w-64 flex-shrink-0">
                  <span className="text-2xl font-black text-violet-500/40">{phase.num}</span>
                  <div>
                    <p className="text-white font-semibold text-sm">{phase.name}</p>
                    <p className="text-white/25 text-xs">{phase.period}</p>
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {phase.areas.map((a) => (
                    <span key={a} className="px-3 py-1.5 rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs">{a}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-3 text-center">10 oblasti koje pokrivamo</h2>
          <p className="text-white/30 text-sm text-center mb-12">Klikni na oblast da saznaš više.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {areas.map((area, i) => (
              <button key={area.name} onClick={() => setOpenArea(openArea === i ? null : i)}
                className={`text-left rounded-2xl border p-5 transition-all duration-200 ${
                  openArea === i
                    ? 'border-violet-500/40 bg-violet-500/10'
                    : 'border-white/5 bg-white/[0.02] hover:border-white/15'
                }`}>
                <div className="flex items-center justify-between">
                  <p className={`font-semibold text-sm ${openArea === i ? 'text-white' : 'text-white/60'}`}>{area.name}</p>
                  <svg className={`w-4 h-4 transition-transform ${openArea === i ? 'rotate-180 text-violet-400' : 'text-white/20'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </div>
                {openArea === i && (
                  <p className="text-white/40 text-xs leading-relaxed mt-3">{area.desc}</p>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-3 text-center">Šta sve dobijaš</h2>
          <p className="text-white/30 text-sm text-center mb-12">Sve što ti treba na jednom mestu.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {features.map((f) => (
              <div key={f.name} className="rounded-2xl border border-white/5 bg-white/[0.02] p-5">
                <p className="text-white font-semibold text-sm mb-2">{f.name}</p>
                <p className="text-white/35 text-xs leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-20 px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-12 text-center">Česta pitanja</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <button key={i} onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full text-left rounded-2xl border border-white/5 bg-white/[0.02] p-5 transition-all">
                <div className="flex items-center justify-between">
                  <p className="text-white font-medium text-sm">{faq.q}</p>
                  <svg className={`w-4 h-4 flex-shrink-0 ml-4 transition-transform ${openFaq === i ? 'rotate-180 text-violet-400' : 'text-white/20'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </div>
                {openFaq === i && (
                  <p className="text-white/40 text-xs leading-relaxed mt-3">{faq.a}</p>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="py-20 px-6">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-4">Spreman/na da počneš?</h2>
          <p className="text-white/35 text-sm mb-8">Besplatna procena ti pokazuje gde si sada i odakle da kreneš.</p>
          <button onClick={onPocni} className="px-8 py-4 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white font-bold rounded-xl transition-all hover:shadow-xl hover:shadow-violet-500/25 text-sm">
            Počni procenu
          </button>
        </div>
      </div>
    </div>
  )
}
