const crumbs = [
  { label: 'HOME', bold: false },
  { label: 'DADOS DE MERCADO', bold: false },
  { label: 'CURVAS', bold: false },
  { label: 'TÍTULOS PRIVADOS', bold: false },
  { label: 'CURVAS DE CRÉDITO', bold: true },
]

export default function Breadcrumb() {
  return (
    <nav className="flex items-center gap-0" style={{ marginBottom: 16 }}>
      {crumbs.map((c, i) => (
        <span key={c.label} className="flex items-center">
          {i > 0 && (
            <span style={{ color: '#777C87', fontSize: 12, margin: '0 6px' }}>›</span>
          )}
          <span
            style={{
              fontSize: 12,
              color: '#777C87',
              fontWeight: c.bold ? 700 : 400,
              textTransform: 'uppercase',
              fontFamily: 'Lato, sans-serif',
              letterSpacing: '0.6px',
              cursor: i < crumbs.length - 1 ? 'pointer' : 'default',
            }}
          >
            {c.label}
          </span>
        </span>
      ))}
    </nav>
  )
}
