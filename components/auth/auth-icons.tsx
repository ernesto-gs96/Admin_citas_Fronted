export function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25">
        <path d="M12 5v14M5 12h14" strokeLinecap="round" />
      </svg>
    </span>
  )
}

export function EyeIcon({ hidden }: { hidden: boolean }) {
  return hidden ? (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path
        d="m3 3 18 18M10.6 10.6a2 2 0 0 0 2.8 2.8M9.9 4.3A10.7 10.7 0 0 1 12 4c5.5 0 9.3 5.2 9.3 8s-1.3 4.2-3.2 5.8M6.5 6.5C4.1 8.2 2.7 10.4 2.7 12c0 2.8 3.8 8 9.3 8 1 0 1.9-.2 2.8-.5"
        strokeLinecap="round"
      />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M2.7 12S6.5 4 12 4s9.3 5.2 9.3 8-3.8 8-9.3 8-9.3-5.2-9.3-8Z" />
      <circle cx="12" cy="12" r="2.8" />
    </svg>
  )
}

export function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m3.5 6.5 8 6.2 8-6.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
