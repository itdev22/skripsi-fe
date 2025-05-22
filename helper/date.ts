export function formatDateToYMD(dateInput: string | Date): string {
  const date = new Date(dateInput)

  if (isNaN(date.getTime())) {
    return 'Invalid Date'
  }

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') // bulan 0-11
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}