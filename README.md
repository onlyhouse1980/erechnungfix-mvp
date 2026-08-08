# ERechnungFix MVP

A German-first micro-SaaS MVP for viewing, structurally checking and generating XRechnung-style UBL XML.

## Why this product

Germany's B2B e-invoicing transition creates a deadline-driven market. The free viewer is intended as the SEO acquisition loop; paid XML export is the first monetization path.

## Included

- Next.js App Router, JavaScript (no TypeScript)
- German SEO landing page
- Local browser XML viewer/parser
- Basic structural/plausibility checks
- Server-side EN16931-oriented UBL/XRechnung generator via @lucaapp/zugferd-ts
- Stripe Checkout one-time export (€2.99 product configured in Stripe)
- Stripe subscription checkout wiring for a future Pro plan
- Payment-session verification plus server-side UBL validation before paid export
- Pricing, success, Impressum and Datenschutz starter pages
- Responsive UI

## Important compliance note

The included validator is a structural MVP check, **not** an official KoSIT reference validation. Paid exports are generated with `@lucaapp/zugferd-ts` and checked by its bundled UBL validator. Add KoSIT BR-DE validation before making an official German XRechnung conformance claim in production.

For production, add a KoSIT validation service and automated test fixtures from official/current standards.

## Setup

```bash
cp .env.example .env.local
npm install
npm run dev
```

Create Stripe Prices:

1. One-time price: €2.99 -> `STRIPE_PRICE_EXPORT`
2. Optional recurring price: €9.90/month -> `STRIPE_PRICE_PRO`
3. Set `STRIPE_SECRET_KEY`
4. Set `NEXT_PUBLIC_SITE_URL`

## Before launch

- Replace Impressum placeholders.
- Replace Datenschutz placeholders and legally review it.
- Add KoSIT/Schematron reference validation.
- Add auth + Stripe webhook entitlement handling before selling the Pro subscription.
- Add ZUGFeRD PDF/A-3 extraction/generation.
- Add rate limiting and analytics with consent handling as required.
- Add sitemap and SEO content pages for keyword clusters.

## Suggested SEO pages

- /xrechnung-viewer
- /xrechnung-pruefen
- /e-rechnung-oeffnen
- /xrechnung-erstellen
- /zugferd-viewer
- /zugferd-vs-xrechnung
- /e-rechnung-pflicht-2027
- /e-rechnung-pflicht-2028

## Monetization ladder

- Free: viewer + basic structural check
- €2.99: one export
- €9.90/month: unlimited exports + templates + saved company/customer data
- €19–49/month later: bulk validation, DATEV export, API access, tax-advisor workflows
