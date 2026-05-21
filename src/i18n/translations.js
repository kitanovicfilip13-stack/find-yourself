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
      sub: 'A self-discovery platform that helps you understand your personality, strengths, interests and possible career paths. No fluff, no clichés — just clarity.',
      cta: 'Start your journey',
      ctaSub: 'See how it works',
      social: 'people found their direction',
      scroll: 'Scroll',
    },

    // Problem
    problem: {
      tag: 'The problem',
      title: 'Sound familiar?',
      sub: "Most young people feel exactly this way. It's not a personal failure — it's a system that never taught you how to know yourself.",
      footer: "If you nodded to any of these — you're in the right place.",
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
        { icon: '🧬', title: 'Personality Summary', desc: 'A clear, honest breakdown of how you think, feel, and operate — in language that actually resonates.' },
        { icon: '⚡', title: 'Your Strengths', desc: 'The specific skills, traits, and natural tendencies that give you an edge when used intentionally.' },
        { icon: '🔮', title: 'Career Directions', desc: "Not generic lists — tailored career paths that match your unique combination of interests and abilities." },
        { icon: '📈', title: 'Skills to Learn', desc: 'Concrete, prioritized skills you should develop based on your profile and chosen direction.' },
        { icon: '📅', title: '7-Day Action Plan', desc: 'A real, executable first week — not vague advice, but actual actions you can take starting today.' },
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
      firstStep: "Spend 30 minutes today redesigning something you use daily (a menu, an app screen, a form). Post it anywhere — even just a note in your phone. The goal is proof that you can make ideas tangible.",
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

    // Onboarding
    onboarding: {
      back: 'Back',
      brand: 'Find Yourself',
      continue: 'Continue',
      seeResults: 'See my results',
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
      firstPathSub: 'This is the single clearest direction based on your full profile. Start here — everything else will follow.',
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
      links: ['Kako funkcioniše', 'Šta dobijaš', 'Primer'],
      signin: 'Prijava',
      start: 'Počni',
    },

    // Hero
    hero: {
      badge: 'Platforma za samootkrivanje',
      headline1: 'Otkrij ko ',
      headline2: 'si ti.',
      headline3: 'Pronađi šta je',
      headline4: 'tvoje mesto.',
      sub: 'Platforma za samootkrivanje koja ti pomaže da razumeš svoju ličnost, snage, interesovanja i moguće karijerne pravce. Bez floskula — samo jasnoća.',
      cta: 'Počni svoje putovanje',
      ctaSub: 'Kako funkcioniše',
      social: 'ljudi pronašlo svoj pravac',
      scroll: 'Skroluj',
    },

    // Problem
    problem: {
      tag: 'Problem',
      title: 'Zvuči poznato?',
      sub: 'Većina mladih se tačno ovako oseća. To nije tvoj neuspeh — to je sistem koji te nikad nije naučio kako da poznaš sebe.',
      footer: 'Ako si klimnuo glavom na bilo šta od ovoga — na pravom si mestu.',
      items: [
        {
          emoji: '🌀',
          title: 'Osećaš se izgubljeno',
          desc: 'Čini ti se da svi oko tebe znaju šta hoće, a ti nemaš pojma ni odakle da počneš.',
        },
        {
          emoji: '😶',
          title: 'Ne poznaješ sebe',
          desc: 'Ne znaš da objasniš u čemu si dobar, šta te pokreće, niti kakav život zapravo želiš.',
        },
        {
          emoji: '📋',
          title: 'Generički saveti ne pomažu',
          desc: '"Prati svoju strast" nema smisla kada ne znaš ni šta je tvoja strast.',
        },
        {
          emoji: '⏳',
          title: 'Vreme protiče',
          desc: 'Gledaš kako drugi grade karijere, a ti još uvek pokušavaš da shvatiš osnove.',
        },
      ],
    },

    // How it works
    how: {
      tag: 'Proces',
      title: 'Kako funkcioniše',
      sub: 'Tri koraka od zbunjenosti do jasnoće.',
      steps: [
        {
          number: '01',
          title: 'Odgovori na 20 pitanja',
          desc: 'Prođi kroz promišljeni upitnik o svojoj energiji, vrednostima, interesovanjima, strahovima i ambicijama. Nema tačnih ni pogrešnih odgovora.',
          tag: '~8 minuta',
          accent: 'text-violet-400',
        },
        {
          number: '02',
          title: 'Analiziramo tvoj profil',
          desc: 'Naš sistem bodovanja mapira tvoje odgovore kroz 6 dimenzija: kreativnost, tehnologija, rad s ljudima, biznis, organizacija i praktičan rad.',
          tag: 'Trenutni rezultati',
          accent: 'text-blue-400',
        },
        {
          number: '03',
          title: 'Dobijaš lični izveštaj',
          desc: 'Detaljan profil sa tvojim tipom ličnosti, snagama, karijernim pravcima, veštinama koje treba da razviješ i planom za 7 dana.',
          tag: 'Potpuno personalizovano',
          accent: 'text-cyan-400',
        },
      ],
    },

    // What you get
    what: {
      tag: 'Šta dobijaš',
      title: 'Tvoj kompletan profil',
      sub: 'Nije tip ličnosti iz 90-ih. Moderni, akcioni auto-portret koji ti pomaže da donosiš odluke.',
      features: [
        { icon: '🧬', title: 'Sažetak ličnosti', desc: 'Jasan, iskren opis kako razmišljaš, osećaš i funkcionišeš — rečnikom koji zaista odgovara.' },
        { icon: '⚡', title: 'Tvoje snage', desc: 'Konkretne veštine, osobine i prirodne sklonosti koje ti daju prednost kada ih koristiš svesno.' },
        { icon: '🔮', title: 'Karijerni pravci', desc: 'Nisu generičke liste — prilagođeni karijerni putevi koji odgovaraju tvojoj jedinstvnoj kombinaciji interesovanja.' },
        { icon: '📈', title: 'Veštine za razvoj', desc: 'Konkretne, prioritizovane veštine koje treba da razviješ na osnovu svog profila i odabranog pravca.' },
        { icon: '📅', title: 'Plan za 7 dana', desc: 'Prava, izvršna prva nedelja — ne nejasni saveti, nego stvarne akcije koje možeš da počneš danas.' },
        { icon: '🎯', title: 'Tvoj prvi put', desc: 'Jedan jasan polazni punkt. Jedinstven pravac koji najviše odgovara baš tebi.' },
      ],
    },

    // Example result
    example: {
      tag: 'Primer rezultata',
      title: 'Kako izgleda tvoj rezultat',
      sub: 'Pravi rezultat, izmišljena osoba.',
      personalityLabel: 'Tip ličnosti',
      personalityName: 'Kreativni Strateg',
      personalityDesc: "Razmišljaš sistemima, ali osećaš kroz priče. Trebaš kreativnu slobodu unutar jasne strukture. Samostalni rad te puni energijom, ali žudiš za smislom i uticajem u svemu što gradiš.",
      strengthsLabel: 'Glavne snage',
      strengths: ['Strateško razmišljanje', 'Vizuelna komunikacija', 'Samostalno učenje', 'Prepoznavanje obrazaca', 'Pisanje'],
      careersLabel: 'Karijerni pravci',
      careers: [
        { label: 'UX / Dizajn proizvoda', match: 94 },
        { label: 'Kreiranje sadržaja', match: 89 },
        { label: 'Brend & Marketing', match: 81 },
      ],
      firstStepLabel: 'Tvoj prvi korak',
      firstStep: "Provedi 30 minuta danas redizajnirajući nešto što koristiš svakodnevno (meni, ekran aplikacije, formular). Postavi to bilo gde — čak i kao belešku u telefonu. Cilj je dokaz da možeš da pretвориš ideje u nešto opipljivo.",
      note: 'Tvoj rezultat će biti jedinstven za tebe.',
      cta: 'Dobij moj profil →',
    },

    // Final CTA
    cta: {
      badge: 'Besplatno za početak',
      title1: 'Jedan test te deli',
      title2: 'od upoznavanja sebe.',
      sub: 'Prestani da čekaš da jasnoća dođe sama. Traje 8 minuta. Odgovori te mogu iznenaditi.',
      btn: 'Počni svoje putovanje',
      fine: 'Nije potreban nalog · Traje ~8 minuta · Potpuno besplatno',
    },

    // Footer
    footer: {
      brand: 'Pronađi Sebe',
      links: ['O nama', 'Privatnost', 'Uslovi', 'Kontakt'],
      copy: '© 2025 Pronađi Sebe. Napravljeno za izgubljene.',
      comingSoon: 'Uskoro',
      upcoming: ['AI Chat', 'Kursevi karijere', 'Partnerske kompanije', 'Job Matching', 'Zajednica'],
    },

    // Onboarding
    onboarding: {
      back: 'Nazad',
      brand: 'Pronađi Sebe',
      continue: 'Nastavi',
      seeResults: 'Pogledaj rezultate',
    },

    // Result page
    result: {
      save: 'Sačuvaj',
      retake: 'Uradi ponovo',
      personalityLabel: 'Tvoj tip ličnosti',
      dimensionsLabel: 'Dimenzije tvog profila',
      dimNames: { C: 'Kreativnost', T: 'Tehnologija', P: 'Rad s ljudima', B: 'Biznis', O: 'Organizacija', N: 'Praktičan rad' },
      strengthsLabel: 'Tvoje snage',
      watchLabel: 'Pazi na ovo',
      careersLabel: 'Najbolji karijerni pravci',
      topMatch: 'Najbolje poklapanje',
      skillsLabel: 'Veštine za razvoj',
      planLabel: 'Tvoj plan za 7 dana',
      firstPathLabel: 'Tvoj predloženi prvi put',
      firstPathSub: 'Ovo je jedinstven, najjasniji pravac na osnovu tvog kompletnog profila. Počni odavde — sve ostalo će doći samo.',
      comingSoon: 'Uskoro na Pronađi Sebe',
      upcoming: [
        { icon: '💬', label: 'AI Chat', desc: 'Idi dublje uz vođene AI razgovore' },
        { icon: '📚', label: 'Kursevi karijere', desc: 'Putevi prilagođeni tvom tipu' },
        { icon: '🏢', label: 'Partnerske kompanije', desc: 'Kompanije koje zapošljavaju ljude poput tebe' },
        { icon: '🤝', label: 'Job Matching', desc: 'Budi matchovan za idealne uloge' },
      ],
      notSatisfied: 'Nisi zadovoljan rezultatom?',
      retakeLink: 'Uradi test ponovo',
      profileDesc: (primary, secondary, isIntrovert, isRiskTaker) =>
        `Tvoj profil oblikuje ${primary} kao dominantna snaga, sa ${secondary} kao snažnom sekundarnom dimenzijom. Si ${isIntrovert ? 'više introvertovan' : 'više ekstravertovan'} i ${isRiskTaker ? 'napredovaš kada guraš granice.' : 'voliš da gradiš na solidnim temeljima.'}`,
    },
  },
}
