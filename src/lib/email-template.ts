// Shared branded transactional email template for Kallmi Estate.
// Renders an email-client-safe (table-based, inline styles, hex colors only)
// HTML document AND a clean plain-text equivalent. Plain-text parity matters
// for deliverability / spam scoring, so both parts are always produced.

export interface EmailDetailRow {
  label: string
  value: string
}

export interface EmailModel {
  /** Hidden inbox-preview text. */
  preheader: string
  /** Small uppercase label above the title, e.g. "Kallmi Restaurant". */
  eyebrow: string
  /** Serif title, e.g. "Reservation Request Received". */
  title: string
  /** e.g. "Dear Jody," */
  greeting?: string
  /** One short intro paragraph. Plain text — escaped before rendering. */
  intro?: string
  /**
   * Intro paragraph containing trusted inline HTML (e.g. <strong>). Overrides
   * `intro` and is rendered raw, so pass ONLY developer-controlled static
   * strings here — never user input.
   */
  introHtml?: string
  /** Detail block rendered as a flat, full-width hairline-divided table. */
  details?: { heading: string; rows: EmailDetailRow[] }
  /** A single big emphasized value, e.g. a deposit amount "€120". */
  highlight?: { label: string; value: string }
  /** A single solid olive bulletproof button. */
  cta?: { label: string; href: string }
  /** Closing paragraph. Plain text — escaped before rendering. */
  outro?: string
  /**
   * Closing paragraph containing trusted inline HTML (e.g. <strong>, <br>).
   * Overrides `outro` and is rendered raw — developer-controlled strings only.
   */
  outroHtml?: string
  /** e.g. "The Kallmi Restaurant Team". */
  signature?: string
  /** Footer wordmark, e.g. "KALLMI ESTATE". Defaults to "KALLMI ESTATE". */
  footerWordmark?: string
  /** When true, append the anti-phishing "why you got this" trust line. */
  showTrustLine?: boolean
}

// Brand palette
const C = {
  page: '#f5f0eb',
  card: '#ffffff',
  panel: '#faf8f5',
  hairline: '#ece6dd',
  olive: '#8B7355',
  deepOlive: '#6B563F',
  gold: '#D4AF37',
  body: '#4a4a4a',
  muted: '#999999',
  heading: '#333333',
}

const FONT = "Georgia, 'Times New Roman', serif"

const ADDRESS = 'Rruga Currila, Durrës, Albania'
const SITE_URL = 'https://www.kallmibukur.al'
const SITE_LABEL = 'www.kallmibukur.al'
const CONTACT_EMAIL = 'reservations@kallmibukur.al'
const CONTACT_PHONE = '+355 68 24 50 851'
const TRUST_LINE =
  "You're receiving this email because a reservation was submitted at kallmibukur.al."

/** Escape text destined for an HTML text node / attribute. */
function esc(input: string): string {
  return String(input)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/** Strip tags + decode the few entities we use, for plain-text rendering. */
function toText(input: string): string {
  return String(input)
    .replace(/<br\s*\/?>(\s*)/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&euro;/g, '€')
    .replace(/&middot;/g, '·')
    .replace(/&rarr;/g, '→')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, ' ')
    .trim()
}

