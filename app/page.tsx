"use client";

import { useState } from 'react';

export default function Home() {
  const [longUrl, setLongUrl] = useState<string>("");
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setShortUrl(null);

    try {
      const apiUrl = process.env.PUBLIC_API_URL || "http://localhost:8080";
      const response = await fetch(`${apiUrl}/api/mvp/shorten`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ longUrl: longUrl }),
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
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold mb-8">Encurtador de URL</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-lg">
        <div className="flex items-center border-b border-teal-500 py-2">
          <input
            type="text"
            placeholder="Insira sua URL..."
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          />
          <button
            type="submit"
            className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
            disabled={loading}
          >
            {loading ? "Encurtando..." : "Encurtar"}
          </button>
        </div>
      </form>

      <div className="mt-8 p-4 w-full max-w-lg text-center">
        <div className="mt-8 p-4 bg-gray-100 rounded">
          {error && (
            <div className="p-3 bg-red-100 text-red-700 rounded">
              <p>Erro: {error}</p>
            </div>
          )}
          {shortUrl && (
            <div className="p-3 bg-green-100 rounded">
              <p className="font-medium">Sua URL curta está pronta:</p>
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-600 font-bold break-words"
              >
                {shortUrl}
              </a>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
