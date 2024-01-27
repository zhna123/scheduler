
export function convertHourTo24(time12Hour: number, ampm: string) {
  return ampm === 'am' ? (time12Hour === 12 ? 0 : time12Hour) : (time12Hour === 12 ? 12 : time12Hour + 12)
}

export function convertHourTo12(time24Hour: number) {
  let hour
  let  ampm = ''
  if (time24Hour === 0) {
    hour = 12
    ampm = 'AM'
  } else if (time24Hour === 12) {
    hour = 12
    ampm = 'PM'
  } else if (time24Hour < 12) {
    hour = time24Hour
    ampm = 'AM'
  } else {
    hour = time24Hour - 12
    ampm = 'PM'
  }
  return [hour, ampm]
}

// time string format "HH:mm"
export function convert12HourTo24Hour(time12Hour: string, minute: string, ampm: string) {
  const hourNumber = Number(time12Hour)
  const hour = convertHourTo24(hourNumber, ampm)
  return `${hour}:${minute}`
}
// time string format "HH:mm AM/PM"
export function convert24HourTo12Hour(time24Hour: string, mintue: string) {
  const [hour, ampm] = convertHourTo12(Number(time24Hour))
  return `${hour}:${mintue} ${ampm}`
}