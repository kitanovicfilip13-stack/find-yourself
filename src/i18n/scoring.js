// Scoring dimensions: C=Creative, T=Tech, P=People, B=Business, O=Organization, N=Nature
// Personality: I/E = Introvert/Extrovert, R/S = Risk/Stable

export function calculateScores(answers) {
  const totals = { C: 0, T: 0, P: 0, B: 0, O: 0, N: 0, I: 0, E: 0, R: 0, S: 0 }
  answers.forEach(({ scores }) => {
    Object.entries(scores).forEach(([key, val]) => {
      if (totals[key] !== undefined) totals[key] += val
    })
  })
  return totals
}

const typeData = {
  en: {
    C_T: { name: 'The Digital Creator', emoji: '✦', tagline: 'You build things that look incredible and actually work.', color: '#8b5cf6' },
    C_P: { name: 'The Storyteller', emoji: '◎', tagline: 'You make people feel things — through words, images, ideas.', color: '#ec4899' },
    C_B: { name: 'The Creative Strategist', emoji: '⬡', tagline: 'You see the angle others miss. Ideas become businesses.', color: '#f59e0b' },
    C_O: { name: 'The Architect', emoji: '▣', tagline: 'You design systems that are beautiful and efficient.', color: '#06b6d4' },
    C_N: { name: 'The Craftsperson', emoji: '◈', tagline: 'Your hands and mind work together — you make the tangible.', color: '#10b981' },
    T_C: { name: 'The Product Builder', emoji: '⬟', tagline: 'You turn ideas into products that actually exist.', color: '#8b5cf6' },
    T_P: { name: 'The Tech Lead', emoji: '◆', tagline: 'You build systems and bring people with you.', color: '#3b82f6' },
    T_B: { name: 'The Founder', emoji: '✦', tagline: "You can build it and sell it — the rarest combination.", color: '#f59e0b' },
    T_O: { name: 'The Engineer', emoji: '⬡', tagline: 'You solve complex problems with precision and structure.', color: '#06b6d4' },
    T_N: { name: 'The Systems Thinker', emoji: '◎', tagline: 'You find patterns in the physical world and optimize them.', color: '#10b981' },
    P_C: { name: 'The Experience Designer', emoji: '◈', tagline: 'You create environments where people feel understood.', color: '#ec4899' },
    P_T: { name: 'The UX Specialist', emoji: '◆', tagline: 'You bridge the human and the digital.', color: '#8b5cf6' },
    P_B: { name: 'The Leader', emoji: '▣', tagline: 'You grow people and organizations simultaneously.', color: '#3b82f6' },
    P_O: { name: 'The Community Builder', emoji: '⬟', tagline: 'You turn groups of people into meaningful communities.', color: '#10b981' },
    P_N: { name: 'The Healer', emoji: '✦', tagline: 'You help people and living things thrive.', color: '#10b981' },
    B_C: { name: 'The Brand Builder', emoji: '◎', tagline: 'You understand desire — and you know how to create it.', color: '#f59e0b' },
    B_T: { name: 'The Tech Entrepreneur', emoji: '⬡', tagline: 'You see market gaps and fill them with products.', color: '#3b82f6' },
    B_P: { name: 'The Sales Leader', emoji: '◆', tagline: 'You turn relationships into revenue. Naturally.', color: '#f59e0b' },
    B_O: { name: 'The Operator', emoji: '▣', tagline: 'You run things. Complex things. Well.', color: '#06b6d4' },
    B_N: { name: 'The Entrepreneur', emoji: '✦', tagline: 'You build real things that people can touch and use.', color: '#f59e0b' },
    O_C: { name: 'The Art Director', emoji: '◈', tagline: 'You bring structure to creative chaos.', color: '#8b5cf6' },
    O_T: { name: 'The Data Analyst', emoji: '⬟', tagline: 'You find clarity in complexity through systems and data.', color: '#3b82f6' },
    O_P: { name: 'The Project Manager', emoji: '◆', tagline: 'You make sure the right things happen at the right time.', color: '#06b6d4' },
    O_B: { name: 'The COO', emoji: '▣', tagline: 'You make ambitious visions actually happen.', color: '#f59e0b' },
    O_N: { name: 'The Specialist', emoji: '✦', tagline: 'You master one domain completely and are invaluable in it.', color: '#10b981' },
    N_C: { name: 'The Maker', emoji: '◎', tagline: 'You create tangible things that have beauty and function.', color: '#10b981' },
    N_T: { name: 'The Applied Scientist', emoji: '◆', tagline: 'You connect physical reality with data and systems.', color: '#3b82f6' },
    N_P: { name: 'The Coach', emoji: '⬡', tagline: 'You guide people through physical, mental, or life challenges.', color: '#10b981' },
    N_B: { name: 'The Founder', emoji: '▣', tagline: 'You build real businesses around real-world skills.', color: '#f59e0b' },
    N_O: { name: 'The Expert', emoji: '✦', tagline: 'You master a physical domain and become the go-to.', color: '#10b981' },
    default: { name: 'The Explorer', emoji: '◎', tagline: 'You cross boundaries and connect worlds others keep separate.', color: '#8b5cf6' },
  },
  sr: {
    C_T: { name: 'Digitalni Kreator', emoji: '✦', tagline: 'Praviš stvari koje izgledaju neverovatno i zaista funkcionišu.', color: '#8b5cf6' },
    C_P: { name: 'Pripovedač', emoji: '◎', tagline: 'Teraš ljude da nešto osete — kroz reči, slike, ideje.', color: '#ec4899' },
    C_B: { name: 'Kreativni Strateg', emoji: '⬡', tagline: 'Vidiš ugao koji drugi propuštaju. Ideje ti postaju biznisi.', color: '#f59e0b' },
    C_O: { name: 'Arhitekta', emoji: '▣', tagline: 'Dizajniraš sisteme koji su i lepi i efikasni.', color: '#06b6d4' },
    C_N: { name: 'Majstor', emoji: '◈', tagline: 'Tvoje ruke i um rade zajedno — praviš opipljive stvari.', color: '#10b981' },
    T_C: { name: 'Graditelj Proizvoda', emoji: '⬟', tagline: 'Pretvараš ideje u proizvode koji zaista postoje.', color: '#8b5cf6' },
    T_P: { name: 'Tehnički Lider', emoji: '◆', tagline: 'Gradiš sisteme i vodiš ljude sa sobom.', color: '#3b82f6' },
    T_B: { name: 'Osnivač', emoji: '✦', tagline: 'Možeš da napraviš i prodaš — najređa kombinacija.', color: '#f59e0b' },
    T_O: { name: 'Inženjer', emoji: '⬡', tagline: 'Rešavaš kompleksne probleme sa preciznošću i strukturom.', color: '#06b6d4' },
    T_N: { name: 'Sistemski Mislilac', emoji: '◎', tagline: 'Pronalaziš obrasce u fizičkom svetu i optimizuješ ih.', color: '#10b981' },
    P_C: { name: 'Dizajner Iskustva', emoji: '◈', tagline: 'Kreiraš okruženja gde se ljudi osećaju razumljeno.', color: '#ec4899' },
    P_T: { name: 'UX Specijalista', emoji: '◆', tagline: 'Prevazilaziš jaz između čoveka i digitalnog sveta.', color: '#8b5cf6' },
    P_B: { name: 'Lider', emoji: '▣', tagline: 'Razvijaš ljude i organizacije istovremeno.', color: '#3b82f6' },
    P_O: { name: 'Graditelj Zajednice', emoji: '⬟', tagline: 'Pretvараš grupe u smislene zajednice.', color: '#10b981' },
    P_N: { name: 'Iscelitelj', emoji: '✦', tagline: 'Pomažeš ljudima i živim bićima da napreduju.', color: '#10b981' },
    B_C: { name: 'Graditelj Brenda', emoji: '◎', tagline: 'Razumeš čežnju — i znaš kako da je stvoriš.', color: '#f59e0b' },
    B_T: { name: 'Tehno-Preduzetnik', emoji: '⬡', tagline: 'Vidiš praznine na tržištu i puniš ih proizvodima.', color: '#3b82f6' },
    B_P: { name: 'Prodajni Lider', emoji: '◆', tagline: 'Pretvараš odnose u prihod. Prirodno.', color: '#f59e0b' },
    B_O: { name: 'Operativac', emoji: '▣', tagline: 'Vodiš stvari. Kompleksne stvari. Dobro.', color: '#06b6d4' },
    B_N: { name: 'Preduzetnik', emoji: '✦', tagline: 'Gradiš realne stvari koje ljudi mogu da dodirnu i koriste.', color: '#f59e0b' },
    O_C: { name: 'Art Direktor', emoji: '◈', tagline: 'Unosiš strukturu u kreativni haos.', color: '#8b5cf6' },
    O_T: { name: 'Analitičar Podataka', emoji: '⬟', tagline: 'Pronalaziš jasnoću u kompleksnosti kroz sisteme i podatke.', color: '#3b82f6' },
    O_P: { name: 'Menadžer Projekata', emoji: '◆', tagline: 'Osiguravaš da se prave stvari dešavaju u pravo vreme.', color: '#06b6d4' },
    O_B: { name: 'Operativni Direktor', emoji: '▣', tagline: 'Pretvaраš ambiciozne vizije u stvarnost.', color: '#f59e0b' },
    O_N: { name: 'Specijalista', emoji: '✦', tagline: 'Savladaš jednu oblast potpuno i postaneš nezamenljiv/a.', color: '#10b981' },
    N_C: { name: 'Tvorac', emoji: '◎', tagline: 'Kreiraš opipljive stvari koje imaju lepotu i funkciju.', color: '#10b981' },
    N_T: { name: 'Primenjeni Naučnik', emoji: '◆', tagline: 'Povezuješ fizičku stvarnost sa podacima i sistemima.', color: '#3b82f6' },
    N_P: { name: 'Kouč', emoji: '⬡', tagline: 'Vodiš ljude kroz fizičke, mentalne ili životne izazove.', color: '#10b981' },
    N_B: { name: 'Osnivač', emoji: '▣', tagline: 'Gradiš realne biznise oko veština iz stvarnog sveta.', color: '#f59e0b' },
    N_O: { name: 'Ekspert', emoji: '✦', tagline: 'Savladaš fizičku oblast i postaneš prvi izbor.', color: '#10b981' },
    default: { name: 'Istraživač', emoji: '◎', tagline: 'Prevazilaziš granice i povezuješ svetove koje drugi drže odvojene.', color: '#8b5cf6' },
  },
}

