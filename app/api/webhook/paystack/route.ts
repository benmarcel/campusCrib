// app/api/webhooks/paystack/route.ts
import {supabaseAdmin} from "@/lib/supabase/admin";
import crypto from "crypto";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("x-paystack-signature");

  console.log("Webhook received");
  console.log("Signature from Paystack:", signature);

  const hash = crypto
    .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY!)
    .update(body)
    .digest("hex");

  console.log("Hash we computed:", hash);
  console.log("Match:", hash === signature);

  if (hash !== signature) {
    console.log("Signature mismatch — returning 401");
    return new Response("Unauthorized", { status: 401 });
  }

  const event = JSON.parse(body);
  console.log("Event type:", event.event);
  console.log("Metadata:", event.data.metadata);

  if (event.event === "charge.success") {
    const { type, apartment_id, payment_id, sender_id, receiver_id, message } =
      event.data.metadata;

    if (type === "apartment_verification") {
      

      const { error: paymentError } = await supabaseAdmin
        .from("verification_payments")
        .update({
          status: "paid",
          paystack_reference: event.data.reference,
        })
        .eq("id", payment_id);

      console.log("Payment update error:", paymentError);

      const { error: apartmentError } = await supabaseAdmin
        .from("apartments")
        .update({ verification_status: "pending_review" })
        .eq("id", apartment_id);

      console.log("Apartment update error:", apartmentError);
    } else if (type === "roommate_request") {
     // Update payment record
  await supabaseAdmin
    .from('roommate_payments')
    .update({ status: 'paid', paystack_reference: event.data.reference })
    .eq('id', payment_id);

  // Now create the actual request
  await supabaseAdmin
    .from('roommate_requests')
    .insert({
      sender_id,
      receiver_id,
      message: message ?? null,
      status: 'pending',
      paystack_reference: event.data.reference,
    })
    }
  }

  return new Response("OK", { status: 200 });
}
