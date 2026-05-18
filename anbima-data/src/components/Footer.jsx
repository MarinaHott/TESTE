function AnbimaDataLogoWhite() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1, userSelect: 'none' }}>
      <span style={{ fontFamily: 'Lato, sans-serif', fontWeight: 900, fontSize: 13, color: 'white', letterSpacing: '0.04em' }}>ANBIMA</span>
      <span style={{ fontFamily: 'Lato, sans-serif', fontWeight: 900, fontSize: 18, color: 'white', letterSpacing: '0.08em' }}>DATA</span>
    </div>
  )
}

const ANBIMA_LINKS = ['Portal ANBIMA', 'ANBIMA Feed', 'ANBIMA Edu', 'Dúvidas e feedbacks']
const INFO_LINKS   = ['Regras de privacidade', 'Termos de uso', 'Transparência e governança']

function FooterLink({ label }) {
  return (
    <a href="#" style={{
      display: 'block',
      fontFamily: 'Lato, sans-serif',
      fontSize: 14,
      color: '#BBBBBB',
      textDecoration: 'none',
      marginBottom: 10,
    }}
      onMouseEnter={e => { e.target.style.color = 'white' }}
      onMouseLeave={e => { e.target.style.color = '#BBBBBB' }}
    >
      {label}
    </a>
  )
}

export default function Footer() {
  return (
    <footer style={{ background: '#161616', padding: '40px 0' }}>
      <div style={{ width: 1366, margin: '0 auto', padding: '0 67px', display: 'flex', alignItems: 'flex-start', gap: 80 }}>
        <AnbimaDataLogoWhite />

        <div>
          <p style={{ fontFamily: 'Lato, sans-serif', fontWeight: 700, fontSize: 14, color: 'white', margin: '0 0 16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            ANBIMA
          </p>
          {ANBIMA_LINKS.map(l => <FooterLink key={l} label={l} />)}
        </div>

        <div>
          <p style={{ fontFamily: 'Lato, sans-serif', fontWeight: 700, fontSize: 14, color: 'white', margin: '0 0 16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            MAIS INFORMAÇÕES
          </p>
          {INFO_LINKS.map(l => <FooterLink key={l} label={l} />)}
        </div>

        <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
          <p style={{ fontFamily: 'Lato, sans-serif', fontSize: 13, color: '#919191', margin: '0 0 8px' }}>
            Versão: 7.6.1
          </p>
          <p style={{ fontFamily: 'Lato, sans-serif', fontSize: 12, color: '#919191', margin: 0, maxWidth: 280, lineHeight: 1.6 }}>
            As fontes das informações apresentadas são ANBIMA, B3, CVM, demais participantes das ofertas de debêntures e responsáveis pelos fundos de investimento. Este site é protegido pelo reCAPTCHA, consulte a{' '}
            <a href="#" style={{ color: '#919191' }}>Política de privacidade</a>
            {' '}e os{' '}
            <a href="#" style={{ color: '#919191' }}>Termos de serviço do Google</a>.
          </p>
        </div>
      </div>
    </footer>
  )
}
