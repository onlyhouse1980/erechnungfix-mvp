import Link from 'next/link';

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="shell hero-grid">
          <div className="hero-copy">
            <h1>E-Rechnungen endlich ohne Buchhaltungs-Chaos.</h1>
            <p className="lede">XRechnung und ZUGFeRD verständlich lesen, technische Probleme erkennen und eine strukturierte Rechnung erstellen – direkt im Browser.</p>
            <div className="hero-actions">
              <Link className="button" href="/tools/viewer">E-Rechnung kostenlos prüfen</Link>
              <Link className="button button-ghost" href="/tools/generator">XRechnung erstellen</Link>
            </div>
            <p className="privacy-note">XML-Verarbeitung im Browser · kein Konto für den Viewer · keine Rechnung wird automatisch gespeichert</p>
          </div>
          <div className="product-preview" aria-label="Produktvorschau">
            <div className="preview-toolbar"><span></span><span></span><span></span><strong>RE-2026-0142.xml</strong></div>
            <div className="status-line success-line"><b>✓ Strukturprüfung</b><span>Keine kritischen Pflichtfelder fehlen</span></div>
            <div className="invoice-summary">
              <div><span>Rechnungsnummer</span><strong>RE-2026-0142</strong></div>
              <div><span>Aussteller</span><strong>Beispiel Studio GmbH</strong></div>
              <div><span>Empfänger</span><strong>Musterhandel AG</strong></div>
              <div><span>Brutto</span><strong>1.190,00 €</strong></div>
            </div>
            <div className="code-lines"><i></i><i></i><i></i><i></i><i></i></div>
          </div>
        </div>
      </section>

      <section className="trust-strip">
        <div className="shell three-points">
          <div><strong>1.</strong><span>Datei hineinziehen</span></div>
          <div><strong>2.</strong><span>Daten verständlich sehen</span></div>
          <div><strong>3.</strong><span>Fehler beheben oder neu exportieren</span></div>
        </div>
      </section>

      <section className="section shell two-col">
        <div>
          <h2>Gebaut für Leute, die keine ERP-Schulung wollen.</h2>
          <p className="section-copy">Viele kleine Unternehmen brauchen keine komplette Buchhaltungssuite. Sie brauchen einen schnellen Weg, eine E-Rechnung zu öffnen, zu verstehen und sauber weiterzugeben.</p>
        </div>
        <div className="feature-list">
          <article><h3>XRechnung Viewer</h3><p>XML hochladen und die wichtigsten Rechnungsdaten in einer lesbaren Ansicht prüfen.</p></article>
          <article><h3>Struktur-Check</h3><p>Fehlende Kernfelder, widersprüchliche Summen und typische technische Probleme früh erkennen.</p></article>
          <article><h3>Generator</h3><p>Aus Formularfeldern eine UBL-basierte XRechnung-Datei erzeugen und vor dem Export kontrollieren.</p></article>
        </div>
      </section>

      <section className="section dark-section">
        <div className="shell conversion-grid">
          <div>
            <h2>Der kostenlose Viewer bringt den Traffic. Der Export bringt den Umsatz.</h2>
            <p>Der Kern bleibt kostenlos, damit SEO-Seiten wie „XRechnung Viewer“, „E-Rechnung öffnen“ und „XRechnung prüfen“ dauerhaft Nutzer gewinnen können.</p>
          </div>
          <div className="price-panel">
            <span className="price-label">Einzel-Export</span>
            <div className="big-price">2,99 €</div>
            <p>Für Nutzer, die nur gelegentlich eine E-Rechnung erstellen müssen.</p>
            <Link className="button light-button" href="/tools/generator">Rechnung erstellen</Link>
          </div>
        </div>
      </section>

      <section className="section shell faq">
        <h2>Häufige Fragen</h2>
        <details><summary>Ist ein normales PDF eine E-Rechnung?</summary><p>Ein normales PDF enthält keine strukturierte Rechnungsdatei nach EN 16931. Das Tool fokussiert deshalb auf strukturierte XML-Daten und hybride Formate.</p></details>
        <details><summary>Speichert ERechnungFix meine hochgeladene Rechnung?</summary><p>Der MVP verarbeitet XML im Browser. Für Zahlungs- und spätere Cloud-Funktionen gelten separate Datenschutzinformationen.</p></details>
        <details><summary>Ist die Strukturprüfung eine offizielle KoSIT-Validierung?</summary><p>Nein. Der MVP bietet einen technischen Struktur- und Plausibilitätscheck. Eine offizielle Referenzvalidierung sollte als separate Server-Komponente ergänzt werden.</p></details>
      </section>
    </>
  );
}
