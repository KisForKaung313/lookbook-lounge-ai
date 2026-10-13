<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Public company pages use the shared WebsiteShell and CompanyHome presentation modules, while existing personal tools retain AppShell; this separates the company introduction from the application experience without changing personal-data behavior.
- Company copy distinguishes product vision from live features; this avoids promising capabilities that are still in development.
- Company motion is scoped to WebsiteShell, uses IntersectionObserver for progressive scroll reveals and CSS for ambient motion, and respects reduced-motion preferences; this keeps public presentation effects out of personal tools and preserves readable content without JavaScript.
