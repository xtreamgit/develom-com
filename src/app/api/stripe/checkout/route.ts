import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

export const dynamic = 'force-dynamic'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
  apiVersion: '2026-04-22.dahlia',
})

const PRICES: Record<string, Record<string, string>> = {
  starter: {
    monthly: process.env.STRIPE_PRICE_STARTER_MONTHLY ?? '',
    annual: process.env.STRIPE_PRICE_STARTER_ANNUAL ?? '',
  },
  growth: {
    monthly: process.env.STRIPE_PRICE_GROWTH_MONTHLY ?? '',
    annual: process.env.STRIPE_PRICE_GROWTH_ANNUAL ?? '',
  },
  enterprise: {
    monthly: process.env.STRIPE_PRICE_ENTERPRISE_MONTHLY ?? '',
    annual: process.env.STRIPE_PRICE_ENTERPRISE_ANNUAL ?? '',
  },
}

export async function POST(req: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: 'Stripe not configured' }, { status: 503 })
  }

  const { plan, billing, email } = await req.json()

  const priceId = PRICES[plan]?.[billing]
  if (!priceId) {
    return NextResponse.json({ error: 'Invalid plan or billing period' }, { status: 400 })
  }

  const origin = req.headers.get('origin') ?? 'https://develom.com'

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: [{ price: priceId, quantity: 1 }],
    customer_email: email || undefined,
    success_url: `${origin}/portal/dashboard?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/pricing`,
    subscription_data: {
      trial_period_days: 14,
      metadata: { plan, billing },
    },
    allow_promotion_codes: true,
  })

  return NextResponse.json({ url: session.url })
}
