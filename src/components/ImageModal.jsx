import { useEffect, useState, useRef } from 'react'

export default function ImageModal({ images, currentIndex, onClose }) {
  const [index, setIndex] = useState(currentIndex)
  const [zoom, setZoom] = useState(1)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState(0)
  const imgRef = useRef(null)

  const current = images[index]
  const total = images.length

  // Tutup dengan ESC
  useEffect(() => {
    const handleKey = e => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
      if (e.key === '+' || e.key === '=') zoomIn()
      if (e.key === '-') zoomOut()
      if (e.key === '0') resetZoom()
    }
    window.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = 'auto'
    }
  }, [index, zoom])

  // Reset zoom saat ganti gambar
  useEffect(() => { setZoom(1) }, [index])

  const next = () => setIndex(i => (i + 1) % total)
  const prev = () => setIndex(i => (i - 1 + total) % total)
  const zoomIn = () => setZoom(z => Math.min(z + 0.25, 4))
  const zoomOut = () => setZoom(z => Math.max(z - 0.25, 0.5))
  const resetZoom = () => setZoom(1)

  // Swipe gesture untuk mobile
  const handleTouchStart = e => {
    setIsDragging(true)
    setDragStart(e.touches[0].clientX)
  }
  const handleTouchEnd = e => {
    if (!isDragging) return
    const diff = e.changedTouches[0].clientX - dragStart
    if (Math.abs(diff) > 50) {
      if (diff > 0) prev()
      else next()
    }
    setIsDragging(false)
  }

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex items-center justify-center animate-fadeIn"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Tombol Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-20 w-12 h-12 rounded-full bg-brand text-ink text-2xl font-bold hover:scale-110 hover:rotate-90 transition-all duration-300 shadow-lg"
        aria-label="Close"
      >
        ✕
      </button>

      {/* Tombol Prev */}
      {total > 1 && (
        <button
          onClick={e => { e.stopPropagation(); prev() }}
          className="absolute left-4 z-20 w-12 h-12 rounded-full bg-brand/90 text-ink text-2xl font-bold hover:scale-110 hover:bg-brand transition-all shadow-lg hidden sm:grid place-items-center"
          aria-label="Previous"
        >
          ‹
        </button>
      )}

      {/* Tombol Next */}
      {total > 1 && (
        <button
          onClick={e => { e.stopPropagation(); next() }}
          className="absolute right-4 z-20 w-12 h-12 rounded-full bg-brand/90 text-ink text-2xl font-bold hover:scale-110 hover:bg-brand transition-all shadow-lg hidden sm:grid place-items-center"
          aria-label="Next"
        >
          ›
        </button>
      )}

      {/* Area Gambar */}
      <div
        className="relative max-w-[90vw] max-h-[80vh] flex items-center justify-center"
        onClick={e => e.stopPropagation()}
      >
        <img
          key={current.img}
          ref={imgRef}
          src={current.img}
          alt={current.title}
          className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl transition-transform duration-300 ease-out cursor-grab active:cursor-grabbing"
          style={{ transform: `scale(${zoom})` }}
          draggable={false}
        />
      </div>

      {/* Caption + Counter */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <h3 className="font-display text-xl text-brand bg-ink/80 px-5 py-2 rounded-full">
          {current.title}
        </h3>
        {total > 1 && (
          <span className="text-white/60 text-sm font-mono">
            {index + 1} / {total}
          </span>
        )}
      </div>

      {/* Kontrol Zoom */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-ink/90 border border-brand/30 rounded-full px-3 py-2 z-10">
        <button
          onClick={e => { e.stopPropagation(); zoomOut() }}
          className="w-9 h-9 rounded-full bg-brand/20 text-brand hover:bg-brand hover:text-ink font-bold transition-all"
          title="Zoom Out (-)"
        >
          −
        </button>
        <button
          onClick={e => { e.stopPropagation(); resetZoom() }}
          className="px-3 h-9 rounded-full bg-brand/20 text-brand font-mono text-sm hover:bg-brand hover:text-ink transition-all min-w-[60px]"
          title="Reset Zoom (0)"
        >
          {Math.round(zoom * 100)}%
        </button>
        <button
          onClick={e => { e.stopPropagation(); zoomIn() }}
          className="w-9 h-9 rounded-full bg-brand/20 text-brand hover:bg-brand hover:text-ink font-bold transition-all"
          title="Zoom In (+)"
        >
          +
        </button>
        <div className="w-px h-6 bg-white/20 mx-1" />
        <button
          onClick={e => { e.stopPropagation(); onClose() }}
          className="px-3 h-9 rounded-full bg-white/10 text-white hover:bg-red-500 font-bold transition-all text-sm"
          title="Tutup (ESC)"
        >
          ✕
        </button>
      </div>

      {/* Dots Indicator (mobile) */}
      {total > 1 && (
        <div className="absolute bottom-36 left-1/2 -translate-x-1/2 flex gap-2 sm:hidden">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={e => { e.stopPropagation(); setIndex(i) }}
              className={`w-2 h-2 rounded-full transition-all ${
                i === index ? 'bg-brand w-6' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}