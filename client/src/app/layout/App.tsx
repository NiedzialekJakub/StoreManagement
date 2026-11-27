import { useEffect, useState } from 'react'
import axios from 'axios'
import { Box, Container, CssBaseline } from '@mui/material'
import NavBar from './NavBar'
import ProductDashboard from '../../features/products/dashboard/ProductDashboard'

function App() {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined)
  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    axios.get<Product[]>('https://localhost:5001/api/products')
      .then(response => setProducts(response.data))
  }, [])

  const handleSelectProduct = (id: string) => {
    setSelectedProduct(products.find(x => x.id === id))
    setEditMode(false)
  }

  const handleCancelSelectProduct = () => setSelectedProduct(undefined)

  const handleOpenForm = () => {
    setSelectedProduct(undefined)
    setEditMode(true)
  }

  const handleCloseForm = () => setEditMode(false)

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
          closeForm={handleCloseForm}
        />
      </Container>
    </Box>
  )
}

export default App