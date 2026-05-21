// Dimension scores: C=Creative, T=Tech, P=People, B=Business, O=Organization, N=Nature
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

export function getPersonalityType(scores) {
  const { C, T, P, B, O, N, I, E, R, S } = scores

  // Determine primary dimension
  const dims = [
    { key: 'C', val: C, label: 'Creative' },
    { key: 'T', val: T, label: 'Tech' },
    { key: 'P', val: P, label: 'People' },
    { key: 'B', val: B, label: 'Business' },
    { key: 'O', val: O, label: 'Organization' },
    { key: 'N', val: N, label: 'Nature' },
  ].sort((a, b) => b.val - a.val)

  const primary = dims[0].key
  const secondary = dims[1].key
  const isIntrovert = I >= E
  const isRiskTaker = R >= S

  const types = {
    C_T: { name: 'The Digital Creator', emoji: '✦', tagline: 'You build things that look incredible and actually work.', color: '#8b5cf6' },
    C_P: { name: 'The Storyteller', emoji: '◎', tagline: 'You make people feel things — through words, images, ideas.', color: '#ec4899' },
    C_B: { name: 'The Creative Strategist', emoji: '⬡', tagline: 'You see the angle others miss. Ideas become businesses.', color: '#f59e0b' },
    C_O: { name: 'The Architect', emoji: '▣', tagline: 'You design systems that are beautiful and efficient.', color: '#06b6d4' },
    C_N: { name: 'The Craftsperson', emoji: '◈', tagline: 'Your hands and mind work together — you make the tangible.', color: '#10b981' },
    T_C: { name: 'The Product Builder', emoji: '⬟', tagline: 'You turn ideas into products that actually exist.', color: '#8b5cf6' },
    T_P: { name: 'The Tech Lead', emoji: '◆', tagline: 'You build systems and bring people with you.', color: '#3b82f6' },
    T_B: { name: 'The Founder', emoji: '✦', tagline: 'You can build it and sell it — the rarest combination.', color: '#f59e0b' },
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
  }

  const typeKey = `${primary}_${secondary}`
  const type = types[typeKey] || { name: 'The Explorer', emoji: '◎', tagline: 'You cross boundaries and connect worlds others keep separate.', color: '#8b5cf6' }

  return { ...type, primary, secondary, isIntrovert, isRiskTaker, dims }
}

export function getCareerPaths(scores) {
  const { C, T, P, B, O, N } = scores

  const careers = [
    { label: 'UX / Product Design', score: (C * 2 + T * 1.5 + P * 0.5) },
    { label: 'Software Engineering', score: (T * 2.5 + O * 1 + C * 0.5) },
    { label: 'Brand & Marketing', score: (C * 1.5 + B * 2 + P * 0.5) },
    { label: 'Content Creation / Media', score: (C * 2 + P * 1 + B * 0.5) },
    { label: 'Entrepreneurship', score: (B * 2.5 + R_val(scores) * 1.5 + T * 0.5) },
    { label: 'Data & Analytics', score: (T * 2 + O * 1.5) },
    { label: 'People & HR', score: (P * 2.5 + O * 1) },
    { label: 'Product Management', score: (T * 1 + P * 1.5 + O * 1.5 + B * 0.5) },
    { label: 'Consulting & Strategy', score: (B * 2 + O * 1.5 + P * 0.5) },
    { label: 'Creative Direction', score: (C * 2.5 + B * 1) },
    { label: 'Education & Coaching', score: (P * 2.5 + C * 0.5 + O * 0.5) },
    { label: 'Architecture / Engineering', score: (N * 1.5 + O * 1.5 + C * 0.5) },
    { label: 'Healthcare & Psychology', score: (P * 2 + N * 1.5) },
    { label: 'Sales & Business Dev', score: (B * 2.5 + P * 1.5) },
  ]

  return careers
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map((c, i) => {
      const max = careers[0]?.score || 1
      return { ...c, percent: Math.round(60 + (c.score / max) * 38) }
    })
}

function R_val(scores) {
  return scores.R || 0
}

