'use client';

import { useState } from 'react';
import { parseInvoiceXml } from '../../../lib/einvoice';

export default function ViewerPage() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [fileName, setFileName] = useState('');

  async function handleFile(file) {
    setError(''); setResult(null);
    if (!file) return;
    if (!file.name.toLowerCase().endsWith('.xml')) {
      setError('Im MVP wird zunächst XML unterstützt. ZUGFeRD-PDF-Extraktion ist als nächster Schritt vorgesehen.');
      return;
    }
    try {
      const xml = await file.text();
      setFileName(file.name);
      setResult(parseInvoiceXml(xml));
    } catch (e) {
      setError(e.message || 'Datei konnte nicht verarbeitet werden.');
    }
  }

  const d = result?.data;
  const errors = result?.issues?.filter(i => i.level === 'error').length || 0;
  const warnings = result?.issues?.filter(i => i.level === 'warning').length || 0;

  return (
    <section className="tool-page shell">
      <div className="tool-heading">
        <h1>XRechnung prüfen & lesen</h1>
        <p>XML-Datei auswählen. Die Auswertung erfolgt lokal in deinem Browser.</p>
      </div>
      <label className="dropzone" onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); handleFile(e.dataTransfer.files[0]); }}>
        <input type="file" accept=".xml,text/xml,application/xml" onChange={(e) => handleFile(e.target.files[0])} />
        <span className="drop-icon">↥</span>
        <strong>E-Rechnung hier ablegen</strong>
        <span>oder XML-Datei auswählen</span>
      </label>
      {error && <div className="alert error-alert">{error}</div>}
      {result && (
        <div className="results-wrap">
          <div className={`result-banner ${errors ? 'bad' : 'good'}`}>
            <div><strong>{errors ? `${errors} Problem${errors === 1 ? '' : 'e'} gefunden` : 'Keine kritischen Strukturprobleme erkannt'}</strong><span>{warnings} Hinweis{warnings === 1 ? '' : 'e'} · {fileName}</span></div>
            <span className="score">{errors ? 'Prüfen' : 'OK'}</span>
          </div>
          <div className="data-grid">
            <Info label="Format" value={d.format} />
            <Info label="Rechnungsnummer" value={d.invoiceNumber} />
            <Info label="Datum" value={d.issueDate} />
            <Info label="Fällig" value={d.dueDate} />
            <Info label="Aussteller" value={d.seller} />
            <Info label="Empfänger" value={d.buyer} />
            <Info label="Netto" value={money(d.net, d.currency)} />
            <Info label="Steuer" value={money(d.tax, d.currency)} />
            <Info label="Brutto" value={money(d.gross, d.currency)} />
          </div>
          <div className="issues-panel">
            <h2>Technische Hinweise</h2>
            {result.issues.length === 0 ? <p className="muted">Keine Hinweise aus dem MVP-Strukturcheck.</p> : result.issues.map((issue, i) => (
              <div className={`issue ${issue.level}`} key={i}><span>{issue.level === 'error' ? '!' : 'i'}</span><p>{issue.message}</p></div>
            ))}
            <p className="fineprint">Dieser Check ersetzt keine offizielle KoSIT-/Schematron-Validierung und keine steuerliche Prüfung.</p>
          </div>
        </div>
      )}
    </section>
  );
}

function Info({ label, value }) { return <div className="info-cell"><span>{label}</span><strong>{value || '—'}</strong></div>; }
function money(value, currency) { if (value == null) return '—'; try { return new Intl.NumberFormat('de-DE', { style: 'currency', currency: currency || 'EUR' }).format(value); } catch { return `${value} ${currency || ''}`; } }
