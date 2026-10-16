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

- Use the existing TanStack Start router with React and TypeScript; the Lovable runtime does not support replacing it with Next.js.
- Keep business contact settings in a single browser-safe configuration module and omit unconfirmed details to avoid fictitious contacts.
- Share page sections across the home and dedicated content routes to keep copy and quotation interactions consistent.
- Quotation requests are validated and prepared locally for WhatsApp, never posted to an unconfigured server.
- Keep pricing configuration, input validation and pure estimation in a browser-safe pricing module; return a total only with complete applicable rates and inputs to prevent partial-price claims.
