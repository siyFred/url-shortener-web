# Página Web do Encurtador de URL (url-shortener-web)

Este projeto é o frontend (cliente web) para o Encurtador de URL, construído com Next.js, React e TypeScript.

Esta aplicação consome as APIs REST fornecidas pelo projeto backend (`url-shortener-api`).

* **Repositório do Backend (API):** [github.com/siyFred/url-shortener-api](https://github.com/siyFred/url-shortener-api)

O objetivo desta primeira versão (MVP) é fornecer uma interface de usuário limpa, simples e responsiva para consumir a funcionalidade central da API.

* **Criação de Links:** Permite ao usuário submeter uma URL longa.
* **Exibição do Resultado:** Exibe a URL curta retornada pela API.
* **Feedback Visual:** Fornece feedback de "loading" (carregando) e "error" (erro) durante a requisição à API.

## Tecnologias Usadas

* **Next.js 14+** (com App Router)
* **React 18**
* **TypeScript**
* **Tailwind CSS**
* **npm**

## Como Rodar Localmente

Você precisará ter o [Node.js](https://nodejs.org/en) (v18 ou mais recente) instalado.

### Pré-requisito: A API Backend DEVE estar rodando e funcionando com o banco de dados

Esta é uma aplicação cliente. Ela **requer** que a API backend (`url-shortener-api`) esteja rodando na porta `8080`.

Por favor, siga as instruções no **[README do Backend](https://github.com/siyFred/url-shortener-api)** para iniciar a API e o banco de dados PostgreSQL com sucesso.

### 1. Variável de Ambiente

Este projeto precisa saber onde a API está. Crie um arquivo na raiz do projeto chamado `.env.local` e cole o seguinte:

```
PUBLIC_API_URL=http://localhost:8080
```

### 2. Clone o repositório:

```bash
git clone [https://github.com/siyFred/url-shortener-web.git](https://github.com/siyFred/url-shortener-web.git)
cd url-shortener-web
```

### 3. Instale as Dependências:

```bash
npm install
```

### 4. Rode o Servidor de Desenvolvimento:
```bash
npm run dev
```
Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver a aplicação.

## Compilando e Rodando (Produção)

Se você preferir compilar e rodar uma versão de produção:

**1. Garanta que a API Backend esteja rodando.**

**2. Configure a Variável de Ambiente:**
Em um servidor de produção, você precisará definir a variável de ambiente `PUBLIC_API_URL` para o endereço da sua API (ex: `https://api.meusite.com`).

**3. Compile o Projeto:**
```bash
npm run build
```
Isso irá criar uma build otimizada na pasta `.next/`.

**4. Rode a Aplicação:**
```bash
npm run start
```
A aplicação de produção estará disponível em `http://localhost:3000`.

## Tasks (Roadmap)

* [ ] **Autenticação e Dashboard**
    * Implementar rotas de Login e Registro (para consumir a API do Spring Security/JWT).
    * Criar um Dashboard (`/dashboard`) para o usuário ver, editar e deletar seus links (consumindo os endpoints de CRUD da API).
* [ ] **Analytics no Dashboard**
    * Adicionar exibição de estatísticas (contagem de cliques) no dashboard, consumindo os dados de analytics (Fase 4 do backend).
