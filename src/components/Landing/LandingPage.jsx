import Navbar from '../shared/Navbar'
import Hero from './Hero'
import Problem from './Problem'
import HowItWorks from './HowItWorks'
import WhatYouGet from './WhatYouGet'
import Testimonials from './Testimonials'
import FAQ from './FAQ'
import FinalCTA from './FinalCTA'
import Footer from '../shared/Footer'

export default function LandingPage({ onStart, hasProgress, onDashboard }) {
  return (
    <div className="relative">
      <Navbar onStart={onStart} onDashboard={onDashboard} />
      <Hero onStart={onStart} hasProgress={hasProgress} />
      <Problem />
      <HowItWorks />
      <WhatYouGet />
      <Testimonials />
      <FAQ />
      <FinalCTA onStart={onStart} />
      <Footer />
    </div>
  )
}
