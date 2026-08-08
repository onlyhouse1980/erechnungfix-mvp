import Link from 'next/link';

export default function Header() {
  return (
    <header className="site-header">
      <div className="shell nav-row">
        <Link href="/" className="brand" aria-label="ERechnungFix Startseite">
          <span className="brand-mark">EF</span>
          <span>ERechnungFix</span>
        </Link>
        <nav className="nav-links" aria-label="Hauptnavigation">
          <Link href="/tools/viewer">Prüfen & lesen</Link>
          <Link href="/tools/generator">Erstellen</Link>
          <Link href="/pricing">Preise</Link>
        </nav>
        <Link className="button button-small" href="/tools/viewer">Datei prüfen</Link>
      </div>
    </header>
  );
}
