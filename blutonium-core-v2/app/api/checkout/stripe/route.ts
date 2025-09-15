import Stripe from 'stripe'
import { NextResponse } from 'next/server'

// Stelle die aktuelle API-Version ein:
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-08-27.basil'
} as any)


export async function POST(req: Request){
  const { items, customerEmail } = await req.json()
  const session = await stripe.checkout.sessions.create({
    mode:'payment',
    customer_email: customerEmail,
    automatic_tax:{ enabled:true },
    billing_address_collection:'required',
    shipping_address_collection:{ allowed_countries:['AT','DE','CH','BE','NL','FR','IT','ES','PL','CZ','DK','SE','NO','GB','US','CA','AU'] },
    tax_id_collection:{ enabled:true },
    shipping_options:[
      { shipping_rate: process.env.STRIPE_RATE_EU_STANDARD! },
      { shipping_rate: process.env.STRIPE_RATE_WORLD! }
    ],
    line_items: (items||[]).map((i:any)=>({ price:i.priceId, quantity:i.quantity })),
    success_url: `${process.env.SITE_URL}/shop/success?sid={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.SITE_URL}/shop/cart`,
  })
  return NextResponse.json({ url: session.url })
}
