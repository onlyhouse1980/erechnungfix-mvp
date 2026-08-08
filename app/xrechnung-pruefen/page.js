import Link from 'next/link';

export const metadata = {
  title: 'XRechnung online prüfen & validieren – Kostenlos & EN 16931-konform',
  description: 'Prüfen Sie XRechnung und ZUGFeRD XML-Dateien kostenlos auf Gültigkeit, Pflichtangaben und Syntaxfehler nach dem Standard EN 16931.',
  keywords: ['XRechnung prüfen', 'XRechnung validieren', 'XML Rechnung Syntax prüfen', 'EN 16931 Validator', 'UBL Prüfer']
};

export default function XRechnungPruefenLanding() {
  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <span className="badge badge-accent">Automatische Validierung</span>
          <h1 className="text-4xl font-extrabold tracking-tight">
            XRechnung online prüfen & strukturell validieren
          </h1>
          <p className="text-lg text-secondary max-w-2xl mx-auto">
            Vermeiden Sie Zahlungsverzögerungen und fehlerhafte E-Rechnungen. Überprüfen Sie Ihre XML-Dateien sekundenschnell auf Vollständigkeit und Konformität nach EN 16931.
          </p>
          <div className="pt-4">
            <Link href="/tools/viewer" className="btn btn-primary text-lg px-8 py-3">
              Jetzt XRechnung prüfen →
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 pt-8">
          <div className="card space-y-3">
            <h3 className="font-bold text-xl">Was wird überprüft?</h3>
            <ul className="space-y-2 text-secondary text-sm">
              <li>✓ Vollständigkeit aller EN 16931 Pflichtfelder</li>
              <li>✓ Korrekte Syntax der UBL & CII XML-Struktur</li>
              <li>✓ Plausibilität von Summen, USt-Sätzen & IBAN</li>
              <li>✓ Leitweg-ID Format bei öffentlichen Auftraggebern</li>
            </ul>
          </div>
          <div className="card space-y-3">
            <h3 className="font-bold text-xl">Warum XRechnungen prüfen?</h3>
            <p className="text-secondary text-sm">
              Ab 2025 müssen Unternehmen in Deutschland E-Rechnungen empfangen können. Öffentliche Auftraggeber lehnen fehlerhafte XRechnungen automatisch ab. Eine Vorabprüfung garantiert reibungslose Abläufe.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
