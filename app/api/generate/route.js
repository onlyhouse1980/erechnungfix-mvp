import Stripe from 'stripe';
import { Decimal } from 'decimal.js';
import { serializeToUbl, validateUblXml, InvoiceType, TaxCategoryCode } from '@lucaapp/zugferd-ts';
import { NextResponse } from 'next/server';

async function verifyPaidSession(sessionId) {
  if (!sessionId || !process.env.STRIPE_SECRET_KEY) return false;
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2026-02-25.clover' });
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  return session.payment_status === 'paid' && session.metadata?.product === 'xrechnung_export';
}

function required(data, fields) {
  return fields.filter((key) => !String(data[key] || '').trim());
}

export async function POST(request) {
  try {
    const { sessionId, invoice: data } = await request.json();
    if (!(await verifyPaidSession(sessionId))) {
      return NextResponse.json({ error: 'Kein gültiger bezahlter Export gefunden.' }, { status: 402 });
    }

    const missing = required(data, [
      'invoiceNumber','issueDate','dueDate','sellerName','sellerVatId','sellerEmail','sellerStreet','sellerPostal','sellerCity','iban',
      'buyerName','buyerEmail','buyerStreet','buyerPostal','buyerCity','itemName','quantity','unitPrice','vatRate'
    ]);
    if (missing.length) return NextResponse.json({ error: `Pflichtfelder fehlen: ${missing.join(', ')}` }, { status: 400 });

    const quantity = new Decimal(String(data.quantity));
    const unitPrice = new Decimal(String(data.unitPrice));
    const vatRate = new Decimal(String(data.vatRate));
    const net = quantity.mul(unitPrice);
    const tax = net.mul(vatRate).div(100);

    const invoice = {
      header: {
        id: data.invoiceNumber,
        typeCode: InvoiceType.INVOICE,
        issueDate: new Date(`${data.issueDate}T00:00:00Z`),
        deliveryDate: new Date(`${data.issueDate}T00:00:00Z`),
        currency: 'EUR'
      },
      seller: {
        name: data.sellerName,
        address: { street: data.sellerStreet, city: data.sellerCity, zip: data.sellerPostal, countryCode: 'DE' },
        vatId: data.sellerVatId,
        electronicAddress: { value: data.sellerEmail, scheme: 'EM' }
      },
      buyer: {
        name: data.buyerName,
        address: { street: data.buyerStreet, city: data.buyerCity, zip: data.buyerPostal, countryCode: 'DE' },
        ...(data.buyerVatId ? { vatId: data.buyerVatId } : {}),
        electronicAddress: { value: data.buyerEmail, scheme: 'EM' }
      },
      lines: [{
        id: '1',
        product: { name: data.itemName, unitCode: 'C62', vatCategoryCode: TaxCategoryCode.S, vatRatePercent: vatRate },
        quantity,
        unitPrice
      }],
      taxBreakdowns: [{
        categoryCode: TaxCategoryCode.S,
        ratePercent: vatRate,
        basisAmount: net,
        calculatedAmount: tax
      }],
      paymentMeans: { typeCode: '30', payeeIban: data.iban },
      paymentTerms: { description: `Zahlbar bis ${data.dueDate}`, dueDate: new Date(`${data.dueDate}T00:00:00Z`) }
    };

    const xml = serializeToUbl(invoice);
    const validation = await validateUblXml(xml);
    if (!validation.valid) {
      return NextResponse.json({ error: 'Der Server-Validator hat den Export abgelehnt.', issues: validation.issues || [] }, { status: 422 });
    }

    return NextResponse.json({ xml, issues: validation.issues || [] });
  } catch (e) {
    return NextResponse.json({ error: e.message || 'Export konnte nicht erzeugt werden.' }, { status: 500 });
  }
}
