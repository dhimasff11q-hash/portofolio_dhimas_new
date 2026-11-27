export default function Timeline({ children }) {
  return (
    <div className="flex gap-5">
      <div className="flex flex-col items-center">
        <span className="w-3.5 h-3.5 rounded-full bg-white shrink-0" />
        <span className="w-px flex-1 bg-white/25 mt-1" />
      </div>
      <div className="pb-20 flex-1">{children}</div>
    </div>
  )
}