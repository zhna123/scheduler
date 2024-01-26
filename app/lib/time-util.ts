
export function convertHour(time12Hour: number, ampm: string) {
  return ampm === 'am' ? (time12Hour === 12 ? 0 : time12Hour) : (time12Hour === 12 ? 12 : time12Hour + 12)
}

// time string format "HH:mm"
export function convert12HourTo24Hour(time12Hour: string, minute: string, ampm: string) {
  const hourNumber = Number(time12Hour)
  const hour = convertHour(hourNumber, ampm)
  return `${hour}:${minute}`
}
// time string format "HH:mm AM/PM"
export function convert24HourTo12Hour(time24Hour: string, mintue: string) {
  let hour
  let ampm
  if (time24Hour === '0') {
    hour = 12
    ampm = 'AM'
  } else if (time24Hour === '12') {
    hour = 12
    ampm = 'PM'
  } else if (Number(time24Hour) < 12) {
    hour = time24Hour
    ampm = 'AM'
  } else {
    hour = Number(time24Hour) - 12
    ampm = 'PM'
  }
  return `${hour}:${mintue} ${ampm}`
}