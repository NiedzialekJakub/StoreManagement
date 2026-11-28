export function formatPrice(value: number) {
  return new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(value)
}
// zamienia 49.99 na 49,99 PLN to jest do wyswietlania w UI, nie do wysyłania na backend

export function formatDateTime(value: string) {
  // SQLite oddaje datę bez strefy, a zapisujemy UTC, więc dopisujemy "Z"
  const hasZone = /[zZ]$|[+-]\d{2}:?\d{2}$/.test(value)
  return new Date(hasZone ? value : value + 'Z')
    .toLocaleString('pl-PL', { dateStyle: 'short', timeStyle: 'short' })
}