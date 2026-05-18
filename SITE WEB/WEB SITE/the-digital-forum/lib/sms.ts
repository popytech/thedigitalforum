// eslint-disable-next-line @typescript-eslint/no-require-imports
const AfricasTalking = require('africastalking')

function getClient() {
  const apiKey = process.env.AT_API_KEY
  const username = process.env.AT_USERNAME

  if (!apiKey || !username) {
    throw new Error('Africa\'s Talking : AT_API_KEY ou AT_USERNAME manquant dans .env.local')
  }

  const at = AfricasTalking({ apiKey, username })
  return at.SMS
}

interface SendSMSOptions {
  to: string | string[]
  message: string
  from?: string
}

export async function sendSMS({ to, message, from }: SendSMSOptions) {
  const sms = getClient()
  const senderId = from ?? process.env.AT_SENDER_ID ?? undefined

  const recipients = Array.isArray(to) ? to : [to]

  const result = await sms.send({
    to: recipients,
    message,
    ...(senderId ? { from: senderId } : {}),
  })

  return result
}

export function buildConfirmationSMS(prenom: string, edition: string, qrCode: string): string {
  return [
    `Bonjour ${prenom} !`,
    `✅ Inscription confirmée — ${edition}`,
    `The Digital Forum · Conakry, Guinée`,
    `Votre code QR : ${qrCode.slice(0, 8).toUpperCase()}`,
    `Présentez-le le jour J pour accéder à l'événement.`,
    `#TheDigitalForum`,
  ].join('\n')
}

export function buildReminderSMS(prenom: string, edition: string, date: string): string {
  return [
    `Rappel The Digital Forum 📅`,
    `Bonjour ${prenom}, l'édition "${edition}" c'est ${date} !`,
    `Lieu : À confirmer · Conakry, Guinée`,
    `Heure : 11h00 – 15h00`,
    `N'oubliez pas votre QR code d'accès.`,
  ].join('\n')
}
