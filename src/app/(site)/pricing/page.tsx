import type { Metadata } from 'next'
import PricingClient from './PricingClient'

export const metadata: Metadata = {
  title: 'Platform Pricing — Develom',
  description:
    'Provision AI solutions for your clients through Develom\'s partner platform. Transparent pricing, 14-day free trial, cancel any time.',
}

export default function PricingPage() {
  return <PricingClient />
}