export function renderEmail(model: EmailModel): { html: string; text: string } {
  const wordmark = model.footerWordmark || 'KALLMI ESTATE'

  // ---- HTML body sections ----

  const greetingHtml = model.greeting
    ? `<tr><td style="padding:36px 40px 0;font-family:${FONT};">
         <p style="margin:0;font-size:18px;color:${C.olive};line-height:1.4;">${esc(
           model.greeting
         )}</p>
       </td></tr>`
    : ''

  // introHtml is trusted/raw; intro is user-facing text and is always escaped.
  const introContent = model.introHtml ?? (model.intro ? esc(model.intro) : '')
  const introHtml = introContent
    ? `<tr><td style="padding:${
        model.greeting ? '14px' : '36px'
      } 40px 8px;font-family:${FONT};">
       <p style="margin:0;font-size:15px;color:${C.body};line-height:1.7;">${introContent}</p>
     </td></tr>`
    : ''

  let detailsHtml = ''
  if (model.details && model.details.rows.length) {
    const rows = model.details.rows
      .map((r, i) => {
        const border =
          i < model.details!.rows.length - 1
            ? `border-bottom:1px solid ${C.hairline};`
            : ''
        return `<tr><td style="padding:14px 0 12px;${border}font-family:${FONT};">
            <div style="font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:${C.olive};">${esc(
              r.label
            )}</div>
            <div style="margin-top:5px;font-size:15px;color:${C.heading};line-height:1.5;">${esc(
              r.value
            )}</div>
          </td></tr>`
      })
      .join('')

    detailsHtml = `<tr><td style="padding:24px 40px 8px;font-family:${FONT};">
         <div style="font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:${C.olive};padding-bottom:10px;border-bottom:1px solid ${C.hairline};">${esc(
      model.details.heading
    )}</div>
         <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">${rows}</table>
       </td></tr>`
  }

  const highlightHtml = model.highlight
    ? `<tr><td style="padding:28px 40px 8px;font-family:${FONT};">
         <div style="font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:${C.olive};">${esc(
           model.highlight.label
         )}</div>
         <div style="margin-top:6px;font-size:28px;color:${C.deepOlive};line-height:1.2;">${esc(
        model.highlight.value
      )}</div>
       </td></tr>`
    : ''

  const ctaHtml = model.cta
    ? `<tr><td style="padding:28px 40px 8px;font-family:${FONT};">
         <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
           <tr><td style="background-color:${C.olive};border-radius:6px;">
             <a href="${esc(
               model.cta.href
             )}" style="display:inline-block;padding:14px 34px;font-family:${FONT};font-size:14px;letter-spacing:1px;color:#ffffff;text-decoration:none;">${esc(
        model.cta.label
      )}</a>
           </td></tr>
         </table>
       </td></tr>`
    : ''

  // outroHtml is trusted/raw; outro is escaped.
  const outroContent = model.outroHtml ?? (model.outro ? esc(model.outro) : '')
  const outroHtml = outroContent
    ? `<tr><td style="padding:28px 40px 0;font-family:${FONT};">
         <p style="margin:0;font-size:15px;color:${C.body};line-height:1.7;">${outroContent}</p>
       </td></tr>`
    : ''

  const signatureHtml = model.signature
    ? `<tr><td style="padding:24px 40px 0;font-family:${FONT};">
         <p style="margin:0;font-size:15px;color:${C.heading};line-height:1.6;">Warm regards,<br><strong style="color:${C.olive};">${esc(
        model.signature
      )}</strong></p>
       </td></tr>`
    : ''

  const trustLineHtml = model.showTrustLine
    ? `<p style="margin:14px 0 0;font-size:11px;color:${C.muted};line-height:1.6;font-family:${FONT};">${esc(
        TRUST_LINE
      )}</p>`
    : ''

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="x-apple-disable-message-reformatting">
<title>${esc(model.title)}</title>
</head>
<body style="margin:0;padding:0;background-color:${C.page};font-family:${FONT};">
<span style="display:none;font-size:0;line-height:0;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;color:transparent;">${esc(
    model.preheader
  )}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${C.page};">
  <tr><td align="center" style="padding:40px 16px;">
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;background-color:${C.card};border:1px solid ${C.hairline};border-radius:4px;border-collapse:separate;">

      <!-- Header -->
      <tr><td style="background-color:${C.deepOlive};padding:44px 40px;text-align:center;font-family:${FONT};">
        <div style="font-size:13px;letter-spacing:4px;text-transform:uppercase;color:${C.gold};">KALLMI</div>
        <div style="margin-top:14px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#d8ccbf;">${esc(
          model.eyebrow
        )}</div>
        <h1 style="margin:10px 0 0;font-size:26px;font-weight:300;color:#ffffff;line-height:1.3;">${esc(
          model.title
        )}</h1>
        <div style="width:48px;height:1px;background-color:${C.gold};margin:20px auto 0;font-size:0;line-height:0;">&nbsp;</div>
      </td></tr>

      ${greetingHtml}
      ${introHtml}
      ${detailsHtml}
      ${highlightHtml}
      ${ctaHtml}
      ${outroHtml}
      ${signatureHtml}

      <tr><td style="padding:40px 40px 0;"></td></tr>

      <!-- Footer -->
      <tr><td style="background-color:${C.panel};padding:28px 40px 32px;text-align:center;border-top:1px solid ${C.hairline};font-family:${FONT};">
        <div style="font-size:13px;letter-spacing:2px;color:${C.olive};">${esc(
          wordmark
        )}</div>
        <p style="margin:6px 0 0;font-size:12px;color:${C.muted};">${esc(ADDRESS)}</p>
        <p style="margin:8px 0 0;font-size:12px;color:${C.muted};line-height:1.6;">
          <a href="${SITE_URL}" style="color:${C.olive};text-decoration:none;">${SITE_LABEL}</a>
          &nbsp;&middot;&nbsp;
          <a href="mailto:${CONTACT_EMAIL}" style="color:${C.olive};text-decoration:none;">${CONTACT_EMAIL}</a>
          &nbsp;&middot;&nbsp;
          <a href="tel:${CONTACT_PHONE.replace(/\s/g, '')}" style="color:${C.olive};text-decoration:none;">${CONTACT_PHONE}</a>
        </p>
        ${trustLineHtml}
      </td></tr>

    </table>
  </td></tr>
</table>
</body>
</html>`

  // ---- Plain-text rendering ----

  const lines: string[] = []
  lines.push(model.eyebrow.toUpperCase())
  lines.push(model.title)
  lines.push('')
  if (model.greeting) {
    lines.push(toText(model.greeting))
    lines.push('')
  }
  const introText = toText(model.introHtml ?? model.intro ?? '')
  if (introText) {
    lines.push(introText)
  }
  if (model.details && model.details.rows.length) {
    lines.push('')
    lines.push(model.details.heading.toUpperCase())
    for (const r of model.details.rows) {
      lines.push(`${r.label}: ${toText(r.value)}`)
    }
  }
  if (model.highlight) {
    lines.push('')
    lines.push(`${model.highlight.label}: ${toText(model.highlight.value)}`)
  }
  if (model.cta) {
    lines.push('')
    lines.push(`${model.cta.label}: ${model.cta.href}`)
  }
  if (model.outroHtml || model.outro) {
    lines.push('')
    lines.push(toText(model.outroHtml ?? model.outro ?? ''))
  }
  if (model.signature) {
    lines.push('')
    lines.push('Warm regards,')
    lines.push(toText(model.signature))
  }
  lines.push('')
  lines.push('—')
  lines.push(wordmark)
  lines.push(ADDRESS)
  lines.push(`${SITE_LABEL} · ${CONTACT_EMAIL} · ${CONTACT_PHONE}`)
  if (model.showTrustLine) {
    lines.push('')
    lines.push(TRUST_LINE)
  }

  const text = lines.join('\n')

  return { html, text }
}
