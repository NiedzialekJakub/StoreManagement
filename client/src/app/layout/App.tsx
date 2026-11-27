import { useEffect, useState } from 'react'
import axios from 'axios'
import { Box, Container, CssBaseline } from '@mui/material'
import NavBar from './NavBar'
import ProductDashboard from '../../features/products/dashboard/ProductDashboard'

const api = 'https://localhost:5001/api'

const fetchProducts = () =>
  axios.get<Product[]>(`${api}/products`).then(response => response.data)

function App() {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined)
  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    fetchProducts().then(setProducts)
  }, [])

  const handleSelectProduct = (id: string) => {
    setSelectedProduct(products.find(x => x.id === id))
    setEditMode(false)
  }

  const handleCancelSelectProduct = () => setSelectedProduct(undefined)

  const handleOpenForm = (id?: string) => {
    setSelectedProduct(id ? products.find(x => x.id === id) : undefined)
    setEditMode(true)
  }

  const handleFormClose = () => setEditMode(false)

  const handleCreateProduct = async (data: CreateProductData) => {
    const response = await axios.post<string>(`${api}/products`, data)
    const list = await fetchProducts()
    setProducts(list)
    setSelectedProduct(list.find(p => p.id === response.data))
    setEditMode(false)
  }

  const handleEditProduct = async (id: string, data: EditProductData) => {
    await axios.put(`${api}/products/${id}`, data)
    const list = await fetchProducts()
    setProducts(list)
    setSelectedProduct(list.find(p => p.id === id))
    setEditMode(false)
  }

  return (
    <Box sx={{ bgcolor: '#eeeeee', minHeight: '100vh' }}>
      <CssBaseline />
      <NavBar openForm={handleOpenForm} />
      <Container maxWidth="xl" sx={{ mt: 3 }}>
        <ProductDashboard
          products={products}
          selectProduct={handleSelectProduct}
          cancelSelectProduct={handleCancelSelectProduct}
          selectedProduct={selectedProduct}
          editMode={editMode}
          openForm={handleOpenForm}
          closeForm={handleFormClose}
          createProduct={handleCreateProduct}
          editProduct={handleEditProduct}
        />
      </Container>
    </Box>
  )
}

export default App