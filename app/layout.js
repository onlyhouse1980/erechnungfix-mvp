import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'ERechnungFix – XRechnung prüfen, lesen & erstellen',
    template: '%s | ERechnungFix'
  },
  description: 'E-Rechnungen im Browser lesen, strukturell prüfen und XRechnung-XML erstellen. Für Selbstständige und kleine Unternehmen in Deutschland.',
  keywords: ['E-Rechnung', 'XRechnung', 'ZUGFeRD', 'EN 16931', 'E-Rechnung Viewer', 'XRechnung erstellen'],
  openGraph: {
    title: 'ERechnungFix',
    description: 'XRechnung lesen, strukturell prüfen und erstellen – ohne komplizierte Buchhaltungssoftware.',
    type: 'website',
    locale: 'de_DE'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
