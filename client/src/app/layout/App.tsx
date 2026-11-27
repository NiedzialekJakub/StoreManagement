import { useEffect, useState } from 'react'
import { Container, CssBaseline, List, ListItem, ListItemText, Typography } from '@mui/material'
import axios from 'axios'
import NavBar from './NavBar'

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
      <List>
        {products.map(product => (
          <ListItem key={product.id}>
            <ListItemText
              primary={product.name}
              secondary={`${product.category} • wariantów: ${product.variants.length}`}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  </>
)
}

export default App