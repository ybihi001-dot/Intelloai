# IntelloAI (moukawil-ai)

Plateforme SaaS full-stack pour la generation et la gestion de leads business, propulsee par Next.js 16, React 19, Drizzle ORM, PostgreSQL (Supabase) et deployee sur Netlify.

## Stack technique

- **Framework**: Next.js 16 (App Router) + React 19
- **Style**: Tailwind CSS
- **Base de donnees**: PostgreSQL via Supabase
- **ORM**: Drizzle ORM
- **Validation**: Zod
- **Deploiement**: Netlify

## Structure du projet

```
src/
  app/
    api/
      health/route.ts   # Endpoint de sante
      leads/route.ts     # CRUD des leads (POST/GET)
    layout.tsx
    page.tsx
  db/
    schema.ts            # Schema Drizzle (tables)
    index.ts             # Connexion DB
drizzle.config.ts
netlify.toml
.env.example
```

## Installation

1. Cloner le repository
2. Installer les dependances :
   ```bash
   npm install
   ```
3. Copier `.env.example` vers `.env.local` et renseigner les variables (URL Supabase, cles, DATABASE_URL)
4. Lancer les migrations Drizzle :
   ```bash
   npx drizzle-kit push
   ```
5. Demarrer le serveur de developpement :
   ```bash
   npm run dev
   ```

## Variables d'environnement

Voir `.env.example` pour la liste complete. Ne jamais committer de fichier `.env` contenant des secrets reels.

## API

### `GET /api/health`
Retourne le statut de sante de l'application.

### `POST /api/leads`
Cree un nouveau lead. Corps attendu (JSON) :
```json
{
  "name": "string",
  "email": "string",
  "phone": "string (optionnel)",
  "company": "string (optionnel)",
  "message": "string (optionnel)"
}
```

### `GET /api/leads`
Liste l'ensemble des leads enregistres.

## Deploiement

Le projet est configure pour un deploiement automatique sur Netlify via `netlify.toml`. Connecter le repository GitHub a Netlify et definir les variables d'environnement necessaires dans les parametres du site.

## Licence

Projet prive - Tous droits reserves.
