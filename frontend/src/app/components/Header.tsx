export default function Header() {
  return (
    <header className="mx-auto mb-6 max-w-2xl text-center">
      <div className="mb-4 inline-flex rounded-full border border-indigo-400/20 bg-indigo-400/10 px-4 py-1.5 text-sm font-medium text-indigo-300">
        AI-powered job matching
      </div>

      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        See how well your CV
        <span className="block bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
          matches the job
        </span>
      </h1>

      <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-400 sm:text-base">
        Upload your CV and paste a job posting URL. Get an AI-powered analysis
        of your skills, strengths and recommendations.
      </p>
    </header>
  );
}
