---
title: "URL Shortener Web: conversão rápida de links com UX orientada a performance"
description: "Frontend moderno que transforma URLs longas em links curtos com feedback em tempo real e integração robusta com API REST."
stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "REST API"]
images: ["assets/capa.png"]
featured-skills: ["Arquitetura Frontend com App Router", "Integração com APIs REST", "UX para fluxos assíncronos"]
---

## Visão do Produto

O **url-shortener-web** é a interface web do ecossistema de encurtamento de links, construída para acelerar o fluxo principal do usuário: enviar uma URL longa e obter uma URL curta utilizável em segundos.

O produto foi desenhado como um **MVP de alta objetividade**, com foco em:

- reduzir fricção no fluxo de criação de links;
- comunicar claramente estado de processamento e falhas;
- desacoplar frontend e backend para evolução independente.

## Arquitetura e Decisões Técnicas

### 1) Frontend desacoplado da regra de negócio

A aplicação concentra a experiência e delega lógica de domínio para a API (`url-shortener-api`). Essa separação simplifica manutenção e permite escalar backend e frontend em ritmos diferentes.

### 2) Next.js com App Router para base evolutiva

Mesmo em um MVP enxuto, o projeto adota **Next.js (App Router)** para garantir:

- organização moderna por rotas e layouts;
- base pronta para crescimento (dashboard, autenticação, analytics);
- excelente ergonomia para evolução de componentes e páginas.

### 3) Estado de UI explícito para confiabilidade percebida

A tela principal modela estados de forma direta (`loading`, `error`, `shortUrl`). Isso evita ambiguidade na interface e melhora previsibilidade para o usuário em chamadas assíncronas.

```tsx
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);
const [shortUrl, setShortUrl] = useState<string | null>(null);
```

### 4) Configuração orientada a ambiente

A URL da API é injetada por variável de ambiente (`PUBLIC_API_URL`), com fallback local. Essa decisão reduz acoplamento a infraestrutura específica e simplifica promoção entre ambientes.

## Fluxo Técnico Principal

1. Usuário envia uma URL no formulário.
2. Cliente dispara `POST /api/shorten` com payload JSON.
3. API retorna `shortUrl`.
4. Interface atualiza o estado e exibe resultado clicável.
5. Em erro HTTP/rede, a UI responde com mensagem objetiva.

## Qualidade de Engenharia

- **TypeScript** para tipagem explícita e redução de regressões em evolução de interface.
- **ESLint** para padronização e prevenção de problemas comuns.
- **Tailwind CSS** para estilização consistente, rápida e previsível.

## Por que este projeto é relevante em portfólio

Este projeto demonstra capacidade de entregar um frontend de produto real com foco em:

- **decisões arquiteturais pragmáticas** (MVP sem dívida estrutural);
- **integração robusta entre camadas** (cliente e API desacoplados);
- **experiência de usuário orientada a estado** em cenários assíncronos.

É uma base sólida para evolução para cenários de maior complexidade, como autenticação, gestão de links por usuário e analytics de acesso.
