import axios from 'axios'

export function getErrorMessage(error: unknown, fallback = 'Nie udało się zapisać.'): string {
  if (axios.isAxiosError(error)) {
    if (!error.response) return 'Brak połączenia z serwerem.'
    const data = error.response.data
    if (data?.detail) return data.detail
    if (data?.errors) return Object.values(data.errors).flat().join(' ')
  }
  return fallback
}