"use client";

import { useState } from "react";

export default function Home() {
  const [longUrl, setLongUrl] = useState<string>("");
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleButtonPointerEnter = (event: React.PointerEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();

    button.style.setProperty("--x", `${event.clientX - rect.left}px`);
    button.style.setProperty("--y", `${event.clientY - rect.top}px`);
  };

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
        const body = await response.json().catch(() => null);
        throw new Error(body?.message ?? "Falha ao encurtar a URL.");
      }

      const data = await response.json();
      setShortUrl(data.shortUrl);
    } catch (err) {
      if (err instanceof TypeError) {
        setError("Não foi possível conectar ao servidor. Tente novamente.");
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ocorreu um erro desconhecido.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center gap-10 overflow-hidden px-5 pt-24 pb-16 sm:px-10 sm:pt-28 lg:px-14">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-28 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute bottom-8 right-0 h-72 w-72 rounded-full bg-blue-500/15 blur-3xl" />
      </div>

      <a
        href="https://siyfred.dev"
        className="group absolute top-5 left-5 z-10 flex w-fit cursor-pointer items-center justify-center gap-2 rounded-full border border-[#e5e5e5]/50 bg-[#fff] px-6 py-2.5 font-['Inter_Variable',sans-serif] text-sm leading-[1.5] font-medium text-[#171717] no-underline shadow-sm [transition:background-color_150ms_ease] hover:bg-[#f5f5f5] sm:top-8 sm:left-10 lg:left-14"
      >
        <svg
          className="h-4 w-4 fill-none stroke-current stroke-2 text-[#737373] transition-transform duration-300 ease-[ease] [stroke-linecap:round] [stroke-linejoin:round] group-hover:-translate-x-1 group-hover:text-[#171717]"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>

        <span>Voltar à siyfred.dev</span>
      </a>

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
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck={false}
                  placeholder="https://seusite.com/artigo-incrivel"
                  value={longUrl}
                  onChange={(e) => setLongUrl(e.target.value)}
                  className="h-14 w-full rounded-xl border border-transparent px-5 text-lg text-slate-700 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-300/40"
                />
                <button
                  type="submit"
                  onPointerEnter={handleButtonPointerEnter}
                  className="group relative inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-full border-0 bg-[#171717] px-10 py-4 font-['Inter_Variable',sans-serif] text-lg leading-normal font-medium text-white no-underline [transition:box-shadow_300ms_ease,transform_150ms_ease] hover:shadow-[0_0_20px_rgb(0_0_0/10%)] active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={loading}
                >
                  <span className="pointer-events-none absolute top-[var(--y,50%)] left-[var(--x,50%)] h-0 w-0 -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-white/20 [transition:width_700ms_ease-in-out,height_700ms_ease-in-out] group-hover:h-[550px] group-hover:w-[550px]" />
                  <span className="relative z-[1] inline-flex items-center gap-2">
                    {loading ? "Encurtando..." : "Encurtar"}
                  </span>
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

      <section
        aria-labelledby="about-project-heading"
        className="relative mx-auto w-full max-w-5xl"
      >
        <div className="rounded-3xl border border-white/20 bg-white/70 p-8 shadow-2xl shadow-slate-900/10 backdrop-blur-xl sm:p-12">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">
              <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
              Em Produção AWS
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700">
              Frontend na Vercel
            </span>
          </div>

          <h2
            id="about-project-heading"
            className="mt-3 text-2xl font-bold leading-snug text-slate-900 sm:text-3xl"
          >
            Sobre este projeto
          </h2>

          <p className="mt-4 text-justify text-base leading-relaxed text-slate-600 hyphens-auto sm:text-lg">
            Este frontend em Next.js e TypeScript consome uma{" "}
            <a
              href="https://github.com/siyFred/url-shortener-api"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-slate-900 underline decoration-slate-300 underline-offset-4 transition hover:decoration-slate-900"
            >
              API REST em Java 21 e Spring Boot 3
            </a>{" "}
            hospedada na AWS, que construí para estudar arquitetura backend na prática. O
            sistema foi desenhado para resolver um problema clássico de escalabilidade: atender
            um volume alto de leituras (os redirecionamentos) com baixa latência, sem que a
            gravação das métricas de acesso se torne um gargalo no banco de dados. Estas são as
            principais decisões de arquitetura:
          </p>

          <ol className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              {
                title: "Cache no redirecionamento",
                text: (
                  <>
                    O redirecionamento (<code className="rounded bg-slate-100 px-1.5 py-0.5 text-[0.8125rem] text-slate-700">GET /&#123;shortCode&#125;</code>) consulta o Redis antes
                    do PostgreSQL. Em <em>cache miss</em>, uma coordenação <em>single-flight</em> por{" "}
                    <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[0.8125rem] text-slate-700">shortCode</code>{" "}
                    na JVM garante que requisições simultâneas façam uma única consulta ao banco
                    (<em>anti-stampede</em>). Links encontrados ficam em cache por 7 dias, e códigos
                    inexistentes entram em <em>cache negativo</em> por 60s (invalidado após o commit
                    na criação) para evitar que varreduras sobrecarreguem o banco.
                  </>
                ),
              },
              {
                title: "Cliques fora do caminho crítico",
                text: (
                  <>
                    Somar um clique no banco a cada acesso criaria disputa de lock na mesma linha
                    em links populares. Em vez disso, a API publica o evento no RabbitMQ e já
                    responde o redirecionamento, e um listener atualiza o contador em segundo
                    plano. Em troca, a contagem é eventualmente consistente. Também uso o Redis
                    para descartar cliques repetidos do mesmo IP e navegador em uma janela de 5
                    segundos, o que evita que duplo clique ou bots inflem a contagem.
                  </>
                ),
              },
              {
                title: "Código curto sem colisão",
                text: (
                  <>
                    Gerar códigos aleatórios obriga a consultar o banco para ver se o código já
                    existe. Aqui o código é derivado do ID gerado pelo PostgreSQL: o ID passa por
                    uma ofuscação numérica e é codificado em Base62. Não há colisão por
                    construção, e a ofuscação dificulta adivinhar a sequência de IDs.
                  </>
                ),
              },
              {
                title: "Testes e deploy automatizados",
                text: (
                  <>
                    Os testes de integração rodam contra PostgreSQL, Redis e RabbitMQ reais,
                    subidos com Testcontainers, em vez de mocks. A cada push na {<code className="rounded bg-slate-100 px-1.5 py-0.5 text-[0.8125rem] text-slate-700">main</code>}, o
                    GitHub Actions roda a suíte, publica a imagem Docker no GHCR e atualiza a
                    instância EC2 por SSH. O Caddy cuida do HTTPS.
                  </>
                ),
              },
              {
                title: "Fácil de rodar e reproduzir",
                text: (
                  <>
                    O ambiente inteiro é conteinerizado: um único <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[0.8125rem] text-slate-700">docker compose up --build</code> sobe a API, o
                    PostgreSQL, o Redis e o RabbitMQ, sem instalar nada além do Docker. Qualquer
                    pessoa consegue clonar o repositório, subir a stack completa e chegar ao
                    mesmo ambiente que roda em produção.
                  </>
                ),
              },
            ].map((item, index) => (
              <li
                key={item.title}
                className={`rounded-2xl border border-slate-200/80 bg-white/80 p-5 shadow-sm ${
                  index === 4 ? "sm:col-span-2" : ""
                }`}
              >
                <span className="text-sm font-semibold text-slate-400">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-1 text-base font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-justify text-sm leading-relaxed text-slate-600 hyphens-auto">{item.text}</p>
              </li>
            ))}
          </ol>

          <dl className="mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-2" aria-label="Stack">
            {[
              { label: "Backend", items: ["Java 21", "Spring Boot 3"] },
              { label: "Dados e mensageria", items: ["PostgreSQL", "Redis", "RabbitMQ"] },
              { label: "Frontend", items: ["Next.js", "TypeScript", "Tailwind CSS"] },
              { label: "Testes", items: ["JUnit 5", "Mockito", "Testcontainers"] },
              {
                label: "Infraestrutura e deploy",
                items: ["Docker", "GitHub Actions", "AWS EC2", "Caddy", "Vercel"],
              },
            ].map((group) => (
              <div key={group.label}>
                <dt className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                  {group.label}
                </dt>
                <dd className="mt-2 flex flex-wrap gap-2">
                  {group.items.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700"
                    >
                      {tech}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-slate-200/80 pt-6">
            <a
              href="https://api.url-shortener.siyfred.dev/swagger-ui/index.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#171717] px-5 py-2.5 text-sm font-medium text-white no-underline transition hover:bg-neutral-800"
            >
              <span>Explorar API Docs (Swagger UI)</span>
              <span aria-hidden="true">↗</span>
            </a>

            <a
              href="https://github.com/siyFred/url-shortener-api"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[#e5e5e5] bg-white px-5 py-2.5 text-sm font-medium text-[#171717] no-underline shadow-sm transition hover:bg-[#f5f5f5]"
            >
              <span>Repositório Backend</span>
              <span aria-hidden="true">↗</span>
            </a>

            <a
              href="https://github.com/siyFred/url-shortener-web"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[#e5e5e5] bg-white px-5 py-2.5 text-sm font-medium text-[#171717] no-underline shadow-sm transition hover:bg-[#f5f5f5]"
            >
              <span>Repositório Frontend</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
