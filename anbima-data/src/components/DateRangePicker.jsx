import { useState, useRef, useEffect } from 'react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, addMonths, subMonths, isSameDay, isToday, isWeekend, parseISO, isAfter, isBefore, isWithinInterval } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { IconCalendar, IconChevronLeft, IconChevronRight } from './Icons'

const WEEKDAYS = ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB', 'DOM']

function buildCalendarGrid(month) {
  const first = startOfMonth(month)
  const last = endOfMonth(month)
  const days = eachDayOfInterval({ start: first, end: last })
  const firstDow = (getDay(first) + 6) % 7
  const grid = []
  for (let i = 0; i < firstDow; i++) grid.push(null)
  for (const d of days) grid.push(d)
  return grid
}

export default function DateRangePicker({ startDate, endDate, onChange, label = 'Data' }) {
  const [open, setOpen] = useState(false)
  const [month, setMonth] = useState(() => startDate ? parseISO(startDate) : new Date())
  const [selecting, setSelecting] = useState(null) // 'start' | 'end' | null
  const ref = useRef(null)

  useEffect(() => {
    function handle(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false)
        setSelecting(null)
      }
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [])

  const displayValue = startDate && endDate
    ? `${format(parseISO(startDate), 'dd/MM/yyyy')} - ${format(parseISO(endDate), 'dd/MM/yyyy')}`
    : startDate
    ? `${format(parseISO(startDate), 'dd/MM/yyyy')} - ...`
    : ''

  const grid = buildCalendarGrid(month)

  function handleOpen() {
    setOpen(o => !o)
    setSelecting('start')
  }

  function selectDay(day) {
    if (!day || isWeekend(day)) return
    const ds = format(day, 'yyyy-MM-dd')

    if (selecting === 'start' || !selecting) {
      onChange({ startDate: ds, endDate: null })
      setSelecting('end')
    } else {
      const start = startDate ? parseISO(startDate) : null
      if (start && isBefore(day, start)) {
        onChange({ startDate: ds, endDate: startDate })
      } else {
        onChange({ startDate, endDate: ds })
      }
      setSelecting(null)
      setOpen(false)
    }
  }

  function inRange(day) {
    if (!startDate || !endDate || !day) return false
    const s = parseISO(startDate)
    const e = parseISO(endDate)
    return isWithinInterval(day, { start: s, end: e })
  }

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
      {label && (
        <label style={{ display: 'block', fontFamily: 'Lato, sans-serif', fontSize: 12, color: '#666666', marginBottom: 4, fontWeight: 400 }}>
          {label}
        </label>
      )}
      <button
        onClick={handleOpen}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: 240,
          height: 40,
          border: `1px solid ${open ? '#0095D9' : '#D4D4D4'}`,
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
        <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{displayValue}</span>
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
          width: 300,
        }}>
          {selecting && (
            <div style={{ padding: '10px 0 0', fontFamily: 'Lato, sans-serif', fontSize: 12, color: '#0095D9', textAlign: 'center' }}>
              {selecting === 'start' ? 'Selecione a data início' : 'Selecione a data fim'}
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0 12px' }}>
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

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', marginBottom: 4 }}>
            {WEEKDAYS.map(d => (
              <div key={d} style={{ textAlign: 'center', fontFamily: 'Lato, sans-serif', fontSize: 10, fontWeight: 700, color: '#363636', padding: '4px 0', textTransform: 'uppercase' }}>
                {d}
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2 }}>
            {grid.map((day, i) => {
              if (!day) return <div key={i} />
              const isStart = startDate && isSameDay(day, parseISO(startDate))
              const isEnd = endDate && isSameDay(day, parseISO(endDate))
              const selected = isStart || isEnd
              const inRangeDay = inRange(day)
              const disabled = isWeekend(day)

              let bg = 'transparent'
              let color = '#363636'
              let border = 'none'
              let cursor = 'pointer'
              let borderRadius = '50%'

              if (selected) { bg = '#055276'; color = 'white' }
              else if (inRangeDay) { bg = '#E8F4FB'; color = '#363636'; borderRadius = 0 }
              else if (disabled) { color = '#D4D4D4'; cursor = 'default' }
              else if (isToday(day) && !selected) { border = '1px solid #D4D4D4'; color = '#D4D4D4' }

              return (
                <button
                  key={i}
                  onClick={() => selectDay(day)}
                  disabled={disabled}
                  style={{
                    width: 32, height: 32,
                    borderRadius,
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
                  }}
                  onMouseEnter={e => { if (!selected && !disabled && !inRangeDay) e.currentTarget.style.background = '#F0F0F0' }}
                  onMouseLeave={e => { if (!selected && !disabled && !inRangeDay) e.currentTarget.style.background = 'transparent' }}
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
