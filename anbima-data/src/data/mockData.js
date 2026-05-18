// 5 business days of mock data, 20 vertices each
// Dates: Mon–Fri, 2026-05-11 to 2026-05-15

export const VERTICES = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10]

// Spread values per vertex per day (5 days, AAA/AA/A/DI)
function generateDay(dayOffset) {
  return VERTICES.map((v, i) => {
    const t = i / (VERTICES.length - 1)
    const d = dayOffset / 4
    return {
      vertice: v,
      AAA: parseFloat((0.29 + t * 0.16 + d * 0.02 + Math.sin(t * 2) * 0.01).toFixed(4)),
      AA:  parseFloat((0.88 + t * 0.22 + d * 0.03 + Math.sin(t * 2.5) * 0.02).toFixed(4)),
      A:   parseFloat((2.63 + t * 0.57 + d * 0.04 + Math.sin(t * 1.8) * 0.03).toFixed(4)),
      DI:  parseFloat((3.80 + t * 0.40 + d * 0.02 + Math.sin(t * 1.2) * 0.02).toFixed(4)),
    }
  })
}

export const BUSINESS_DAYS = [
  { date: '2026-05-11', label: '11/05/2026' },
  { date: '2026-05-12', label: '12/05/2026' },
  { date: '2026-05-13', label: '13/05/2026' },
  { date: '2026-05-14', label: '14/05/2026' },
  { date: '2026-05-15', label: '15/05/2026' },
]

// D-1 for chart default (index 3 = 14/05)
export const DEFAULT_CHART_DATE = BUSINESS_DAYS[3].date

// Default table range: last 5 business days
export const DEFAULT_TABLE_START = BUSINESS_DAYS[0].date
export const DEFAULT_TABLE_END   = BUSINESS_DAYS[4].date

export const DATA_BY_DATE = {
  '2026-05-11': generateDay(0),
  '2026-05-12': generateDay(1),
  '2026-05-13': generateDay(2),
  '2026-05-14': generateDay(3),
  '2026-05-15': generateDay(4),
}

// Returns flat array of { date, vertice, AAA, AA, A } for a date range, filtered by vertices/ratings
export function getTableData({ startDate, endDate, vertices, ratings }) {
  const rows = []
  for (const bd of BUSINESS_DAYS) {
    if (bd.date < startDate || bd.date > endDate) continue
    const dayData = DATA_BY_DATE[bd.date] || []
    for (const row of dayData) {
      if (!vertices.includes(row.vertice)) continue
      const filtered = { date: bd.label, vertice: row.vertice }
      for (const r of ratings) filtered[r] = row[r]
      rows.push(filtered)
    }
  }
  return rows
}
