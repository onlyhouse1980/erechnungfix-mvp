'use client';

import { useState, useEffect } from 'react';

const today = new Date().toISOString().slice(0,10);
const plus30 = new Date(Date.now() + 30*86400000).toISOString().slice(0,10);

const initial = {
  invoiceNumber: `RE-${new Date().getFullYear()}-001`, issueDate: today, dueDate: plus30,
  sellerName: '', sellerVatId: '', sellerEmail: '', sellerStreet: '', sellerPostal: '', sellerCity: '', iban: '',
  buyerName: '', buyerVatId: '', buyerEmail: '', buyerReference: '', buyerStreet: '', buyerPostal: '', buyerCity: '',
  itemName: 'Dienstleistung', quantity: 1, unitPrice: 100, vatRate: 19
};

export default function GeneratorPage() {
  const [form, setForm] = useState(initial);
  const [paid, setPaid] = useState(false);
  const [checking, setChecking] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');
  const net = Number(form.quantity || 0) * Number(form.unitPrice || 0);
  const gross = net * (1 + Number(form.vatRate || 0)/100);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get('session_id');
    if (!sessionId) return;
    setChecking(true);
    fetch(`/api/verify-session?session_id=${encodeURIComponent(sessionId)}`)
      .then(r => r.json()).then(data => setPaid(Boolean(data.paid))).finally(() => setChecking(false));
  }, []);

  function set(key, value) { setForm((p) => ({ ...p, [key]: value })); }

  async function buyExport() {
    setCheckoutError('');
    try {
      const res = await fetch('/api/checkout', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ product: 'export' }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Checkout konnte nicht gestartet werden.');
      window.location.href = data.url;
    } catch (e) { setCheckoutError(e.message); }
  }

  async function download() {
    setCheckoutError('');
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get('session_id');
    try {
      const res = await fetch('/api/generate', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ sessionId, invoice: form }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Export konnte nicht erzeugt werden.');
      const blob = new Blob([data.xml], { type: 'application/xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = `${form.invoiceNumber || 'xrechnung'}.xml`; a.click();
      URL.revokeObjectURL(url);
    } catch (e) { setCheckoutError(e.message); }
  }

  return (
    <section className="tool-page shell generator-page">
      <div className="tool-heading"><h1>XRechnung erstellen</h1><p>Rechnung eingeben, Vorschau prüfen und XML exportieren.</p></div>
      <div className="generator-grid">
        <form className="form-panel" onSubmit={(e) => e.preventDefault()}>
          <Section title="Rechnung">
            <Field label="Rechnungsnummer"><input value={form.invoiceNumber} onChange={e => set('invoiceNumber', e.target.value)} /></Field>
            <Field label="Rechnungsdatum"><input type="date" value={form.issueDate} onChange={e => set('issueDate', e.target.value)} /></Field>
            <Field label="Fällig am"><input type="date" value={form.dueDate} onChange={e => set('dueDate', e.target.value)} /></Field>
          </Section>
          <Section title="Aussteller">
            <Field label="Firma / Name"><input value={form.sellerName} onChange={e => set('sellerName', e.target.value)} required /></Field>
            <Field label="USt-IdNr."><input placeholder="DE123456789" value={form.sellerVatId} onChange={e => set('sellerVatId', e.target.value)} /></Field>
            <Field label="E-Rechnungs-E-Mail"><input type="email" placeholder="rechnung@firma.de" value={form.sellerEmail} onChange={e => set('sellerEmail', e.target.value)} /></Field>
            <Field label="Straße"><input value={form.sellerStreet} onChange={e => set('sellerStreet', e.target.value)} /></Field>
            <div className="split-fields"><Field label="PLZ"><input value={form.sellerPostal} onChange={e => set('sellerPostal', e.target.value)} /></Field><Field label="Ort"><input value={form.sellerCity} onChange={e => set('sellerCity', e.target.value)} /></Field></div>
            <Field label="IBAN"><input value={form.iban} onChange={e => set('iban', e.target.value)} /></Field>
          </Section>
          <Section title="Empfänger">
            <Field label="Firma / Name"><input value={form.buyerName} onChange={e => set('buyerName', e.target.value)} /></Field>
            <Field label="USt-IdNr. (optional)"><input placeholder="DE123456789" value={form.buyerVatId} onChange={e => set('buyerVatId', e.target.value)} /></Field>
            <Field label="E-Rechnungs-E-Mail"><input type="email" placeholder="rechnung@kunde.de" value={form.buyerEmail} onChange={e => set('buyerEmail', e.target.value)} /></Field>
            <Field label="Käuferreferenz / Leitweg-ID (für spätere BR-DE-Prüfung)"><input value={form.buyerReference} onChange={e => set('buyerReference', e.target.value)} /></Field>
            <Field label="Straße"><input value={form.buyerStreet} onChange={e => set('buyerStreet', e.target.value)} /></Field>
            <div className="split-fields"><Field label="PLZ"><input value={form.buyerPostal} onChange={e => set('buyerPostal', e.target.value)} /></Field><Field label="Ort"><input value={form.buyerCity} onChange={e => set('buyerCity', e.target.value)} /></Field></div>
          </Section>
          <Section title="Position">
            <Field label="Beschreibung"><input value={form.itemName} onChange={e => set('itemName', e.target.value)} /></Field>
            <div className="three-fields"><Field label="Menge"><input type="number" min="0" step="0.01" value={form.quantity} onChange={e => set('quantity', e.target.value)} /></Field><Field label="Netto / Stück"><input type="number" min="0" step="0.01" value={form.unitPrice} onChange={e => set('unitPrice', e.target.value)} /></Field><Field label="MwSt. %"><input type="number" min="0" step="0.01" value={form.vatRate} onChange={e => set('vatRate', e.target.value)} /></Field></div>
          </Section>
        </form>
        <aside className="generator-preview">
          <div className="invoice-paper">
            <div className="paper-top"><div><span>RECHNUNG</span><strong>{form.invoiceNumber}</strong></div><div className="paper-total">{eur(gross)}</div></div>
            <div className="paper-parties"><div><small>VON</small><b>{form.sellerName || 'Dein Unternehmen'}</b><span>{form.sellerStreet}</span><span>{form.sellerPostal} {form.sellerCity}</span></div><div><small>AN</small><b>{form.buyerName || 'Kunde'}</b><span>{form.buyerStreet}</span><span>{form.buyerPostal} {form.buyerCity}</span></div></div>
            <div className="paper-item"><span>{form.itemName}</span><span>{form.quantity} × {eur(form.unitPrice)}</span><strong>{eur(net)}</strong></div>
            <div className="paper-totals"><span>Netto <b>{eur(net)}</b></span><span>MwSt. {form.vatRate}% <b>{eur(gross-net)}</b></span><span>Gesamt <strong>{eur(gross)}</strong></span></div>
          </div>
          <div className="export-box">
            <h2>XML Export</h2>
            <p>Die Vorschau ist kostenlos. Ein Einzel-Export kostet 2,99 €.</p>
            {paid ? <button className="button full" onClick={download}>XRechnung XML herunterladen</button> : <button className="button full" onClick={buyExport} disabled={checking}>{checking ? 'Zahlung wird geprüft…' : 'Export für 2,99 € freischalten'}</button>}
            {checkoutError && <p className="checkout-error">{checkoutError}</p>}
            <p className="fineprint">Der bezahlte Export wird serverseitig als UBL 2.1 erzeugt und gegen den gebündelten UBL-Validator geprüft. Für deutsche XRechnung-BR-DE-Regeln sollte vor dem Live-Launch zusätzlich KoSIT als Referenzprüfung angebunden werden.</p>
          </div>
        </aside>
      </div>
    </section>
  );
}

function Section({ title, children }) { return <fieldset><legend>{title}</legend>{children}</fieldset>; }
function Field({ label, children }) { return <label className="field"><span>{label}</span>{children}</label>; }
function eur(v) { return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(Number(v || 0)); }
