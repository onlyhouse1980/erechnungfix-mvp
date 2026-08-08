import Stripe from 'stripe';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) return NextResponse.json({ error: 'STRIPE_SECRET_KEY fehlt.' }, { status: 500 });
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2026-02-25.clover' });
    const body = await request.json();
    const site = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    if (body.product === 'export') {
      if (!process.env.STRIPE_PRICE_EXPORT) return NextResponse.json({ error: 'STRIPE_PRICE_EXPORT fehlt.' }, { status: 500 });
      const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        line_items: [{ price: process.env.STRIPE_PRICE_EXPORT, quantity: 1 }],
        success_url: `${site}/tools/generator?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${site}/tools/generator`,
        allow_promotion_codes: true,
        billing_address_collection: 'auto',
        metadata: { product: 'xrechnung_export' }
      });
      return NextResponse.json({ url: session.url });
    }

    if (body.product === 'pro') {
      if (!process.env.STRIPE_PRICE_PRO) return NextResponse.json({ error: 'STRIPE_PRICE_PRO fehlt.' }, { status: 500 });
      const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        line_items: [{ price: process.env.STRIPE_PRICE_PRO, quantity: 1 }],
        success_url: `${site}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${site}/pricing`,
        allow_promotion_codes: true
      });
      return NextResponse.json({ url: session.url });
    }

    return NextResponse.json({ error: 'Unbekanntes Produkt.' }, { status: 400 });
  } catch (e) {
    return NextResponse.json({ error: e.message || 'Checkout-Fehler' }, { status: 500 });
  }
}