const careerData = {
  en: [
    { label: 'UX / Product Design', weights: { C: 2, T: 1.5, P: 0.5 } },
    { label: 'Software Engineering', weights: { T: 2.5, O: 1, C: 0.5 } },
    { label: 'Brand & Marketing', weights: { C: 1.5, B: 2, P: 0.5 } },
    { label: 'Content Creation / Media', weights: { C: 2, P: 1, B: 0.5 } },
    { label: 'Entrepreneurship', weights: { B: 2.5, R: 1.5, T: 0.5 } },
    { label: 'Data & Analytics', weights: { T: 2, O: 1.5 } },
    { label: 'People & HR', weights: { P: 2.5, O: 1 } },
    { label: 'Product Management', weights: { T: 1, P: 1.5, O: 1.5, B: 0.5 } },
    { label: 'Consulting & Strategy', weights: { B: 2, O: 1.5, P: 0.5 } },
    { label: 'Creative Direction', weights: { C: 2.5, B: 1 } },
    { label: 'Education & Coaching', weights: { P: 2.5, C: 0.5, O: 0.5 } },
    { label: 'Architecture / Engineering', weights: { N: 1.5, O: 1.5, C: 0.5 } },
    { label: 'Healthcare & Psychology', weights: { P: 2, N: 1.5 } },
    { label: 'Sales & Business Dev', weights: { B: 2.5, P: 1.5 } },
  ],
  sr: [
    { label: 'UX / Dizajn proizvoda', weights: { C: 2, T: 1.5, P: 0.5 } },
    { label: 'Softversko inženjerstvo', weights: { T: 2.5, O: 1, C: 0.5 } },
    { label: 'Brend & Marketing', weights: { C: 1.5, B: 2, P: 0.5 } },
    { label: 'Kreiranje sadržaja / Mediji', weights: { C: 2, P: 1, B: 0.5 } },
    { label: 'Preduzetništvo', weights: { B: 2.5, R: 1.5, T: 0.5 } },
    { label: 'Podaci & Analitika', weights: { T: 2, O: 1.5 } },
    { label: 'Upravljanje ljudima / HR', weights: { P: 2.5, O: 1 } },
    { label: 'Upravljanje proizvodom', weights: { T: 1, P: 1.5, O: 1.5, B: 0.5 } },
    { label: 'Konsalting & Strategija', weights: { B: 2, O: 1.5, P: 0.5 } },
    { label: 'Kreativna direkcija', weights: { C: 2.5, B: 1 } },
    { label: 'Obrazovanje & Kouching', weights: { P: 2.5, C: 0.5, O: 0.5 } },
    { label: 'Arhitektura / Inženjerstvo', weights: { N: 1.5, O: 1.5, C: 0.5 } },
    { label: 'Zdravstvo & Psihologija', weights: { P: 2, N: 1.5 } },
    { label: 'Prodaja & Razvoj biznisa', weights: { B: 2.5, P: 1.5 } },
  ],
}

