'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Pricing() {
  const [error, setError] = useState('');
  async function pro() {
    setError('');
    const res = await fetch('/api/checkout', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ product: 'pro' }) });
    const data = await res.json();
    if (!res.ok) return setError(data.error || 'Checkout konnte nicht gestartet werden.');
    window.location.href = data.url;
  }
  return <section className="tool-page shell pricing-page">
    <div className="tool-heading"><h1>Einfache Preise</h1><p>Der Viewer bleibt kostenlos. Bezahlt wird erst, wenn ein Export oder mehr Automatisierung gebraucht wird.</p></div>
    <div className="pricing-grid">
      <div className="pricing-card"><h2>Kostenlos</h2><div className="pricing-number">0 €</div><p>Für eingehende E-Rechnungen.</p><ul><li>XML Viewer</li><li>Struktur-Check</li><li>Keine Registrierung</li><li>Lokale Browser-Verarbeitung</li></ul><Link className="button button-ghost full" href="/tools/viewer">Kostenlos prüfen</Link></div>
      <div className="pricing-card featured"><h2>Einzel-Export</h2><div className="pricing-number">2,99 €</div><p>Einmal zahlen, XML herunterladen.</p><ul><li>Generator-Vorschau</li><li>UBL/XRechnung XML</li><li>Keine Vertragsbindung</li><li>Stripe Checkout</li></ul><Link className="button full" href="/tools/generator">Rechnung erstellen</Link></div>
      <div className="pricing-card"><h2>Pro</h2><div className="pricing-number">9,90 €<small>/Monat</small></div><p>Für regelmäßige Nutzer.</p><ul><li>Unbegrenzte Exporte</li><li>Vorlagen & Stammdaten</li><li>ZUGFeRD PDF/A-3</li><li>Spätere KoSIT-Prüfung</li></ul><button className="button button-ghost full" onClick={pro}>Pro starten</button>{error && <p className="checkout-error">{error}</p>}</div>
    </div>
    <p className="fineprint center">Hinweis: Die Pro-Funktionen sind im MVP als Monetarisierungs-/Checkout-Pfad vorbereitet; Nutzerkonten und Entitlement-Verwaltung sollten vor Liveverkauf der Subscription ergänzt werden.</p>
  </section>;
}
