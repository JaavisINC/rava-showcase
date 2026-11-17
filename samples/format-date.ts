// SAMPLE FROM RAVA (portfolio excerpt)
// What it shows: small date formatters used by the calendar and reminder
// screens. The web prototype used a date library that the iPhone app does not
// include, so these cover the exact patterns the screens need without adding
// a dependency.
// How it was made: written by Claude (Anthropic's AI) under Jackson Davis's
// direction. Jackson did not hand-write this code.

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

/** "3:00 PM" */
export function fmtTime(d: Date): string {
  let h = d.getHours();
  const m = d.getMinutes();
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12;
  if (h === 0) h = 12;
  return `${h}:${String(m).padStart(2, '0')} ${ampm}`;
}

/** "Wed, May 20" */
export function fmtWeekdayMonthDay(d: Date): string {
  return `${WEEKDAYS[d.getDay()]}, ${MONTHS[d.getMonth()]} ${d.getDate()}`;
}

/** "Wed, May 20 · 3:00 PM" */
export function fmtWeekdayMonthDayTime(d: Date): string {
  return `${fmtWeekdayMonthDay(d)} · ${fmtTime(d)}`;
}

/** "Wed, May 20, 2026" */
export function fmtWeekdayMonthDayYear(d: Date): string {
  return `${WEEKDAYS[d.getDay()]}, ${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

/** "Wed, May 20, 2026 · 3:00 PM" */
export function fmtWeekdayMonthDayYearTime(d: Date): string {
  return `${fmtWeekdayMonthDayYear(d)} · ${fmtTime(d)}`;
}

/** "May 20" */
export function fmtMonthDay(d: Date): string {
  return `${MONTHS[d.getMonth()]} ${d.getDate()}`;
}

/** "May 20, 2026" */
export function fmtMonthDayYear(d: Date): string {
  return `${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

/** Local "YYYY-MM-DD", used as a calendar date value. */
export function toDateKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/** Local "HH:mm" 24-hour, for time inputs. */
export function toTimeValue(d: Date): string {
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}
