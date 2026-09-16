type AnalyzeFormProps = {
  cvFile: File | null;
  jobUrl: string;
  error: string;
  loading: boolean;
  setCvFile: (file: File | null) => void;
  setJobUrl: (url: string) => void;
  analyze: () => void;
};

export default function AnalyzeForm({
  cvFile,
  jobUrl,
  error,
  loading,
  setCvFile,
  setJobUrl,
  analyze,
}: AnalyzeFormProps) {
  return (
    <section className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl backdrop-blur-xl sm:p-8">
      <div className="space-y-6">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Your CV
          </label>

          <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-slate-600 bg-slate-900/50 px-6 py-8 transition hover:border-indigo-400 hover:bg-indigo-400/5">
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10 text-xl text-indigo-300">
              ↑
            </div>

            <span className="font-medium text-slate-200">
              {cvFile ? cvFile.name : 'Choose your CV'}
            </span>

            <span className="mt-1 text-sm text-slate-500">PDF files only</span>

            <input
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={(event) => setCvFile(event.target.files?.[0] ?? null)}
            />
          </label>
        </div>

        <div>
          <label
            htmlFor="job-url"
            className="mb-2 block text-sm font-medium text-slate-300"
          >
            Job posting URL
          </label>

          <input
            id="job-url"
            type="url"
            placeholder="https://company.com/jobs/..."
            value={jobUrl}
            onChange={(event) => setJobUrl(event.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-3.5 text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10"
          />
        </div>

        {error && (
          <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        <button
          type="button"
          onClick={analyze}
          disabled={loading}
          className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-5 py-3.5 font-semibold text-white shadow-lg shadow-indigo-950/40 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? 'Analyzing your match...' : 'Analyze match'}
        </button>
      </div>
    </section>
  );
}
