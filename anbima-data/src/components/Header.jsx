import { IconChevronDownNav, IconUser, IconSearch, IconPlus } from './Icons'

function AnbimaDataLogo() {
  return (
    <div className="flex flex-col leading-none select-none">
      <span style={{ fontFamily: 'Lato, sans-serif', fontWeight: 900, fontSize: 13, color: '#0095D9', letterSpacing: '0.04em' }}>ANBIMA</span>
      <span style={{ fontFamily: 'Lato, sans-serif', fontWeight: 900, fontSize: 18, color: '#0095D9', letterSpacing: '0.08em' }}>DATA</span>
    </div>
  )
}

export default function Header() {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-white"
      style={{ height: 64, borderBottom: '1px solid #DFDFDF' }}
    >
      <div style={{ width: 1366, margin: '0 auto', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 67px' }}>
        <AnbimaDataLogo />

        <nav className="flex items-center gap-6">
          {[
            { label: 'Dados de mercado', arrow: true },
            { label: 'Publicações', arrow: true },
            { label: 'Datasets', arrow: false },
            { label: 'Ferramentas', arrow: true },
          ].map(item => (
            <button
              key={item.label}
              className="flex items-center gap-1 text-sm text-text-medium hover:text-blue-primary transition-colors bg-transparent border-none cursor-pointer p-0"
              style={{ fontFamily: 'Lato, sans-serif', fontWeight: 400, fontSize: 14, color: '#363636' }}
            >
              {item.label}
              {item.arrow && <IconChevronDownNav size={12} color="#363636" />}
            </button>
          ))}

          <div className="flex items-center gap-4 ml-4">
            <button className="bg-transparent border-none cursor-pointer p-0 flex items-center">
              <IconPlus size={20} color="#363636" />
            </button>
            <button className="bg-transparent border-none cursor-pointer p-0 flex items-center">
              <IconUser size={20} color="#363636" />
            </button>
            <button className="bg-transparent border-none cursor-pointer p-0 flex items-center">
              <IconSearch size={20} color="#363636" />
            </button>
          </div>
        </nav>
      </div>
    </header>
  )
}
