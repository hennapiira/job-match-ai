'use client';

import { useState } from 'react';
import ResultCard from './components/ResultCard';
import Header from './components/Header';
import AnalyzeForm from './components/AnalyzeForm';
import MatchScore from './components/MatchScore';

type AnalyzeResult = {
  score: number;
  related_skills: string[];
  missing_skills: string[];
  strengths: string[];
  recommendations: string[];
};

export default function Home() {
  // Form state
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [jobUrl, setJobUrl] = useState('');
  const [result, setResult] = useState<AnalyzeResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Send the CV and job URL to the analysis API
  async function analyze() {
    if (!cvFile || !jobUrl) {
      setError('Add your CV and job posting URL.');
      return;
    }

    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('job_url', jobUrl);
    formData.append('cv', cvFile);

    try {
      const response = await fetch('http://127.0.0.1:8000/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error();
      }

      const data: AnalyzeResult = await response.json();
      setResult(data);
    } catch {
      setError('Analysis failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  function startOver() {
    setResult(null);
    setCvFile(null);
    setJobUrl('');
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="absolute inset-0 -z-0 overflow-hidden">
        <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl" />
        <div className="absolute right-1/4 top-40 h-80 w-80 rounded-full bg-violet-600/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-5 py-6">
        <Header />

        <AnalyzeForm
          cvFile={cvFile}
          jobUrl={jobUrl}
          error={error}
          loading={loading}
          setCvFile={setCvFile}
          setJobUrl={setJobUrl}
          analyze={analyze}
        />

        {result && (
          <section className="mt-10 space-y-6">
            <MatchScore score={result.score} />
            <div className="grid gap-5 md:grid-cols-2">
              <ResultCard
                title="Related skills"
                subtitle="Skills that support your match"
                items={result.related_skills}
                accent="emerald"
              />

              <ResultCard
                title="Missing skills"
                subtitle="Requirements not found in your CV"
                items={result.missing_skills}
                accent="amber"
              />

              <ResultCard
                title="Strengths"
                subtitle="What makes you a strong candidate"
                items={result.strengths}
                accent="indigo"
              />

              <ResultCard
                title="Recommendations"
                subtitle="How to improve your positioning"
                items={result.recommendations}
                accent="sky"
              />
            </div>
            <div className="flex justify-center">
              <button
                onClick={startOver}
                className="rounded-xl border border-slate-700 bg-slate-900/60 px-8 py-3.5 text-base font-medium text-slate-300 transition hover:border-indigo-400/50 hover:bg-indigo-500/10 hover:text-white"
              >
                Start over
              </button>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
