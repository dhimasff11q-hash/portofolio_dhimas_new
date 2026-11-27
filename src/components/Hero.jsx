import { FaGooglePlusG, FaLinkedinIn, FaBehance, FaInstagram } from 'react-icons/fa'
import { useReveal } from '../hooks/useReveal'
import { useTypewriter } from '../hooks/useTypewriter'

const socials = [
  { icon: <FaGooglePlusG />, href: 'https://google.com' },
  { icon: <FaLinkedinIn />,  href: 'https://linkedin.com' },
  { icon: <FaBehance />,     href: 'https://behance.net' },
  { icon: <FaInstagram />,   href: 'https://instagram.com' },
]

export default function Hero() {
  const ref = useReveal()
  const { display, done } = useTypewriter("Hello I'm Dhimas", 70, 600)
  const go = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="home" className="relative min-h-[92vh] flex items-center overflow-hidden">
      {/* Sosial media kiri */}
      <div className="hidden xl:flex absolute left-14 top-1/2 -translate-y-1/2 flex-col items-center gap-4">
        <IconBtn>{socials[0].icon}</IconBtn>
        <div className="relative w-16 h-28 bg-brand rounded-r-full my-1">
          <div className="absolute -right-4 top-1"><IconBtn>{socials[1].icon}</IconBtn></div>
          <div className="absolute -right-4 bottom-1"><IconBtn>{socials[2].icon}</IconBtn></div>
        </div>
        <IconBtn>{socials[3].icon}</IconBtn>
      </div>

      {/* Konten tengah */}
      <div ref={ref} className="reveal mx-auto max-w-6xl w-full px-6 flex gap-6">
        <div className="flex flex-col items-center">
          <span className="w-3.5 h-3.5 rounded-full bg-white" />
          <span className="w-px flex-1 bg-white/25 mt-1" />
        </div>
        <div>
          <h1 className="font-display text-5xl md:text-6xl text-brand glitch-hover">Welcome!</h1>
          <p className="mt-4 text-xl md:text-2xl leading-relaxed min-h-[60px]">
            <span>{display}</span>
            <span className={`typing-cursor ${done ? 'opacity-0' : ''}`}> </span>
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            <button onClick={() => go('about')}
              className="bg-brand text-ink font-bold px-6 py-2 rounded-full hover:scale-105 hover:shadow-lg hover:shadow-brand/30 transition-all">
              About Me
            </button>
            <button onClick={() => go('works')}
              className="border-2 border-paper px-6 py-2 rounded-full hover:bg-paper hover:text-ink transition-all">
              Works
            </button>
          </div>
        </div>
      </div>

      {/* Lingkaran dekoratif */}
      <div className="hidden md:block absolute right-10 top-1/2 -translate-y-1/2 w-72 h-72">
        <div className="absolute w-44 h-44 bg-brand rounded-full animate-float" />
        <div className="absolute w-44 h-44 bg-paper rounded-full right-0 bottom-0 animate-float-slow" />
      </div>
    </section>
  )
}

function IconBtn({ children }) {
  return (
    <span className="w-9 h-9 rounded-full border border-white/50 grid place-items-center text-white hover:bg-brand hover:text-ink hover:border-brand hover:scale-125 transition-all cursor-pointer">
      {children}
    </span>
  )
}