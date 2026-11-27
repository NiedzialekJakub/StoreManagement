import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import agent from '../api/agent'

export const useProducts = (id?: string) => {
  const queryClient = useQueryClient()

  // lista, tylko gdy nie pytamy o konkretny produkt
  const { data: products, isPending, isError } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await agent.get<Product[]>('/products')
      return response.data
    },
    enabled: !id
  })

  // jeden produkt, tylko gdy mamy id
  const { data: product, isLoading: isLoadingProduct } = useQuery({
    queryKey: ['products', id],
    queryFn: async () => {
      const response = await agent.get<Product>(`/products/${id}`)
      return response.data
    },
    enabled: !!id,
    retry: false   // 404 nie ma sensu ponawiać, od razu pokażemy "nie znaleziono"
  })

  const refresh = () => queryClient.invalidateQueries({ queryKey: ['products'] })

  const createProduct = useMutation({
    mutationFn: async (data: CreateProductData) => {
      const response = await agent.post<string>('/products', data)
      return response.data
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

  return {
    products, isPending, isError,
    product, isLoadingProduct,
    createProduct, updateProduct, deleteProduct
  }
}