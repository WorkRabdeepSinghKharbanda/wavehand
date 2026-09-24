## protected_branches: ["archive"]

# Branching strategy

Personal solo project, owned by Rabdeep Singh. Originally cloned from `Ekmand/gesture-synth` (Ethan Dutson's repo); git history was later squashed to a single fresh commit authored by Rabdeep Singh — the old commit-by-commit history from that repo is intentionally not carried over, though the code it produced still is.

## Remotes — don't confuse these

- `origin` = `github.com/WorkRabdeepSinghKharbanda/wavehand` — the real repo to push to.
- `upstream` = `github.com/Ekmand/gesture-synth` — the original author's repo, kept only for reference. Never push here (no write access, and it's what actually serves the separate, real production gesturesynth.com site for other people). Renaming `gesturesynth.com` → `wavehand.com` in this codebase was a text-only branding rename — it never touched that live site or created a real `wavehand.com` domain.

## Direct push to `main` is blocked — not by this repo

A **harness-level** `PreToolUse` hook (`~/.uniqode/engineering/hooks/pre-push-check.sh`, a Uniqode work-org default, not a git hook and not specific to this repo) blocks any `git push ... main`. `git push --no-verify` does **not** bypass it, since it intercepts the Bash tool call before git even runs. Workaround in use: push to a branch, currently `wavehand-updates`, and the user merges/promotes it into `main` on GitHub themselves. If this repo ever gets its own PreToolUse override, this whole section goes away and direct-to-main becomes simple again — check before assuming this workaround is still needed.

## Deploy — two independent targets, run them in parallel

There are two separate "ship it" actions, and they do NOT trigger each other — there's no CI/CD wiring between them:

1. **`git push origin wavehand-updates`** — updates the GitHub repo.
2. **`vercel --prod --yes`** — builds and uploads the local working tree directly to the live Vercel project (`wavehand`, under the user's own account `workrabdeepsinghkharbanda`, no GitHub integration — the auto-connect attempt failed on link, which is correct/expected). Real live URL: **https://wavehand.vercel.app**.

Since neither depends on the other finishing, **run both in the same message as parallel tool calls** (or at minimum, don't block one on the other) rather than sequentially waiting for the push before starting the deploy.

Verify the deploy specifically (a successful push says nothing about the live site):
- `curl -s -o /dev/null -w "%{http_code}\n" https://wavehand.vercel.app` → should be 200.
- If unsure whether a deploy actually picked up the latest build (not just that the site still returns 200 from a stale cache), compare `curl -sI https://wavehand.vercel.app | grep etag` before and after.

If a real custom domain (e.g. an actually-purchased wavehand.com) is added later, set it up in the Vercel dashboard and update this file plus any hardcoded URLs (sitemap.xml, robots.txt, llms.txt, OG/canonical tags, `src/lib/siteMeta.ts`'s `SITE_URL`) to match — don't assume the domain from code comments.
