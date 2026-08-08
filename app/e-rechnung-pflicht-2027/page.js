import Link from 'next/link';

export const metadata = {
  title: 'E-Rechnungspflicht 2025, 2027 & 2028 – Übersicht & Fristen in Deutschland',
  description: 'Alle Fristen und Vorgaben zur gesetzlichen B2B E-Rechnungspflicht in Deutschland im Überblick. Was Selbstständige und KMU jetzt wissen müssen.',
  keywords: ['E-Rechnung Pflicht 2025', 'E-Rechnungspflicht 2027', 'E-Rechnung Gesetz Deutschland', 'Wachstumschancengesetz E-Rechnung']
};

export default function ERechnungPflichtGuide() {
  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-4">
          <span className="badge badge-accent">Gesetzliche Vorgaben</span>
          <h1 className="text-4xl font-extrabold tracking-tight">
            E-Rechnungspflicht in Deutschland: Fristen & Übergangsregelungen (2025–2028)
          </h1>
          <p className="text-lg text-secondary">
            Durch das Wachstumschancengesetz wird die elektronische Rechnungstellung im B2B-Bereich in Deutschland ab dem 1. Januar 2025 schrittweise verpflichtend.
          </p>
        </div>

        <div className="card space-y-6 p-6 bg-slate-50 border rounded-xl">
          <h2 className="text-2xl font-bold">Die Zeitachse der E-Rechnungspflicht</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-primary pl-4 py-1">
              <h3 className="font-bold text-lg">1. Januar 2025 – Empfangspflicht</h3>
              <p className="text-secondary text-sm">
                Jedes deutsche B2B-Unternehmen muss in der Lage sein, E-Rechnungen (XRechnung, ZUGFeRD) nach dem Standard EN 16931 elektronisch zu empfangen und zu verarbeiten.
              </p>
            </div>
            <div className="border-l-4 border-amber-500 pl-4 py-1">
              <h3 className="font-bold text-lg">1. Januar 2027 – Ausstellungspflicht (Umsatz &gt; 800.000 €)</h3>
              <p className="text-secondary text-sm">
                Unternehmen mit mehr als 800.000 € Vorjahresumsatz dürfen Rechnungen an andere B2B-Kunden nur noch als E-Rechnung ausstellen. Papier- und einfache PDF-Rechnungen sind nicht mehr zulässig.
              </p>
            </div>
            <div className="border-l-4 border-red-500 pl-4 py-1">
              <h3 className="font-bold text-lg">1. Januar 2028 – Finale Pflicht für alle Unternehmen</h3>
              <p className="text-secondary text-sm">
                Die Übergangsfristen enden. Sämtliche B2B-Umsätze in Deutschland müssen ausnahmslos als strukturierte E-Rechnung übermittelt werden.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center pt-6 space-y-4">
          <h3 className="text-xl font-bold">Sind Sie bereit für die E-Rechnung?</h3>
          <p className="text-secondary">
            Nutzen Sie ERechnungFix, um E-Rechnungen kostenlos zu prüfen oder konforme XRechnungen zu erstellen.
          </p>
          <div>
            <Link href="/tools/generator" className="btn btn-primary px-8 py-3">
              Erste XRechnung erstellen →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
