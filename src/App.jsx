import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Works from './components/Works'
import About from './components/About'
import Contacts from './components/Contacts'
import Comments from './components/Comments'
import Footer from './components/Footer'
import Cursor from './components/Cursor'
import Particles from './components/Particles'
import ScrollProgress from './components/ScrollProgress'

export default function App() {
  const [active, setActive] = useState('home')

  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) })
    }, { rootMargin: '-40% 0px -55% 0px' })
    ;['home', 'works', 'about', 'contact'].forEach(id => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  return (
    <div className="min-h-screen relative">
      <ScrollProgress />
      <Cursor />
      <Particles count={20} />
      <Navbar active={active} />
      <main className="relative z-10">
        <Hero />
        <Works />
        <About />
        <Contacts />
        <Comments />
      </main>
      <Footer />
    </div>
  )
}