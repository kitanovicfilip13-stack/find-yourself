import Navbar from '../shared/Navbar'
import Hero from './Hero'
import Problem from './Problem'
import HowItWorks from './HowItWorks'
import WhatYouGet from './WhatYouGet'
import ExampleResult from './ExampleResult'
import FinalCTA from './FinalCTA'
import Footer from '../shared/Footer'

export default function LandingPage({ onStart }) {
  return (
    <div className="relative">
      <Navbar onStart={onStart} />
      <Hero onStart={onStart} />
      <Problem />
      <HowItWorks />
      <WhatYouGet />
      <ExampleResult onStart={onStart} />
      <FinalCTA onStart={onStart} />
      <Footer />
    </div>
  )
}
