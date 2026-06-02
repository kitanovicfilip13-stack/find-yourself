const srednjaTypes = {
  TECH: {
    name: 'Tehnička škola',
    smer: 'IT / Elektrotehnika / Mašinstvo',
    desc: 'Prirodno ti idu egzaktni predmeti, logičko razmišljanje i razumevanje kako stvari funkcionišu. Tehnička škola ti daje praktično znanje koje je odmah primenjivo i odlična je osnova za upis tehničkog fakulteta.',
    examples: ['IT škola', 'Elektrotehnička škola', 'Mašinska škola', 'Građevinska škola'],
    color: '#8b5cf6',
  },
  MED: {
    name: 'Medicinska škola',
    smer: 'Medicina / Farmacija / Zdravstvo',
    desc: 'Fascinira te kako funkcioniše ljudsko telo, zanima te zdravlje i voliš da pomažeš drugima. Medicinska ili farmaceutska škola je prirodan pravac i direktan put ka medicinskim studijama.',
    examples: ['Medicinska škola', 'Farmaceutska škola', 'Škola za medicinske sestre', 'Stomatološka škola'],
    color: '#10b981',
  },
  ART: {
    name: 'Umetnička škola',
    smer: 'Umetnost / Dizajn / Muzika',
    desc: 'Kreativnost je tvoja najjača strana. Umetničke škole daju slobodu izražavanja i razvijaju talenat koji je teško razviti na drugom mestu.',
    examples: ['Umetnička škola', 'Muzička škola', 'Škola za dizajn', 'Škola za primenjene umetnosti'],
    color: '#ec4899',
  },
  SOC: {
    name: 'Gimnazija',
    smer: 'Društveno-jezički smer',
    desc: 'Odlično si u jezicima, komunikaciji i humanističkim naukama. Društveno-jezički smer gimnazije ti daje široku osnovu i priprema te za studije prava, psihologije, komunikacija i srodnih oblasti.',
    examples: ['Jezička gimnazija', 'Društveno-jezički smer', 'Filološka gimnazija'],
    color: '#f59e0b',
  },
  SCI: {
    name: 'Gimnazija',
    smer: 'Prirodno-matematički smer',
    desc: 'Odlično ti idu egzaktni i prirodni predmeti. Prirodno-matematički smer gimnаzije je odlična osnova za studije medicine, tehnike, prirodnih nauka i srodnih oblasti.',
    examples: ['Matematička gimnazija', 'Prirodno-matematički smer', 'Prirodno-naučni smer'],
    color: '#3b82f6',
  },
  ECO: {
    name: 'Ekonomska škola',
    smer: 'Ekonomija / Menadžment / Biznis',
    desc: 'Zanima te svet biznisa, organizacija i finansija. Ekonomska škola ti daje praktično znanje o poslovanju i otvara vrata ekonomskim i menadžment fakultetima.',
    examples: ['Ekonomska škola', 'Poslovna škola', 'Škola za menadžment'],
    color: '#06b6d4',
  },
}

const fakultetTypes = {
  TECH: {
    name: 'Tehnički fakultet',
    smer: 'IT / Inženjering / Arhitektura',
    desc: 'Logičko razmišljanje, matematika i razumevanje sistema su tvoje jake strane. Tehnički fakulteti nude odlične karijerne prilike i visoke plate, a IT tržište nikad nije bilo veće.',
    examples: ['Elektrotehnički fakultet (ETF)', 'Fakultet organizacionih nauka (FON)', 'Mašinski fakultet', 'Arhitektonski fakultet', 'Građevinski fakultet'],
    color: '#8b5cf6',
  },
  MED: {
    name: 'Medicinski fakultet',
    smer: 'Medicina / Farmacija / Stomatologija',
    desc: 'Voliš biologiju, zanima te zdravlje i želiš direktno da pomažeš ljudima. Medicinski put je zahtevan ali neverovatno ispunjavajući, svaki dan pravio/la bi stvarnu razliku.',
    examples: ['Medicinski fakultet', 'Farmaceutski fakultet', 'Stomatološki fakultet', 'Visoka medicinska škola'],
    color: '#10b981',
  },
  ECO: {
    name: 'Ekonomski fakultet',
    smer: 'Ekonomija / Menadžment / Marketing',
    desc: 'Privlači te poslovni svet, preduzetništvo i razumevanje tržišta. Ekonomski i menadžment fakulteti otvaraju širok spektar karijernih mogućnosti u skoro svakoj industriji.',
    examples: ['Ekonomski fakultet', 'Fakultet organizacionih nauka (FON)', 'Beogradska bankarska akademija', 'Visoka poslovna škola'],
    color: '#f59e0b',
  },
  LAW: {
    name: 'Pravni fakultet',
    smer: 'Pravo / Politikologija / Diplomatija',
    desc: 'Zanimaju te zakoni, pravda i kako funkcioniše sistem. Pravni fakultet otvara vrata advokature, diplomatije, javne uprave i korporativnog prava.',
    examples: ['Pravni fakultet', 'Fakultet političkih nauka', 'Diplomatska akademija'],
    color: '#3b82f6',
  },
  SOC: {
    name: 'Filozofski / Humanistički fakultet',
    smer: 'Psihologija / Komunikacije / Pedagogija',
    desc: 'Zanima te razumevanje ljudi, kulture i društva. Ovi fakulteti razvijaju empatiju, kritičko razmišljanje i veštine koje su potrebne u gotovo svakom poslu.',
    examples: ['Filozofski fakultet', 'Psihologija', 'Fakultet dramskih umetnosti', 'Komunikacije i mediji'],
    color: '#06b6d4',
  },
  ART: {
    name: 'Umetnički fakultet',
    smer: 'Dizajn / Umetnost / Mediji',
    desc: 'Kreativnost je tvoj adut. Umetničke akademije i dizajn škole razvijaju taj talenat do profesionalnog nivoa i otvaraju vrata u kreativnoj industriji koja stalno raste.',
    examples: ['Fakultet primenjenih umetnosti', 'Akademija umetnosti', 'Fakultet likovnih umetnosti', 'Dizajn studije'],
    color: '#ec4899',
  },
  SCI: {
    name: 'Prirodno-matematički fakultet',
    smer: 'Matematika / Fizika / Hemija / Biologija',
    desc: 'Fasciniraju te prirodne nauke i voliš duboko razumevanje kako svet funkcioniše. PMF i srodni fakulteti otvaraju vrata nauci, istraživanju i akademskoj karijeri.',
    examples: ['Prirodno-matematički fakultet (PMF)', 'Hemijski fakultet', 'Biološki fakultet', 'Geografski fakultet'],
    color: '#a855f7',
  },
}

export function computeSegmentResult(answers, segment) {
  const scores = {}

  answers.forEach(answer => {
    if (answer.scores) {
      Object.entries(answer.scores).forEach(([key, val]) => {
        scores[key] = (scores[key] || 0) + val
      })
    }
  })

  const types = segment === 'srednja' ? srednjaTypes : fakultetTypes

  // Sortiraj po skorovima i uzmi top 3
  const ranked = Object.entries(scores)
    .filter(([key]) => types[key])
    .sort((a, b) => b[1] - a[1])

  if (ranked.length === 0) return null

  const [primaryKey] = ranked[0]
  const alternatives = ranked.slice(1, 3).map(([key]) => types[key]).filter(Boolean)

  return {
    primary: types[primaryKey],
    alternatives,
    scores,
  }
}
