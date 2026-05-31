import { useLanguage } from '../../LanguageContext'
import { FadeUp } from '../shared/ScrollReveal'

const testimonials = {
  sr: [
    {
      text: 'Nisam znao šta da studiram. Posle testa sam konačno imao konkretnu ideju i počeo da idem u pravom smeru.',
      name: 'Marko T.',
      age: '21, Beograd',
      initials: 'M',
      color: '#8b5cf6',
    },
    {
      text: 'Mislila sam da su svi testovi ličnosti isti. Ovo je prvi koji mi je zaista rekao nešto što nisam znala o sebi.',
      name: 'Ana K.',
      age: '23, Novi Sad',
      initials: 'A',
      color: '#3b82f6',
    },
    {
      text: 'Za 8 minuta dobio sam jasniju sliku o sebi nego za godinu dana razmišljanja. Preporučujem svima koji se osećaju izgubljeno.',
      name: 'Stefan R.',
      age: '19, Niš',
      initials: 'S',
      color: '#06b6d4',
    },
  ],
  en: [
    {
      text: "I didn't know what to study. After the test I finally had a concrete idea and started moving in the right direction.",
      name: 'Mark T.',
      age: '21, Belgrade',
      initials: 'M',
      color: '#8b5cf6',
    },
    {
      text: 'I thought all personality tests were the same. This is the first one that actually told me something I didn\'t know about myself.',
      name: 'Ana K.',
      age: '23, Novi Sad',
      initials: 'A',
      color: '#3b82f6',
    },
    {
      text: 'In 8 minutes I got a clearer picture of myself than in a year of thinking. I recommend it to everyone who feels lost.',
      name: 'Stefan R.',
      age: '19, Niš',
      initials: 'S',
      color: '#06b6d4',
    },
  ],
}

export default function Testimonials() {
  const { lang } = useLanguage()
  const items = testimonials[lang] || testimonials.sr

  return (
    <section id="iskustva" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <FadeUp className="text-center mb-16">
          <span className="text-violet-400 text-sm font-medium tracking-widest uppercase mb-4 block">
            {lang === 'sr' ? 'Iskustva' : 'Testimonials'}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            {lang === 'sr' ? 'Šta kažu drugi' : 'What others say'}
          </h2>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {items.map((item, i) => (
            <FadeUp key={i} delay={i * 0.1} className="h-full">
              <div className="glass rounded-2xl p-6 h-full flex flex-col justify-between">
                <div>
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, s) => (
                      <svg key={s} className="w-4 h-4 text-violet-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-white/60 text-sm leading-relaxed mb-6">"{item.text}"</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                    style={{ backgroundColor: item.color }}>
                    {item.initials}
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">{item.name}</p>
                    <p className="text-white/30 text-xs">{item.age}</p>
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}
