function allByLocalName(doc, localName) {
  return Array.from(doc.getElementsByTagName('*')).filter((n) => n.localName === localName);
}

function text(node) {
  return node?.textContent?.trim() || '';
}

function first(docOrNode, localName) {
  return allByLocalName(docOrNode, localName)[0] || null;
}

function descendant(node, localName) {
  if (!node) return '';
  return text(first(node, localName));
}

function number(value) {
  const n = Number(String(value || '').replace(',', '.'));
  return Number.isFinite(n) ? n : null;
}

export function parseInvoiceXml(xml) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, 'application/xml');
  if (doc.querySelector('parsererror')) throw new Error('Die XML-Datei konnte nicht gelesen werden.');

  const root = doc.documentElement;
  const format = root.localName === 'Invoice' ? 'UBL / XRechnung' : root.localName === 'CrossIndustryInvoice' ? 'CII / ZUGFeRD XML' : root.localName;

  let seller = '';
  let buyer = '';
  let invoiceNumber = '';
  let issueDate = '';
  let dueDate = '';
  let currency = '';
  let net = null;
  let tax = null;
  let gross = null;
  let customizationId = '';
  let buyerReference = '';

  if (root.localName === 'Invoice') {
    invoiceNumber = descendant(root, 'ID');
    issueDate = descendant(root, 'IssueDate');
    dueDate = descendant(root, 'DueDate');
    currency = descendant(root, 'DocumentCurrencyCode');
    customizationId = descendant(root, 'CustomizationID');
    buyerReference = descendant(root, 'BuyerReference');

    const supplier = first(root, 'AccountingSupplierParty');
    const customer = first(root, 'AccountingCustomerParty');
    seller = descendant(first(supplier, 'PartyName'), 'Name') || descendant(supplier, 'RegistrationName');
    buyer = descendant(first(customer, 'PartyName'), 'Name') || descendant(customer, 'RegistrationName');

    const legal = first(root, 'LegalMonetaryTotal');
    net = number(descendant(legal, 'TaxExclusiveAmount'));
    gross = number(descendant(legal, 'TaxInclusiveAmount'));
    tax = number(descendant(first(root, 'TaxTotal'), 'TaxAmount'));
  } else {
    const header = first(root, 'ExchangedDocument');
    invoiceNumber = descendant(header, 'ID');
    issueDate = descendant(header, 'DateTimeString');
    currency = descendant(root, 'InvoiceCurrencyCode');
    customizationId = descendant(root, 'ID');

    const parties = allByLocalName(root, 'TradeParty');
    seller = descendant(parties[0], 'Name');
    buyer = descendant(parties[1], 'Name');

    const settlement = first(root, 'SpecifiedTradeSettlementHeaderMonetarySummation');
    net = number(descendant(settlement, 'TaxBasisTotalAmount'));
    tax = number(descendant(settlement, 'TaxTotalAmount'));
    gross = number(descendant(settlement, 'GrandTotalAmount'));
    dueDate = descendant(root, 'DueDateDateTime');
  }

  const data = { format, invoiceNumber, issueDate, dueDate, currency, seller, buyer, net, tax, gross, customizationId, buyerReference };
  return { data, issues: validateStructure(data) };
}

export function validateStructure(data) {
  const issues = [];
  const required = [
    ['invoiceNumber', 'Rechnungsnummer fehlt'],
    ['issueDate', 'Rechnungsdatum fehlt'],
    ['currency', 'Währung fehlt'],
    ['seller', 'Aussteller konnte nicht erkannt werden'],
    ['buyer', 'Rechnungsempfänger konnte nicht erkannt werden']
  ];
  for (const [key, message] of required) if (!data[key]) issues.push({ level: 'error', message });
  if (!data.customizationId) issues.push({ level: 'warning', message: 'Kein eindeutiger Spezifikations-/Customization-Identifier erkannt.' });
  if (data.gross != null && data.net != null && data.tax != null) {
    const delta = Math.abs(data.gross - (data.net + data.tax));
    if (delta > 0.02) issues.push({ level: 'error', message: 'Brutto stimmt nicht mit Netto + Steuer überein.' });
  } else {
    issues.push({ level: 'warning', message: 'Summen konnten nicht vollständig geprüft werden.' });
  }
  return issues;
}
