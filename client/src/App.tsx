import { useEffect, useState } from 'react'
import { List, ListItem, ListItemText, Typography } from '@mui/material'
import axios from 'axios'

function App() {
  const [products, setProducts] = useState<Product[]>([])

useEffect(() => {
  axios.get<Product[]>('https://localhost:5001/api/products')
    .then(response => setProducts(response.data))
}, [])

  return (
    <>
      <Typography variant='h3'>POSAdvanced</Typography>
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
    </>
  )
}

export default App