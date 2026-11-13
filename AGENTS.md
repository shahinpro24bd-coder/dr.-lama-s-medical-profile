<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

- Vercel builds use Nitro's Vercel server preset; other builds retain the platform default, because public HTML requires request-time language rendering.
- Language-switch and internal navigation URLs carry an explicit language; cookie-selected responses are private to prevent cross-language CDN/browser cache reuse.
- Public site pages live in `src/site/*.html` (English source) and `src/lib/site-content/fallback.generated.json` (per-language text keyed by text hash); edit both together so every language stays in sync.
- Site images and videos are self-hosted under `public/img` and `public/reels`, so the site works on any host without Lovable asset URLs.
- Browser-saved admin edits use versioned storage keys; bump the version when content is replaced wholesale so stale edits never re-apply.