const strengthsData = {
  en: [
    { label: 'Creative thinking', dim: 'C' },
    { label: 'Technical problem-solving', dim: 'T' },
    { label: 'Empathy & communication', dim: 'P' },
    { label: 'Strategic vision', dim: 'B' },
    { label: 'Planning & execution', dim: 'O' },
    { label: 'Hands-on mastery', dim: 'N' },
    { label: 'Independent focus', dim: 'I' },
    { label: 'Collaborative energy', dim: 'E' },
    { label: 'Risk-taking & initiative', dim: 'R' },
    { label: 'Reliability & consistency', dim: 'S' },
  ],
  sr: [
    { label: 'Kreativno razmišljanje', dim: 'C' },
    { label: 'Tehničko rešavanje problema', dim: 'T' },
    { label: 'Empatija i komunikacija', dim: 'P' },
    { label: 'Strateška vizija', dim: 'B' },
    { label: 'Planiranje i realizacija', dim: 'O' },
    { label: 'Praktično majstorstvo', dim: 'N' },
    { label: 'Samostalan fokus', dim: 'I' },
    { label: 'Timska energija', dim: 'E' },
    { label: 'Preuzimanje rizika i inicijativa', dim: 'R' },
    { label: 'Pouzdanost i doslednost', dim: 'S' },
  ],
}

