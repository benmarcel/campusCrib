import { Resend } from 'resend'
import { RoommateRequestEmail } from '@/app/emails/RoommateRequestEmail'
import { RoommateResponseEmail } from '@/app/emails/RoommateResponseEmail'

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM = process.env.RESEND_FROM_EMAIL!
const BASE_URL = process.env.NEXT_PUBLIC_APP_URL! // e.g. https://campuscrib.com

export async function sendRoommateRequestEmail({
  receiverEmail,
  receiverName,
  senderName,
  senderSchool,
  senderDepartment,
  senderBio,
}: {
  receiverEmail: string
  receiverName: string
  senderName: string
  senderSchool: string
  senderDepartment?: string
  senderBio?: string
}) {
  await resend.emails.send({
    from: `Campus Crib <${FROM}>`,
    to: receiverEmail,
    subject: `${senderName} wants to room with you 🏠`,
    html: RoommateRequestEmail({
      receiverName,
      senderName,
      senderSchool,
      senderDepartment,
      senderBio,
      requestsUrl: `${BASE_URL}/roommate/requests?tab=incoming`,
    }),
  })
}

export async function sendRoommateResponseEmail({
  senderEmail,
  senderName,
  receiverName,
  receiverPhone,
  receiverId,
  status,
}: {
  senderEmail: string
  senderName: string
  receiverName: string
  receiverPhone?: string
  receiverId: string
  status: 'accepted' | 'declined'
}) {
  await resend.emails.send({
    from: `Campus Crib <${FROM}>`,
    to: senderEmail,
    subject: status === 'accepted'
      ? `${receiverName} accepted your roommate request! 🎉`
      : `Update on your roommate request`,
    html: RoommateResponseEmail({
      senderName,
      receiverName,
      receiverPhone,
      status,
      requestsUrl: `${BASE_URL}/roommate/requests?tab=outgoing`,
      profileUrl: `${BASE_URL}/roommate/${receiverId}`,
    }),
  })
}