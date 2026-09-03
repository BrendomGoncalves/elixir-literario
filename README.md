# Elixir Literário — Angular

Migração do projeto original em React/Vite para Angular, mantendo o design, conteúdo e interações.

## Requisitos

- Node.js 22.22.3+ (requisito do Angular 22)
- npm

## Rodar localmente

```bash
npm install
npm start
```

Abra `http://localhost:4200`.

## Build de produção

```bash
npm run build
```

O build será gerado em `dist/`.

## Estrutura

- Angular standalone components
- Angular Router
- Tailwind CSS 4 via PostCSS
- Estado de leitura compartilhado por serviço com `signal`
- Dados mockados mantidos em `src/app/data/books.ts`

As imagens continuam usando as URLs do Unsplash presentes no projeto original e o link de afiliado continua como `#`, exatamente como na origem.