const weaknessData = {
  en: [
    { label: 'Over-thinking before acting', condition: (s) => s.O > 4 || s.I > 4 },
    { label: 'Avoiding conflict or hard conversations', condition: (s) => s.I > 3 && s.P < 3 },
    { label: 'Starting things without finishing them', condition: (s) => s.R > 4 && s.O < 3 },
    { label: 'Isolating when you should collaborate', condition: (s) => s.I > 5 },
    { label: 'Taking on too much at once', condition: (s) => s.B > 4 && s.O < 3 },
    { label: 'Neglecting structure and planning', condition: (s) => s.C > 4 && s.O < 2 },
    { label: 'People-pleasing over your own direction', condition: (s) => s.P > 5 && s.B < 2 },
    { label: 'Avoiding risk when it could unlock growth', condition: (s) => s.S > 4 && s.R < 2 },
    { label: 'Perfectionism blocking your output', condition: (s) => s.O > 4 && s.C > 3 },
    { label: 'Undervaluing your technical abilities', condition: (s) => s.T > 4 && s.B < 2 },
  ],
  sr: [
    { label: 'Previše razmišljaš pre nego što kreceš', condition: (s) => s.O > 4 || s.I > 4 },
    { label: 'Izbegavaš konflikte i teške razgovore', condition: (s) => s.I > 3 && s.P < 3 },
    { label: 'Počinješ stvari ali ih ne završavaš', condition: (s) => s.R > 4 && s.O < 3 },
    { label: 'Izolovаš se kada bi trebalo da sarađuješ', condition: (s) => s.I > 5 },
    { label: 'Preuzimaš previše odjednom', condition: (s) => s.B > 4 && s.O < 3 },
    { label: 'Zanemarivaš strukturu i planiranje', condition: (s) => s.C > 4 && s.O < 2 },
    { label: 'Ugađaš drugima na račun sopstvenog pravca', condition: (s) => s.P > 5 && s.B < 2 },
    { label: 'Избегаваш rizik koji bi ti otvorio rast', condition: (s) => s.S > 4 && s.R < 2 },
    { label: 'Perfekcionizam ti blokira output', condition: (s) => s.O > 4 && s.C > 3 },
    { label: 'Potcenjuješ svoje tehničke sposobnosti', condition: (s) => s.T > 4 && s.B < 2 },
  ],
}

