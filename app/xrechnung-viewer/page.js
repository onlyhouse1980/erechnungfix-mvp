import Link from 'next/link';

export const metadata = {
  title: 'Kostenloser XRechnung Viewer – XML-Rechnungen online lesen & öffnen',
  description: 'Öffnen und lesen Sie XRechnung und ZUGFeRD XML-Dateien kostenlos im Browser. 100% datenschutzkonform ohne Upload auf externe Server.',
  keywords: ['XRechnung Viewer', 'XRechnung online öffnen', 'XML Rechnung lesen', 'UBL Viewer', 'ZUGFeRD Viewer online']
};

export default function XRechnungViewerLanding() {
  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <span className="badge badge-accent">100% Kostenfrei & Lokal im Browser</span>
          <h1 className="text-4xl font-extrabold tracking-tight">
            XRechnung Viewer – XML-Rechnungen sofort online lesen
          </h1>
          <p className="text-lg text-secondary max-w-2xl mx-auto">
            Keine Installation erforderlich. Ziehen Sie Ihre XRechnung oder ZUGFeRD XML-Datei einfach in den Browser, um Beträge, Positionen und Empfängerdaten übersichtlich anzuzeigen.
          </p>
          <div className="pt-4">
            <Link href="/tools/viewer" className="btn btn-primary text-lg px-8 py-3">
              Jetzt XRechnung öffnen →
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 pt-8">
          <div className="card space-y-2">
            <h3 className="font-bold text-xl">🔒 100% Datenschutz</h3>
            <p className="text-secondary text-sm">
              Ihre sensiblen Rechnungsdaten werden ausschließlich lokal in Ihrem Browser verarbeitet und niemals auf externe Server hochgeladen.
            </p>
          </div>
          <div className="card space-y-2">
            <h3 className="font-bold text-xl">⚡ Blitzschnelle Vorschau</h3>
            <p className="text-secondary text-sm">
              Automatische Umwandlung von UBL & CII XML-Strukturen in ein lesbares, druckbares Rechnungsdokument.
            </p>
          </div>
          <div className="card space-y-2">
            <h3 className="font-bold text-xl">✅ EN 16931 Konform</h3>
            <p className="text-secondary text-sm">
              Unterstützt offizielle Standardformate für die E-Rechnungspflicht in Deutschland (XRechnung 2.x/3.x & ZUGFeRD 2.x).
            </p>
          </div>
        </div>

        <div className="card space-y-4 bg-slate-50 border p-6 rounded-xl mt-12">
          <h2 className="text-2xl font-bold">Häufig gestellte Fragen (FAQ) zum XRechnung Viewer</h2>
          <div className="space-y-3">
            <div>
              <h4 className="font-semibold">Wie öffne ich eine XRechnung XML-Datei?</h4>
              <p className="text-secondary text-sm">
                Klicken Sie auf den Button „Jetzt XRechnung öffnen“, wählen Sie Ihre `.xml`-Datei aus oder ziehen Sie diese per Drag & Drop in das Feld. Der Viewer stellt alle Inhalte sofort lesbar dar.
              </p>
            </div>
            <div>
              <h4 className="font-semibold">Ist die Nutzung des Viewers kostenlos?</h4>
              <p className="text-secondary text-sm">
                Ja, die Ansicht und Prüfung von E-Rechnungen ist dauerhaft 100% kostenlos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
