import { useState } from 'react'
import { getTableData, VERTICES, DEFAULT_TABLE_START, DEFAULT_TABLE_END } from '../data/mockData'
import DateRangePicker from './DateRangePicker'
import MultiSelect from './MultiSelect'
import { IconDownload } from './Icons'

const VERTEX_OPTIONS = [
  ...VERTICES.map(v => ({ value: v, label: String(v).replace('.', ',') }))
]

const RATING_OPTIONS = [
  { value: 'AAA', label: 'AAA' },
  { value: 'AA',  label: 'AA' },
  { value: 'A',   label: 'A' },
]

function Toast({ show }) {
  if (!show) return null
  return (
    <div style={{
      position: 'fixed', bottom: 32, right: 32, zIndex: 1000,
      background: '#1F1F1F', color: 'white',
      fontFamily: 'Lato, sans-serif', fontSize: 14,
      padding: '12px 20px', borderRadius: 6,
      boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
    }}>
      Download iniciado
    </div>
  )
}

export default function TableCard() {
  const [startDate, setStartDate] = useState(DEFAULT_TABLE_START)
  const [endDate, setEndDate] = useState(DEFAULT_TABLE_END)
  const [selectedVertices, setSelectedVertices] = useState(VERTICES)
  const [selectedRatings, setSelectedRatings] = useState(['AAA', 'AA', 'A'])
  const [toast, setToast] = useState(false)

  function handleDateChange({ startDate: s, endDate: e }) {
    setStartDate(s)
    setEndDate(e ?? null)
  }

  function clearFilters() {
    setStartDate(DEFAULT_TABLE_START)
    setEndDate(DEFAULT_TABLE_END)
    setSelectedVertices(VERTICES)
    setSelectedRatings(['AAA', 'AA', 'A'])
  }

  function handleDownload() {
    setToast(true)
    setTimeout(() => setToast(false), 3000)
  }

  const isEmpty = selectedVertices.length === 0 || selectedRatings.length === 0 || !startDate || !endDate

  const rows = isEmpty ? [] : getTableData({
    startDate,
    endDate,
    vertices: selectedVertices,
    ratings: selectedRatings,
  })

  // Group rows by date, show one date row at a time
  // For the table: show Vértice | AAA | AA | A (only selected ratings)
  // We show rows grouped: for each date block, a date header row, then vertex rows

  // Build date-grouped structure
  const grouped = {}
  for (const row of rows) {
    if (!grouped[row.date]) grouped[row.date] = []
    grouped[row.date].push(row)
  }
  const dateKeys = Object.keys(grouped)

  const showAAA = selectedRatings.includes('AAA')
  const showAA  = selectedRatings.includes('AA')
  const showA   = selectedRatings.includes('A')

  return (
    <div style={{
      background: '#FEFEFE',
      border: '1px solid #D4D4D4',
      borderRadius: 8,
      marginBottom: 24,
      overflow: 'hidden',
    }}>
      <Toast show={toast} />

      {/* Card header */}
      <div style={{ padding: '24px 24px 0' }}>
        <h3 style={{ fontFamily: 'Lato, sans-serif', fontWeight: 700, fontSize: 16, color: '#363636', margin: '0 0 20px' }}>
          Curvas de Crédito - Ratings
        </h3>

        {/* Filters row */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, flexWrap: 'wrap', marginBottom: 24 }}>
          <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            onChange={handleDateChange}
            label="Data"
          />
          <MultiSelect
            label="Vértices (Anos)"
            options={VERTEX_OPTIONS}
            selected={selectedVertices}
            onChange={setSelectedVertices}
            width={180}
          />
          <MultiSelect
            label="Ratings"
            options={RATING_OPTIONS}
            selected={selectedRatings}
            onChange={setSelectedRatings}
            width={160}
          />
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
          <button
            onClick={handleDownload}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              marginLeft: 'auto', height: 40,
              border: '1px solid #0095D9', borderRadius: 4,
              padding: '0 16px', background: 'white', cursor: 'pointer',
              fontFamily: 'Lato, sans-serif', fontSize: 14, color: '#0095D9',
              alignSelf: 'flex-end',
            }}
          >
            <IconDownload size={16} color="#0095D9" />
            Download
          </button>
        </div>
      </div>

      {/* Table */}
      {isEmpty ? (
        <div style={{
          padding: '48px 24px',
          textAlign: 'center',
          fontFamily: 'Lato, sans-serif', fontSize: 14, color: '#666666',
        }}>
          Selecione pelo menos 1 item dos filtros para visualizar a tabela.
        </div>
      ) : (
        <div style={{ overflowY: 'auto', maxHeight: 480, borderTop: '1px solid #D4D4D4' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ position: 'sticky', top: 0, zIndex: 10 }}>
              <tr style={{ background: '#F5F5F5' }}>
                <th style={thStyle}>Vértices (Anos)</th>
                {showAAA && <th style={thStyle}>AAA</th>}
                {showAA  && <th style={thStyle}>AA</th>}
                {showA   && <th style={thStyle}>A</th>}
              </tr>
            </thead>
            <tbody>
              {dateKeys.map(date => (
                <>
                  <tr key={`date-${date}`} style={{ background: '#F0F8FF' }}>
                    <td
                      colSpan={(showAAA ? 1 : 0) + (showAA ? 1 : 0) + (showA ? 1 : 0) + 1}
                      style={{
                        padding: '8px 24px',
                        fontFamily: 'Lato, sans-serif', fontSize: 12, fontWeight: 700, color: '#0095D9',
                        borderBottom: '1px solid #D4D4D4',
                      }}
                    >
                      {date}
                    </td>
                  </tr>
                  {grouped[date].map((row, i) => (
                    <tr
                      key={`${date}-${row.vertice}`}
                      style={{ borderBottom: '1px solid #D4D4D4', background: i % 2 === 0 ? '#FEFEFE' : '#FAFAFA' }}
                    >
                      <td style={tdStyle}>{String(row.vertice).replace('.', ',')}</td>
                      {showAAA && <td style={tdStyle}>{row.AAA?.toFixed(4)}</td>}
                      {showAA  && <td style={tdStyle}>{row.AA?.toFixed(4)}</td>}
                      {showA   && <td style={tdStyle}>{row.A?.toFixed(4)}</td>}
                    </tr>
                  ))}
                </>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

const thStyle = {
  padding: '0 24px',
  height: 50,
  fontFamily: 'Lato, sans-serif',
  fontSize: 14,
  color: '#666666',
  fontWeight: 400,
  textAlign: 'left',
  borderBottom: '1px solid #D4D4D4',
  whiteSpace: 'nowrap',
}

const tdStyle = {
  padding: '0 24px',
  height: 50,
  fontFamily: 'Lato, sans-serif',
  fontSize: 14,
  color: '#363636',
  fontWeight: 400,
  textAlign: 'left',
}