const skillsData = {
  en: {
    C: ['Visual design (Figma, Canva)', 'Storytelling & copywriting', 'Video production & editing', 'Photography & visual communication'],
    T: ['Programming (Python or JavaScript)', 'Data analysis (SQL, Excel)', 'AI & automation tools', 'Systems thinking & architecture'],
    P: ['Public speaking', 'Active listening & coaching', 'Conflict resolution', 'Community building & facilitation'],
    B: ['Sales & negotiation', 'Business modeling & finance basics', 'Marketing & growth', 'Leadership & management'],
    O: ['Project management (Notion, Asana)', 'Process design', 'Time blocking & productivity systems', 'Research & structured thinking'],
    N: ['A physical or technical craft', 'Biology / environment basics', 'Physical fitness & body awareness', 'Hands-on prototyping'],
  },
  sr: {
    C: ['Vizuelni dizajn (Figma, Canva)', 'Pripovedanje i copywriting', 'Produkcija i montaža videa', 'Fotografija i vizuelna komunikacija'],
    T: ['Programiranje (Python ili JavaScript)', 'Analiza podataka (SQL, Excel)', 'AI i alati za automatizaciju', 'Sistemsko razmišljanje i arhitektura'],
    P: ['Javni govor', 'Aktivno slušanje i kouching', 'Rešavanje konflikata', 'Izgradnja zajednice i facilitacija'],
    B: ['Prodaja i pregovaranje', 'Poslovni modeli i osnove finansija', 'Marketing i rast', 'Liderstvo i menadžment'],
    O: ['Upravljanje projektima (Notion, Asana)', 'Dizajn procesa', 'Time blocking i sistemi produktivnosti', 'Istraživanje i strukturirano razmišljanje'],
    N: ['Fizički ili tehnički zanat', 'Osnove biologije / životne sredine', 'Fizička kondicija i svest o telu', 'Praktično prototipiranje'],
  },
}

