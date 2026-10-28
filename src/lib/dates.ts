import type { MonthRange } from '../content/types'

// Date formatting without time-zone surprises.
//
// Gotcha worth knowing: `new Date('2026-10-27')` means midnight *UTC*. In
// Hawaii (UTC-10) that moment is still October 26, so formatting it in local
// time prints the wrong day. Here every date is built in UTC and formatted in
// UTC, so the day you wrote is the day readers see.

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/** "2024-12" -> "Dec 2024"; "2025" -> "2025". */
export function formatMonth(value: string): string {
  const [year, month] = value.split('-')
  if (month === undefined) return year
  const name = MONTHS[Number(month) - 1]
  if (name === undefined) throw new Error(`Not a month: "${value}"`)
  return `${name} ${year}`
}

/** { start: '2026-07', end: '2026-09' } -> "Jul – Sep 2026". */
export function formatMonthRange(range: MonthRange): string {
  if (range.end === undefined || range.end === range.start) return formatMonth(range.start)
  const [startYear] = range.start.split('-')
  const [endYear] = range.end.split('-')
  if (startYear === endYear && range.start.includes('-')) {
    return `${formatMonth(range.start).split(' ')[0]} – ${formatMonth(range.end)}`
  }
  return `${formatMonth(range.start)} – ${formatMonth(range.end)}`
}

/** "2026-10-27" -> "October 27, 2026", the same everywhere in the world. */
export function formatFullDate(value: string): string {
  const [year, month, day] = value.split('-').map(Number)
  const date = new Date(Date.UTC(year, month - 1, day))
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(date)
}
