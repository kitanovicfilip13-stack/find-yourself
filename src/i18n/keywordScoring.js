// Keyword matching za slobodan odgovor
// Svaka grupa ključnih reči mapira se na scoring dimenzije

const keywordGroups = [
  {
    scores: { C: 2 },
    keywords: [
      'dizajn', 'design', 'kreativ', 'crtam', 'crtanje', 'slika', 'slikam', 'foto', 'fotografij',
      'film', 'video', 'vizual', 'art', 'umetnost', 'estetik', 'boja', 'color', 'colour',
      'pisanje', 'pisem', 'tekst', 'priča', 'sadržaj', 'content', 'kreiran', 'pravljenje',
      'animacij', 'illustr', 'grafik', 'brend', 'brand', 'creative', 'artistic',
    ],
  },
  {
    scores: { T: 2 },
    keywords: [
      'kod', 'kodiranje', 'code', 'coding', 'programir', 'aplikacij', 'app', 'softver', 'software',
      'web', 'developer', 'razvoj', 'computer', 'računar', 'data', 'podaci', 'ai', 'veštačka',
      'algoritam', 'tech', 'tehnologij', 'it ', 'informatik', 'baza', 'database', 'sistem',
      'backend', 'frontend', 'react', 'python', 'javascript', 'java ', 'c++', 'analitik',
      'matematika', 'logika', 'inženjering', 'engineering', 'mašinsko', 'machine learning',
    ],
  },
  {
    scores: { P: 2 },
    keywords: [
      'ljudi', 'osobe', 'tim', 'ekipa', 'team', 'social', 'komunikacij', 'komunikacija',
      'pomoć', 'pomažem', 'savet', 'savetujem', 'mentor', 'coach', 'kouč', 'razgovor',
      'zajednica', 'community', 'prijatelji', 'odnosi', 'veza', 'psihologij', 'terapij',
      'edukacij', 'učenje', 'podučavam', 'nastava', 'škola', 'students', 'učenici',
      'volontir', 'ngo', 'humanitar', 'empatijem', 'slušam', 'podrška',
    ],
  },
  {
    scores: { B: 2 },
    keywords: [
      'biznis', 'business', 'firma', 'kompanij', 'novac', 'zarada', 'profit', 'prihod',
      'prodaja', 'prodajem', 'marketing', 'market', 'startup', 'preduzetništvo', 'preduzetnik',
      'investicij', 'finansij', 'berzа', 'akcije', 'rast', 'skaliranje', 'scale',
      'menadžment', 'management', 'strategij', 'strategija', 'lider', 'vođa', 'direktor',
      'osnivanje', 'osnivam', 'vlastit', 'sopstveni', 'firma', 'agencij',
    ],
  },
  {
    scores: { O: 2 },
    keywords: [
      'plan', 'planiram', 'organizacij', 'organizujem', 'organizovan', 'struktur', 'sistem',
      'red', 'efikasnost', 'efikasan', 'upravljanje', 'projekat', 'cilj', 'ciljevi',
      'rokovi', 'deadline', 'proces', 'procedur', 'protokol', 'analiza', 'istraživanje',
      'detalji', 'precizan', 'metodičan', 'logistik', 'koordinacij', 'administracij',
    ],
  },
  {
    scores: { N: 2 },
    keywords: [
      'priroda', 'napolju', 'outdoor', 'sport', 'fizički', 'fizičko', 'telo', 'fitnes',
      'ruke', 'rukama', 'majstor', 'gradim', 'pravim', 'pravljenje', 'trčanje', 'trčim',
      'planina', 'trekking', 'trek', 'bicikl', 'plivanje', 'zdravlje', 'medicina',
      'kuvanje', 'kuvam', 'zanatlija', 'zanat', 'drvo', 'drvodelja', 'mehaničar',
      'poljoprivreda', 'biljke', 'životinje', 'veterinar', 'ekologij', 'okolina',
    ],
  },
  // Introvert/Extrovert hints
  {
    scores: { I: 1 },
    keywords: ['sam', 'sama', 'sami', 'tišina', 'miran', 'mirno', 'intrivert', 'introvert', 'povučen', 'rezervisan'],
  },
  {
    scores: { E: 1 },
    keywords: ['ekstravert', 'extrovert', 'društven', 'energičan', 'aktivno', 'dinamično', 'zabava', 'party', 'eventi'],
  },
  // Risk hints
  {
    scores: { R: 1 },
    keywords: ['avantur', 'rizik', 'hrabar', 'slobod', 'promene', 'novo', 'izazov', 'challenge'],
  },
  {
    scores: { S: 1 },
    keywords: ['sigurnost', 'stabilnost', 'stabilan', 'siguran', 'mirno', 'rutina', 'predvidivo'],
  },
]

export function scoreFromText(text) {
  if (!text || text.trim().length < 3) return null

  const lower = text.toLowerCase()
  const totalScores = {}
  let matched = false

  keywordGroups.forEach(({ keywords, scores }) => {
    const hasMatch = keywords.some(kw => lower.includes(kw))
    if (hasMatch) {
      matched = true
      Object.entries(scores).forEach(([dim, val]) => {
        totalScores[dim] = (totalScores[dim] || 0) + val
      })
    }
  })

  // Ako nema matcha ali ima tekst: daj neutralan mali score svakoj dimenziji
  if (!matched && text.trim().length > 5) {
    return { C: 1, T: 1, P: 1, B: 1, O: 1, N: 1 }
  }

  return matched ? totalScores : null
}
