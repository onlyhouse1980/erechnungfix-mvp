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
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': 'https://erechnungfix-mvp.vercel.app/#webapp',
        'name': 'ERechnungFix',
        'url': 'https://erechnungfix-mvp.vercel.app',
        'applicationCategory': 'BusinessApplication',
        'operatingSystem': 'All',
        'browserRequirements': 'Requires JavaScript. Requires HTML5.',
        'offers': {
          '@type': 'Offer',
          'price': '0',
          'priceCurrency': 'EUR'
        },
        'description': 'Kostenloser online XRechnung & ZUGFeRD Viewer, Validator und UBL XML Generator für deutsche Unternehmen.'
      },
      {
        '@type': 'FAQPage',
        'mainEntity': [
          {
            '@type': 'Question',
            'name': 'Was ist die E-Rechnungspflicht 2025 in Deutschland?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Ab dem 1. Januar 2025 müssen deutsche B2B-Unternehmen in der Lage sein, elektronische Rechnungen (XRechnung, ZUGFeRD) nach EN 16931 zu empfangen und zu verarbeiten.'
            }
          },
          {
            '@type': 'Question',
            'name': 'Kann ich XRechnung XML-Dateien kostenlos prüfen?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Ja! Mit ERechnungFix können Sie XRechnung und ZUGFeRD XML-Dateien direkt im Browser kostenlos öffnen, lesen und auf EN 16931 Konformität prüfen.'
            }
          }
        ]
      }
    ]
  };

  return (
    <html lang="de">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
