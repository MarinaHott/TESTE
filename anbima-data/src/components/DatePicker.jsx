import { useState, useRef, useEffect } from 'react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, addMonths, subMonths, isSameDay, isToday, isWeekend, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { IconCalendar, IconChevronLeft, IconChevronRight } from './Icons'

const WEEKDAYS = ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB', 'DOM']

function buildCalendarGrid(month) {
  const first = startOfMonth(month)
  const last = endOfMonth(month)
  const days = eachDayOfInterval({ start: first, end: last })
  // getDay returns 0=Sun,1=Mon…6=Sat; we want Mon first
  const firstDow = (getDay(first) + 6) % 7 // Mon=0
  const grid = []
  for (let i = 0; i < firstDow; i++) grid.push(null)
  for (const d of days) grid.push(d)
  return grid
}

export default function DatePicker({ value, onChange, label = 'Data' }) {
  const [open, setOpen] = useState(false)
  const [month, setMonth] = useState(() => value ? parseISO(value) : new Date())
  const ref = useRef(null)

  useEffect(() => {
    function handle(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [])

  const displayValue = value
    ? format(parseISO(value), 'dd/MM/yyyy')
    : ''

  const grid = buildCalendarGrid(month)

  function selectDay(day) {
    if (!day || isWeekend(day)) return
    onChange(format(day, 'yyyy-MM-dd'))
    setOpen(false)
  }

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
      {label && (
        <label style={{ display: 'block', fontFamily: 'Lato, sans-serif', fontSize: 12, color: '#666666', marginBottom: 4, fontWeight: 400 }}>
          {label}
        </label>
      )}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: 180,
          height: 40,
          border: '1px solid #D4D4D4',
          borderRadius: 4,
          padding: '0 12px',
          background: '#FEFEFE',
          cursor: 'pointer',
          fontFamily: 'Lato, sans-serif',
          fontSize: 14,
          color: '#363636',
          gap: 8,
        }}
      >
        <span>{displayValue}</span>
        <IconCalendar size={16} color="#666666" />
      </button>

      {open && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 4px)',
          left: 0,
          zIndex: 200,
          background: '#FEFEFE',
          border: '1px solid #D4D4D4',
          borderRadius: 8,
          boxShadow: '0px 16px 16px rgba(72,74,77,0.24)',
          padding: '0 16px 24px',
          width: 280,
        }}>
          {/* Month header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0 12px' }}>
            <button onClick={() => setMonth(m => subMonths(m, 1))} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center' }}>
              <IconChevronLeft size={16} color="#055276" />
            </button>
            <span style={{ fontFamily: 'Lato, sans-serif', fontSize: 16, fontWeight: 700, color: '#055276' }}>
              {format(month, 'MMMM yyyy', { locale: ptBR }).replace(/^\w/, c => c.toUpperCase())}
            </span>
            <button onClick={() => setMonth(m => addMonths(m, 1))} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center' }}>
              <IconChevronRight size={16} color="#055276" />
            </button>
          </div>

          {/* Weekday headers */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', marginBottom: 4 }}>
            {WEEKDAYS.map(d => (
              <div key={d} style={{ textAlign: 'center', fontFamily: 'Lato, sans-serif', fontSize: 10, fontWeight: 700, color: '#363636', padding: '4px 0', textTransform: 'uppercase' }}>
                {d}
              </div>
            ))}
          </div>

          {/* Days grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2 }}>
            {grid.map((day, i) => {
              if (!day) return <div key={i} />
              const selected = value && isSameDay(day, parseISO(value))
              const today = isToday(day)
              const disabled = isWeekend(day)

              let bg = 'transparent'
              let color = '#363636'
              let border = 'none'
              let cursor = 'pointer'

              if (selected) { bg = '#055276'; color = 'white' }
              else if (disabled) { color = '#D4D4D4'; cursor = 'default' }
              else if (today && !selected) { border = '1px solid #D4D4D4'; color = '#D4D4D4' }

              return (
                <button
                  key={i}
                  onClick={() => selectDay(day)}
                  disabled={disabled}
                  style={{
                    width: 32, height: 32,
                    borderRadius: '50%',
                    background: bg,
                    color,
                    border,
                    cursor,
                    fontFamily: 'Lato, sans-serif',
                    fontSize: 13,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto',
                    transition: 'background 0.1s',
                  }}
                  onMouseEnter={e => { if (!selected && !disabled) e.currentTarget.style.background = '#F0F0F0' }}
                  onMouseLeave={e => { if (!selected && !disabled) e.currentTarget.style.background = 'transparent' }}
                >
                  {format(day, 'd')}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
