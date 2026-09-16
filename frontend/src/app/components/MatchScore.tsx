export default function MatchScore({ score }: { score: number }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-500/15 to-violet-500/5 p-8 backdrop-blur-xl">
      <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-indigo-300">
            Overall match
          </p>

          <h2 className="mt-2 text-2xl font-semibold">
            Your compatibility score
          </h2>

          <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">
            AI-estimated compatibility based on your CV and the job posting.
          </p>
        </div>

        <div className="flex h-36 w-36 shrink-0 items-center justify-center rounded-full border-8 border-indigo-400/20 bg-slate-950/50 shadow-xl">
          <div className="text-center">
            <span className="text-4xl font-bold">{Math.round(score)}</span>
            <span className="text-lg text-slate-500">%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
