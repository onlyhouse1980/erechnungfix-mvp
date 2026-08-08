import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer-row">
        <div>
          <div className="brand footer-brand"><span className="brand-mark">EF</span><span>ERechnungFix</span></div>
          <p className="muted small">Technische Werkzeuge für strukturierte E-Rechnungen. Keine Steuer- oder Rechtsberatung.</p>
        </div>
        <div className="footer-links">
          <Link href="/tools/viewer">Viewer</Link>
          <Link href="/tools/generator">Generator</Link>
          <Link href="/pricing">Preise</Link>
          <Link href="/impressum">Impressum</Link>
          <Link href="/datenschutz">Datenschutz</Link>
        </div>
      </div>
    </footer>
  );
}
