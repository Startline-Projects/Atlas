# Start Here

## Two steps

**1.** Open this folder in Claude Code (terminal in this directory, then run `claude`).

**2.** Open `PROMPT.md`, copy the entire contents, paste it as your first message in Claude Code.

That's it. Claude Code will read the docs, ask you to confirm scope, and then build the landing page foundation.

## What's in this folder

- `docs/` — the architecture rulebook Claude Code will follow.
- `homepage__10_.html` — your existing landing page HTML, the source of truth for the design.
- `PROMPT.md` — the prompt to paste into Claude Code.

## What to expect

- Claude Code will read all 5 docs + the relevant parts of the HTML before writing code.
- It will ask you to confirm a summary before doing anything. **Read the summary and only say "go" if it understood correctly.**
- It will scaffold a Next.js 15 + TypeScript + Tailwind project, set up centralized design tokens, and convert the home view into clean components.
- Estimated time: 30–60 minutes of execution. Your job is to review at the checkpoints.

## After it finishes

Run `pnpm dev` and compare the result to `homepage__10_.html` open in another browser tab. They should look identical.
