
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Hero from "./components/Hero"
import WhoWeAre from "./components/WhoWeAre"
import WhatWeBuild from "./components/WhatWeBuild"
import Contacts from "./components/Contacts"
import { PrivacyPolicy, TermsOfUse, Disclaimers } from "./components/LegalPage"

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <WhoWeAre />
              <WhatWeBuild />
              <Contacts />
            </>
          } />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfUse />} />
          <Route path="/disclaimers" element={<Disclaimers />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App