const actionPlanData = {
  en: {
    C: [
      { day: 'Day 1', action: "Redesign one thing you use every day — a menu, an app screen, a poster. Post it anywhere." },
      { day: 'Day 2', action: "Watch one talk by a designer or creator you admire. Take one note that changes how you see things." },
      { day: 'Day 3', action: "Pick a creative tool you've never fully learned. Spend 45 minutes just exploring it with no goal." },
      { day: 'Day 4', action: "Write 500 words about something you genuinely care about. No editing. Just output." },
      { day: 'Day 5', action: "Find 3 people whose creative work you deeply respect. Study their path, not their work." },
      { day: 'Day 6', action: "Start a small personal project — nothing commercial, just for expression. One hour." },
      { day: 'Day 7', action: "Share something you made this week — even just with one person. The habit of sharing is the skill." },
    ],
    T: [
      { day: 'Day 1', action: "Pick one technical skill from your list. Find the best free resource and start today." },
      { day: 'Day 2', action: "Build the simplest possible thing with what you're learning — even if it's ugly." },
      { day: 'Day 3', action: "Read about one company that solves a problem you find interesting. How do they work technically?" },
      { day: 'Day 4', action: "Find a small problem in your life. Sketch a technical solution on paper — don't build it yet." },
      { day: 'Day 5', action: "Connect with one developer or engineer. Ask them one real question." },
      { day: 'Day 6', action: "Do 2 hours of focused technical practice — no multitasking, no distractions." },
      { day: 'Day 7', action: "Write a short post about what you built or learned this week. Explain it to a non-technical person." },
    ],
    P: [
      { day: 'Day 1', action: "Have one real conversation today — not small talk. Ask someone about their biggest current challenge." },
      { day: 'Day 2', action: "Read one chapter from a psychology or communication book. Apply one thing immediately." },
      { day: 'Day 3', action: "Offer to help someone today in a way that uses your actual skills, not just your time." },
      { day: 'Day 4', action: "Write about 3 people you've positively influenced. What did you specifically do? That's your edge." },
      { day: 'Day 5', action: "Join or find one community centered on something you care about." },
      { day: 'Day 6', action: "Practice one difficult conversation — say something honest that you usually hold back." },
      { day: 'Day 7', action: "Identify one person you can mentor or support consistently. Reach out today." },
    ],
    B: [
      { day: 'Day 1', action: "Write down 3 problems you notice that aren't being solved well. These are business opportunities." },
      { day: 'Day 2', action: "Read about one startup story from founding to current state. What decisions shaped it?" },
      { day: 'Day 3', action: "Talk to one potential customer about one of your ideas — not to pitch, but to listen." },
      { day: 'Day 4', action: "Map out the simplest version of one business idea: problem, solution, who pays, how much." },
      { day: 'Day 5', action: "Identify one small skill you can offer for money right now. Not a business — one gig." },
      { day: 'Day 6', action: "Learn one thing about pricing or negotiation. Apply it in any context today." },
      { day: 'Day 7', action: "Take one real action toward one idea — register a domain, post something, ask for feedback." },
    ],
    O: [
      { day: 'Day 1', action: "Audit how you currently spend your time. Track every hour today — just observation, no judgment." },
      { day: 'Day 2', action: "Choose one area to organize better — physical space, notes, or a project. Do it in 30 minutes." },
      { day: 'Day 3', action: "Pick one productivity system you've never tried. Run a 3-day experiment with it." },
      { day: 'Day 4', action: "Map the workflow of something you do repeatedly. Where are the inefficiencies? Fix one." },
      { day: 'Day 5', action: "Learn one project management concept or tool. Use it on something real today." },
      { day: 'Day 6', action: "Build a simple dashboard or tracking system for your most important goal." },
      { day: 'Day 7', action: "Write a one-week review: what worked, what didn't, what you'll change. This habit compounds." },
    ],
    N: [
      { day: 'Day 1', action: "Spend 30 minutes doing something with your hands — cooking, fixing, building, drawing." },
      { day: 'Day 2', action: "Go outside. Observe one natural or physical system and write 5 sentences about how it works." },
      { day: 'Day 3', action: "Identify one physical skill you want to master. Find the best resource for it." },
      { day: 'Day 4', action: "Start a small physical project — a plant, a DIY repair, a workout routine. Begin today." },
      { day: 'Day 5', action: "Visit or research one field that combines physical work with impact: health, environment, engineering." },
      { day: 'Day 6', action: "Learn to fix or build one thing you normally outsource. YouTube is enough to start." },
      { day: 'Day 7', action: "Share what you made or learned this week. Physical work is undervalued — make it visible." },
    ],
  },
  sr: {
    C: [
      { day: 'Dan 1', action: "Redizajniraj nešto što koristiš svaki dan — meni, ekran aplikacije, poster. Postavi to bilo gde." },
      { day: 'Dan 2', action: "Pogledaj jedan govor dizajnera ili kreatora kojeg ceniš. Zapiši jednu stvar koja menja kako gledaš na stvari." },
      { day: 'Dan 3', action: "Odaberi kreativni alat koji nikad nisi potpuno naučio/la. Provedi 45 minuta samo istražujući, bez cilja." },
      { day: 'Dan 4', action: "Napiši 500 reči o nečemu što te zaista zanima. Bez uređivanja. Samo pisanje." },
      { day: 'Dan 5', action: "Pronađi 3 osobe čiji kreativni rad duboko ceniš. Proučavaj njihov put, ne njihov rad." },
      { day: 'Dan 6', action: "Počni mali lični projekat — ništa komercijalno, samo za izražavanje. Jedan sat." },
      { day: 'Dan 7', action: "Podeli nešto što si napravio/la ove nedelje — makar samo sa jednom osobom. Navika deljenja je veština." },
    ],
    T: [
      { day: 'Dan 1', action: "Odaberi jednu tehničku veštinu sa liste. Pronađi najbolji besplatni resurs i počni danas." },
      { day: 'Dan 2', action: "Napravi najjednostavniju moguću stvar sa onim što učiš — čak i ako je ružna." },
      { day: 'Dan 3', action: "Pročitaj o jednoj kompaniji koja rešava problem koji te zanima. Kako funkcioniše tehnički?" },
      { day: 'Dan 4', action: "Pronađi mali problem u svom životu. Skiciraj tehničko rešenje na papiru — još ne gradi." },
      { day: 'Dan 5', action: "Poveži se sa jednim programerom ili inženjerom. Postavi im jedno pravo pitanje." },
      { day: 'Dan 6', action: "Uradi 2 sata fokusirane tehničke prakse — bez multitaskinga, bez ometanja." },
      { day: 'Dan 7', action: "Napiši kratak post o tome šta si napravio/la ili naučio/la ove nedelje. Objasni to netehničkoj osobi." },
    ],
    P: [
      { day: 'Dan 1', action: "Imaj jedan pravi razgovor danas — ne small talk. Pitaj nekoga o najvećem izazovu s kojim se suočava." },
      { day: 'Dan 2', action: "Pročitaj jedno poglavlje iz knjige o psihologiji ili komunikaciji. Primeni jednu stvar odmah." },
      { day: 'Dan 3', action: "Ponudi pomoć nekome danas na način koji koristi tvoje stvarne veštine, ne samo tvoje vreme." },
      { day: 'Dan 4', action: "Napiši o 3 osobe koje si pozitivno uticao/la. Šta si konkretno uradio/la? To je tvoja prednost." },
      { day: 'Dan 5', action: "Priključi se ili pronađi jednu zajednicu koja se bavi nečim što te zanima." },
      { day: 'Dan 6', action: "Vežbaj jedan težak razgovor — reci nešto iskreno što obično zadržiš za sebe." },
      { day: 'Dan 7', action: "Identifikuj jednu osobu kojoj možeš da budeš mentor ili podrška. Javi im se danas." },
    ],
    B: [
      { day: 'Dan 1', action: "Zapiši 3 problema koje primećuješ a koji se ne rešavaju dobro. To su poslovne prilike." },
      { day: 'Dan 2', action: "Pročitaj o jednoj startup priči od osnivanja do danas. Koje odluke su je oblikovale?" },
      { day: 'Dan 3', action: "Razgovaraj sa jednim potencijalnim klijentom o jednoj tvojoj ideji — ne da prodaš, nego da slušaš." },
      { day: 'Dan 4', action: "Mapiraj najjednostavniju verziju jedne poslovne ideje: problem, rešenje, ko plaća, koliko." },
      { day: 'Dan 5', action: "Identifikuj jednu malu veštinu kojom možeš da zaradiš novac odmah. Ne biznis — jedan gig." },
      { day: 'Dan 6', action: "Nauči jednu stvar o cenama ili pregovaranju. Primeni to u bilo kom kontekstu danas." },
      { day: 'Dan 7', action: "Preduzmi jednu pravu akciju ka jednoj ideji — registruj domen, postavi nešto, traži povratnu informaciju." },
    ],
    O: [
      { day: 'Dan 1', action: "Analiziraj kako trenutno trošiš vreme. Prati svaki sat danas — samo posmatranje, bez osude." },
      { day: 'Dan 2', action: "Odaberi jednu oblast za bolje organizovanje — fizički prostor, beleške ili projekat. Uradi to za 30 minuta." },
      { day: 'Dan 3', action: "Odaberi jedan sistem produktivnosti koji nikad nisi probao/la. Radi eksperiment 3 dana." },
      { day: 'Dan 4', action: "Mapiraj tok rada nečega što ponavljaš. Gde su neefikasnosti? Popravi jednu." },
      { day: 'Dan 5', action: "Nauči jedan koncept ili alat za upravljanje projektima. Primeni ga na nešto realno danas." },
      { day: 'Dan 6', action: "Napravi jednostavan dashboard ili sistem praćenja za tvoj najvažniji cilj." },
      { day: 'Dan 7', action: "Napiši pregled nedelje: šta je funkcionisalo, šta nije, šta ćeš promeniti. Ova navika se množi." },
    ],
    N: [
      { day: 'Dan 1', action: "Provedi 30 minuta radeći nešto rukama — kuvanje, popravka, gradnja, crtanje." },
      { day: 'Dan 2', action: "Idi napolje. Posmatraj jedan prirodni ili fizički sistem i napiši 5 rečenica o tome kako funkcioniše." },
      { day: 'Dan 3', action: "Identifikuj jednu fizičku veštinu koju želiš da savladaš. Pronađi najboljи resurs za nju." },
      { day: 'Dan 4', action: "Počni mali fizički projekat — biljka, DIY popravka, fitnes rutina. Počni danas." },
      { day: 'Dan 5', action: "Istraži jednu oblast koja kombinuje fizički rad i uticaj: zdravstvo, životna sredina, inženjerstvo." },
      { day: 'Dan 6', action: "Nauči da popraviš ili napraviš jednu stvar koju inače prepuštaš drugima. YouTube je dovoljan za početak." },
      { day: 'Dan 7', action: "Podeli šta si napravio/la ili naučio/la ove nedelje. Fizički rad je potcenjen — učini ga vidljivim." },
    ],
  },
}

