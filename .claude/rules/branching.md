## protected_branches: ["archive"]

# Branching strategy

Personal solo project. No feature-branch/PR workflow — commits go straight to `main` (the actual default branch here, confirmed via `git branch --show-current`; not `master`).

## Two separate "live" things — don't confuse them

- `origin` (`git remote -v`) is `github.com/Ekmand/gesture-synth` — the original author's repo. This is **not** something to push to; there's no confirmed write access, and it's what actually serves the real production gesturesynth.com site for other people. Renaming `gesturesynth.com` → `wavehand.com` in this codebase earlier was a text-only branding rename — it did **not** create a real `wavehand.com` domain or touch that live site.
- The actual deploy target for this working copy is a separate Vercel project, `wavehand`, under the user's own Vercel account (`workrabdeepsinghkharbanda`), created via `vercel link --yes --project wavehand`. It has no GitHub integration (the auto-connect to `Ekmand/gesture-synth` failed on link, which is correct/expected — no access). Real live URL: **https://wavehand.vercel.app**.

## Deploy

Not git-push-triggered. Deploy manually from this directory with:

```
vercel --prod --yes
```

This builds and uploads the local working tree directly (no commit required, though committing first is still good practice). `.vercel/` holds the project link and is gitignored.

Then verify with `curl -s -o /dev/null -w "%{http_code}\n" https://wavehand.vercel.app` to confirm the new build is live (200), not stale.

If you need to confirm the deploy actually picked up the new build (not just that the site returns 200), check `curl -sI https://wavehand.vercel.app | grep etag` before and after — the etag changes once the new build is live.

If a real custom domain (e.g. an actually-purchased wavehand.com) is added later, add it in the Vercel dashboard for this project and update this file and any hardcoded URLs (sitemap, robots.txt, OG/canonical tags) to match — don't assume the domain from code comments.
