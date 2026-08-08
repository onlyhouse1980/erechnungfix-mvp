import Stripe from 'stripe';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const sessionId = new URL(request.url).searchParams.get('session_id');
    if (!sessionId || !process.env.STRIPE_SECRET_KEY) return NextResponse.json({ paid: false });
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2026-02-25.clover' });
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const paid = session.payment_status === 'paid' && session.metadata?.product === 'xrechnung_export';
    return NextResponse.json({ paid });
  } catch {
    return NextResponse.json({ paid: false });
  }
}
