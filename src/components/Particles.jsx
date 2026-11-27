import { useMemo } from 'react'

export default function Particles({ count = 25 }) {
  const particles = useMemo(() =>
    Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 2 + Math.random() * 4,
      dur: 8 + Math.random() * 12,
      delay: Math.random() * 10,
      tx: (Math.random() - 0.5) * 300,
      ty: (Math.random() - 0.5) * 300,
    })),
    [count]
  )

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map(p => (
        <span
          key={p.id}
          className="particle"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            '--size': `${p.size}px`,
            '--dur': `${p.dur}s`,
            '--delay': `${p.delay}s`,
            '--tx': `${p.tx}px`,
            '--ty': `${p.ty}px`,
          }}
        />
      ))}
    </div>
  )
}