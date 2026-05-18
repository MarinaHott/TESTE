import { useState } from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine,
} from 'recharts'
import { DATA_BY_DATE, DEFAULT_CHART_DATE, VERTICES } from '../data/mockData'
import DatePicker from './DatePicker'
import { IconInfo } from './Icons'

const VIEWS = ['Comparativo', 'AAA', 'AA', 'A', 'DI + Spread']

const CURVE_CONFIG = {
  AAA: { color: '#0095D9', label: 'AAA' },
  AA:  { color: '#80C342', label: 'AA' },
  A:   { color: '#FCAF17', label: 'A' },
  DI:  { color: '#484A4D', label: 'DI', dashed: true },
}

function getActiveCurves(view) {
  switch (view) {
    case 'Comparativo': return ['AAA', 'AA', 'A']
    case 'AAA': return ['AAA']
    case 'AA': return ['AA']
    case 'A': return ['A']
    case 'DI + Spread': return ['AAA', 'AA', 'A', 'DI']
    default: return ['AAA', 'AA', 'A']
  }
}

function formatLabel(value) {
  // value is float e.g. 0.5, 1, 1.5...
  const years = Math.floor(value)
  const months = Math.round((value - years) * 12)
  if (years === 0) return `${months} ${months === 1 ? 'mês' : 'meses'}`
  if (months === 0) return `${years} ${years === 1 ? 'ano' : 'anos'}`
  return `${years} ${years === 1 ? 'ano' : 'anos'} e ${months} ${months === 1 ? 'mês' : 'meses'}`
}

function CustomTooltip({ active, payload, label, activeCurves }) {
  if (!active || !payload || !payload.length) return null

  return (
    <div style={{
      background: 'white',
      border: '1px solid #D4D4D4',
      borderRadius: 4,
      boxShadow: '0px 4px 8px rgba(72,74,77,0.08)',
      overflow: 'hidden',
      minWidth: 160,
    }}>
      <div style={{
        background: '#F5F5F5',
        padding: '8px 12px',
        fontFamily: 'Lato, sans-serif',
        fontSize: 12,
        color: '#1F1F1F',
        borderBottom: '1px solid #D4D4D4',
      }}>
        {formatLabel(label)}
      </div>
      {activeCurves.map(key => {
        const cfg = CURVE_CONFIG[key]
        const entry = payload.find(p => p.dataKey === key)
        if (!entry) return null
        return (
          <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', fontFamily: 'Lato, sans-serif', fontSize: 12, color: '#363636' }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: cfg.color, flexShrink: 0 }} />
            <span>{key} : </span>
            <span style={{ fontWeight: 700 }}>{Number(entry.value).toFixed(4)}%</span>
          </div>
        )
      })}
    </div>
  )
}

