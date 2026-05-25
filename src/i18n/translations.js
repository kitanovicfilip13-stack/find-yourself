export const translations = {
  en: {
    // Navbar
    nav: {
      brand: 'Find Yourself',
      links: ['How it works', 'What you get', 'Example'],
      signin: 'Sign in',
      start: 'Get started',
    },

    // Hero
    hero: {
      badge: 'Self-discovery platform',
      headline1: 'Discover who ',
      headline2: 'you are.',
      headline3: "Find what you're",
      headline4: 'meant to do.',
      sub: 'We help you understand yourself and your personality, discover your talents and interests, and learn how to apply them in a career that truly fits you.',
      cta: 'Start your journey',
      ctaSub: 'See how it works',
      social: 'people found their direction',
      scroll: 'Scroll',
    },

    // Problem
    problem: {
      tag: 'The problem',
      title: 'Sound familiar?',
      sub: "Most young people feel exactly this way. It's not a personal failure. it's a system that never taught you how to know yourself.",
      footer: "If you nodded to any of these. you're in the right place.",
      items: [
        {
          emoji: '🌀',
          title: 'You feel lost',
          desc: "Everyone around you seems to know what they want, but you have no idea where to even start.",
        },
        {
          emoji: '😶',
          title: "You don't know yourself",
          desc: "You can't articulate what you're good at, what drives you, or what kind of life you want.",
        },
        {
          emoji: '📋',
          title: "Generic advice doesn't work",
          desc: '"Follow your passion" is meaningless when you don\'t know what your passion is.',
        },
        {
          emoji: '⏳',
          title: 'Time is slipping away',
          desc: "You're watching others build careers while you're still figuring out the basics.",
        },
      ],
    },

    // How it works
    how: {
      tag: 'The process',
      title: 'How it works',
      sub: 'Three steps from confusion to clarity.',
      steps: [
        {
          number: '01',
          title: 'Answer 20 questions',
          desc: 'Go through a thoughtful questionnaire about your energy, values, interests, fears, and ambitions. No right or wrong answers.',
          tag: '~8 minutes',
          accent: 'text-violet-400',
        },
        {
          number: '02',
          title: 'We analyze your profile',
          desc: 'Our scoring system maps your answers across 6 core dimensions: creativity, tech, people, business, organization, and hands-on work.',
          tag: 'Instant results',
          accent: 'text-blue-400',
        },
        {
          number: '03',
          title: 'Get your personal report',
          desc: 'Receive a detailed profile with your personality type, top strengths, career directions, skills to develop, and a 7-day action plan.',
          tag: 'Fully personalized',
          accent: 'text-cyan-400',
        },
      ],
    },

    // What you get
    what: {
      tag: 'What you get',
      title: 'Your complete profile',
      sub: "Not a personality type from the 90s. A modern, actionable self-portrait that helps you make decisions.",
      features: [
        { icon: '🧬', title: 'Personality Summary', desc: 'A clear, honest breakdown of how you think, feel, and operate. in language that actually resonates.' },
        { icon: '⚡', title: 'Your Strengths', desc: 'The specific skills, traits, and natural tendencies that give you an edge when used intentionally.' },
        { icon: '🔮', title: 'Career Directions', desc: "Not generic lists. tailored career paths that match your unique combination of interests and abilities." },
        { icon: '📈', title: 'Skills to Learn', desc: 'Concrete, prioritized skills you should develop based on your profile and chosen direction.' },
        { icon: '📅', title: '7-Day Action Plan', desc: 'A real, executable first week. not vague advice, but actual actions you can take starting today.' },
        { icon: '🎯', title: 'First Path', desc: 'One clear starting point. The single most aligned direction based on everything about you.' },
      ],
    },

    // Example result
    example: {
      tag: 'Example output',
      title: 'What your result looks like',
      sub: 'Real output, fictional person.',
      personalityLabel: 'Personality type',
      personalityName: 'The Creative Strategist',
      personalityDesc: "You think in systems but feel in stories. You need creative freedom within a clear structure. Independent work energizes you, but you crave meaning and impact in everything you build.",
      strengthsLabel: 'Top strengths',
      strengths: ['Strategic thinking', 'Visual communication', 'Self-directed learning', 'Pattern recognition', 'Writing'],
      careersLabel: 'Career directions',
      careers: [
        { label: 'UX / Product Design', match: 94 },
        { label: 'Content Strategy', match: 89 },
        { label: 'Brand & Marketing', match: 81 },
      ],
      firstStepLabel: 'Your first step',
      firstStep: "Spend 30 minutes today redesigning something you use daily (a menu, an app screen, a form). Post it anywhere. even just a note in your phone. The goal is proof that you can make ideas tangible.",
      note: 'Your result will be unique to you.',
      cta: 'Get my profile →',
    },

    // Final CTA
    cta: {
      badge: 'Free to start',
      title1: "You're one test away",
      title2: 'from knowing yourself.',
      sub: "Stop waiting for clarity to arrive on its own. It takes 8 minutes. The answers might surprise you.",
      btn: 'Start your journey',
      fine: 'No account required · Takes ~8 minutes · Completely free',
    },

    // Footer
    footer: {
      brand: 'Find Yourself',
      links: ['About', 'Privacy', 'Terms', 'Contact'],
      copy: '© 2025 Find Yourself. Built for the lost ones.',
      comingSoon: 'Coming soon',
      upcoming: ['AI Chat', 'Career Courses', 'Partner Companies', 'Job Matching', 'Community'],
    },

    // Dashboard
    dashboard: {
      welcome: 'Welcome back',
      title: 'Your profile',
      continueTest: 'Continue test',
      continueDesc: "You have an unfinished test. Pick up where you left off.",
    },

    // Onboarding
    onboarding: {
      back: 'Back',
      brand: 'Find Yourself',
      continue: 'Continue',
      seeResults: 'See my results',
      customPlaceholder: 'None of the above fits. write your own answer...',
      customLabel: 'Your answer',
      customHint: 'Writing your own answer will also affect your result.',
    },

    // Result page
    result: {
      save: 'Save',
      retake: 'Retake test',
      personalityLabel: 'Your personality type',
      dimensionsLabel: 'Your profile dimensions',
      dimNames: { C: 'Creative', T: 'Tech', P: 'People', B: 'Business', O: 'Organization', N: 'Hands-on' },
      strengthsLabel: 'Your strengths',
      watchLabel: 'Watch out for',
      careersLabel: 'Best career directions',
      topMatch: 'Top match',
      skillsLabel: 'Skills to develop',
      planLabel: 'Your 7-day action plan',
      firstPathLabel: 'Your suggested first path',
      firstPathSub: 'This is the single clearest direction based on your full profile. Start here. everything else will follow.',
      comingSoon: 'Coming soon on Find Yourself',
      upcoming: [
        { icon: '💬', label: 'AI Chat', desc: 'Go deeper with guided AI conversations' },
        { icon: '📚', label: 'Career Courses', desc: 'Curated paths built for your type' },
        { icon: '🏢', label: 'Partner Companies', desc: 'Companies hiring people like you' },
        { icon: '🤝', label: 'Job Matching', desc: 'Get matched to your ideal roles' },
      ],
      notSatisfied: 'Not satisfied with your result?',
      retakeLink: 'Take the test again',
      profileDesc: (primary, secondary, isIntrovert, isRiskTaker) =>
        `Your profile is shaped by ${primary} as your dominant strength, with ${secondary} as a powerful secondary. You're ${isIntrovert ? 'more introverted' : 'more extroverted'} and ${isRiskTaker ? 'thrive when pushing boundaries.' : 'prefer building on solid foundations.'}`,
    },
  },

  sr: {
    // Navbar
    nav: {
      brand: 'Pronađi Sebe',
      links: ['Kako radi', 'Šta dobijaš', 'Primer'],
      signin: 'Prijavi se',
      start: 'Počni',
    },

    // Hero
    hero: {
      badge: 'Platforma za lični razvoj',
      headline1: 'Saznaj ko si, šta te pokreće',
      headline2: 'i u čemu možeš postati najbolji.',
      headline3: 'Pronađi put koji',
      headline4: 'je tvoj.',
      sub: 'Pomažemo ti da razumeš sebe i svoju ličnost, otkriješ svoje talente i interesovanja i naučiš kako da ih primeniš u karijeri koja ti zaista odgovara.',
      cta: 'Počni svoje putovanje',
      ctaSub: 'Kako funkcioniše?',
      social: 'mladih pronašlo svoj put',
      scroll: 'Skroluj',
    },

    // Problem
    problem: {
      tag: 'Prepoznaješ li se?',
      title: 'Nisi jedini koji se ovako oseća.',
      sub: 'Ogromna većina mladih prolazi kroz isto. Nije problem u tebi. Problem je što te niko nikada nije naučio kako da saznaš ko si i šta hoćeš.',
      footer: 'Ako si se prepoznao u bilo čemu od ovoga, na pravom si mestu.',
      items: [
        {
          emoji: '🌀',
          title: 'Osećaš se izgubljeno',
          desc: 'Svi oko tebe kao da znaju šta rade sa svojim životom, a tebi se čini da još uvek nisi ni krenuo.',
        },
        {
          emoji: '😶',
          title: 'Ne znaš šta te zapravo zanima',
          desc: 'Nisi siguran u čemu si dobar, šta te ispunjava, niti kakav život uopšte želiš.',
        },
        {
          emoji: '📋',
          title: 'Saveti koje dobijaš ne pomažu',
          desc: '"Radi ono što voliš" zvuči lepo, ali potpuno je beskorisno kad ne znaš šta to uopšte jeste.',
        },
        {
          emoji: '⏳',
          title: 'Osećaj da vreme prolazi',
          desc: 'Gledaš kako vršnjaci napreduju, a ti i dalje stojiš u mestu i čekaš da nešto "klikne".',
        },
      ],
    },

    // How it works
    how: {
      tag: 'Kako radi',
      title: 'Tri koraka do jasnoće',
      sub: 'Bez komplikacija. Za manje od 10 minuta dobijaš konkretne odgovore o sebi.',
      steps: [
        {
          number: '01',
          title: 'Odgovori na 20 pitanja',
          desc: 'Pitanja pokrivaju tvoje vrednosti, interesovanja, energiju i ambicije. Nema tačnih ni pogrešnih odgovora, samo budi iskren.',
          tag: '~8 minuta',
          accent: 'text-violet-400',
        },
        {
          number: '02',
          title: 'Analiziramo ko si',
          desc: 'Tvoji odgovori se analiziraju kroz 6 oblasti: kreativnost, tehnologija, rad s ljudima, biznis, organizacija i praktičan rad.',
          tag: 'Odmah na kraju',
          accent: 'text-blue-400',
        },
        {
          number: '03',
          title: 'Dobijaš svoj lični profil',
          desc: 'Tip ličnosti, tvoje najveće snage, karijerni pravci koji ti odgovaraju, veštine koje vredi razvijati i konkretan plan za prvih 7 dana.',
          tag: 'Potpuno personalizovano',
          accent: 'text-cyan-400',
        },
      ],
    },

    // What you get
    what: {
      tag: 'Šta dobijaš',
      title: 'Tvoj lični profil',
      sub: 'Nije to jedan od onih testova ličnosti iz devedesetih. Ovo je praktičan, moderan uvid u sebe koji ti zaista pomaže da doneseš odluku.',
      features: [
        { icon: '🧬', title: 'Ko si kao osoba', desc: 'Jasan i iskren opis kako razmišljaš, kako funkcionišeš i šta te pokreće, rečima koje će ti zazvučati poznato.' },
        { icon: '⚡', title: 'Tvoje snage', desc: 'Konkretne stvari u kojima prirodno dobro ideš i koje, kada ih svesno koristiš, daju rezultate.' },
        { icon: '🔮', title: 'Karijerni pravci', desc: 'Ne opšte preporuke, nego oblasti i uloge koje stvarno odgovaraju tvom profilu i kombinaciji interesovanja.' },
        { icon: '📈', title: 'Šta da naučiš', desc: 'Veštine koje ima smisla razvijati upravo ti, na osnovu toga ko si i kuda ideš.' },
        { icon: '📅', title: 'Plan za prvih 7 dana', desc: 'Konkretni koraci koje možeš da uradiš već ove nedelje. Ne teorija, nego akcija.' },
        { icon: '🎯', title: 'Tvoj sledeći korak', desc: 'Jedan jasan pravac od kojeg možeš da počneš. Bez paralize od previše opcija.' },
      ],
    },

    // Example result
    example: {
      tag: 'Primer profila',
      title: 'Ovako izgleda rezultat',
      sub: 'Pravi profil, izmišljena osoba.',
      personalityLabel: 'Tip ličnosti',
      personalityName: 'Kreativni strateg',
      personalityDesc: "Razmišljaš u sistemima, ali osećaš kroz priče. Trebaš slobodu da stvaraš, ali i jasnu strukturu unutar koje radiš. Samostalni rad te puni energijom, a najsrećniji si kada ono što radiš ima neki viši smisao.",
      strengthsLabel: 'Najveće snage',
      strengths: ['Strateško razmišljanje', 'Vizuelna komunikacija', 'Samostalno učenje', 'Uočavanje obrazaca', 'Pisanje'],
      careersLabel: 'Karijerni pravci',
      careers: [
        { label: 'UX / Dizajn proizvoda', match: 94 },
        { label: 'Kreiranje sadržaja', match: 89 },
        { label: 'Brend i marketing', match: 81 },
      ],
      firstStepLabel: 'Tvoj sledeći korak',
      firstStep: "Provedi 30 minuta danas i redizajniraj nešto što koristiš svaki dan: aplikaciju, formular ili meni. Objavi to bilo gde, makar kao belešku u telefonu. Poen nije da bude savršeno, nego da dokažeš sebi da možeš da pretvoriš ideju u nešto konkretno.",
      note: 'Tvoj rezultat će biti jedinstven za tebe.',
      cta: 'Napravi moj profil →',
    },

    // Final CTA
    cta: {
      badge: 'Besplatno',
      title1: 'Jedan test između tebe',
      title2: 'i odgovora koje tražiš.',
      sub: 'Prestani da čekaš da se nešto samo desi. Osam minuta, 20 pitanja i dobijaš više jasnoće nego za godinu dana lutanja.',
      btn: 'Počni svoje putovanje',
      fine: 'Bez registracije · Traje oko 8 minuta · Potpuno besplatno',
    },

    // Footer
    footer: {
      brand: 'Pronađi Sebe',
      links: ['O nama', 'Privatnost', 'Uslovi korišćenja', 'Kontakt'],
      copy: '© 2025 Pronađi Sebe. Za sve koji još traže.',
      comingSoon: 'Uskoro',
      upcoming: ['AI Chat', 'Kursevi', 'Partnerske kompanije', 'Job Matching', 'Zajednica'],
    },

    // Dashboard
    dashboard: {
      welcome: 'Zdravo',
      title: 'Tvoj profil',
      continueTest: 'Nastavi test',
      continueDesc: 'Nisi završio test. Nastavi odakle si stao.',
    },

    // Onboarding
    onboarding: {
      back: 'Nazad',
      brand: 'Pronađi Sebe',
      continue: 'Dalje',
      seeResults: 'Vidi moj profil',
      customPlaceholder: 'Ništa od ponuđenog mi ne odgovara; napiši šta misliš...',
      customLabel: 'Tvoj odgovor',
      customHint: 'Slobodan odgovor se takođe uzima u obzir pri izračunavanju rezultata.',
    },

    // Result page
    result: {
      save: 'Sačuvaj',
      retake: 'Uradi test ponovo',
      personalityLabel: 'Tvoj tip ličnosti',
      dimensionsLabel: 'Tvoj profil',
      dimNames: { C: 'Kreativnost', T: 'Tehnologija', P: 'Rad s ljudima', B: 'Biznis', O: 'Organizacija', N: 'Praktičan rad' },
      strengthsLabel: 'Tvoje snage',
      watchLabel: 'Na šta da paziš',
      careersLabel: 'Karijerni pravci koji ti odgovaraju',
      topMatch: 'Najbolje poklapanje',
      skillsLabel: 'Šta vredi naučiti',
      planLabel: 'Plan za prvih 7 dana',
      firstPathLabel: 'Tvoj sledeći korak',
      firstPathSub: 'Ovo je najjasniji pravac na osnovu svega što si odgovorio. Počni odavde, sve ostalo će doći samo.',
      comingSoon: 'Uskoro na Pronađi Sebe',
      upcoming: [
        { icon: '💬', label: 'AI Chat', desc: 'Razgovaraj sa AI mentorom o svom profilu' },
        { icon: '📚', label: 'Kursevi', desc: 'Kursevi prilagođeni tvom tipu ličnosti' },
        { icon: '🏢', label: 'Partnerske kompanije', desc: 'Firme koje traže ljude baš poput tebe' },
        { icon: '🤝', label: 'Job Matching', desc: 'Pronađi posao koji odgovara tvom profilu' },
      ],
      notSatisfied: 'Nisi zadovoljan rezultatom?',
      retakeLink: 'Uradi test još jednom',
      profileDesc: (primary, secondary, isIntrovert, isRiskTaker) =>
        `Tvoj profil najviše oblikuje ${primary}, uz snažno prisustvo ${secondary}. Po prirodi si ${isIntrovert ? 'više okrenut ka sebi' : 'društven i otvoren'} i ${isRiskTaker ? 'napredovaš kada preuzimaš rizik i izlaziš iz zone komfora.' : 'najbolje rezultate postižeš kada gradiš na sigurnim temeljima.'}`,
    },
  },
}
