import { useEffect, useState } from 'react'
import axios from 'axios'
import { Container, CssBaseline } from '@mui/material'
import NavBar from './NavBar'
import ProductDashboard from '../../features/products/dashboard/ProductDashboard'

function App() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    axios.get<Product[]>('https://localhost:5001/api/products')
      .then(response => setProducts(response.data))
  }, [])

  return (
    <>
      <CssBaseline />
      <NavBar />
      <Container maxWidth="xl" sx={{ mt: 3 }}>
        <ProductDashboard products={products} />
      </Container>
    </>
  )
}

export default App