export function getStrengths(scores) {
  const { C, T, P, B, O, N, I, E, R, S } = scores
  const allStrengths = [
    { label: 'Creative thinking', score: C * 2 },
    { label: 'Technical problem-solving', score: T * 2 },
    { label: 'Empathy & communication', score: P * 2 },
    { label: 'Strategic vision', score: B * 2 },
    { label: 'Planning & execution', score: O * 2 },
    { label: 'Hands-on mastery', score: N * 2 },
    { label: 'Independent focus', score: I * 2 },
    { label: 'Collaborative energy', score: E * 2 },
    { label: 'Risk-taking & initiative', score: R * 2 },
    { label: 'Reliability & consistency', score: S * 2 },
  ]
  return allStrengths.sort((a, b) => b.score - a.score).slice(0, 5).map(s => s.label)
}

export function getWeaknesses(scores) {
  const { C, T, P, B, O, N, I, E, R, S } = scores
  const watches = [
    { label: 'Over-thinking before acting', condition: O > 4 || I > 4 },
    { label: 'Avoiding conflict or hard conversations', condition: I > 3 && P < 3 },
    { label: 'Starting things without finishing them', condition: R > 4 && O < 3 },
    { label: 'Isolating when you should collaborate', condition: I > 5 },
    { label: 'Taking on too much at once', condition: B > 4 && O < 3 },
    { label: 'Neglecting structure and planning', condition: C > 4 && O < 2 },
    { label: 'People-pleasing over your own direction', condition: P > 5 && B < 2 },
    { label: 'Avoiding risk when it could unlock growth', condition: S > 4 && R < 2 },
    { label: 'Perfectionism blocking your output', condition: O > 4 && C > 3 },
    { label: 'Undervaluing your technical abilities', condition: T > 4 && B < 2 },
  ]
  return watches.filter(w => w.condition).slice(0, 3).map(w => w.label)
}

export function getSkillsToLearn(scores) {
  const { C, T, P, B, O, N } = scores
  const dims = [
    { key: 'C', val: C },
    { key: 'T', val: T },
    { key: 'P', val: P },
    { key: 'B', val: B },
    { key: 'O', val: O },
    { key: 'N', val: N },
  ].sort((a, b) => b.val - a.val)

  const skillMap = {
    C: ['Visual design (Figma, Canva)', 'Storytelling & copywriting', 'Video production & editing', 'Photography & visual communication'],
    T: ['Programming (Python or JavaScript)', 'Data analysis (SQL, Excel)', 'AI & automation tools', 'Systems thinking & architecture'],
    P: ['Public speaking', 'Active listening & coaching', 'Conflict resolution', 'Community building & facilitation'],
    B: ['Sales & negotiation', 'Business modeling & finance basics', 'Marketing & growth', 'Leadership & management'],
    O: ['Project management (Notion, Asana)', 'Process design', 'Time blocking & productivity systems', 'Research & structured thinking'],
    N: ['A physical or technical craft', 'Biology / environment basics', 'Physical fitness & body awareness', 'Hands-on prototyping'],
  }

  const skills = []
  dims.slice(0, 3).forEach(d => {
    const list = skillMap[d.key] || []
    skills.push(...list.slice(0, 2))
  })
  return [...new Set(skills)].slice(0, 6)
}

