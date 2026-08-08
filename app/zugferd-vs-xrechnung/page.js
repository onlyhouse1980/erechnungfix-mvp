import Link from 'next/link';

export const metadata = {
  title: 'ZUGFeRD vs. XRechnung – Die Unterschiede im Vergleich (2025)',
  description: 'Was ist der Unterschied zwischen ZUGFeRD und XRechnung? Welches Format eignet sich für Ihr Unternehmen? Der Vergleich für die E-Rechnungspflicht.',
  keywords: ['ZUGFeRD vs XRechnung', 'Unterschied ZUGFeRD XRechnung', 'E-Rechnung Formate Deutschland', 'PDF/A-3 ZUGFeRD', 'UBL XML XRechnung']
};

export default function ZugferdVsXrechnungLanding() {
  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-4 text-center">
          <span className="badge badge-accent">Format-Vergleich</span>
          <h1 className="text-4xl font-extrabold tracking-tight">
            ZUGFeRD vs. XRechnung: Was ist der Unterschied?
          </h1>
          <p className="text-lg text-secondary max-w-2xl mx-auto">
            Beide Formate erfüllen die gesetzliche Norm EN 16931 für E-Rechnungen in Deutschland. Doch für wen eignet sich welches Format?
          </p>
        </div>

        <div className="overflow-x-auto pt-4">
          <table className="w-full text-left border-collapse border rounded-xl">
            <thead>
              <tr className="bg-slate-100 border-b">
                <th className="p-4 font-bold">Kriterium</th>
                <th className="p-4 font-bold text-primary">XRechnung</th>
                <th className="p-4 font-bold text-emerald-600">ZUGFeRD (ab 2.0)</th>
              </tr>
            </thead>
            <tbody className="divide-y text-sm">
              <tr>
                <td className="p-4 font-semibold">Dateiformat</td>
                <td className="p-4">Reines XML (UBL oder CII)</td>
                <td className="p-4">Hybrid: PDF/A-3 mit eingebettetem XML</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold">Visuelle Lesbarkeit</td>
                <td className="p-4">Benötigt Viewer / Parser</td>
                <td className="p-4">Direkt im PDF-Reader lesbar</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold">Einsatzbereich</td>
                <td className="p-4">Öffentliche Auftraggeber (B2G) & B2B</td>
                <td className="p-4">Hauptsächlich B2B & Mittelstand</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold">Leitweg-ID</td>
                <td className="p-4">Erforderlich bei Behörden</td>
                <td className="p-4">Optional (im XRechnung-Profil)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="text-center pt-6 space-y-4">
          <Link href="/tools/viewer" className="btn btn-primary px-8 py-3">
            Beide Formate im Viewer testen →
          </Link>
        </div>
      </div>
    </div>
  );
}
