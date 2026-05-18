export function IconCalendar({ size = 16, color = '#666666' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <rect x="1" y="2.5" width="14" height="13" rx="1.5" stroke={color} strokeWidth="1.2" />
      <path d="M1 6.5h14" stroke={color} strokeWidth="1.2" />
      <path d="M5 1v3M11 1v3" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
      <rect x="3.5" y="9" width="2" height="2" rx="0.5" fill={color} />
      <rect x="7" y="9" width="2" height="2" rx="0.5" fill={color} />
      <rect x="10.5" y="9" width="2" height="2" rx="0.5" fill={color} />
    </svg>
  )
}

export function IconChevronLeft({ size = 16, color = '#363636' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M10 12L6 8l4-4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function IconChevronRight({ size = 16, color = '#363636' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M6 12l4-4-4-4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function IconChevronDown({ size = 16, color = '#363636' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M4 6l4 4 4-4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function IconChevronDownNav({ size = 12, color = '#363636' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none">
      <path d="M3 4.5l3 3 3-3" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function IconDownload({ size = 16, color = '#0095D9' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M8 2v8M5 7l3 3 3-3" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 12h12" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function IconExternalLink({ size = 14, color = '#0095D9' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <path d="M5.5 2.5H2.5a1 1 0 00-1 1v8a1 1 0 001 1h8a1 1 0 001-1V8.5" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
      <path d="M8.5 1.5h4v4M12.5 1.5l-5.5 5.5" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function IconInfo({ size = 16, color = '#363636' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6.5" stroke={color} strokeWidth="1.2" />
      <path d="M8 7v4.5" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="8" cy="5" r="0.8" fill={color} />
    </svg>
  )
}

export function IconCheck({ size = 14, color = '#0095D9' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <path d="M2.5 7L5.5 10L11.5 4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function IconUser({ size = 20, color = '#363636' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="7" r="3.5" stroke={color} strokeWidth="1.3" />
      <path d="M3 17.5c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

export function IconSearch({ size = 20, color = '#363636' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <circle cx="9" cy="9" r="5.5" stroke={color} strokeWidth="1.3" />
      <path d="M13 13l3.5 3.5" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

export function IconPlus({ size = 20, color = '#363636' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <path d="M10 4v12M4 10h12" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function IconAnbimaSymbol({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#FCAF17" />
      <path d="M10 22L16 10l6 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12.5 18h7" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}
