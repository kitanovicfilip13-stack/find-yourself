// Automatsko generisanje srednjih ciljeva i zadataka na osnovu glavnog cilja

const templates = [
  {
    keywords: ['marketing', 'marketar', 'brend', 'brand', 'reklama', 'kampanja', 'content', 'socijal'],
    mediums: [
      {
        title: 'Nauči osnove marketinga',
        tasks: ['Pročitaj jednu marketing knjigu', 'Završi besplatni Google Analytics kurs', 'Prati 5 marketing stručnjaka na LinkedIn-u'],
      },
      {
        title: 'Izgradi portfolio',
        tasks: ['Napravi 2 case studija kampanja', 'Pokreni vlastiti projekat ili blog', 'Dokumentuj sve što si uradio/la'],
      },
      {
        title: 'Napravi prvu konekciju u industriji',
        tasks: ['Pošalji 3 poruke profesionalcima u marketingu', 'Prisustvuj jednom marketinškom događaju', 'Priključi se jednoj online zajednici'],
      },
      {
        title: 'Apliciraj na prvu poziciju',
        tasks: ['Napiši CV prilagođen marketingu', 'Apliciraj na 5 oglasa', 'Pripremi se za intervju pitanjima iz struke'],
      },
    ],
  },
  {
    keywords: ['programer', 'programiranje', 'kod', 'developer', 'softver', 'aplikacija', 'web', 'backend', 'frontend', 'it'],
    mediums: [
      {
        title: 'Savladaj osnove programiranja',
        tasks: ['Odaberi jedan jezik (Python ili JavaScript)', 'Završi 30 dana daily coding challenge', 'Napravi prvu funkcionalnu aplikaciju'],
      },
      {
        title: 'Izgradi GitHub portfolio',
        tasks: ['Postavi 3 projekta na GitHub', 'Napiši README za svaki projekat', 'Doprinesi jednom open-source projektu'],
      },
      {
        title: 'Pripemi se za tržište rada',
        tasks: ['Reši 20 algoritamskih zadataka na LeetCode', 'Napravi LinkedIn profil sa GitHub linkom', 'Apliciraj na 3 junior pozicije ili stažiranja'],
      },
    ],
  },
  {
    keywords: ['prodaja', 'prodavac', 'sales', 'klijent', 'pregovaranje'],
    mediums: [
      {
        title: 'Nauči prodajne tehnike',
        tasks: ['Pročitaj Never Split the Difference', 'Vežbaj cold calling na simulacijama', 'Nauči osnove CRM alata'],
      },
      {
        title: 'Stekni prvo iskustvo',
        tasks: ['Pronađi mentora iz prodaje', 'Odradi 10 simuliranih prodajnih razgovora', 'Apliciraj na junior sales poziciju'],
      },
      {
        title: 'Izgradi mrežu kontakata',
        tasks: ['Dodaj 50 relevantnih kontakata na LinkedIn', 'Prisustvuj jednom networking događaju', 'Zatraži preporuku od profesora ili mentora'],
      },
    ],
  },
  {
    keywords: ['dizajn', 'dizajner', 'ux', 'ui', 'grafika', 'vizual', 'figma', 'kreativa'],
    mediums: [
      {
        title: 'Savladaj alate',
        tasks: ['Nauči Figmu kroz YouTube tutorijale', 'Redizajniraj 3 poznata interfejsa kao vežbu', 'Napravi design system za izmišljeni brend'],
      },
      {
        title: 'Izgradi portfolio',
        tasks: ['Objavi radove na Behance ili Dribbble', 'Napravi personal branding paket', 'Uzmi jedan pro bono projekat'],
      },
      {
        title: 'Pripremi se za karijeru',
        tasks: ['Prati 5 top dizajnera i analiziraj njihov rad', 'Apliciraj na 3 junior dizajn pozicije', 'Pripremi portfolio prezentaciju za intervju'],
      },
    ],
  },
  {
    keywords: ['menadžer', 'lider', 'tim', 'rukovodilac', 'direktor', 'upravljanje'],
    mediums: [
      {
        title: 'Razvij liderske veštine',
        tasks: ['Pročitaj jednu knjigu o leadership-u', 'Preuzmi vođstvo u nekom projektu ili grupi', 'Nauči osnove davanja i primanja feedback-a'],
      },
      {
        title: 'Stekni iskustvo u koordinaciji',
        tasks: ['Organizuj tim projekat od A do Z', 'Nauči osnove project managementa (Scrum/Kanban)', 'Mentoriši jednog mlađeg kolegu ili vršnjaka'],
      },
      {
        title: 'Izgradi autoritet u struci',
        tasks: ['Napiši 3 LinkedIn posta o temi u kojoj si dobar/a', 'Javno govori na jednom predavanju ili panelu', 'Apliciraj na team lead poziciju'],
      },
    ],
  },
  {
    keywords: ['preduzetnik', 'startup', 'biznis', 'firma', 'kompanija', 'osnivač', 'freelance', 'samostalan'],
    mediums: [
      {
        title: 'Validiraj ideju',
        tasks: ['Razgovaraj sa 10 potencijalnih klijenata', 'Napravi landing page i pusti prvih 100 posetilaca', 'Definiši problem koji rešavaš u jednoj rečenici'],
      },
      {
        title: 'Napravi prvu verziju',
        tasks: ['Napravi MVP u roku od 30 dana', 'Pronađi prvog plaćenog klijenta', 'Postavi sistem za naplatu i fakturisanje'],
      },
      {
        title: 'Razvij biznis model',
        tasks: ['Napiši business model canvas', 'Izračunaj tačku rentabilnosti', 'Definiši strategiju akvizicije prvih 10 klijenata'],
      },
    ],
  },
  {
    keywords: ['psiholog', 'terapija', 'socijalni', 'pedagog', 'pomaganje', 'kouč', 'mentor'],
    mediums: [
      {
        title: 'Stekni znanje i sertifikate',
        tasks: ['Istraži koji sertifikati su relevantni u tvojoj oblasti', 'Završi jedan online kurs iz psihologije ili koučinga', 'Čitaj jednu stručnu knjigu mesečno'],
      },
      {
        title: 'Stekni praktično iskustvo',
        tasks: ['Volontiraj u organizaciji koja radi sa ljudima', 'Odradi 5 besplatnih koučing sesija', 'Priključi se supervizijskoj grupi ili mentoratu'],
      },
      {
        title: 'Izgradi profesionalnu prisutnost',
        tasks: ['Napravi profil na platformama za terapeute ili kouče', 'Napiši 3 članka o temama koje te zanimaju', 'Priključi se strukovnom udruženju'],
      },
    ],
  },
]

const defaultTemplate = {
  mediums: [
    {
      title: 'Istraži i uči',
      tasks: ['Pronađi 3 resursa o temi koja te zanima', 'Razgovaraj sa nekim ko je već postigao sličan cilj', 'Napravi plan učenja za narednih 30 dana'],
    },
    {
      title: 'Napravi prvi korak',
      tasks: ['Definiši konkretnu akciju za ovaj vikend', 'Upiši se na kurs ili webinar vezan za cilj', 'Poveži se sa jednom osobom iz te oblasti'],
    },
    {
      title: 'Prati napredak',
      tasks: ['Zapiši šta si naučio/la ove nedelje', 'Proveri da li si na pravom putu ka cilju', 'Prilagodi plan na osnovu onoga što si video/la'],
    },
  ],
}

export function generateGoalBreakdown(goalTitle) {
  const lower = goalTitle.toLowerCase()
  const match = templates.find(t => t.keywords.some(kw => lower.includes(kw)))
  return (match || defaultTemplate).mediums
}
