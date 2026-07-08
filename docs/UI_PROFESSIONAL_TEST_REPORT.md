# KPSS Tarih — Professional UI + Audit Fix Report

## Applied fixes

- Light button surfaces now force dark text.
- Dark/accent/active button surfaces now force light text.
- Child text and icons inside buttons inherit the corrected contrast color.
- `Button` and `ButtonLink` were rewritten with explicit contrast data attributes.
- Global contrast guard appended to `src/app/globals.css` to cover custom Tailwind/arbitrary-class buttons.
- Static production audit script added.
- Runtime smoke-test script added for local or deployed page verification.
- Unsafe `Record<string, unknown>` casts in `src/data/kpss-history.ts` are patched by the apply script.

## Commands

```bash
node apply-kpss-tarih-professional-ui-audit-fix.mjs
npm run typecheck
npm run build
npm run audit:prod
SMOKE_BASE_URL=https://kpss-tarih-web-app.vercel.app npm run smoke:prod
```

## Manual UI QA checklist

- Light buttons: text must be dark and readable.
- Dark/accent buttons: text must be cream/white and readable.
- Active tabs/pills must not become invisible.
- Dashboard, Topics, Question Bank, Flashcards and Analytics must render without layout shift.
- Mobile header/nav must not wrap into unreadable pills.
- No `lorem ipsum`, `coming soon`, `placeholder`, `dummy`, `TODO`, `FIXME` copy should remain on public pages.
- Public images above 700 KB should be compressed or converted to WebP/AVIF.
