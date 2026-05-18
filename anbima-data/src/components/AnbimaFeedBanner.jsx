import { IconAnbimaSymbol, IconExternalLink } from './Icons'

export default function AnbimaFeedBanner() {
  return (
    <div style={{
      background: 'linear-gradient(90deg, #005B8A 0%, #0095D9 100%)',
      borderRadius: 8,
      padding: '24px 32px',
      display: 'flex',
      alignItems: 'center',
      gap: 20,
      marginBottom: 48,
    }}>
      <IconAnbimaSymbol size={40} />

      <div style={{ flex: 1 }}>
        <p style={{ fontFamily: 'Lato, sans-serif', fontWeight: 700, fontSize: 16, color: 'white', margin: '0 0 4px' }}>
          Quer acesso ao histórico completo de preços da ANBIMA?
        </p>
        <p style={{ fontFamily: 'Lato, sans-serif', fontWeight: 400, fontSize: 14, color: 'white', margin: 0 }}>
          O ANBIMA Feed é a plataforma para quem busca uma API com informações completas e atualizadas sobre o mercado de capitais.
        </p>
      </div>

      <a
        href="#"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          background: 'white',
          borderRadius: 4,
          padding: '10px 20px',
          fontFamily: 'Lato, sans-serif',
          fontWeight: 700,
          fontSize: 14,
          color: '#0095D9',
          textDecoration: 'none',
          whiteSpace: 'nowrap',
        }}
      >
        Saiba mais
        <IconExternalLink size={14} color="#0095D9" />
      </a>
    </div>
  )
}
