// Preporuke knjiga i podkasta po dominantnoj dimenziji ličnosti
// C = Kreativac, T = Tehničar, P = Pomagač, B = Biznismen, O = Organizator, N = Praktičar

export const booksByType = {
  C: [
    { id: 'c-b1', title: 'Steal Like an Artist', author: 'Austin Kleon', desc: 'Kako biti kreativan bez straha od kopiranja, sloboda izražavanja.' },
    { id: 'c-b2', title: 'Big Magic', author: 'Elizabeth Gilbert', desc: 'O kreativnom životu bez straha, za svakoga ko želi da stvara.' },
    { id: 'c-b3', title: 'The War of Art', author: 'Steven Pressfield', desc: 'Kako pobediti unutrašnji otpor i zaista stvarati.' },
    { id: 'c-b4', title: 'Show Your Work', author: 'Austin Kleon', desc: 'Kako deliti ono što stvaraš i izgraditi publiku.' },
    { id: 'c-b5', title: 'Bird by Bird', author: 'Anne Lamott', desc: 'Pismo o pisanju i životu, klasik za kreativne ljude.' },
    { id: 'c-b6', title: 'The Artist\'s Way', author: 'Julia Cameron', desc: '12-nedeljni program za otkrivanje i razvijanje kreativnosti.' },
    { id: 'c-b7', title: 'On Writing', author: 'Stephen King', desc: 'Autobiografija i vodič za pisanje od jednog od najvećih autora.' },
    { id: 'c-b8', title: 'Keep Going', author: 'Austin Kleon', desc: 'Kako ostati kreativan u dobrim i lošim vremenima.' },
  ],
  T: [
    { id: 't-b1', title: 'Deep Work', author: 'Cal Newport', desc: 'Kako raditi fokusirano u svetu punom distrakcija.' },
    { id: 't-b2', title: 'The Pragmatic Programmer', author: 'Hunt & Thomas', desc: 'Biblija za svakog ko gradi softver i želi da bude bolji.' },
    { id: 't-b3', title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', desc: 'Kako naš um donosi odluke, obavezno štivo za analitičare.' },
    { id: 't-b4', title: 'A Mind for Numbers', author: 'Barbara Oakley', desc: 'Kako naučiti teške stvari efikasno, nauka o učenju.' },
    { id: 't-b5', title: 'The Design of Everyday Things', author: 'Don Norman', desc: 'Zašto neke stvari funkcionišu a neke ne, osnova UX razmišljanja.' },
    { id: 't-b6', title: 'Clean Code', author: 'Robert C. Martin', desc: 'Kako pisati kod koji je čitak, razumljiv i održiv.' },
    { id: 't-b7', title: 'Gödel, Escher, Bach', author: 'Douglas Hofstadter', desc: 'Filozofija, matematika i AI u jednoj knjizi, za radoznale umove.' },
    { id: 't-b8', title: 'The Innovators', author: 'Walter Isaacson', desc: 'Priča o ljudima koji su stvorili digitalno doba.' },
  ],
  P: [
    { id: 'p-b1', title: 'Never Split the Difference', author: 'Chris Voss', desc: 'Veštine pregovaranja od bivšeg FBI pregovarača, za rad sa ljudima.' },
    { id: 'p-b2', title: 'Nonviolent Communication', author: 'Marshall Rosenberg', desc: 'Kako komunicirati iskreno bez konflikta.' },
    { id: 'p-b3', title: 'The Coaching Habit', author: 'Michael Bungay Stanier', desc: 'Jednostavne navike koje menjaju kako pomažeš drugima.' },
    { id: 'p-b4', title: 'Daring Greatly', author: 'Brené Brown', desc: 'O ranjivosti, hrabrosti i izgradnji dubokih odnosa.' },
    { id: 'p-b5', title: 'Man\'s Search for Meaning', author: 'Viktor Frankl', desc: 'Jedna od najvažnijih knjiga o smislu i ljudskoj otpornosti.' },
    { id: 'p-b6', title: 'Influence', author: 'Robert Cialdini', desc: 'Psihologija ubeđivanja, kako i zašto ljudi kažu da.' },
    { id: 'p-b7', title: 'The Empathy Effect', author: 'Helen Riess', desc: 'Nauka iza empatije i kako je razviti.' },
    { id: 'p-b8', title: 'Talking to Strangers', author: 'Malcolm Gladwell', desc: 'Zašto pogrešno razumemo ljude koje ne poznajemo.' },
  ],
  B: [
    { id: 'b-b1', title: 'Zero to One', author: 'Peter Thiel', desc: 'Kako graditi kompanije koje stvaraju nešto potpuno novo.' },
    { id: 'b-b2', title: 'The Lean Startup', author: 'Eric Ries', desc: 'Kako brzo testirati ideje i izgraditi posao koji funkcioniše.' },
    { id: 'b-b3', title: '$100M Offers', author: 'Alex Hormozi', desc: 'Kako napraviti ponudu koju niko ne može da odbije.' },
    { id: 'b-b4', title: 'The Hard Thing About Hard Things', author: 'Ben Horowitz', desc: 'Iskrena priča o tome kako je zaista voditi kompaniju.' },
    { id: 'b-b5', title: 'Shoe Dog', author: 'Phil Knight', desc: 'Priča osnivača Nikea, inspirativna i nepričinjena.' },
    { id: 'b-b6', title: 'Good to Great', author: 'Jim Collins', desc: 'Šta razdvaja prosečne od zaista velikih kompanija.' },
    { id: 'b-b7', title: 'The E-Myth Revisited', author: 'Michael Gerber', desc: 'Zašto većina malih biznisa ne uspeva i šta da uradiš drugačije.' },
    { id: 'b-b8', title: 'Rework', author: 'Jason Fried & DHH', desc: 'Drugačiji pristup poslovanju, manje, bolje, pametnije.' },
  ],
  O: [
    { id: 'o-b1', title: 'Getting Things Done', author: 'David Allen', desc: 'Sistem za organizaciju koji je promenio milione ljudi.' },
    { id: 'o-b2', title: 'Atomic Habits', author: 'James Clear', desc: 'Kako male promene navika vode do velikih rezultata.' },
    { id: 'o-b3', title: 'The 4-Hour Workweek', author: 'Tim Ferriss', desc: 'Kako dizajnirati posao i život koji zaista hoćeš.' },
    { id: 'o-b4', title: 'Essentialism', author: 'Greg McKeown', desc: 'Disciplina fokusiranja samo na ono što je zaista važno.' },
    { id: 'o-b5', title: 'Building a Second Brain', author: 'Tiago Forte', desc: 'Kako organizovati znanje i ideje da uvek budu dostupne.' },
    { id: 'o-b6', title: 'The One Thing', author: 'Gary Keller', desc: 'Kako postići izuzetne rezultate fokusiranjem na jednu stvar.' },
    { id: 'o-b7', title: 'Make Time', author: 'Jake Knapp & John Zeratsky', desc: 'Kako svakodnevno naći vreme za ono što je zaista važno.' },
    { id: 'o-b8', title: 'Digital Minimalism', author: 'Cal Newport', desc: 'Kako koristiti tehnologiju pametno i živeti fokusiranije.' },
  ],
  N: [
    { id: 'n-b1', title: 'Shop Class as Soulcraft', author: 'Matthew Crawford', desc: 'Filozofija rada rukama, zašto praktično znanje vredi.' },
    { id: 'n-b2', title: 'The Alchemist', author: 'Paulo Coelho', desc: 'Priča o pronalasku svog puta, klasik za one koji traže smer.' },
    { id: 'n-b3', title: 'Into the Wild', author: 'Jon Krakauer', desc: 'O slobodi, prirodi i traženju autentičnog života.' },
    { id: 'n-b4', title: 'The Obstacle is the Way', author: 'Ryan Holiday', desc: 'Stoička filozofija za savremeni svet, kako prepreke postaju put.' },
    { id: 'n-b5', title: 'Ikigai', author: 'Héctor García', desc: 'Japanska filozofija pronalaska smisla u svakodnevnom životu.' },
    { id: 'n-b6', title: 'Walden', author: 'Henry David Thoreau', desc: 'Klasik o životu u prirodi, jednostavnosti i samospoznaji.' },
    { id: 'n-b7', title: 'The Art of Possibility', author: 'Rosamund & Benjamin Zander', desc: 'Kako promeniti perspektivu i otvoriti nove mogućnosti.' },
    { id: 'n-b8', title: 'Zen and the Art of Motorcycle Maintenance', author: 'Robert Pirsig', desc: 'Filozofija kvaliteta i pronalaska smisla kroz rad.' },
  ],
}

export const podcastsByType = {
  C: [
    { id: 'c-p1', title: 'The Creative Independent', desc: 'Razgovori sa kreativcima o procesu, sumnjama i radu.' },
    { id: 'c-p2', title: 'WorkLife with Adam Grant', desc: 'Psihologija rada i kreativnosti sa jednim od vodećih stručnjaka.' },
    { id: 'c-p3', title: 'Ologies with Alie Ward', desc: 'Nauka iza svega, za radoznale umove.' },
    { id: 'c-p4', title: 'Design Matters', desc: 'Debbie Millman razgovara sa dizajnerima i umetnicima.' },
    { id: 'c-p5', title: 'How to Fail with Elizabeth Day', desc: 'Slavne osobe o tome šta ih je naučilo da ne uspeju.' },
    { id: 'c-p6', title: 'Conan O\'Brien Needs a Friend', desc: 'Humor, kreativnost i razgovori koji ne liče ni na šta drugo.' },
  ],
  T: [
    { id: 't-p1', title: 'Lex Fridman Podcast', desc: 'Duboki razgovori o AI, nauci, tehnologiji i životu.' },
    { id: 't-p2', title: 'Software Engineering Daily', desc: 'Svakodnevne epizode o softverskim konceptima i karijerama.' },
    { id: 't-p3', title: 'How I Built This', desc: 'Priče o tome kako su nastale najveće tech kompanije.' },
    { id: 't-p4', title: 'Darknet Diaries', desc: 'Priče iz sveta sajber bezbednosti i hakovanja.' },
    { id: 't-p5', title: 'The Changelog', desc: 'Razgovori sa open source programerima i tech liderima.' },
    { id: 't-p6', title: 'Syntax FM', desc: 'Web development u opuštenom stilu, za sve nivoe.' },
  ],
  P: [
    { id: 'p-p1', title: 'Huberman Lab', desc: 'Nauka o mozgu, ponašanju i optimizaciji života.' },
    { id: 'p-p2', title: 'The Diary of a CEO', desc: 'Steven Bartlett razgovara o uspehu, mentalnom zdravlju i smislu.' },
    { id: 'p-p3', title: 'On Being with Krista Tippett', desc: 'Duboki razgovori o smislu, duhovnosti i ljudskosti.' },
    { id: 'p-p4', title: 'Feel Better Live More', desc: 'Dr Rangan Chatterjee o zdravlju i boljitku.' },
    { id: 'p-p5', title: 'Unlocking Us with Brené Brown', desc: 'O emocijama, ranjivosti i hrabrosti u svakodnevnom životu.' },
    { id: 'p-p6', title: 'Ten Percent Happier', desc: 'Meditacija i mindfulness za skeptike.' },
  ],
  B: [
    { id: 'b-p1', title: 'My First Million', desc: 'Sam Parr i Shaan Puri razgovaraju o biznis idejama i prilikama.' },
    { id: 'b-p2', title: 'The Tim Ferriss Show', desc: 'Intervjui sa najuspešnijim ljudima sveta o navikama i strategijama.' },
    { id: 'b-p3', title: 'Acquired', desc: 'Duboke analize najvećih kompanija, kako su nastale i rasle.' },
    { id: 'b-p4', title: 'Founders', desc: 'Lekcije iz autobiografija najvećih preduzetnika istorije.' },
    { id: 'b-p5', title: 'The Prof G Pod', desc: 'Scott Galloway o biznisu, tehnologiji i modernom životu.' },
    { id: 'b-p6', title: 'Masters of Scale', desc: 'Reid Hoffman razgovara sa osnivačima o tome kako skalirati.' },
  ],
  O: [
    { id: 'o-p1', title: 'The Knowledge Project', desc: 'Shane Parrish o mentalnim modelima i donošenju odluka.' },
    { id: 'o-p2', title: 'Deep Questions with Cal Newport', desc: 'Kako živeti fokusirano u digitalnom dobu.' },
    { id: 'o-p3', title: 'Beyond the To-Do List', desc: 'Produktivnost i balans za ljude koji žele da rade pametnije.' },
    { id: 'o-p4', title: 'Hidden Brain', desc: 'Nauka o ponašanju i nesvesnim silama koje nas pokreću.' },
    { id: 'o-p5', title: 'The Minimalists Podcast', desc: 'Kako živeti smislenije sa manje, minimalizam u praksi.' },
    { id: 'o-p6', title: 'Cortex', desc: 'CGP Grey i Myke Hurley o produktivnosti i radu za sebe.' },
  ],
  N: [
    { id: 'n-p1', title: 'The Joe Rogan Experience', desc: 'Opušteni razgovori o svemu, priroda, sport, filozofija, nauka.' },
    { id: 'n-p2', title: 'Outdoor Minimalist', desc: 'O životu na otvorenom i svesnom odnosu prema prirodi.' },
    { id: 'n-p3', title: 'The Ground Up Show', desc: 'Priče o pronalasku smisla kroz rad i stvaranje.' },
    { id: 'n-p4', title: 'Armchair Expert', desc: 'Dax Shepard razgovara o životnim pričama i autentičnosti.' },
    { id: 'n-p5', title: 'Nature Podcast', desc: 'Najnovija naučna istraživanja iz sveta prirode.' },
    { id: 'n-p6', title: 'Wild Ideas Worth Living', desc: 'Priče o avanturi, prirodi i životu van zone komfora.' },
  ],
}

const VISIBLE_COUNT = 5

export function getRecommendations(scores) {
  if (!scores || Object.keys(scores).length === 0) return null
  const dims = ['C', 'T', 'P', 'B', 'O', 'N']
  const topDim = dims.reduce((a, b) => (scores[a] || 0) > (scores[b] || 0) ? a : b)
  return {
    books: booksByType[topDim] || booksByType.C,
    podcasts: podcastsByType[topDim] || podcastsByType.C,
    dim: topDim,
    visibleCount: VISIBLE_COUNT,
  }
}
