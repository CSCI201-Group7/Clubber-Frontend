# Clubber-Frontend

This is the repo for the frontend website for Group 7's project.

## Environment Setup

Install [NodeJS 20+](https://nodejs.org/en) if you have not already.

Run `npm i` to install all dependencies.

## Commands

- `npm run dev`: dev preview
- `npm run build`: build website
- `npm run start`: start the program after build

## Repo Structure

### Source Code

Under `src/app`. NextJS uses file directory navigation: `src/app/home/page.tsx` will be accessible at `http://some-url.com/home`.

### Assets

Under `public` dir. For global assets (used in multiple pages), keep under `public`. For individual pages, under `public/<page>`. e.g. `public/authenticate` holds assets for the auth page.

### Components

Under `src/components`. Global components (used in multiple pages) are kept under `components`. Individual page components are kept under `components/<page>`.

### Type Docs

Under `types`

## References/Docs/Resources

- TailwindCSS: [https://tailwindcss.com/docs/styling-with-utility-classes]
- NodeJS: [https://nodejs.org/docs/latest/api/]
- NextJS: [https://nextjs.org/docs/app/getting-started/layouts-and-pages]
- ReactJS: [https://react.dev/reference/react]

## **DO NOT ATTEMPT TO CHANGE PROJECT DEPENDENCIES**
