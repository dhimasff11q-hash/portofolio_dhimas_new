import { useState } from 'react'

const links = [
  { id: 'home',    label: '.home()' },     // ← ganti label menu di sini
  { id: 'works',   label: '.works()' },
  { id: 'about',   label: '.about()' },
  { id: 'contact', label: '.contact()' },
]

export default function Navbar({ active }) {
  const [open, setOpen] = useState(false)
  const go = id => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setOpen(false) }

  return (
    <header className="sticky top-0 z-50 bg-ink/90 backdrop-blur border-b border-white/5">
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
        {/* LOGO — ganti filenya di public/logo.png */}
        <button onClick={() => go('home')} className="flex items-center gap-2 group">
          <img src="/logo.jpg" alt="logo" className="w-9 h-9 rounded-full transition-transform duration-700 group-hover:rotate-[360deg]" />
          <span className="font-display text-xl text-brand">Dhimas<span className="text-paper"> Portofolio</span></span>
        </button>

        {/* Menu Desktop */}
        <nav className="hidden md:flex gap-7">
          {links.map(l => (
            <button key={l.id} onClick={() => go(l.id)}
              className={`transition-colors duration-300 hover:text-white
                ${active === l.id ? 'text-white font-bold' : 'text-brand'}`}>
              {l.label}
            </button>
          ))}
        </nav>

        {/* Tombol hamburger (mobile) */}
        <button className="md:hidden text-brand text-2xl" onClick={() => setOpen(o => !o)}>{open ? '✕' : '☰'}</button>
      </div>

      {/* Menu Mobile */}
      {open && (
        <nav className="md:hidden flex flex-col px-6 pb-4 gap-4">
          {links.map(l => (
            <button key={l.id} onClick={() => go(l.id)}
              className={`text-left ${active === l.id ? 'text-white font-bold' : 'text-brand'}`}>
              {l.label}
            </button>
          ))}
        </nav>
      )}
    </header>
  )
}