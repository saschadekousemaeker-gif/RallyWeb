export default function Home() {
  return (
    <main className="min-h-screen bg-[#0D0D0D] flex flex-col items-center justify-center px-6">
      <div className="max-w-[480px] w-full text-center flex flex-col items-center gap-8">
        {/* Wordmark */}
        <div className="text-5xl font-black tracking-tight">
          <span className="text-white">RALL</span>
          <span className="text-[#CCFF00]">Y</span>
        </div>

        {/* Tagline */}
        <p className="text-[#888888] text-lg leading-relaxed">
          The performance identity platform for serious racket sport players.
        </p>

        {/* CTA */}
        <p className="text-[#888888] text-sm tracking-widest uppercase">
          Coming soon to the App Store
        </p>
      </div>
    </main>
  );
}
