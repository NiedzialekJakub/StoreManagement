import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import agent from '../api/agent'

export const useProducts = () => {
  const queryClient = useQueryClient()

  const { data: products, isPending, isError } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await agent.get<Product[]>('/products')
      return response.data
    }
  })

  // po każdej zmianie unieważniamy cache, a lista pobiera się od nowa
  const refresh = () => queryClient.invalidateQueries({ queryKey: ['products'] })

  const createProduct = useMutation({
    mutationFn: async (data: CreateProductData) => {
      const response = await agent.post<string>('/products', data)
      return response.data   // Id nowego produktu
    },
    onSuccess: refresh
  })

  const updateProduct = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: EditProductData }) => {
      await agent.put(`/products/${id}`, data)
    },
    onSuccess: refresh
  })

  const deleteProduct = useMutation({
    mutationFn: async (id: string) => {
      await agent.delete(`/products/${id}`)
    },
    onSuccess: refresh
  })

  return { products, isPending, isError, createProduct, updateProduct, deleteProduct }
}