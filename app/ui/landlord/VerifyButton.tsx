"use client";
import { initiateVerificationPayment, verifyPayment } from "@/lib/actions";
import { useTransition, useState } from "react";
import Script from 'next/script'

export default function VerifyButton({ apartmentId }: { apartmentId: string }) {
  const [isPending, startTransition] = useTransition();
  const [paystackReady, setPaystackReady] = useState(false)

  function handlePayment() {
    startTransition(async () => {
      try {
        const { paymentId, email } = await initiateVerificationPayment(apartmentId)

        const handler = (window as any).PaystackPop.setup({
          key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
          email,
          amount: 100000,
          currency: 'NGN',
          metadata: { apartment_id: apartmentId, payment_id: paymentId, type: 'apartment_verification' },
          callback: function(response: any) {
            verifyPayment(response.reference)
            console.log('Payment successful with reference:', response.reference)
          },
          onClose: () => console.log('Payment closed')
        })

        handler.openIframe()
      } catch (error) {
        console.error("Payment initiation failed", error)
      }
    })
  }

  return (
    <>
      <Script
        src="https://js.paystack.co/v1/inline.js"
        strategy="afterInteractive"
        onLoad={() => setPaystackReady(true)}
      />
      <button
        onClick={handlePayment}
        disabled={isPending || !paystackReady}
        className={`flex h-10 items-center justify-center rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors ${
          isPending || !paystackReady
            ? 'bg-gray-400 cursor-not-allowed scale-95'
            : 'bg-primary hover:bg-primary/80 active:scale-95'
        }`}
      >
        {isPending ? "Processing..." : "Verify Apartment"}
      </button>
    </>
  )
}