const firstPathData = {
  en: {
    C_T: 'Start learning Figma and build your first UI project this month.',
    C_P: 'Launch a small newsletter or content series about something you genuinely care about.',
    C_B: 'Rebrand something (even yourself) and document the process publicly.',
    T_C: 'Build and ship one small product — a tool, a site, an app — in the next 30 days.',
    T_B: 'Validate one business idea by building an MVP this month.',
    T_P: 'Contribute to an open-source project or teach someone a technical skill this week.',
    P_B: 'Land one coaching, consulting, or sales conversation this week — even unpaid.',
    P_C: 'Create your first piece of content that genuinely helps someone.',
    B_T: 'Build a simple product or service and make your first sale.',
    B_C: 'Create one piece of marketing for a real product — yours or someone else\'s.',
    default: 'Pick the single skill that excites you most. Commit to 30 minutes every day for 30 days.',
  },
  sr: {
    C_T: 'Počni da učiš Figmu i napravi svoj prvi UI projekat ovog meseca.',
    C_P: 'Pokreni mali newsletter ili seriju sadržaja o nečemu što te zaista zanima.',
    C_B: 'Rebrandiraj nešto (čak i sebe) i dokumentuj proces javno.',
    T_C: 'Napravi i objavi jedan mali proizvod — alat, sajt, aplikaciju — u narednih 30 dana.',
    T_B: 'Validiraj jednu poslovnu ideju pravljenjem MVP-a ovog meseca.',
    T_P: 'Doprinesi open-source projektu ili nauči nekoga tehničku veštinu ove nedelje.',
    P_B: 'Zakaži jedan kouching, konsalting ili prodajni razgovor ove nedelje — čak i besplatno.',
    P_C: 'Napravi svoj prvi sadržaj koji zaista pomaže nekome.',
    B_T: 'Napravi jednostavan proizvod ili uslugu i ostvari prvu prodaju.',
    B_C: 'Napravi jedan marketinški materijal za pravi proizvod — tvoj ili nečiji.',
    default: 'Odaberi jednu veštinu koja te najviše uzbuđuje. Posveti joj 30 minuta svaki dan tokom 30 dana.',
  },
}

