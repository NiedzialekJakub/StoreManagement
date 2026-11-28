import axios from 'axios'
import agent from './agent'

export async function findVariantByEan(ean: string): Promise<VariantLookup | null> {
  try {
    const response = await agent.get<VariantLookup>(`/variants/by-ean/${encodeURIComponent(ean)}`)
    return response.data
  } catch (error) {
    // 404 to normalna sytuacja (nie ma takiego kodu), a nie awaria
    if (axios.isAxiosError(error) && error.response?.status === 404) return null
    throw error
  }
}