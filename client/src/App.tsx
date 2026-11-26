import { useEffect, useState } from 'react'
import { List, ListItem, ListItemText, Typography } from '@mui/material'

function App() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    fetch('https://localhost:5001/api/products')
      .then(response => response.json())
      .then(data => setProducts(data))
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