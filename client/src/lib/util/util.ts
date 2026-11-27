export function formatPrice(value: number) {
  return new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(value)
}
// zamienia 49.99 na 49,99 PLN to jest do wyswietlania w UI, nie do wysyłania na backend