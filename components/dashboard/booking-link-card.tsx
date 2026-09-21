'use client'

import { useState } from 'react'
import { CopyIcon, LinkIcon } from './dashboard-icons'

export function BookingLinkCard({ link }: { link: string }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(`https://${link}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // Clipboard API no disponible; no bloquea la interfaz.
    }
  }

  return (
    <div className="booking-link-card">
      <span className="booking-link-icon" aria-hidden="true">
        <LinkIcon />
      </span>
      <span className="booking-link-value">{link}</span>
      <button type="button" className="booking-link-copy" onClick={handleCopy}>
        <CopyIcon />
        {copied ? 'Copiado' : 'Copiar enlace'}
      </button>
    </div>
  )
}
