import { useEffect, useState } from 'react'
import axios from 'axios'
import { Box, Container, CssBaseline } from '@mui/material'
import NavBar from './NavBar'
import ProductDashboard from '../../features/products/dashboard/ProductDashboard'

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);

  useEffect(() => {
    axios.get<Product[]>('https://localhost:5001/api/products')
      .then(response => setProducts(response.data))
  }, [])

  const handleProductSelect = (id: string) => {
    setSelectedProduct(products.find(product => product.id === id));
  }

  const handleCancelSelectProduct = () => {
    setSelectedProduct(undefined);
  }

  return (
    <Box sx={{bgcolor: '#eeeeee'}}>
      <CssBaseline />
      <NavBar />
      <Container maxWidth="xl" sx={{ mt: 3 }}>
        <ProductDashboard 
        products={products}
        selectedProduct={selectedProduct}
        selectProduct={handleProductSelect}
        cancelSelectProduct={handleCancelSelectProduct}
         />
      </Container>
      <h2>Kamil tu był</h2>
      
    </Box>
  )
}

export default App