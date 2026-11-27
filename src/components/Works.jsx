import { useState } from 'react'
import { FaTiktok, FaInstagram } from 'react-icons/fa'
import Timeline from './Timeline'
import { works } from '../data/works'
import { useReveal } from '../hooks/useReveal'
import { useTilt } from '../hooks/useTilt'
import ImageModal from './ImageModal'

export default function Works() {
  const ref = useReveal()
  
  // State untuk modal (menyimpan daftar gambar & index yang diklik)
  const [selected, setSelected] = useState(null)

  return (
    <section id="works" className="mx-auto max-w-6xl px-6 pt-16 relative z-10">
      <Timeline>
        <h2 className="font-display text-4xl text-brand glitch-hover">Works</h2>
        
        <div ref={ref} className="reveal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {works.map((w, i) => (
            <WorkCard 
              key={w.title} 
              w={w} 
              index={i} 
              // INI BAGIAN YANG KAMU CARI (sudah diupdate)
              onClick={() => setSelected({ images: works, index: i })} 
            />
          ))}
        </div>
      </Timeline>

      {/* Modal Lightbox */}
      {selected && (
        <ImageModal 
          images={selected.images}
          currentIndex={selected.index}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  )
}

// Komponen Card Individual
function WorkCard({ w, index, onClick }) {
  const { ref, handleMove, handleLeave } = useTilt(12)

  return (
    <article
      className="stagger-item"
      style={{ transitionDelay: `${index * 100}ms` }}
      ref={el => {
        if (el) {
          const io = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) el.classList.add('visible')
          }, { threshold: 0.1 })
          io.observe(el)
        }
      }}
    >
      <div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="group relative aspect-[4/3] overflow-hidden rounded-md bg-gradient-to-br from-ink-2 to-ink transition-transform duration-300 ease-out cursor-pointer"
        data-hover
        onClick={onClick}
      >
        <img src={w.img} alt={w.title}
          className="h-full w-full object-contain p-4 transition-transform duration-500 group-hover:scale-105" />
        
        <div className="absolute inset-0 bg-ink/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="font-display text-2xl text-brand">{w.title}</span>
        </div>
        
        <div className="absolute top-3 right-3 w-10 h-10 rounded-full bg-brand/90 text-ink grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          🔍
        </div>
      </div>
      
      <div className="flex justify-center gap-3 mt-4">
        <a href={w.tiktok} target="_blank" rel="noopener noreferrer"
           className="w-8 h-8 rounded-full bg-brand text-ink grid place-items-center hover:scale-125 hover:bg-black hover:text-white transition-all"
           title="TikTok">
          <FaTiktok />
        </a>
        <a href={w.instagram} target="_blank" rel="noopener noreferrer"
           className="w-8 h-8 rounded-full bg-brand text-ink grid place-items-center hover:scale-125 hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-red-500 hover:to-purple-600 hover:text-white transition-all"
           title="Instagram">
          <FaInstagram />
        </a>
      </div>
    </article>
  )
}