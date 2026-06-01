// Preporuke knjiga i podkasta po dominantnoj dimenziji ličnosti
// C = Kreativac, T = Tehničar, P = Pomagač, B = Biznismen, O = Organizator, N = Praktičar

export const booksByType = {
  C: [
    { title: 'Steal Like an Artist', author: 'Austin Kleon', desc: 'Kako biti kreativan bez straha od kopiranja — sloboda izražavanja.' },
    { title: 'Big Magic', author: 'Elizabeth Gilbert', desc: 'O kreativnom životu bez straha — za svakoga ko želi da stvara.' },
    { title: 'The War of Art', author: 'Steven Pressfield', desc: 'Kako pobediti unutrašnji otpor i zaista stvarati.' },
    { title: 'Show Your Work', author: 'Austin Kleon', desc: 'Kako deliti ono što stvaraš i izgraditi publiku.' },
    { title: 'Bird by Bird', author: 'Anne Lamott', desc: 'Pismo o pisanju i životu — klasik za kreativne ljude.' },
  ],
  T: [
    { title: 'Deep Work', author: 'Cal Newport', desc: 'Kako raditi fokusirano u svetu punom distrakcija.' },
    { title: 'The Pragmatic Programmer', author: 'Hunt & Thomas', desc: 'Biblija za svakog ko gradi softver i želi da bude bolji.' },
    { title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', desc: 'Kako naš um donosi odluke — obavezno štivo za analitičare.' },
    { title: 'A Mind for Numbers', author: 'Barbara Oakley', desc: 'Kako naučiti teške stvari efikasno — nauka o učenju.' },
    { title: 'The Design of Everyday Things', author: 'Don Norman', desc: 'Zašto neke stvari funkcionišu a neke ne — osnova UX razmišljanja.' },
  ],
  P: [
    { title: 'Never Split the Difference', author: 'Chris Voss', desc: 'Veštine pregovaranja od bivšeg FBI pregovarača — za rad sa ljudima.' },
    { title: 'Nonviolent Communication', author: 'Marshall Rosenberg', desc: 'Kako komunicirati iskreno bez konflikta.' },
    { title: 'The Coaching Habit', author: 'Michael Bungay Stanier', desc: 'Jednostavne navike koje menjaju kako pomažeš drugima.' },
    { title: 'Daring Greatly', author: 'Brené Brown', desc: 'O ranjivosti, hrabrosti i izgradnji dubokih odnosa.' },
    { title: 'Man\'s Search for Meaning', author: 'Viktor Frankl', desc: 'Jedna od najvažnijih knjiga o smislu i ljudskoj otpornosti.' },
  ],
  B: [
    { title: 'Zero to One', author: 'Peter Thiel', desc: 'Kako graditi kompanije koje stvaraju nešto potpuno novo.' },
    { title: 'The Lean Startup', author: 'Eric Ries', desc: 'Kako brzo testirati ideje i izgraditi posao koji funkcioniše.' },
    { title: '$100M Offers', author: 'Alex Hormozi', desc: 'Kako napraviti ponudu koju niko ne može da odbije.' },
    { title: 'The Hard Thing About Hard Things', author: 'Ben Horowitz', desc: 'Iskrena priča o tome kako je zaista voditi kompaniju.' },
    { title: 'Shoe Dog', author: 'Phil Knight', desc: 'Priča osnivača Nikea — inspirativna i nepričinjena.' },
  ],
  O: [
    { title: 'Getting Things Done', author: 'David Allen', desc: 'Sistem za organizaciju koji je promenio milione ljudi.' },
    { title: 'Atomic Habits', author: 'James Clear', desc: 'Kako male promene navika vode do velikih rezultata.' },
    { title: 'The 4-Hour Workweek', author: 'Tim Ferriss', desc: 'Kako dizajnirati posao i život koji zaista hoćeš.' },
    { title: 'Essentialism', author: 'Greg McKeown', desc: 'Disciplina fokusiranja samo na ono što je zaista važno.' },
    { title: 'Building a Second Brain', author: 'Tiago Forte', desc: 'Kako organizovati znanje i ideje da uvek budu dostupne.' },
  ],
  N: [
    { title: 'Shop Class as Soulcraft', author: 'Matthew Crawford', desc: 'Filozofija rada rukama — zašto praktično znanje vredi.' },
    { title: 'The Alchemist', author: 'Paulo Coelho', desc: 'Priča o pronalasku svog puta — klasik za one koji traže smer.' },
    { title: 'Into the Wild', author: 'Jon Krakauer', desc: 'O slobodi, prirodi i traženju autentičnog života.' },
    { title: 'The Obstacle is the Way', author: 'Ryan Holiday', desc: 'Stoička filozofija za savremeni svet — kako prepreke postaju put.' },
    { title: 'Ikigai', author: 'Héctor García', desc: 'Japanska filozofija pronalaska smisla u svakodnevnom životu.' },
  ],
}

export const podcastsByType = {
  C: [
    { title: 'The Creative Independent', desc: 'Razgovori sa kreativcima o procesu, sumnjama i radu.' },
    { title: 'WorkLife with Adam Grant', desc: 'Psihologija rada i kreativnosti sa jednim od vodećih stručnjaka.' },
    { title: 'Ologies with Alie Ward', desc: 'Nauka iza svega — za radoznale umove.' },
    { title: 'Design Matters', desc: 'Debbie Millman razgovara sa dizajnerima i umetnicima.' },
  ],
  T: [
    { title: 'Lex Fridman Podcast', desc: 'Duboki razgovori o AI, nauci, tehnologiji i životu.' },
    { title: 'Software Engineering Daily', desc: 'Svakodnevne epizode o softverskim konceptima i karijerama.' },
    { title: 'How I Built This', desc: 'Priče o tome kako su nastale najveće tech kompanije.' },
    { title: 'Darknet Diaries', desc: 'Priče iz sveta sajber bezbednosti i hakovanja.' },
  ],
  P: [
    { title: 'Huberman Lab', desc: 'Nauka o mozgu, ponašanju i optimizaciji života.' },
    { title: 'The Diary of a CEO', desc: 'Steven Bartlett razgovara o uspehu, mentalnom zdravlju i smislu.' },
    { title: 'On Being with Krista Tippett', desc: 'Duboki razgovori o smislu, duhovnosti i ljudskosti.' },
    { title: 'Feel Better Live More', desc: 'Dr Rangan Chatterjee o zdravlju i boljitku.' },
  ],
  B: [
    { title: 'My First Million', desc: 'Sam Parr i Shaan Puri razgovaraju o biznis idejama i prilikama.' },
    { title: 'The Tim Ferriss Show', desc: 'Intervjui sa najuspešnijim ljudima sveta o navikama i strategijama.' },
    { title: 'Acquired', desc: 'Duboke analize najvećih kompanija — kako su nastale i rasle.' },
    { title: 'Founders', desc: 'Lekcije iz autobiografija najvećih preduzetnika istorije.' },
  ],
  O: [
    { title: 'The Knowledge Project', desc: 'Shane Parrish o mentalnim modelima i donošenju odluka.' },
    { title: 'Deep Questions with Cal Newport', desc: 'Kako živeti fokusirano u digitalnom dobu.' },
    { title: 'Beyond the To-Do List', desc: 'Produktivnost i balans za ljude koji žele da rade pametnije.' },
    { title: 'Hidden Brain', desc: 'Nauka o ponašanju i nesvesnim silama koje nas pokreću.' },
  ],
  N: [
    { title: 'The Joe Rogan Experience', desc: 'Opušteni razgovori o svemu — priroda, sport, filozofija, nauka.' },
    { title: 'Outdoor Minimalist', desc: 'O životu na otvorenom i svesnom odnosu prema prirodi.' },
    { title: 'The Ground Up Show', desc: 'Priče o pronalasku smisla kroz rad i stvaranje.' },
    { title: 'Armchair Expert', desc: 'Dax Shepard razgovara o životnim pričama i autentičnosti.' },
  ],
}

export function getRecommendations(scores) {
  if (!scores || Object.keys(scores).length === 0) return null

  // Pronađi dominantnu dimenziju
  const dims = ['C', 'T', 'P', 'B', 'O', 'N']
  const topDim = dims.reduce((a, b) => (scores[a] || 0) > (scores[b] || 0) ? a : b)

  return {
    books: booksByType[topDim] || booksByType.C,
    podcasts: podcastsByType[topDim] || podcastsByType.C,
    dim: topDim,
  }
}
