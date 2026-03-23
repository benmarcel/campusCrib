'use client'

import { useState, useTransition } from 'react'
import Script from 'next/script'
import { initiateRoommatePayment, confirmRoommatePayment } from '@/lib/actions'
import { UserPlus, Loader2 } from 'lucide-react'

type Props = {
  receiverId: string
  receiverName: string
}

export default function ConnectButton({ receiverId, receiverName }: Props) {
  const [isPending, startTransition] = useTransition()
  const [paystackReady, setPaystackReady] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function handleConnect() {
    setError(null)
    startTransition(async () => {
      try {
        const { paymentId, email, senderId } = await initiateRoommatePayment(receiverId)

        const handler = (window as any).PaystackPop.setup({
          key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
          email,
          amount: 20000, // ₦200 in kobo
          currency: 'NGN',
          metadata: {
            type: 'roommate_request',
            payment_id: paymentId,
            sender_id: senderId,
            receiver_id: receiverId,
            message: `Payment for roommate request from user ${senderId} to user ${receiverId}`,
          },
          callback: function (response: any) {
            // Webhook handles the DB update
            confirmRoommatePayment(response.reference, paymentId, senderId, receiverId)
            // Refresh the page to show pending status
            window.location.reload()
          },
          onClose: function () {
            console.log('Payment closed')
          },
        })

        handler.openIframe()
      } catch (e: any) {
        setError(e.message ?? 'Something went wrong. Please try again.')
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
        onClick={handleConnect}
        disabled={isPending || !paystackReady}
        className={`w-full flex items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold text-white transition-all ${
          isPending || !paystackReady
            ? 'bg-slate-300 cursor-not-allowed'
            : 'bg-accent hover:bg-accent/90 active:scale-95'
        }`}
      >
        {isPending ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Preparing payment...
          </>
        ) : (
          <>
            <UserPlus size={16} />
            Connect with {receiverName?.split(' ')[0]} · ₦200
          </>
        )}
      </button>

      {error && (
        <div className="rounded-xl bg-red-50 border border-red-100 px-4 py-3">
          <p className="text-xs text-red-600 font-medium text-center">{error}</p>
        </div>
      )}
    </>
  )
}