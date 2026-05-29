import { useState } from 'react'
import { useLanguage } from '../../LanguageContext'
import { FadeUp } from '../shared/ScrollReveal'

const faqs = {
  sr: [
    {
      q: 'Da li je besplatno?',
      a: 'Da, test i osnovni profil su potpuno besplatni. Nema skrivenih troškova ni obaveze registracije.',
    },
    {
      q: 'Koliko dugo traje test?',
      a: 'Oko 8 minuta. Ima 20 pitanja i možeš ga pauzirati i nastaviti kad god hoćeš.',
    },
    {
      q: 'Moram li da se registrujem?',
      a: 'Ne moraš. Možeš da uradiš test i vidiš rezultate bez naloga. Nalog ti treba samo ako želiš da sačuvaš profil.',
    },
    {
      q: 'Ko vidi moje odgovore?',
      a: 'Niko osim tebe. Tvoji odgovori se čuvaju lokalno u tvom browseru i nisu vidljivi nama ni trećim stranama.',
    },
    {
      q: 'Koliko su tačni rezultati?',
      a: 'Rezultati se zasnivaju na tvojim odgovorima i algoritmima koji mapiraju ličnost kroz 6 dimenzija. Što iskrenije odgovaraš, to su rezultati korisniji.',
    },
  ],
  en: [
    {
      q: 'Is it free?',
      a: 'Yes, the test and basic profile are completely free. No hidden costs, no registration required.',
    },
    {
      q: 'How long does the test take?',
      a: 'About 8 minutes. It has 20 questions and you can pause and continue whenever you want.',
    },
    {
      q: 'Do I need to register?',
      a: "You don't have to. You can take the test and see results without an account. An account is only needed if you want to save your profile.",
    },
    {
      q: 'Who sees my answers?',
      a: 'Nobody but you. Your answers are stored locally in your browser and are not visible to us or any third parties.',
    },
    {
      q: 'How accurate are the results?',
      a: 'Results are based on your answers and algorithms that map personality across 6 dimensions. The more honestly you answer, the more useful the results.',
    },
  ],
}

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)

  return (
    <button
      onClick={() => setOpen(!open)}
      className="w-full text-left glass rounded-2xl p-5 transition-all duration-200 hover:border-violet-500/20 group"
    >
      <div className="flex items-center justify-between gap-4">
        <span className="text-white font-medium text-sm md:text-base">{q}</span>
        <svg
          className={`w-4 h-4 text-white/30 flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-45' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      </div>
      {open && (
        <p className="mt-3 text-white/50 text-sm leading-relaxed border-t border-white/5 pt-3">{a}</p>
      )}
    </button>
  )
}

export default function FAQ() {
  const { lang } = useLanguage()
  const items = faqs[lang] || faqs.sr

  return (
    <section id="faq" className="py-28 px-6">
      <div className="max-w-2xl mx-auto">
        <FadeUp className="text-center mb-12">
          <span className="text-violet-400 text-sm font-medium tracking-widest uppercase mb-4 block">FAQ</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            {lang === 'sr' ? 'Česta pitanja.' : 'Common questions.'}
          </h2>
        </FadeUp>

        <div className="space-y-3">
          {items.map((item, i) => (
            <FadeUp key={i} delay={i * 0.08}>
              <FAQItem q={item.q} a={item.a} />
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}
