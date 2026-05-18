import { useState, useRef, useEffect } from 'react'
import { IconChevronDown, IconCheck } from './Icons'

export default function MultiSelect({ label, options, selected, onChange, width = 200 }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function handle(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [])

  const allValues = options.filter(o => o.value !== 'all').map(o => o.value)
  const isAllSelected = selected.length === allValues.length

  function toggle(value) {
    if (value === 'all') {
      onChange(isAllSelected ? [] : allValues)
      return
    }
    if (selected.includes(value)) {
      onChange(selected.filter(v => v !== value))
    } else {
      onChange([...selected, value])
    }
  }

  const totalCount = allValues.length

  function renderLabel() {
    if (selected.length === 0) {
      return (
        <>
          <span>Selecionar</span>
          <span style={{ fontWeight: 700, color: '#0095D9' }}> ({totalCount})</span>
        </>
      )
    }
    if (isAllSelected) {
      return (
        <>
          <span>Todos</span>
          <span style={{ fontWeight: 700, color: '#0095D9' }}> ({totalCount})</span>
        </>
      )
    }
    const firstName = options.find(o => o.value === selected[0])?.label ?? selected[0]
    const rest = selected.length - 1
    return (
      <>
        <span>{firstName}</span>
        {rest > 0 && <span style={{ fontWeight: 700, color: '#0095D9' }}> +{rest}</span>}
      </>
    )
  }

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
      {label && (
        <label style={{ display: 'block', fontFamily: 'Lato, sans-serif', fontSize: 12, color: '#161616', marginBottom: 4, fontWeight: 400 }}>
          {label}
        </label>
      )}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width,
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
        <span style={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap', overflow: 'hidden' }}>{renderLabel()}</span>
        <IconChevronDown size={16} color="#363636" />
      </button>

      {open && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 4px)',
          left: 0,
          zIndex: 200,
          background: 'white',
          border: '1px solid #0095D9',
          borderRadius: 4,
          boxShadow: '0px 4px 8px rgba(72,74,77,0.08)',
          width: 240,
          maxHeight: 280,
          overflowY: 'auto',
        }}>
          {/* "Todos" item */}
          <button
            onClick={() => toggle('all')}
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              padding: '12px 12px 12px 20px',
              gap: 16,
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'Lato, sans-serif',
              fontSize: 14,
              color: '#363636',
              textAlign: 'left',
              borderBottom: '1px solid #F5F5F5',
            }}
          >
            <span style={{ width: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {isAllSelected ? <IconCheck size={14} color="#0095D9" /> : null}
            </span>
            <span>Todos ({allValues.length})</span>
          </button>

          {options.filter(o => o.value !== 'all').map(opt => {
            const checked = selected.includes(opt.value)
            return (
              <button
                key={opt.value}
                onClick={() => toggle(opt.value)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                  padding: '12px 12px 12px 20px',
                  gap: 16,
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'Lato, sans-serif',
                  fontSize: 14,
                  color: '#363636',
                  textAlign: 'left',
                  borderBottom: '1px solid #F5F5F5',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#F5F5F5' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
              >
                <span style={{ width: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {checked ? <IconCheck size={14} color="#0095D9" /> : null}
                </span>
                <span>{opt.label}</span>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
