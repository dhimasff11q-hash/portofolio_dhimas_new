import { FaGooglePlusG, FaInstagram, FaLinkedinIn, FaSkype, FaWhatsapp } from 'react-icons/fa'
import Timeline from './Timeline'
import { useReveal } from '../hooks/useReveal'

// ⭐ GANTI DATA KONTAK DI SINI
const contacts = [
  { icon: <FaGooglePlusG />, text: 'dhimasff11q@gmail.com', href: 'mailto:dhimasff11q@gmail.com' },
  { icon: <FaInstagram />,   text: 'SIF_Creative',          href: 'https://www.instagram.com/sifcreative/' },
  { icon: <FaWhatsapp />,    text: '+62 813-3563-1692',     href: 'https://wa.me/6281335631692' }, // ← link WhatsApp
]

export default function Contacts() {
  const ref = useReveal()
  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 pt-4">
      <Timeline>
        <div ref={ref} className="reveal">
          <h2 className="font-display text-4xl text-brand">Contacts</h2>
          <div className="mt-8 space-y-5">
            {contacts.map(c => (
              <a key={c.text} href={c.href} className="flex items-center gap-5 group">
                <span className="w-12 h-12 rounded-full border-2 border-paper grid place-items-center text-xl group-hover:bg-brand group-hover:border-brand group-hover:text-ink transition-all">
                  {c.icon}
                </span>
                <span className="text-lg group-hover:text-brand transition-colors">{c.text}</span>
              </a>
            ))}
          </div>
        </div>
      </Timeline>
    </section>
  )
}