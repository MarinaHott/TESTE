import { IconExternalLink } from './Icons'

export default function HowItWorks() {
  return (
    <section style={{ marginBottom: 32 }}>
      <h2 style={{ fontFamily: 'Lato, sans-serif', fontWeight: 700, fontSize: 16, color: '#1F1F1F', margin: '0 0 12px' }}>
        Como funciona?
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <p style={{ fontFamily: 'Lato, sans-serif', fontSize: 14, color: '#363636', margin: 0, lineHeight: 1.5 }}>
          <strong>O que é:</strong>{' '}
          Nossa ferramenta disponibiliza estimativas diárias das curvas de spread de crédito divididas por níveis de risco (rating).
        </p>
        <p style={{ fontFamily: 'Lato, sans-serif', fontSize: 14, color: '#363636', margin: 0, lineHeight: 1.5 }}>
          <strong>Critérios:</strong>{' '}
          As curvas de crédito são extraídas a partir de debêntures precificadas diariamente pela ANBIMA (DI Percentual, DI+spread e IPCA+spread) e refletem estruturas de spread zero-cupom sobre a curva soberana para diferentes níveis de risco.
        </p>
        <p style={{ fontFamily: 'Lato, sans-serif', fontSize: 14, color: '#363636', margin: 0, lineHeight: 1.5 }}>
          <strong>Limitações:</strong>{' '}
          A divulgação das curvas por nível de risco está sujeita à existência de séries de debêntures sem cláusula de resgate/amortização antecipada na amostra de precificação da ANBIMA (http://www.anbima.com.br/informacoes/merc-sec-debentures/merc-sec-debentures.asp)
        </p>
      </div>

      <a
        href="#"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 4,
          marginTop: 12,
          fontFamily: 'Lato, sans-serif',
          fontSize: 14,
          fontWeight: 400,
          color: '#0095D9',
          textDecoration: 'none',
        }}
      >
        Veja aqui a metodologia
        <IconExternalLink size={14} color="#0095D9" />
      </a>
    </section>
  )
}
