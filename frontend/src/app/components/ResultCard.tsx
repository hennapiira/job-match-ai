export default function ResultCard({
  title,
  subtitle,
  items,
  accent,
}: {
  title: string;
  subtitle: string;
  items: string[];
  accent: 'emerald' | 'amber' | 'indigo' | 'rose' | 'violet' | 'sky';
}) {
  const accents = {
    emerald: 'bg-emerald-400',
    amber: 'bg-amber-400',
    indigo: 'bg-indigo-400',
    rose: 'bg-rose-400',
    violet: 'bg-violet-400',
    sky: 'bg-sky-400',
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm">
      <div className="mb-5">
        <div className="mb-3 flex items-center gap-3">
          <span className={`h-2.5 w-2.5 rounded-full ${accents[accent]}`} />
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>

        <p className="text-sm text-slate-500">{subtitle}</p>
      </div>

      <ul className="space-y-3">
        {items.map((item) => (
          <li
            key={item}
            className="rounded-xl border border-white/5 bg-slate-950/40 px-4 py-3 text-sm leading-6 text-slate-300"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
