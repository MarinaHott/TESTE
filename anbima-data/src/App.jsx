import Header from './components/Header'
import Breadcrumb from './components/Breadcrumb'
import HowItWorks from './components/HowItWorks'
import ChartCard from './components/ChartCard'
import TableCard from './components/TableCard'
import AnbimaFeedBanner from './components/AnbimaFeedBanner'
import Footer from './components/Footer'

function App() {
  return (
    <div style={{ minWidth: 1366, background: '#F5F5F5', fontFamily: 'Lato, sans-serif' }}>
      <Header />

      <main style={{ paddingTop: 64 }}>
        <div style={{ maxWidth: 1376, margin: '0 auto', padding: '24px 72px 72px', display: 'flex', flexDirection: 'column', gap: 32 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <Breadcrumb />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <h1 style={{
                fontFamily: 'Lato, sans-serif',
                fontWeight: 900,
                fontSize: 32,
                color: '#1F1F1F',
                margin: 0,
                lineHeight: 1.2,
              }}>
                Curvas de crédito
              </h1>
              <p style={{
                fontFamily: 'Lato, sans-serif',
                fontWeight: 400,
                fontSize: 14,
                color: '#666666',
                margin: 0,
                letterSpacing: '0.7px',
              }}>
                Consulte gráficos e tabelas de referência para a precificação de ativos de crédito privado no mercado secundário.
              </p>
            </div>
          </div>

          <HowItWorks />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <ChartCard />
            <TableCard />
          </div>
          <AnbimaFeedBanner />
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default App
