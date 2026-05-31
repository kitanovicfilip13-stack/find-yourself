import { useLanguage } from '../../LanguageContext'
import { FadeUp } from '../shared/ScrollReveal'

const testimonials = {
  sr: [
    {
      text: 'Iskreno nisam očekivala ništa posebno, mislila sam da će biti neka glupa i nepovezana pitanja. Ali neke stvari su me stvarno pogodile, posebno deo o tome kako reagujem pod stresom. Poslala sam rezultate mami i rekla "eto, sad znaš zašto sam ovakva".',
      name: 'Nina',
      age: '23',
      initials: 'N',
      color: '#8b5cf6',
    },
    {
      text: 'Uradio sam test u 2 ujutru kad nisam mogao da spavam i razmišljao sam o tome dal sam na pravom putu sa poslom. Ne kažem da mi je promenilo život al neke stvari su mi pomogle oko razmišljanja. Dobra stvar.',
      name: 'Srki',
      age: '27',
      initials: 'S',
      color: '#3b82f6',
    },
    {
      text: 'Neke stvari tačne, neke manje. Al generalno da, to sam ja. Iznenadio me deo o karijernim pravcima jer su predložili nešto o čemu nikad nisam razmišljala a zvuči zanimljivo.',
      name: 'Teodora',
      age: '24',
      initials: 'T',
      color: '#06b6d4',
    },
    {
      text: 'Radila sam slične testove pre i uvek su bili previše optimistični, kao svi su "lideri i kreativci". Ovaj je bio iskreniji, rekao mi je i neke stvari koje nisam volela da čujem al verovatno su tačne.',
      name: 'Nikolina',
      age: '27',
      initials: 'N',
      color: '#10b981',
    },
    {
      text: 'Uradila dva puta sa razmakom od mesec dana i dobila skoro iste rezultate. To mi je dalo poverenje da je to zaista nešto u meni a ne random odgovori.',
      name: 'Katarina',
      age: '25',
      initials: 'K',
      color: '#f59e0b',
    },
    {
      text: 'Korisno. Nisam prosvetljena al sam imala jedan od onih momenata "aaa zato to radim". Za 10 minuta koliko traje, vredelo je.',
      name: 'Sara',
      age: '22',
      initials: 'S',
      color: '#ec4899',
    },
    {
      text: 'Jedina zamerka je što bih volela još konkretnih predloga šta da radim sa tim informacijama. Al opis ličnosti 1/1, prepoznala sam sebe odmah.',
      name: 'Jovana',
      age: '28',
      initials: 'J',
      color: '#a855f7',
    },
  ],
  en: [
    {
      text: 'Honestly I wasn\'t expecting much, I thought it would be generic questions. But some things really hit home, especially the part about how I react under stress.',
      name: 'Nina',
      age: '23',
      initials: 'N',
      color: '#8b5cf6',
    },
    {
      text: 'I took the test at 2am when I couldn\'t sleep and was thinking about whether I\'m on the right path. Not saying it changed my life but some things helped me think. Good stuff.',
      name: 'Srki',
      age: '27',
      initials: 'S',
      color: '#3b82f6',
    },
    {
      text: 'Some things accurate, some less so. But generally yes, that\'s me. The career directions part surprised me because they suggested something I\'d never considered but sounds interesting.',
      name: 'Teodora',
      age: '24',
      initials: 'T',
      color: '#06b6d4',
    },
    {
      text: 'I\'ve done similar tests before and they were always too optimistic. This one was more honest, it told me things I didn\'t want to hear but they\'re probably true.',
      name: 'Nikolina',
      age: '27',
      initials: 'N',
      color: '#10b981',
    },
    {
      text: 'Took it twice a month apart and got almost the same results. That gave me confidence that it\'s actually something in me and not random answers.',
      name: 'Katarina',
      age: '25',
      initials: 'K',
      color: '#f59e0b',
    },
    {
      text: 'Useful. I\'m not enlightened but I had one of those "oh, that\'s why I do that" moments. For 10 minutes, it was worth it.',
      name: 'Sara',
      age: '22',
      initials: 'S',
      color: '#ec4899',
    },
    {
      text: 'My only complaint is I\'d like more concrete suggestions on what to do with the information. But the personality description is spot on, I recognized myself immediately.',
      name: 'Jovana',
      age: '28',
      initials: 'J',
      color: '#a855f7',
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
