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
        <div style={{ width: 1366, margin: '0 auto', padding: '32px 67px 0' }}>
          <Breadcrumb />

          <h1 style={{
            fontFamily: 'Lato, sans-serif',
            fontWeight: 900,
            fontSize: 32,
            color: '#1F1F1F',
            margin: '0 0 8px',
            lineHeight: 1.2,
          }}>
            Curvas de crédito
          </h1>
          <p style={{
            fontFamily: 'Lato, sans-serif',
            fontWeight: 400,
            fontSize: 14,
            color: '#666666',
            margin: '0 0 32px',
          }}>
            Consulte gráficos e tabelas de referência para a precificação de ativos de crédito privado no mercado secundário.
          </p>

          <HowItWorks />
          <ChartCard />
          <TableCard />
          <AnbimaFeedBanner />
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default App
