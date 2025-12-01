# ⚠️ WARNING: AI-GENERATED CODE ⚠️

> **This project was completely built by AI ("vibe code"). Use at your own risk. The code may contain hallucinations, bugs, or security vulnerabilities. Do not deploy to critical production environments without thorough review.**

---

# Wichteln (Secret Santa) Manager

This is a simple web application to organize **Wichteln** (also known as **Secret Santa**) for groups of friends, family, or colleagues.

## What is Wichteln?

**Wichteln** is a traditional gift exchange game. The basic principle is simple:

1. A group of people gathers (virtually or physically).
2. Each person is randomly assigned another person in the group to whom they must give a gift.
3. The assignment is usually kept secret (hence "Secret" Santa).
4. On a specific date, the gifts are exchanged.

This application automates the "drawing names from a hat" part, allowing you to organize the exchange remotely without anyone needing to be a non-participating moderator.

## How this Software Works

This application allows you to manage the entire process:

1.  **Create a Group**: An organizer creates a new Wichteln group and receives an **Admin Link** (to manage the draw) and a **Share Link**.
2.  **Join**: Participants use the Share Link to join the group by entering their name. They get a unique, private link to view their dashboard.
3.  **Draw**: Once everyone has joined, the Admin clicks the "Draw" button.
4.  **Assign**: The system randomly shuffles the members and assigns each person a target.
    - _Algorithm_: It uses a circular assignment (A -> B -> C -> A) based on a shuffled list, ensuring no one draws themselves and everyone receives exactly one gift.
5.  **Reveal**: Participants check their private dashboard to see who they need to buy a gift for.

### Tech Stack

- **Framework**: Nuxt 3
- **Database**: SQLite (via Drizzle ORM)
- **Style**: Minimalist CSS

## Configuration

You can configure the database path using an environment variable:

- `SQLITE_DB_PATH`: Path to the SQLite database file (default: `sqlite.db`)

---

## Setup & Development

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

### Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

### Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```
