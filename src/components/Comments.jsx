import { useState } from 'react'

const KEY = 'ziko_comments'

export default function Comments() {
  const [name, setName] = useState('')
  const [text, setText] = useState('')
  const [list, setList] = useState(() => JSON.parse(localStorage.getItem(KEY) || '[]'))

  const save = arr => { localStorage.setItem(KEY, JSON.stringify(arr)); setList(arr) }

  const submit = e => {
    e.preventDefault()
    if (!name.trim() || !text.trim()) return
    const c = { id: Date.now(), name: name.trim(), text: text.trim(),
                date: new Date().toLocaleString('id-ID') }
    save([c, ...list])
    setText('')
  }

  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <h2 className="font-display text-3xl text-brand mb-6">Leave a Comment</h2>

      {/* Kotak komentar putih ala Behance */}
      <form onSubmit={submit} className="bg-white text-ink rounded-lg p-5 flex gap-4 items-start">
        <div className="w-10 h-10 rounded-full bg-sky-400 shrink-0" />
        <div className="flex-1 space-y-3">
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name"
            className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-sky-400" />
          <textarea value={text} onChange={e => setText(e.target.value)} rows="4"
            placeholder="What are your thoughts on this project?"
            className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-sky-400" />
          <button className="ml-auto bg-gray-200 hover:bg-brand px-5 py-2 rounded-full font-bold transition-colors">
            Post a Comment
          </button>
        </div>
      </form>

      {/* Daftar komentar */}
      <div className="mt-6 space-y-4">
        {list.map(c => (
          <div key={c.id} className="bg-ink-2 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-brand text-ink grid place-items-center font-bold">
                {c.name[0].toUpperCase()}
              </div>
              <div>
                <p className="font-bold text-brand">{c.name}</p>
                <p className="text-xs text-white/50">{c.date}</p>
              </div>
              <button onClick={() => save(list.filter(x => x.id !== c.id))}
                className="ml-auto text-white/40 hover:text-red-400">✕</button>
            </div>
            <p className="mt-3 whitespace-pre-wrap">{c.text}</p>
          </div>
        ))}
        {list.length === 0 && <p className="text-white/40 text-center">Belum ada komentar. Jadilah yang pertama! ✨</p>}
      </div>
    </section>
  )
}