export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0D0D0D] flex flex-col animate-pulse">
      <header className="max-w-[480px] w-full mx-auto px-5 pt-6 pb-2 flex items-center justify-between">
        <div className="text-2xl font-black tracking-tight">
          <span className="text-white">RALL</span>
          <span className="text-[#CCFF00]">Y</span>
        </div>
        <span className="text-[#888888] text-xs">rallyrating.app</span>
      </header>

      <main className="max-w-[480px] w-full mx-auto px-5 pt-8 pb-10 flex flex-col gap-6">
        {/* Avatar skeleton */}
        <section className="flex flex-col items-center gap-3">
          <div className="w-20 h-20 rounded-full bg-[#1A1A1A]" />
          <div className="h-6 w-40 bg-[#1A1A1A] rounded-lg" />
          <div className="h-4 w-24 bg-[#1A1A1A] rounded-lg" />
          <div className="h-4 w-32 bg-[#1A1A1A] rounded-lg" />
        </section>

        {/* Rating card skeleton */}
        <div className="bg-[#1A1A1A] rounded-2xl px-6 py-10" />

        {/* Stats row skeleton */}
        <div className="grid grid-cols-3 gap-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="bg-[#1A1A1A] rounded-xl h-20" />
          ))}
        </div>
      </main>
    </div>
  )
}
