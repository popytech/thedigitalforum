import nodemailer from 'nodemailer'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://thedigitalforum.gn'

function createTransporter() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  })
}

// ─── Template HTML confirmation ───────────────────────────────────────────────
function buildConfirmationHTML(data: {
  prenom: string
  nom: string
  edition: string
  theme: string
  date: string
  lieu: string
  qrCode: string
}): string {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Inscription confirmée — The Digital Forum</title>
</head>
<body style="margin:0;padding:0;background:#0A1810;font-family:'Helvetica Neue',Arial,sans-serif;">
  <div style="max-width:580px;margin:0 auto;padding:32px 16px;">

    <div style="background:#0D2218;border:1px solid rgba(27,107,58,0.3);border-radius:16px;overflow:hidden;margin-bottom:24px;">
      <div style="height:4px;background:linear-gradient(90deg,#1B6B3A,#A8FF78,#27AE60);"></div>
      <div style="padding:32px;text-align:center;">
        <div style="font-size:48px;margin-bottom:8px;">✅</div>
        <h1 style="color:#FFFFFF;font-size:28px;font-weight:900;letter-spacing:2px;text-transform:uppercase;margin:0 0 8px;">
          Inscription confirmée !
        </h1>
        <p style="color:#A8FF78;font-size:13px;letter-spacing:3px;text-transform:uppercase;margin:0;">
          The Digital Forum
        </p>
      </div>
    </div>

    <div style="background:#0D2218;border:1px solid rgba(27,107,58,0.2);border-radius:12px;padding:24px;margin-bottom:20px;">
      <p style="color:#E2E8F0;font-size:16px;margin:0 0 12px;">
        Bonjour <strong style="color:#FFFFFF;">${data.prenom} ${data.nom}</strong>,
      </p>
      <p style="color:#94A3B8;font-size:14px;line-height:1.7;margin:0;">
        Votre inscription à <strong style="color:#A8FF78;">${data.edition}</strong> est bien confirmée.
        Édition dédiée à :
      </p>
      <div style="margin:16px 0;padding:16px;background:rgba(27,107,58,0.15);border-left:3px solid #A8FF78;border-radius:4px;">
        <p style="color:#FFFFFF;font-size:16px;font-weight:700;margin:0;">"${data.theme}"</p>
      </div>
    </div>

    <div style="background:#0D2218;border:1px solid rgba(27,107,58,0.2);border-radius:12px;padding:24px;margin-bottom:20px;">
      <h2 style="color:#A8FF78;font-size:12px;letter-spacing:3px;text-transform:uppercase;margin:0 0 16px;">Informations pratiques</h2>
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="padding:8px 0;border-bottom:1px solid rgba(27,107,58,0.15);">
            <span style="color:#64748B;font-size:12px;text-transform:uppercase;">📅 Date</span>
          </td>
          <td style="padding:8px 0;border-bottom:1px solid rgba(27,107,58,0.15);text-align:right;">
            <span style="color:#E2E8F0;font-size:14px;">${data.date}</span>
          </td>
        </tr>
        <tr>
          <td style="padding:8px 0;border-bottom:1px solid rgba(27,107,58,0.15);">
            <span style="color:#64748B;font-size:12px;text-transform:uppercase;">🕐 Heure</span>
          </td>
          <td style="padding:8px 0;border-bottom:1px solid rgba(27,107,58,0.15);text-align:right;">
            <span style="color:#E2E8F0;font-size:14px;">11h00 – 15h00</span>
          </td>
        </tr>
        <tr>
          <td style="padding:8px 0;">
            <span style="color:#64748B;font-size:12px;text-transform:uppercase;">📍 Lieu</span>
          </td>
          <td style="padding:8px 0;text-align:right;">
            <span style="color:#E2E8F0;font-size:14px;">${data.lieu}</span>
          </td>
        </tr>
      </table>
    </div>

    <div style="background:#0D2218;border:1px solid rgba(168,255,120,0.2);border-radius:12px;padding:24px;margin-bottom:20px;text-align:center;">
      <h2 style="color:#A8FF78;font-size:12px;letter-spacing:3px;text-transform:uppercase;margin:0 0 12px;">Votre code d'accès</h2>
      <div style="background:#FFFFFF;border-radius:8px;padding:16px;display:inline-block;margin-bottom:12px;">
        <p style="color:#0A1810;font-family:monospace;font-size:20px;font-weight:700;margin:0;letter-spacing:4px;">
          ${data.qrCode.slice(0, 8).toUpperCase()}
        </p>
      </div>
      <p style="color:#64748B;font-size:12px;margin:0 0 16px;">Présentez ce code le jour J pour confirmer votre présence.</p>
      <a href="${APP_URL}/confirmation?qr=${data.qrCode}&nom=${encodeURIComponent(data.prenom + ' ' + data.nom)}"
         style="display:inline-block;padding:10px 24px;background:#1B6B3A;color:#FFFFFF;text-decoration:none;border-radius:8px;font-size:13px;font-weight:700;letter-spacing:1px;text-transform:uppercase;">
        Voir mon QR Code →
      </a>
    </div>

    <div style="text-align:center;padding:16px;">
      <p style="color:#334155;font-size:12px;margin:0 0 8px;">The Digital Forum · Popy Tech Agency · Conakry, Guinée</p>
      <p style="color:#1E3A2F;font-size:11px;margin:0;">#TheDigitalForum #PopyTech #DigitalAfrique</p>
    </div>

  </div>
</body>
</html>`
}

// ─── Envoi email de confirmation ──────────────────────────────────────────────
export async function sendConfirmationEmail(data: {
  to: string
  prenom: string
  nom: string
  edition: string
  theme: string
  date: string
  lieu: string
  qrCode: string
}) {
  const transporter = createTransporter()
  await transporter.sendMail({
    from: `"The Digital Forum" <${process.env.GMAIL_USER}>`,
    to: data.to,
    subject: `✅ Inscription confirmée — ${data.edition} · The Digital Forum`,
    html: buildConfirmationHTML(data),
  })
}

// ─── Notification admin (inscription) ────────────────────────────────────────
export async function sendAdminInscriptionNotif(data: {
  prenom: string; nom: string; email: string; telephone: string
  ville: string; statut_pro: string; edition: string
}) {
  const transporter = createTransporter()
  const admin = process.env.ADMIN_EMAIL ?? process.env.GMAIL_USER
  await transporter.sendMail({
    from: `"The Digital Forum" <${process.env.GMAIL_USER}>`,
    to: admin,
    subject: `🆕 Nouvelle inscription — ${data.prenom} ${data.nom} · ${data.edition}`,
    html: `<div style="font-family:Arial,sans-serif;padding:24px;background:#0A1810;color:#E2E8F0;">
      <h2 style="color:#A8FF78;">🆕 Nouvelle inscription</h2>
      <table style="border-collapse:collapse;width:100%;max-width:500px;">
        ${[
          ['Nom', `${data.prenom} ${data.nom}`],
          ['Email', data.email],
          ['Téléphone', data.telephone],
          ['Ville', data.ville],
          ['Statut', data.statut_pro],
          ['Édition', data.edition],
        ].map(([k,v]) => `<tr><td style="padding:6px 12px 6px 0;color:#64748B;font-size:13px;">${k}</td>
          <td style="padding:6px 0;color:#fff;font-size:13px;font-weight:600;">${v}</td></tr>`).join('')}
      </table>
    </div>`,
  })
}

// ─── Contact form ─────────────────────────────────────────────────────────────
export async function sendContactEmails(data: {
  nom: string; email: string; telephone: string; objet: string; message: string
}) {
  const transporter = createTransporter()
  const admin = process.env.ADMIN_EMAIL ?? process.env.GMAIL_USER
  const base = `"The Digital Forum" <${process.env.GMAIL_USER}>`

  await Promise.all([
    // Notification admin
    transporter.sendMail({
      from: base, to: admin,
      subject: `📩 Nouveau message — ${data.objet} · ${data.nom}`,
      html: `<div style="font-family:Arial,sans-serif;padding:24px;background:#0A1810;color:#E2E8F0;">
        <h2 style="color:#A8FF78;">📩 Nouveau message de contact</h2>
        <p><strong>Objet :</strong> ${data.objet}</p>
        <p><strong>De :</strong> ${data.nom} — ${data.email} — ${data.telephone}</p>
        <hr style="border-color:#1B6B3A;margin:16px 0;"/>
        <p style="white-space:pre-wrap;">${data.message}</p>
      </div>`,
    }),
    // Confirmation à l'expéditeur
    transporter.sendMail({
      from: base, to: data.email,
      subject: `✅ Message reçu — The Digital Forum`,
      html: `<div style="font-family:Arial,sans-serif;padding:24px;background:#0A1810;color:#E2E8F0;">
        <h2 style="color:#A8FF78;">Bonjour ${data.nom},</h2>
        <p>Votre message a bien été reçu. Nous vous répondrons dans les <strong style="color:#A8FF78;">24h</strong>.</p>
        <div style="background:#0D2218;border-left:3px solid #A8FF78;padding:12px 16px;border-radius:4px;margin:16px 0;">
          <p style="color:#94A3B8;font-size:13px;margin:0;white-space:pre-wrap;">${data.message}</p>
        </div>
        <p style="color:#64748B;font-size:12px;">The Digital Forum · Popy Tech Agency · Conakry, Guinée</p>
      </div>`,
    }),
  ])
}

// ─── Sponsor form ─────────────────────────────────────────────────────────────
export async function sendSponsorEmails(data: {
  nom: string; entreprise: string; pack: string; telephone: string; message: string
}) {
  const transporter = createTransporter()
  const admin = process.env.ADMIN_EMAIL ?? process.env.GMAIL_USER
  const base = `"The Digital Forum" <${process.env.GMAIL_USER}>`
  const packLabel: Record<string, string> = {
    bronze: 'Bronze — 500 000 GNF', argent: 'Argent — 1 000 000 GNF',
    or: 'Or — 2 000 000 GNF', officiel: 'Partenaire Officiel — Sur devis',
  }

  await Promise.all([
    transporter.sendMail({
      from: base, to: admin,
      subject: `🤝 Demande sponsor — ${data.entreprise} · Pack ${data.pack.toUpperCase()}`,
      html: `<div style="font-family:Arial,sans-serif;padding:24px;background:#0A1810;color:#E2E8F0;">
        <h2 style="color:#FFD700;">🤝 Nouvelle demande de sponsoring</h2>
        ${[['Contact', data.nom], ['Entreprise', data.entreprise],
           ['Pack', packLabel[data.pack] ?? data.pack], ['Téléphone', data.telephone]]
          .map(([k,v]) => `<p><strong style="color:#A8FF78;">${k} :</strong> ${v}</p>`).join('')}
        <hr style="border-color:#1B6B3A;margin:16px 0;"/>
        <p style="white-space:pre-wrap;">${data.message}</p>
      </div>`,
    }),
    transporter.sendMail({
      from: base, to: process.env.GMAIL_USER!,
      subject: `✅ Demande de partenariat reçue — The Digital Forum`,
      html: `<div style="font-family:Arial,sans-serif;padding:24px;background:#0A1810;color:#E2E8F0;">
        <h2 style="color:#A8FF78;">Bonjour ${data.nom},</h2>
        <p>Votre demande de partenariat <strong style="color:#FFD700;">Pack ${(packLabel[data.pack] ?? data.pack)}</strong> a bien été reçue.</p>
        <p>L'équipe The Digital Forum vous contactera dans les <strong style="color:#A8FF78;">24h</strong> pour discuter des modalités.</p>
        <p style="color:#64748B;font-size:12px;">The Digital Forum · Popy Tech Agency · Conakry, Guinée</p>
      </div>`,
    }),
  ])
}

// ─── Newsletter ───────────────────────────────────────────────────────────────
export async function sendNewsletterConfirmation(email: string) {
  const transporter = createTransporter()
  await transporter.sendMail({
    from: `"The Digital Forum" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: `🎉 Bienvenue dans la communauté The Digital Forum !`,
    html: `<div style="font-family:Arial,sans-serif;padding:24px;background:#0A1810;color:#E2E8F0;text-align:center;">
      <h2 style="color:#A8FF78;">Vous êtes abonné(e) ! 🎉</h2>
      <p>Vous recevrez en avant-première toutes les annonces, speakers et infos pratiques de <strong>The Digital Forum</strong>.</p>
      <p style="color:#64748B;font-size:12px;margin-top:24px;">The Digital Forum · Popy Tech Agency · Conakry, Guinée</p>
    </div>`,
  })
}

// ─── Envoi email de rappel ────────────────────────────────────────────────────
export async function sendReminderEmail(data: {
  to: string
  prenom: string
  edition: string
  date: string
  joursRestants: number
}) {
  const transporter = createTransporter()
  await transporter.sendMail({
    from: `"The Digital Forum" <${process.env.GMAIL_USER}>`,
    to: data.to,
    subject: `📅 Rappel J-${data.joursRestants} — ${data.edition} · The Digital Forum`,
    html: `
      <div style="background:#0A1810;padding:32px;font-family:Arial,sans-serif;color:#E2E8F0;">
        <h2 style="color:#A8FF78;">📅 Rappel — J-${data.joursRestants}</h2>
        <p>Bonjour <strong>${data.prenom}</strong>,</p>
        <p>L'édition <strong>${data.edition}</strong> approche : rendez-vous le <strong>${data.date}</strong> !</p>
        <p style="color:#94A3B8;">Heure : 11h00 – 15h00 · Conakry, Guinée</p>
        <p>N'oubliez pas votre code d'accès.</p>
        <p style="color:#64748B;font-size:12px;">The Digital Forum · Popy Tech Agency</p>
      </div>
    `,
  })
}