export function getActionPlan(scores, type) {
  const { primary } = type

  const plans = {
    C: [
      { day: 'Day 1', action: 'Redesign one thing you use every day — a menu, an app screen, a poster. Post it anywhere.' },
      { day: 'Day 2', action: 'Watch one talk by a designer or creator you admire. Take one note that changes how you see things.' },
      { day: 'Day 3', action: 'Pick a creative tool you\'ve never fully learned. Spend 45 minutes just exploring it with no goal.' },
      { day: 'Day 4', action: 'Write 500 words about something you genuinely care about. No editing. Just output.' },
      { day: 'Day 5', action: 'Find 3 people whose creative work you deeply respect. Study their path, not their work.' },
      { day: 'Day 6', action: 'Start a small personal project — nothing commercial, just for expression. One hour.' },
      { day: 'Day 7', action: 'Share something you made this week — even just with one person. The habit of sharing is the skill.' },
    ],
    T: [
      { day: 'Day 1', action: 'Pick one technical skill from your list. Find the best free resource (course/tutorial) and start today.' },
      { day: 'Day 2', action: 'Build the simplest possible thing with what you\'re learning — even if it\'s ugly.' },
      { day: 'Day 3', action: 'Read about one company or product that solves a problem you find interesting. How do they work technically?' },
      { day: 'Day 4', action: 'Find a small problem in your own life. Sketch (on paper) a technical solution — don\'t build it yet.' },
      { day: 'Day 5', action: 'Connect with one developer, engineer, or data person. Ask them one real question.' },
      { day: 'Day 6', action: 'Do 2 hours of focused technical practice — no multitasking, no distractions.' },
      { day: 'Day 7', action: 'Write a short post about what you built or learned this week. Explain it to someone who isn\'t technical.' },
    ],
    P: [
      { day: 'Day 1', action: 'Have one real conversation today — not small talk. Ask someone about their biggest current challenge.' },
      { day: 'Day 2', action: 'Read one chapter from a psychology, coaching, or communication book. Apply one thing immediately.' },
      { day: 'Day 3', action: 'Offer to help someone today in a way that uses your actual skills, not just your time.' },
      { day: 'Day 4', action: 'Write about 3 people you\'ve positively influenced. What did you specifically do? That\'s your edge.' },
      { day: 'Day 5', action: 'Join or find one community (online or offline) centered on something you care about.' },
      { day: 'Day 6', action: 'Practice one difficult conversation — say something honest that you usually hold back.' },
      { day: 'Day 7', action: 'Identify one person you can mentor, coach, or support consistently. Reach out today.' },
    ],
    B: [
      { day: 'Day 1', action: 'Write down 3 problems you notice in your environment that aren\'t being solved well. These are business opportunities.' },
      { day: 'Day 2', action: 'Read about one startup story from founding to current state. What decisions shaped it?' },
      { day: 'Day 3', action: 'Talk to one potential customer about one of your ideas — not to pitch, but to listen.' },
      { day: 'Day 4', action: 'Map out the simplest version of one business idea: problem, solution, who pays, how much.' },
      { day: 'Day 5', action: 'Identify one small skill you can offer to someone for money right now. Not a business — one gig.' },
      { day: 'Day 6', action: 'Learn one thing about pricing, negotiation, or sales. Apply it in any context today.' },
      { day: 'Day 7', action: 'Take one real action toward one idea — register a domain, post something, ask for feedback.' },
    ],
    O: [
      { day: 'Day 1', action: 'Audit how you currently spend your time. Track every hour today — just observation, no judgment.' },
      { day: 'Day 2', action: 'Choose one area to organize better — physical space, notes, or a project. Do it in 30 minutes.' },
      { day: 'Day 3', action: 'Pick one productivity system you\'ve never tried. Run a 3-day experiment with it starting now.' },
      { day: 'Day 4', action: 'Map the workflow of something you do repeatedly. Where are the inefficiencies? Fix one.' },
      { day: 'Day 5', action: 'Learn one project management concept or tool. Use it on something real today.' },
      { day: 'Day 6', action: 'Build a simple dashboard or tracking system for your most important goal right now.' },
      { day: 'Day 7', action: 'Write a one-week review: what worked, what didn\'t, what you\'ll change next week. This habit compounds.' },
    ],
    N: [
      { day: 'Day 1', action: 'Spend 30 minutes doing something with your hands — cooking, fixing, building, drawing. Just making.' },
      { day: 'Day 2', action: 'Go outside. Observe one natural or physical system and write 5 sentences about how it works.' },
      { day: 'Day 3', action: 'Identify one physical skill you want to master. Find the best teacher or resource for it.' },
      { day: 'Day 4', action: 'Start a small physical project — a plant, a DIY repair, a workout routine. Begin today.' },
      { day: 'Day 5', action: 'Visit or research one field that combines physical work with impact: health, environment, engineering.' },
      { day: 'Day 6', action: 'Learn to fix or build one thing you normally outsource. YouTube is enough to start.' },
      { day: 'Day 7', action: 'Share what you made or learned this week. Physical work is undervalued — make it visible.' },
    ],
  }

  return plans[primary] || plans.C
}

export function getFirstPath(scores, type) {
  const { primary, secondary } = type
  const paths = {
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
    default: 'Pick the single skill that excites you most from your list. Commit to 30 minutes every day for 30 days.',
  }
  return paths[`${primary}_${secondary}`] || paths.default
}
