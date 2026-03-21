// app/api/webhooks/paystack/route.ts
import { createClient } from '@/lib/supabase/server'
import crypto from 'crypto'

export async function POST(req: Request) {
  const body = await req.text()
  const signature = req.headers.get('x-paystack-signature')

  console.log('Webhook received')
  console.log('Signature from Paystack:', signature)

  const hash = crypto
    .createHmac('sha512', process.env.PAYSTACK_SECRET_KEY!)
    .update(body)
    .digest('hex')

  console.log('Hash we computed:', hash)
  console.log('Match:', hash === signature)

  if (hash !== signature) {
    console.log('Signature mismatch — returning 401')
    return new Response('Unauthorized', { status: 401 })
  }

  const event = JSON.parse(body)
  console.log('Event type:', event.event)
  console.log('Metadata:', event.data.metadata)

  if (event.event === 'charge.success') {
    const { apartment_id, payment_id } = event.data.metadata
    const supabase = await createClient()

    const { error: paymentError } = await supabase
      .from('verification_payments')
      .update({
        status: 'paid',
        paystack_reference: event.data.reference
      })
      .eq('id', payment_id)

    console.log('Payment update error:', paymentError)

    const { error: apartmentError } = await supabase
      .from('apartments')
      .update({ verification_status: 'pending_review' })
      .eq('id', apartment_id)

    console.log('Apartment update error:', apartmentError)
  }

  return new Response('OK', { status: 200 })
}