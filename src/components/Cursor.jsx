import { useEffect, useState } from 'react'

export default function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    const move = e => setPos({ x: e.clientX, y: e.clientY })
    const over = e => {
      if (e.target.closest('a, button, [data-hover]')) setHovering(true)
      else setHovering(false)
    }
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
    }
  }, [])

  return (
    <>
      {/* Glow lembut mengikuti kursor */}
      <div className="cursor-glow hidden md:block" style={{ left: pos.x, top: pos.y }} />
      {/* Titik kursor */}
      <div
        className="fixed pointer-events-none z-[9999] hidden md:block rounded-full border-2 border-brand transition-transform duration-150"
        style={{
          left: pos.x, top: pos.y,
          width: hovering ? 50 : 12,
          height: hovering ? 50 : 12,
          transform: 'translate(-50%, -50%)',
          background: hovering ? 'rgba(233,180,76,0.2)' : 'var(--color-brand)',
        }}
      />
    </>
  )
}