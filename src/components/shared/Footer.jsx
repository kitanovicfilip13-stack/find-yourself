import { useState } from 'react'
import { useLanguage } from '../../LanguageContext'

const content = {
  en: {
    About: {
      title: 'About Find Yourself',
      body: `Find Yourself is a self-discovery platform built for young people (18–25) who feel lost about their career direction.

We believe clarity isn't something you wait for. it's something you build. Our 20-question assessment maps your personality, strengths, and interests across 6 core dimensions to give you a personalized career profile.

No generic advice. No clichés. Just honest, actionable insight about who you are and where you could go.

Built by a small team that was once just as lost.`,
    },
    Privacy: {
      title: 'Privacy Policy',
      body: `We take your privacy seriously.

What we collect: Your email address (for login), and your test answers (stored locally in your browser).

What we don't do: We don't sell your data. We don't share it with third parties. We don't use it for advertising.

Your test results are stored in your browser's local storage. they stay on your device unless you choose to delete them.

We use Supabase for authentication, which follows industry-standard security practices.

Questions? Email us at privacy@findyourself.app`,
    },
    Terms: {
      title: 'Terms of Use',
      body: `By using Find Yourself, you agree to the following:

1. This platform is intended for personal self-discovery purposes only.
2. Our results are based on a personality assessment algorithm. they are not a substitute for professional career counseling.
3. You are responsible for any information you submit.
4. We reserve the right to update or discontinue features at any time.
5. Premium features, once available, are subject to their own billing terms.

Find Yourself is provided "as is" without warranties of any kind. Use at your own discretion.`,
    },
    Contact: {
      title: 'Contact Us',
      body: `We'd love to hear from you.

General inquiries: hello@findyourself.app
Privacy concerns: privacy@findyourself.app
Partnership & business: partners@findyourself.app

We're a small team, so responses may take 1–3 business days. We read every message.

If you have feedback about your results or suggestions for improving the platform. we especially want to hear that.`,
    },
  },
  sr: {
    'O nama': {
      title: 'O Pronađi Sebe',
      body: `Pronađi Sebe je platforma za samootkrivanje napravljena za mlade ljude (18–25) koji se osećaju izgubljeno u pogledu karijernog pravca.

Verujemo da odgovori nisu nešto što se čeka. to je nešto što se gradi. Naš upitnik od 20 pitanja mapira tvoju ličnost, potencijale i interesovanja kroz 6 ključnih dimenzija kako bi ti dao personalizovani karijerni profil.

Nema generičkih saveta. Nema floskula. Samo iskrean, akcioni uvid u to ko si i gde možeš da ideš.

Napravili su ga ljudi koji su i sami bili izgubljeni.`,
    },
    Privatnost: {
      title: 'Politika privatnosti',
      body: `Ozbiljno shvatamo tvoju privatnost.

Šta prikupljamo: Tvoju email adresu (za prijavu) i tvoje odgovore na test (čuvaju se lokalno u tvom browseru).

Šta ne radimo: Ne prodajemo tvoje podatke. Ne delimo ih sa trećim stranama. Ne koristimo ih za oglašavanje.

Tvoji rezultati testa se čuvaju u lokalnom storage-u tvog browsera. ostaju na tvom uređaju osim ako ih ne obrišeš.

Koristimo Supabase za autentifikaciju, koji prati industrijske standarde bezbednosti.

Pitanja? Piši nam na privacy@findyourself.app`,
    },
    Uslovi: {
      title: 'Uslovi korišćenja',
      body: `Korišćenjem Pronađi Sebe, prihvataš sledeće:

1. Ova platforma je namenjena isključivo za lično samootkrivanje.
2. Naši rezultati se zasnivaju na algoritmu za procenu ličnosti. nisu zamena za profesionalno karijerono savetovanje.
3. Odgovoran si za sve informacije koje uneseš.
4. Zadržavamo pravo da ažuriramo ili ukinemo funkcije u bilo kom trenutku.
5. Premium funkcije, kada budu dostupne, podležu sopstvenim uslovima naplate.

Pronađi Sebe se pruža "kakvo jeste" bez ikakvih garancija.`,
    },
    Kontakt: {
      title: 'Kontaktiraj nas',
      body: `Rado bismo čuli od tebe.

Opšta pitanja: hello@findyourself.app
Pitanja o privatnosti: privacy@findyourself.app
Partnerstvo i biznis: partners@findyourself.app

Mali smo tim, pa odgovori mogu da potraju 1–3 radna dana. Čitamo svaku poruku.

Ako imaš povratne informacije o rezultatima ili predloge za poboljšanje platforme, posebno to želimo da čujemo.`,
    },
  },
}

function FooterModal({ title, body, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg glass rounded-3xl border border-white/10 p-8 shadow-2xl shadow-black/50 max-h-[80vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-5 right-5 text-white/30 hover:text-white transition-colors">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-xl font-bold text-white mb-6">{title}</h2>
        <div className="space-y-4">
          {body.split('\n\n').map((para, i) => (
            <p key={i} className="text-white/50 text-sm leading-relaxed whitespace-pre-line">{para}</p>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Footer() {
  const { t, lang } = useLanguage()
  const f = t.footer
  const [activeModal, setActiveModal] = useState(null)

  const modalContent = content[lang] || content.en

  return (
    <>
      <footer className="border-t border-white/5 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="logo" className="w-7 h-7" />
              <span className="font-semibold text-white text-sm tracking-tight">{f.brand}</span>
            </div>

            <div className="flex items-center gap-8">
              {f.links.map((item) => (
                <button
                  key={item}
                  onClick={() => setActiveModal(item)}
                  className="text-white/30 hover:text-white/70 text-sm transition-colors duration-200"
                >
                  {item}
                </button>
              ))}
            </div>

            <p className="text-white/20 text-sm">{f.copy}</p>
          </div>

          <div className="mt-10 pt-8 border-t border-white/5">
            <p className="text-white/20 text-xs text-center mb-4 uppercase tracking-widest">{f.comingSoon}</p>
            <div className="flex flex-wrap gap-3 justify-center">
              {f.upcoming.map((item) => (
                <span key={item} className="px-3 py-1.5 rounded-full text-xs text-white/20 border border-white/5">{item}</span>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {activeModal && modalContent[activeModal] && (
        <FooterModal
          title={modalContent[activeModal].title}
          body={modalContent[activeModal].body}
          onClose={() => setActiveModal(null)}
        />
      )}
    </>
  )
}
