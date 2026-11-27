import Timeline from './Timeline'
import { skills } from '../data/skills'
import { useReveal } from '../hooks/useReveal'

export default function About() {
  const ref = useReveal()
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 pt-4">
      <Timeline>
        <div ref={ref} className="reveal grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* SKILLS */}
          <div>
            <h3 className="font-display text-3xl text-brand mb-6">Skills</h3>
            {skills.map((s, i) => (
              <div key={s.name} className="mb-4">
                <p className="text-brand">{s.name}</p>
                <div className="flex gap-2 mt-1">
                  {[...Array(5)].map((_, d) => <Dot key={d} type={dotType(s.level, d)} delay={i * 0.1 + d * 0.08} />)}
                </div>
              </div>
            ))}
          </div>

          {/* ABOUT ME */}
          <div className="flex flex-col justify-center">
            <h2 className="font-display text-4xl text-brand">About Me</h2>
            <p className="mt-4 leading-relaxed">
              Hello! My name is Dhimas, and welcome to my website.
                Check out some of my recent projects here.
                If you'd like to collaborate, feel free to reach out!  {/* ← ganti teks About */}
            </p>
           <a 
            href="https://canva.link/porto-dhimas-fattah-febriansyah-pdf" 
            target="_blank" 
            rel="noopener noreferrer"
             className="mt-6 self-start bg-brand text-ink font-bold px-6 py-2 rounded-full hover:scale-105 transition-transform"
                >
                Resume
                </a>
          </div>

          {/* FOTO */}
          {/* FOTO PROFIL (2 LAYER TERPISAH) */}
            <div className="flex justify-center items-center">
              {/* Wadah utama (cukup besar untuk menampung gambar yang diperbesar) */}
              <div className="relative w-80 h-80 flex justify-center items-center">

                {/* 🟡 LAYER 1: Lingkaran Dekoratif (Ukuran TETAP, tidak akan berubah) */}
                <div className="absolute w-64 h-64">
                  <div className="absolute w-40 h-40 bg-brand rounded-full -left-4 top-8 animate-float" />
                  <div className="absolute w-40 h-40 bg-paper rounded-full -right-2 bottom-4 animate-float-slow" />
                </div>

                {/* 🖼️ LAYER 2: Gambar Profil (Ukuran BISA DIPERBESAR sendiri) */}
                <div className="relative w-150 h-150 z-10">
                  <img 
                    src="src/assets/7.png" 
                    alt="Dhimas"
                    className="w-full h-full object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-500 border-4 border-ink" 
                  />
    </div>

  </div>
</div>
        </div>
      </Timeline>
    </section>
  )
}

function dotType(level, i) {
  if (level >= i + 1) return 'full'
  if (level > i) return 'half'
  return 'empty'
}
function Dot({ type, delay }) {
  const base = 'w-5 h-5 rounded-full dot-pop'
  const style = type === 'full' ? { background: 'var(--color-brand)' }
    : type === 'half' ? { background: 'linear-gradient(90deg, var(--color-brand) 50%, rgba(233,180,76,.25) 50%)' }
    : { background: 'rgba(233,180,76,.25)' }
  return <span className={base} style={{ ...style, animationDelay: `${delay}s` }} />
}