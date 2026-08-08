export const metadata = { title: 'Datenschutz' };

export default function Page() {
  return (
    <section className="tool-page shell legal">
      <h1>Datenschutzerklärung</h1>
      
      <h2>1. Datenschutz auf einen Blick</h2>
      <p>
        Der Schutz Ihrer persönlichen Daten ist uns ein wichtiges Anliegen. Nachfolgend informieren wir Sie über die Erhebung, Verarbeitung und Nutzung personenbezogener Daten bei der Nutzung unserer Website.
      </p>

      <h2>2. Lokale Dateiverarbeitung</h2>
      <p>
        Unsere E-Rechnungs-Tools (z. B. XML-Viewer) verarbeiten ausgewählte Dateien direkt und lokal in Ihrem Browser. Ihre Rechnungsdateien werden dabei nicht dauerhaft auf unseren Servern gespeichert.
      </p>

      <h2>3. Hosting (Vercel) & Server-Logfiles</h2>
      <p>
        Wir hosten unsere Website bei dem Anbieter <strong>Vercel Inc.</strong>, 440 N Barranca Ave #4133, Covina, CA 91723, USA („Vercel“).
      </p>
      <p>
        Beim Aufruf unserer Website erfasst Vercel automatisch Informationen in sogenannten Server-Logfiles, die Ihr Browser automatisch an Vercel übermittelt. Dazu gehören:
      </p>
      <ul>
        <li>IP-Adresse des zugreifenden Geräts</li>
        <li>Datum und Uhrzeit des Zugriffs</li>
        <li>Name und URL der abgerufenen Seite oder Datei</li>
        <li>Referrer-URL (die zuvor besuchte Seite)</li>
        <li>Verwendeter Browser, Betriebssystem und HTTP-Header</li>
      </ul>
      <p>
        Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Das berechtigte Interesse liegt in der technisch fehlerfreien Bereitstellung, Ausfallsicherheit und Absicherung unserer Website. Server-Logfiles werden von Vercel zur Gewährleistung der Sicherheit und Analyse der Systemstabilität temporär gespeichert und anschließend automatisch gelöscht.
      </p>

      <h2>4. Zahlungsabwicklung (Stripe)</h2>
      <p>
        Für kostenpflichtige Funktionen nutzen wir den Zahlungsdienstleister <strong>Stripe Payments Europe, Ltd.</strong>, 1 Grand Canal Street Lower, Grand Canal Dock, Dublin, Irland.
      </p>
      <p>
        Im Rahmen der Zahlungsabwicklung werden die von Ihnen angegebenen Zahlungsdaten sowie Informationen über die Transaktion an Stripe übermittelt. Die Übermittlung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung).
      </p>

      <h2>5. Ihre Rechte</h2>
      <p>
        Sie haben jederzeit das Recht auf Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung sowie ein Recht auf Berichtigung oder Löschung dieser Daten.
      </p>
    </section>
  );
}

