# Brain sync convention

There are two separate brain trees — don't conflate them:

- **`.claude/brain/feature/`** — the instrument itself (`src/App.tsx`), mounted at `/`. It has no internal router; it switches between modes/overlays via state. "Feature" here means a distinct functional module (Gesture mode, Loop pedal, Learn/Practice, Community songs, etc.), not a URL route. The `?a=<uuid>` query-param deep link is documented as a feature here too, since it's still state inside `App.tsx`, not a separate route.
- **`.claude/brain/route/`** — everything else in `src/pages/`, which genuinely is routed via `react-router-dom` (`src/main.tsx`). These entries describe real URLs (`/guides/:slug`, `/blog`, etc.), not internal state.

Same sync rule for both trees:

- Every feature/route ships its `.claude/brain/{feature,route}/NNN-{kebab-name}.md` entry (YAML frontmatter: `entry_point`, `category`, one-line description) in the SAME commit as the code — never a follow-up.
- Add its row to that tree's `000-index.md` under the matching category.
- Removing a feature/route deletes both the brain file and its index row instead of leaving stale entries.
- Source of truth is the actual code — if the brain and the code ever disagree, regenerate the brain from the code, never the other way around. For `feature/`, that's the `App.tsx` state machine + the component/hook it drives. For `route/`, that's `src/main.tsx`'s `<Routes>` + `src/pages/`.
- A change that doesn't add/remove a feature or route (new util, new section on an existing overlay, a prop tweak, a new blog post appended to `src/content/blogPosts.ts`) doesn't need a new brain file — update the existing entry's description only if the change is significant enough to matter to a future session. Note: a new blog post/guide/listicle entry in `src/content/` is a content change, not a new route — the route (`/blog/:slug`) already exists and is documented once.
