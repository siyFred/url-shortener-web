"use client";

import { useState } from "react";

export default function Home() {
  const [longUrl, setLongUrl] = useState<string>("");
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!longUrl.trim()) {
      setError("Insira uma URL válida para encurtar.");
      setShortUrl(null);
      return;
    }

    setLoading(true);
    setError(null);
    setShortUrl(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
      const response = await fetch(`${apiUrl}/api/shorten`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ longUrl: longUrl.trim() }),
      });

      if (!response.ok) {
        throw new Error("Falha ao encurtar a URL.");
      }

      const data = await response.json();
      setShortUrl(data.shortUrl);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ocorreu um erro desconhecido.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-12 sm:px-10 lg:px-14">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-28 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute bottom-8 right-0 h-72 w-72 rounded-full bg-blue-500/15 blur-3xl" />
      </div>

      <section className="relative mx-auto w-full max-w-5xl">
        <div className="rounded-3xl border border-white/20 bg-white/70 p-8 shadow-2xl shadow-slate-900/10 backdrop-blur-xl sm:p-12">
          <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-6xl">
            Encurte seus links
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-slate-600 sm:text-xl">
            Cole uma URL longa e gere uma versão curta em segundos.
          </p>

          <form onSubmit={handleSubmit} className="mt-10 space-y-5">
            <label htmlFor="longUrl" className="text-lg font-medium text-slate-700 sm:text-xl">
              Cole sua URL
            </label>
            <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  id="longUrl"
                  type="text"
                  inputMode="url"
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck={false}
                  placeholder="https://seusite.com/artigo-incrivel"
                  value={longUrl}
                  onChange={(e) => setLongUrl(e.target.value)}
                  className="h-14 w-full rounded-xl border border-transparent px-5 text-lg text-slate-700 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-300/40"
                />
                <button
                  type="submit"
                  className="h-14 rounded-xl bg-slate-900 px-7 text-lg font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 sm:min-w-40"
                  disabled={loading}
                >
                  {loading ? "Encurtando..." : "Encurtar"}
                </button>
              </div>
            </div>
          </form>

          <div className="mt-8 space-y-4">
            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-lg text-red-700">
                {error}
              </div>
            )}

            {shortUrl && (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-4">
                <p className="text-lg font-medium text-emerald-800">
                  Sua URL curta está pronta:
                </p>
                <a
                  href={shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 block break-all text-lg font-semibold text-emerald-700 underline decoration-emerald-300 underline-offset-4"
                >
                  {shortUrl}
                </a>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
