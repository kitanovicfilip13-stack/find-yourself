// Scoring dimensions:
// C = Creative, T = Tech, P = People, B = Business, O = Organization, N = Nature/Hands-on
// I = Introvert, E = Extrovert, R = Risk-taker, S = Stable-seeker

const questionsData = {
  en: [
    {
      id: 1, category: 'Energy',
      question: "After a full day of social interaction — meetings, group work, events — how do you feel?",
      options: [
        { text: "Completely drained. I need alone time to recharge.", scores: { I: 2 } },
        { text: "A bit tired, but it depends on the people.", scores: { I: 1, E: 1 } },
        { text: "Fine, I adapt to both situations easily.", scores: { E: 1 } },
        { text: "Energized — I love being around people.", scores: { E: 2, P: 1 } },
      ],
    },
    {
      id: 2, category: 'Work style',
      question: "When you have a big project to do, which approach feels most natural?",
      options: [
        { text: "I break it into a detailed plan with clear steps and deadlines.", scores: { O: 2 } },
        { text: "I explore ideas first, then figure out the structure as I go.", scores: { C: 1, T: 1 } },
        { text: "I jump straight in and learn as I do.", scores: { R: 2, N: 1 } },
        { text: "I talk it through with someone to get clarity.", scores: { P: 2, E: 1 } },
      ],
    },
    {
      id: 3, category: 'Interests',
      question: "Which of these activities could you do for hours without getting bored?",
      options: [
        { text: "Building or designing something — apps, visuals, spaces, or objects.", scores: { C: 2, T: 1 } },
        { text: "Reading, researching, and going deep on a topic that fascinates me.", scores: { T: 2, O: 1 } },
        { text: "Talking, coaching, or helping someone work through a problem.", scores: { P: 2, E: 1 } },
        { text: "Strategizing — figuring out how to grow something or win.", scores: { B: 2, O: 1 } },
      ],
    },
    {
      id: 4, category: 'Motivation',
      question: "What's the main thing that makes you feel like your work actually matters?",
      options: [
        { text: "Creating something beautiful or meaningful that didn't exist before.", scores: { C: 2 } },
        { text: "Solving a complex problem in a clever or efficient way.", scores: { T: 2 } },
        { text: "Directly improving someone's life or situation.", scores: { P: 2 } },
        { text: "Building something successful, growing it, making an impact at scale.", scores: { B: 2, R: 1 } },
      ],
    },
    {
      id: 5, category: 'Annoyances',
      question: "Which of these frustrates you the most at work or school?",
      options: [
        { text: "Being forced into rigid rules with no room for my own approach.", scores: { C: 1, R: 1 } },
        { text: "Vague goals and unclear expectations.", scores: { O: 2 } },
        { text: "Having to work alone for too long without interaction.", scores: { E: 2, P: 1 } },
        { text: "Slow pace, lack of ambition, or playing it too safe.", scores: { B: 1, R: 2 } },
      ],
    },
    {
      id: 6, category: 'Tech',
      question: "How do you feel about technology, code, and digital systems?",
      options: [
        { text: "I love it — I want to understand how things work and build them.", scores: { T: 3 } },
        { text: "I use it as a tool but I'm not obsessed with the technical side.", scores: { T: 1 } },
        { text: "It's fine but it doesn't excite me — I prefer human or creative work.", scores: { P: 1, C: 1 } },
        { text: "I mostly avoid it unless I absolutely have to.", scores: { N: 1 } },
      ],
    },
    {
      id: 7, category: 'People',
      question: "When it comes to working with other people, you mostly...",
      options: [
        { text: "Love leading, organizing, and getting the best out of a team.", scores: { P: 2, O: 1, B: 1 } },
        { text: "Prefer collaborating as a peer — mutual energy without hierarchy.", scores: { P: 1, E: 1 } },
        { text: "Like contributing individually and checking in with others occasionally.", scores: { I: 1, T: 1 } },
        { text: "Work best completely alone — others disrupt my flow.", scores: { I: 2 } },
      ],
    },
    {
      id: 8, category: 'Risk',
      question: "How do you feel about uncertainty and risk?",
      options: [
        { text: "I thrive on it — uncertainty means opportunity.", scores: { R: 3, B: 1 } },
        { text: "I can handle it when I believe in what I'm doing.", scores: { R: 1, B: 1 } },
        { text: "I prefer calculated risks with a fallback plan.", scores: { O: 1, S: 1 } },
        { text: "I want stability — risk stresses me out too much.", scores: { S: 2, O: 1 } },
      ],
    },
    {
      id: 9, category: 'Lifestyle',
      question: "What does your ideal workday look like?",
      options: [
        { text: "Working from anywhere — laptop, café, my own schedule.", scores: { R: 1, C: 1, I: 1 } },
        { text: "A structured routine in a great environment — clear hours, clear goals.", scores: { O: 2, S: 1 } },
        { text: "Outdoors or physically active — not stuck behind a screen all day.", scores: { N: 3 } },
        { text: "Fast-paced, in the middle of a city, surrounded by ambitious people.", scores: { B: 2, E: 1 } },
      ],
    },
    {
      id: 10, category: 'Decisions',
      question: "How do you usually make important decisions?",
      options: [
        { text: "I research everything, make a list of pros and cons, then decide.", scores: { O: 2, T: 1 } },
        { text: "I listen to my gut — if it feels right, I go for it.", scores: { R: 1, C: 1 } },
        { text: "I talk to people I trust and weigh their perspectives.", scores: { P: 2 } },
        { text: "I think about the long-term consequences and what I can live with.", scores: { S: 1, O: 1 } },
      ],
    },
    {
      id: 11, category: 'Creativity',
      question: "When you think about 'creative work', what comes to mind first?",
      options: [
        { text: "Visual design, photography, film — things you can see and feel.", scores: { C: 3 } },
        { text: "Writing, storytelling, or crafting ideas into words.", scores: { C: 2, P: 1 } },
        { text: "Building products — engineering solutions that didn't exist.", scores: { T: 2, C: 1 } },
        { text: "Business creativity — finding new models, markets, or strategies.", scores: { B: 2, C: 1 } },
      ],
    },
    {
      id: 12, category: 'Learning',
      question: "How do you learn best?",
      options: [
        { text: "Reading, watching, absorbing information at my own pace.", scores: { I: 1, T: 1 } },
        { text: "Doing — I learn by making mistakes and iterating.", scores: { N: 1, R: 1, C: 1 } },
        { text: "Watching and then copying someone who's already good at it.", scores: { P: 1 } },
        { text: "Structured courses with clear curriculum and milestones.", scores: { O: 2, S: 1 } },
      ],
    },
    {
      id: 13, category: 'Values',
      question: "What matters most to you in the work you do?",
      options: [
        { text: "Freedom — controlling my own time, place, and approach.", scores: { R: 2, C: 1, I: 1 } },
        { text: "Impact — knowing my work actually changes something.", scores: { P: 1, B: 1 } },
        { text: "Growth — constant learning, challenge, and progress.", scores: { T: 1, O: 1 } },
        { text: "Security — a stable income, a clear role, predictable future.", scores: { S: 3 } },
      ],
    },
    {
      id: 14, category: 'Business',
      question: "How do you feel about selling, persuading, or marketing ideas?",
      options: [
        { text: "I love it — I'm naturally good at convincing people.", scores: { B: 3, E: 1 } },
        { text: "I can do it when I believe in the product.", scores: { B: 1, P: 1 } },
        { text: "It's not my thing — I'd rather let the work speak for itself.", scores: { I: 1, C: 1, T: 1 } },
        { text: "It feels uncomfortable and a bit manipulative.", scores: { P: 1 } },
      ],
    },
    {
      id: 15, category: 'Impact',
      question: "Where do you see yourself making the biggest impact in 10 years?",
      options: [
        { text: "Building or leading a company — something with my name on it.", scores: { B: 3, R: 1 } },
        { text: "Being genuinely world-class at a skill — a recognized expert.", scores: { T: 2, O: 1 } },
        { text: "Helping thousands of people directly — through a service, practice, or mission.", scores: { P: 3 } },
        { text: "Creating work that moves people — art, stories, experiences.", scores: { C: 3 } },
      ],
    },
    {
      id: 16, category: 'Fear',
      question: "What's your biggest professional fear?",
      options: [
        { text: "Being stuck in a job that doesn't use my real potential.", scores: { B: 1, C: 1 } },
        { text: "Failing publicly — being seen as incompetent or a fraud.", scores: { S: 1, I: 1 } },
        { text: "Being financially unstable — not being able to pay my bills.", scores: { S: 2 } },
        { text: "Living a conventional life and never doing something memorable.", scores: { R: 2, C: 1 } },
      ],
    },
    {
      id: 17, category: 'Environment',
      question: "Which work environment sounds the most appealing?",
      options: [
        { text: "A fast startup where I wear many hats and things move fast.", scores: { B: 2, R: 2 } },
        { text: "A focused, senior team where deep expertise is respected.", scores: { T: 2, O: 1 } },
        { text: "A purpose-driven organization working on social or environmental issues.", scores: { P: 2, N: 1 } },
        { text: "My own studio or freelance practice — full autonomy.", scores: { C: 2, I: 1, R: 1 } },
      ],
    },
    {
      id: 18, category: 'Strengths',
      question: "What do people most often come to you for?",
      options: [
        { text: "Advice, emotional support, or help sorting out problems.", scores: { P: 3 } },
        { text: "Creative input — they want my taste, ideas, or eye.", scores: { C: 3 } },
        { text: "Information, analysis, or solutions — I'm the 'smart' one in the room.", scores: { T: 2, O: 1 } },
        { text: "Getting things done — I'm reliable, organized, make things happen.", scores: { O: 2, B: 1 } },
      ],
    },
    {
      id: 19, category: 'Ambitions',
      question: "If money weren't an issue, how would you spend your working hours?",
      options: [
        { text: "Building products, tools, or systems that millions of people use.", scores: { T: 2, B: 1 } },
        { text: "Making art, content, or experiences that express something true.", scores: { C: 3 } },
        { text: "Teaching, coaching, or mentoring people to reach their potential.", scores: { P: 3 } },
        { text: "Exploring nature, crafting physical things, or working with my hands.", scores: { N: 3 } },
      ],
    },
    {
      id: 20, category: 'First step',
      question: "You've just decided on a new direction. What's your first move?",
      options: [
        { text: "Research: I consume everything I can find about it before acting.", scores: { T: 1, O: 1 } },
        { text: "Create: I make something immediately to see if I like doing it.", scores: { C: 2, R: 1 } },
        { text: "Connect: I find people already doing it and ask for a conversation.", scores: { P: 2, E: 1 } },
        { text: "Plan: I build a roadmap, set milestones, and start tracking progress.", scores: { O: 2, B: 1 } },
      ],
    },
  ],

  sr: [
    {
      id: 1, category: 'Energija',
      question: "Nakon celog dana društvenih interakcija, sastanci, grupni rad, događaji. Kako se osećaš?",
      options: [
        { text: "Potpuno iscrpljeno. Treba mi vreme nasamo da se smirim.", scores: { I: 2 } },
        { text: "Pomalo umorno, ali zavisi od ljudi.", scores: { I: 1, E: 1 } },
        { text: "Dobro, lako se prilagođavam oba tipa situacija.", scores: { E: 1 } },
        { text: "Napunjeno energijom, volim da budem okružen/a ljudima.", scores: { E: 2, P: 1 } },
      ],
    },
    {
      id: 2, category: 'Stil rada',
      question: "Kada imaš veliki projekat, zadatak, posao pred sobom, koji pristup ti deluje najprirodniji?",
      options: [
        { text: "Razložim ga na detaljan plan sa jasnim koracima i rokovima.", scores: { O: 2 } },
        { text: "Prvo istražujem ideje, pa razrađujem strukturu kako idem.", scores: { C: 1, T: 1 } },
        { text: "Odmah se bacim na posao i učim dok radim.", scores: { R: 2, N: 1 } },
        { text: "Razgovaram sa nekim da razbistrim misli.", scores: { P: 2, E: 1 } },
      ],
    },
    {
      id: 3, category: 'Interesovanja',
      question: "Koje od ovih aktivnosti bi mogao/la da radiš satima bez dosade?",
      options: [
        { text: "Pravljenje ili dizajniranje nečega, aplikacije, vizuale, prostore, predmete.", scores: { C: 2, T: 1 } },
        { text: "Čitanje, istraživanje i duboko razmišljanje o temi koja me fascinira.", scores: { T: 2, O: 1 } },
        { text: "Razgovor, podrška ili pomaganje nekome da reši problem.", scores: { P: 2, E: 1 } },
        { text: "Strategija, osmišljavanje kako nešto da izgradiš ili probiješ.", scores: { B: 2, O: 1 } },
      ],
    },
    {
      id: 4, category: 'Motivacija',
      question: "Šta te najviše tera da osećaš da tvoj rad zaista ima smisla?",
      options: [
        { text: "Kada kreiram nešto lepo ili značajno što pre nije postojalo.", scores: { C: 2 } },
        { text: "Kada rešim kompleksan problem na pametan ili efikasan način.", scores: { T: 2 } },
        { text: "Kada direktno poboljšam nečiji život ili situaciju.", scores: { P: 2 } },
        { text: "Kada izgradim nešto uspešno, rastem i stvaram uticaj u velikim razmerama.", scores: { B: 2, R: 1 } },
      ],
    },
    {
      id: 5, category: 'Šta te smara',
      question: "Šta te od ovog najviše nervira na poslu, fakultetu, školi?",
      options: [
        { text: "Nametanje krutih pravila bez prostora za moj sopstveni pristup.", scores: { C: 1, R: 1 } },
        { text: "Nejasni ciljevi i neodređena očekivanja.", scores: { O: 2 } },
        { text: "Dugo raditi sam/a bez ikakve interakcije sa drugima.", scores: { E: 2, P: 1 } },
        { text: "Spor tempo, nedostatak ambicije ili prevelika opreznost.", scores: { B: 1, R: 2 } },
      ],
    },
    {
      id: 6, category: 'Tehnologija',
      question: "Kako se osećaš prema tehnologiji i digitalnim sistemima?",
      options: [
        { text: "Obožavam to, želim da razumem kako stvari funkcionišu i da ih gradim.", scores: { T: 3 } },
        { text: "Koristim kao alat, ali me ne zanima tehnička strana.", scores: { T: 1 } },
        { text: "Uredu je, ali me ne uzbuđuje, preferiram rad sa ljudima ili kreativni rad.", scores: { P: 1, C: 1 } },
        { text: "Uglavnom je izbegavam ako baš ne moram.", scores: { N: 1 } },
      ],
    },
    {
      id: 7, category: 'Timski rad',
      question: "Kada je reč o radu sa drugim ljudima, ti uglavnom...",
      options: [
        { text: "Voliš da vodiš, organizuješ i izvlačiš maksimum iz tima.", scores: { P: 2, O: 1, B: 1 } },
        { text: "Radije sarađuješ kao ravnopravan član.", scores: { P: 1, E: 1 } },
        { text: "Voliš da daješ individualni doprinos i povremeno da se povežeš sa drugima.", scores: { I: 1, T: 1 } },
        { text: "Najefikasnije radiš potpuno sam/a.", scores: { I: 2 } },
      ],
    },
    {
      id: 8, category: 'Rizik',
      question: "Kako se osećaš prema neizvesnosti i riziku?",
      options: [
        { text: "Uspevam zahvaljujući njima, neizvesnost znači prilika.", scores: { R: 3, B: 1 } },
        { text: "Mogu da ih podnesem kada verujem u ono što radim.", scores: { R: 1, B: 1 } },
        { text: "Preferiram kalkulisane rizike sa rezervnim planom.", scores: { O: 1, S: 1 } },
        { text: "Hoću stabilnost, rizik mi previše stvara stres.", scores: { S: 2, O: 1 } },
      ],
    },
    {
      id: 9, category: 'Stil života',
      question: "Kako izgleda tvoj idealan radni dan?",
      options: [
        { text: "Rad odakle hoću, laptop, kafić, moj raspored.", scores: { R: 1, C: 1, I: 1 } },
        { text: "Strukturirana rutina u dobrom okruženju, jasni sati, jasni ciljevi.", scores: { O: 2, S: 1 } },
        { text: "Napolju ili fizički aktivan/a, ne zatvoren/a iza ekrana ceo dan.", scores: { N: 3 } },
        { text: "Brz tempo, u centru grada, okružen/a ambicioznim ljudima.", scores: { B: 2, E: 1 } },
      ],
    },
    {
      id: 10, category: 'Donošenje odluka',
      question: "Kako obično donosiš važne odluke?",
      options: [
        { text: "Istražujem sve, pravim listu prednosti i nedostataka, pa odlučujem.", scores: { O: 2, T: 1 } },
        { text: "Slušam intuiciju, ako se osećam sigurno, idem na to.", scores: { R: 1, C: 1 } },
        { text: "Pričam sa ljudima kojima verujem i razmotrim njihove savete.", scores: { P: 2 } },
        { text: "Razmišljam o dugoročnim posledicama i onome s čime mogu da živim.", scores: { S: 1, O: 1 } },
      ],
    },
    {
      id: 11, category: 'Kreativnost',
      question: "Kada pomisliš na 'kreativan rad', šta ti prvo pada na pamet?",
      options: [
        { text: "Vizuelni dizajn, fotografija, film, stvari koje možeš da vidiš i osеtiš.", scores: { C: 3 } },
        { text: "Pisanje, pripovedanje ili pretvaranje ideja u reči.", scores: { C: 2, P: 1 } },
        { text: "Pravljenje proizvoda, inženjering rešenja koja nisu postojala.", scores: { T: 2, C: 1 } },
        { text: "Biznis kreativnost, pronalaženje novih modela, tržišta ili strategija.", scores: { B: 2, C: 1 } },
      ],
    },
    {
      id: 12, category: 'Učenje',
      question: "Na koji način najbolje učiš?",
      options: [
        { text: "Čitam, gledam, upijam informacije sopstvenim tempom.", scores: { I: 1, T: 1 } },
        { text: "Radeći, učim kroz greške.", scores: { N: 1, R: 1, C: 1 } },
        { text: "Posmatram i zatim kopiram nekoga ko je već dobar u tome.", scores: { P: 1 } },
        { text: "Strukturirani kursevi sa jasnim planom.", scores: { O: 2, S: 1 } },
      ],
    },
    {
      id: 13, category: 'Vrednosti',
      question: "Šta ti je najvažnije u poslu koji radiš?",
      options: [
        { text: "Sloboda, kontrola sopstvenog vremena, mesta i pristupa.", scores: { R: 2, C: 1, I: 1 } },
        { text: "Uticaj, znati da moj rad zaista menja nešto.", scores: { P: 1, B: 1 } },
        { text: "Rast, stalno učenje, izazovi i napredak.", scores: { T: 1, O: 1 } },
        { text: "Sigurnost, stabilan prihod, jasna uloga, predvidiva budućnost.", scores: { S: 3 } },
      ],
    },
    {
      id: 14, category: 'Biznis',
      question: "Kako se osećaš kada čuješ prodaja, ubeđivanje ili marketing ideja?",
      options: [
        { text: "Obožavam to, prirodno sam dobar/a u ubeđivanju.", scores: { B: 3, E: 1 } },
        { text: "Mogu to da radim kada verujem u proizvod.", scores: { B: 1, P: 1 } },
        { text: "Nije moja stvar, radije pustim da rad govori sam za sebe.", scores: { I: 1, C: 1, T: 1 } },
        { text: "Osećam se neprijatno, kao da manipulišem.", scores: { P: 1 } },
      ],
    },
    {
      id: 15, category: 'Uticaj',
      question: "Gde vidiš sebe da praviš najveći uticaj za 10 godina?",
      options: [
        { text: "Gradim ili vodim kompaniju, nešto sa mojim imenom na njoj.", scores: { B: 3, R: 1 } },
        { text: "Vrhunski stručnjak u svojoj oblasti. Priznat/a stručnjak/inja.", scores: { T: 2, O: 1 } },
        { text: "Direktno pomažem ljudima, kroz servis, praksu ili misiju.", scores: { P: 3 } },
        { text: "Pravim rad koji pokreće ljude, umetnost, priče, iskustva.", scores: { C: 3 } },
      ],
    },
    {
      id: 16, category: 'Strahovi',
      question: "Koji je tvoj najveći profesionalni strah?",
      options: [
        { text: "Zaglaviti se na poslu koji ne koristi moj pravi potencijal.", scores: { B: 1, C: 1 } },
        { text: "Javni neuspeh, da me vide kao nekompetentnog/u ili varalicu.", scores: { S: 1, I: 1 } },
        { text: "Finansijska nestabilnost, nemati dovoljno novca za normalan život.", scores: { S: 2 } },
        { text: "Živeti klasičan život i nikada ne uraditi nešto za pamćenje.", scores: { R: 2, C: 1 } },
      ],
    },
    {
      id: 17, category: 'Radno okruženje',
      question: "Koje radno okruženje ti zvuči najprivlačnije?",
      options: [
        { text: "Brzi startup gde radim svašta i stvari se kreću brzo.", scores: { B: 2, R: 2 } },
        { text: "Fokusiran, seniorski tim gde se ceni vrhunsko znanje.", scores: { T: 2, O: 1 } },
        { text: "Organizacija sa misijom koja radi na društvenim ili ekološkim pitanjima.", scores: { P: 2, N: 1 } },
        { text: "Sopstveni studio ili frilenserska praksa.", scores: { C: 2, I: 1, R: 1 } },
      ],
    },
    {
      id: 18, category: 'Potencijali',
      question: "Za šta ti se ljudi najčešće obraćaju za pomoć?",
      options: [
        { text: "Savet, emotivna podrška ili pomoć u rešavanju problema.", scores: { P: 3 } },
        { text: "Kreativnost, žele moj ukus, ideje ili oko.", scores: { C: 3 } },
        { text: "Informacije, analizu ili rešenja, ja sam 'pametna glava' u prostoriji.", scores: { T: 2, O: 1 } },
        { text: "Realizacija, pouzdan/a sam, organizovan/a, stvari se dešavaju.", scores: { O: 2, B: 1 } },
      ],
    },
    {
      id: 19, category: 'Ambicije',
      question: "Kada novac ne bi bio faktor, kako bi provodio/la radno vreme?",
      options: [
        { text: "Gradeći proizvode, alate ili sisteme koje koriste milioni.", scores: { T: 2, B: 1 } },
        { text: "Praveći umetnost, sadržaj ili iskustva koja izražavaju nešto istinito.", scores: { C: 3 } },
        { text: "Podučavajući ili mentorišući ljude da dostignu potencijal.", scores: { P: 3 } },
        { text: "Istražujući prirodu, praveći fizičke predmete ili radeći rukama.", scores: { N: 3 } },
      ],
    },
    {
      id: 20, category: 'Prvi korak',
      question: "Upravo si se odlučio/la za novi pravac. Koji je tvoj prvi potez?",
      options: [
        { text: "Istraživanje: konzumiram sve što mogu da pronađem pre nego što krenem.", scores: { T: 1, O: 1 } },
        { text: "Kreiranje: odmah nešto napravim da vidim da li mi se to sviđa.", scores: { C: 2, R: 1 } },
        { text: "Povezivanje: pronađem ljude koji to već rade i zamolim ih za razgovor.", scores: { P: 2, E: 1 } },
        { text: "Planiranje: pravim mapu puta, postavljam prekretnice i počinjem da pratim napredak.", scores: { O: 2, B: 1 } },
      ],
    },
  ],
}

export function getQuestions(lang = 'en') {
  return questionsData[lang] || questionsData.en
}