function Dropdown({ value, options, onChange }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <label style={{ display: 'block', fontFamily: 'Lato, sans-serif', fontSize: 12, color: '#666666', marginBottom: 4 }}>
        Visualização
      </label>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          width: 200, height: 40,
          border: `1px solid ${open ? '#0095D9' : '#D4D4D4'}`,
          borderRadius: 4, padding: '0 12px',
          background: '#FEFEFE', cursor: 'pointer',
          fontFamily: 'Lato, sans-serif', fontSize: 14, color: '#363636', gap: 8,
        }}
      >
        {value}
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="#363636" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 4px)', left: 0, zIndex: 200,
          background: 'white', border: '1px solid #0095D9', borderRadius: 4,
          boxShadow: '0px 4px 8px rgba(72,74,77,0.08)', width: 200,
        }}>
          {options.map(opt => (
            <button key={opt} onClick={() => { onChange(opt); setOpen(false) }} style={{
              display: 'block', width: '100%', padding: '10px 16px',
              background: opt === value ? '#F0F8FF' : 'transparent', border: 'none', cursor: 'pointer',
              fontFamily: 'Lato, sans-serif', fontSize: 14, color: '#363636', textAlign: 'left',
              borderBottom: '1px solid #F5F5F5',
            }}
              onMouseEnter={e => { if (opt !== value) e.currentTarget.style.background = '#F5F5F5' }}
              onMouseLeave={e => { if (opt !== value) e.currentTarget.style.background = 'transparent' }}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

const NOW_TIME = '14:32'

export default function ChartCard() {
  const [date, setDate] = useState(DEFAULT_CHART_DATE)
  const [view, setView] = useState('Comparativo')

  const rawData = DATA_BY_DATE[date] ?? DATA_BY_DATE[DEFAULT_CHART_DATE]
  const activeCurves = getActiveCurves(view)

  function clearFilters() {
    setDate(DEFAULT_CHART_DATE)
    setView('Comparativo')
  }

  return (
    <div style={{
      background: '#FEFEFE',
      border: '1px solid #D4D4D4',
      borderRadius: 8,
      padding: 24,
      marginBottom: 24,
    }}>
      {/* Header text */}
      <p style={{ fontFamily: 'Lato, sans-serif', fontSize: 16, color: '#363636', margin: '0 0 4px' }}>
        Utilize os filtros abaixo para visualizar taxas referentes às curvas de crédito.
      </p>
      <p style={{ fontFamily: 'Lato, sans-serif', fontSize: 12, color: '#666666', margin: '0 0 20px' }}>
        Última atualização da página às <strong>{NOW_TIME}</strong>. O gráfico atualizará automaticamente após 24h.
      </p>

      {/* Filters */}
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, marginBottom: 24 }}>
        <DatePicker value={date} onChange={setDate} label="Data" />
        <Dropdown value={view} options={VIEWS} onChange={setView} />
        <button
          onClick={clearFilters}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontFamily: 'Lato, sans-serif', fontSize: 14, color: '#666666',
            padding: '10px 0', alignSelf: 'flex-end',
          }}
        >
          Limpar filtros
        </button>
      </div>

      {/* Chart */}
      <div style={{ position: 'relative' }}>
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={rawData} margin={{ top: 10, right: 20, left: 10, bottom: 30 }}>
            <CartesianGrid vertical={false} stroke="#EDEDED" />
            <XAxis
              dataKey="vertice"
              type="number"
              domain={[0.5, 5]}
              ticks={VERTICES.filter(v => v <= 5)}
              tickFormatter={v => v}
              tick={{ fontFamily: 'Lato, sans-serif', fontSize: 11, fill: '#666666' }}
              label={{ value: 'VÉRTICES (ANOS)', position: 'insideBottomRight', offset: -10, style: { fontFamily: 'Lato, sans-serif', fontSize: 11, fill: '#666666', textTransform: 'uppercase' } }}
              axisLine={{ stroke: '#D4D4D4' }}
              tickLine={false}
            />
            <YAxis
              tickFormatter={v => v.toFixed(4)}
              tick={{ fontFamily: 'Lato, sans-serif', fontSize: 11, fill: '#666666' }}
              label={{ value: 'TAXA (% a.a.)', angle: -90, position: 'insideLeft', offset: 10, style: { fontFamily: 'Lato, sans-serif', fontSize: 11, fill: '#666666', textTransform: 'uppercase', textAnchor: 'middle' } }}
              axisLine={false}
              tickLine={false}
              width={70}
            />
            <Tooltip
              content={<CustomTooltip activeCurves={activeCurves} />}
              cursor={{ stroke: '#484A4D', strokeWidth: 1, strokeDasharray: '4 4' }}
            />
            {activeCurves.map(key => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={CURVE_CONFIG[key].color}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 5, fill: CURVE_CONFIG[key].color, stroke: 'white', strokeWidth: 2 }}
                strokeDasharray={CURVE_CONFIG[key].dashed ? '6 3' : undefined}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: 4, marginBottom: 16 }}>
        {activeCurves.map(key => (
          <span key={key} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 14, height: 14, borderRadius: '50%', background: CURVE_CONFIG[key].color, flexShrink: 0 }} />
            <span style={{ fontFamily: 'Lato, sans-serif', fontSize: 12, color: '#363636' }}>{CURVE_CONFIG[key].label}</span>
          </span>
        ))}
      </div>

      {/* Footer note */}
      <div style={{ borderTop: '1px solid #EDEDED', paddingTop: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
        <IconInfo size={16} color="#363636" />
        <span style={{ fontFamily: 'Lato, sans-serif', fontSize: 12, color: '#363636' }}>
          DI Interpolado pelo método de Svensson
        </span>
      </div>
    </div>
  )
}
