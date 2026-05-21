// Scoring dimensions:
// C = Creative, T = Tech, P = People, B = Business, O = Organization, N = Nature/Hands-on
// I = Introvert, E = Extrovert (for personality)
// R = Risk-taker, S = Stable-seeker

export const questions = [
  {
    id: 1,
    category: 'Energy',
    question: "After a full day of social interaction — meetings, group work, events — how do you feel?",
    options: [
      { text: "Completely drained. I need alone time to recharge.", scores: { I: 2 } },
      { text: "A bit tired, but it depends on the people.", scores: { I: 1, E: 1 } },
      { text: "Fine, I adapt to both situations easily.", scores: { E: 1 } },
      { text: "Energized — I love being around people.", scores: { E: 2, P: 1 } },
    ],
  },
  {
    id: 2,
    category: 'Work style',
    question: "When you have a big project to do, which approach feels most natural?",
    options: [
      { text: "I break it into a detailed plan with clear steps and deadlines.", scores: { O: 2 } },
      { text: "I explore ideas first, then figure out the structure as I go.", scores: { C: 1, T: 1 } },
      { text: "I jump straight in and learn as I do.", scores: { R: 2, N: 1 } },
      { text: "I talk it through with someone to get clarity.", scores: { P: 2, E: 1 } },
    ],
  },
  {
    id: 3,
    category: 'Interests',
    question: "Which of these activities could you do for hours without getting bored?",
    options: [
      { text: "Building or designing something — apps, visuals, spaces, or objects.", scores: { C: 2, T: 1 } },
      { text: "Reading, researching, and going deep on a topic that fascinates me.", scores: { T: 2, O: 1 } },
      { text: "Talking, coaching, or helping someone work through a problem.", scores: { P: 2, E: 1 } },
      { text: "Strategizing — figuring out how to grow something or win.", scores: { B: 2, O: 1 } },
    ],
  },
  {
    id: 4,
    category: 'Motivation',
    question: "What's the main thing that makes you feel like your work actually matters?",
    options: [
      { text: "Creating something beautiful or meaningful that didn't exist before.", scores: { C: 2 } },
      { text: "Solving a complex problem in a clever or efficient way.", scores: { T: 2 } },
      { text: "Directly improving someone's life or situation.", scores: { P: 2 } },
      { text: "Building something successful, growing it, making an impact at scale.", scores: { B: 2, R: 1 } },
    ],
  },
  {
    id: 5,
    category: 'Annoyances',
    question: "Which of these frustrates you the most at work or school?",
    options: [
      { text: "Being forced into rigid rules with no room for my own approach.", scores: { C: 1, R: 1 } },
      { text: "Vague goals and unclear expectations.", scores: { O: 2 } },
      { text: "Having to work alone for too long without interaction.", scores: { E: 2, P: 1 } },
      { text: "Slow pace, lack of ambition, or playing it too safe.", scores: { B: 1, R: 2 } },
    ],
  },
  {
    id: 6,
    category: 'Tech',
    question: "How do you feel about technology, code, and digital systems?",
    options: [
      { text: "I love it — I want to understand how things work and build them.", scores: { T: 3 } },
      { text: "I use it as a tool but I'm not obsessed with the technical side.", scores: { T: 1 } },
      { text: "It's fine but it doesn't excite me — I prefer human or creative work.", scores: { P: 1, C: 1 } },
      { text: "I mostly avoid it unless I absolutely have to.", scores: { N: 1 } },
    ],
  },
  {
    id: 7,
    category: 'People',
    question: "When it comes to working with other people, you mostly...",
    options: [
      { text: "Love leading, organizing, and getting the best out of a team.", scores: { P: 2, O: 1, B: 1 } },
      { text: "Prefer collaborating as a peer — mutual energy without hierarchy.", scores: { P: 1, E: 1 } },
      { text: "Like contributing individually and checking in with others occasionally.", scores: { I: 1, T: 1 } },
      { text: "Work best completely alone — others disrupt my flow.", scores: { I: 2 } },
    ],
  },
  {
    id: 8,
    category: 'Risk',
    question: "How do you feel about uncertainty and risk?",
    options: [
      { text: "I thrive on it — uncertainty means opportunity.", scores: { R: 3, B: 1 } },
      { text: "I can handle it when I believe in what I'm doing.", scores: { R: 1, B: 1 } },
      { text: "I prefer calculated risks with a fallback plan.", scores: { O: 1, S: 1 } },
      { text: "I want stability — risk stresses me out too much.", scores: { S: 2, O: 1 } },
    ],
  },
  {
    id: 9,
    category: 'Lifestyle',
    question: "What does your ideal workday look like?",
    options: [
      { text: "Working from anywhere — laptop, café, my own schedule.", scores: { R: 1, C: 1, I: 1 } },
      { text: "A structured routine in a great environment — clear hours, clear goals.", scores: { O: 2, S: 1 } },
      { text: "Outdoors or physically active — not stuck behind a screen all day.", scores: { N: 3 } },
      { text: "Fast-paced, in the middle of a city, surrounded by ambitious people.", scores: { B: 2, E: 1 } },
    ],
  },
  {
    id: 10,
    category: 'Decisions',
    question: "How do you usually make important decisions?",
    options: [
      { text: "I research everything, make a list of pros and cons, then decide.", scores: { O: 2, T: 1 } },
      { text: "I listen to my gut — if it feels right, I go for it.", scores: { R: 1, C: 1 } },
      { text: "I talk to people I trust and weigh their perspectives.", scores: { P: 2 } },
      { text: "I think about the long-term consequences and what I can live with.", scores: { S: 1, O: 1 } },
    ],
  },
  {
    id: 11,
    category: 'Creativity',
    question: "When you think about 'creative work', what comes to mind first?",
    options: [
      { text: "Visual design, photography, film — things you can see and feel.", scores: { C: 3 } },
      { text: "Writing, storytelling, or crafting ideas into words.", scores: { C: 2, P: 1 } },
      { text: "Building products — engineering solutions that didn't exist.", scores: { T: 2, C: 1 } },
      { text: "Business creativity — finding new models, markets, or strategies.", scores: { B: 2, C: 1 } },
    ],
  },
  {
    id: 12,
    category: 'Learning',
    question: "How do you learn best?",
    options: [
      { text: "Reading, watching, absorbing information at my own pace.", scores: { I: 1, T: 1 } },
      { text: "Doing — I learn by making mistakes and iterating.", scores: { N: 1, R: 1, C: 1 } },
      { text: "Watching and then copying someone who's already good at it.", scores: { P: 1 } },
      { text: "Structured courses with clear curriculum and milestones.", scores: { O: 2, S: 1 } },
    ],
  },
  {
    id: 13,
    category: 'Values',
    question: "What matters most to you in the work you do?",
    options: [
      { text: "Freedom — controlling my own time, place, and approach.", scores: { R: 2, C: 1, I: 1 } },
      { text: "Impact — knowing my work actually changes something.", scores: { P: 1, B: 1 } },
      { text: "Growth — constant learning, challenge, and progress.", scores: { T: 1, O: 1 } },
      { text: "Security — a stable income, a clear role, predictable future.", scores: { S: 3 } },
    ],
  },
  {
    id: 14,
    category: 'Business',
    question: "How do you feel about selling, persuading, or marketing ideas?",
    options: [
      { text: "I love it — I'm naturally good at convincing people.", scores: { B: 3, E: 1 } },
      { text: "I can do it when I believe in the product.", scores: { B: 1, P: 1 } },
      { text: "It's not my thing — I'd rather let the work speak for itself.", scores: { I: 1, C: 1, T: 1 } },
      { text: "It feels uncomfortable and a bit manipulative.", scores: { P: 1 } },
    ],
  },
  {
    id: 15,
    category: 'Impact',
    question: "Where do you see yourself making the biggest impact in 10 years?",
    options: [
      { text: "Building or leading a company — something with my name on it.", scores: { B: 3, R: 1 } },
      { text: "Being genuinely world-class at a skill — a recognized expert.", scores: { T: 2, O: 1 } },
      { text: "Helping thousands of people directly — through a service, practice, or mission.", scores: { P: 3 } },
      { text: "Creating work that moves people — art, stories, experiences.", scores: { C: 3 } },
    ],
  },
  {
    id: 16,
    category: 'Fear',
    question: "What's your biggest professional fear?",
    options: [
      { text: "Being stuck in a job that doesn't use my real potential.", scores: { B: 1, C: 1 } },
      { text: "Failing publicly — being seen as incompetent or a fraud.", scores: { S: 1, I: 1 } },
      { text: "Being financially unstable — not being able to pay my bills.", scores: { S: 2 } },
      { text: "Living a conventional life and never doing something memorable.", scores: { R: 2, C: 1 } },
    ],
  },
  {
    id: 17,
    category: 'Environment',
    question: "Which work environment sounds the most appealing?",
    options: [
      { text: "A fast startup where I wear many hats and things move fast.", scores: { B: 2, R: 2 } },
      { text: "A focused, senior team where deep expertise is respected.", scores: { T: 2, O: 1 } },
      { text: "A purpose-driven organization working on social or environmental issues.", scores: { P: 2, N: 1 } },
      { text: "My own studio or freelance practice — full autonomy.", scores: { C: 2, I: 1, R: 1 } },
    ],
  },
  {
    id: 18,
    category: 'Strengths',
    question: "What do people most often come to you for?",
    options: [
      { text: "Advice, emotional support, or help sorting out problems.", scores: { P: 3 } },
      { text: "Creative input — they want my taste, ideas, or eye.", scores: { C: 3 } },
      { text: "Information, analysis, or solutions — I'm the 'smart' one in the room.", scores: { T: 2, O: 1 } },
      { text: "Getting things done — I'm reliable, organized, make things happen.", scores: { O: 2, B: 1 } },
    ],
  },
  {
    id: 19,
    category: 'Ambitions',
    question: "If money weren't an issue, how would you spend your working hours?",
    options: [
      { text: "Building products, tools, or systems that millions of people use.", scores: { T: 2, B: 1 } },
      { text: "Making art, content, or experiences that express something true.", scores: { C: 3 } },
      { text: "Teaching, coaching, or mentoring people to reach their potential.", scores: { P: 3 } },
      { text: "Exploring nature, crafting physical things, or working with my hands.", scores: { N: 3 } },
    ],
  },
  {
    id: 20,
    category: 'First step',
    question: "You've just decided on a new direction. What's your first move?",
    options: [
      { text: "Research: I consume everything I can find about it before acting.", scores: { T: 1, O: 1 } },
      { text: "Create: I make something immediately to see if I like doing it.", scores: { C: 2, R: 1 } },
      { text: "Connect: I find people already doing it and ask for a conversation.", scores: { P: 2, E: 1 } },
      { text: "Plan: I build a roadmap, set milestones, and start tracking progress.", scores: { O: 2, B: 1 } },
    ],
  },
]
