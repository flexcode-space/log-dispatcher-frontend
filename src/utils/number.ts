export function formatDecimalNumber(value: number, fraction: number = 0): string {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: fraction,
    maximumFractionDigits: fraction,
  })

  return formatter.format(value)
}