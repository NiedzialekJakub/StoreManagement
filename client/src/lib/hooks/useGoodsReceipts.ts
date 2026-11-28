import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import agent from '../api/agent'

export const useGoodsReceipts = (id?: string) => {
  const queryClient = useQueryClient()

  const { data: receipts, isPending, isError } = useQuery({
    queryKey: ['receipts'],
    queryFn: async () => {
      const response = await agent.get<GoodsReceiptListItem[]>('/goodsreceipts')
      return response.data
    },
    enabled: !id
  })

  const { data: receipt, isLoading: isLoadingReceipt } = useQuery({
    queryKey: ['receipts', id],
    queryFn: async () => {
      const response = await agent.get<GoodsReceipt>(`/goodsreceipts/${id}`)
      return response.data
    },
    enabled: !!id,
    retry: false
  })

  const createReceipt = useMutation({
    mutationFn: async (data: CreateGoodsReceiptData) => {
      const response = await agent.post<string>('/goodsreceipts', data)
      return response.data   // Id nowego dokumentu
    },
    onSuccess: async () => {
      // przyjęcie zmienia stany, więc odświeżamy i dokumenty, i listę produktów w Magazynie
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['receipts'] }),
        queryClient.invalidateQueries({ queryKey: ['products'] })
      ])
    }
  })

  return { receipts, isPending, isError, receipt, isLoadingReceipt, createReceipt }
}