"use client";

import { useState } from 'react';

export default function Home() {
  const [longUrl, setLongUrl] = useState<string>("");
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Enviando: ", longUrl);
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
          >
            Encurtar
          </button>
        </div>
      </form>

      {shortUrl && (
        <div className="mt-8 p-4 bg-gray-100 rounded">
          <p>Sua URL curta está pronta:</p>
          <a href={shortUrl} target="_blank" className="text-teal-600 font-medium">
            {shortUrl}
          </a>
        </div>
      )}
    </main>
  );
}