export function getPersonalityType(scores, lang = 'en') {
  const { C, T, P, B, O, N, I, E, R, S } = scores
  const dims = [
    { key: 'C', val: C }, { key: 'T', val: T }, { key: 'P', val: P },
    { key: 'B', val: B }, { key: 'O', val: O }, { key: 'N', val: N },
  ].sort((a, b) => b.val - a.val)

  const primary = dims[0].key
  const secondary = dims[1].key
  const isIntrovert = I >= E
  const isRiskTaker = R >= S
  const typeKey = `${primary}_${secondary}`
  const types = typeData[lang] || typeData.en
  const type = types[typeKey] || types.default

  return { ...type, primary, secondary, isIntrovert, isRiskTaker, dims }
}

export function getCareerPaths(scores, lang = 'en') {
  const careers = (careerData[lang] || careerData.en).map((c) => {
    const score = Object.entries(c.weights).reduce((sum, [key, w]) => sum + (scores[key] || 0) * w, 0)
    return { label: c.label, score }
  })
  const maxScore = Math.max(...careers.map(c => c.score), 1)
  return careers
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map(c => ({ ...c, percent: Math.round(60 + (c.score / maxScore) * 38) }))
}

export function getStrengths(scores, lang = 'en') {
  const list = strengthsData[lang] || strengthsData.en
  return list
    .map(s => ({ label: s.label, score: (scores[s.dim] || 0) * 2 }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map(s => s.label)
}

export function getWeaknesses(scores, lang = 'en') {
  const list = weaknessData[lang] || weaknessData.en
  const fallback = {
    en: ['Undervaluing your existing skills', 'Waiting for perfect conditions', 'Comparing your progress to others'],
    sr: ['Potcenjivanje postojećih veština', 'Čekanje savršenih uslova', 'Upoređivanje svog napretka sa drugima'],
  }
  const result = list.filter(w => w.condition(scores)).slice(0, 3).map(w => w.label)
  return result.length ? result : (fallback[lang] || fallback.en)
}

export function getSkillsToLearn(scores, lang = 'en') {
  const dims = ['C', 'T', 'P', 'B', 'O', 'N']
    .map(k => ({ key: k, val: scores[k] || 0 }))
    .sort((a, b) => b.val - a.val)
  const map = skillsData[lang] || skillsData.en
  const skills = []
  dims.slice(0, 3).forEach(d => {
    skills.push(...(map[d.key] || []).slice(0, 2))
  })
  return [...new Set(skills)].slice(0, 6)
}

export function getActionPlan(scores, type, lang = 'en') {
  const plans = actionPlanData[lang] || actionPlanData.en
  return plans[type.primary] || plans.C
}

export function getFirstPath(scores, type, lang = 'en') {
  const paths = firstPathData[lang] || firstPathData.en
  return paths[`${type.primary}_${type.secondary}`] || paths.default
}
