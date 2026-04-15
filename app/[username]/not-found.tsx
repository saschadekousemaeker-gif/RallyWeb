export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0D0D0D] flex flex-col">
      <header className="max-w-[480px] w-full mx-auto px-5 pt-6 pb-2 flex items-center justify-between">
        <div className="text-2xl font-black tracking-tight">
          <span className="text-white">RALL</span>
          <span className="text-[#CCFF00]">Y</span>
        </div>
        <span className="text-[#888888] text-xs">rallyrating.app</span>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-5 text-center gap-4">
        <p className="text-white text-xl font-semibold">Player not found.</p>
        <p className="text-[#888888] text-sm">
          This profile doesn&apos;t exist or may have been removed.
        </p>
        <a
          href="/"
          className="text-[#CCFF00] text-sm underline underline-offset-4 mt-2"
        >
          Back to Rally
        </a>
      </main>
    </div>
  )
}
