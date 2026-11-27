import { Box } from '@mui/material'
import ProductCard from './ProductCard'

type Props = {
  products: Product[]
  selectProduct: (id: string) => void
}

export default function ProductList({ products, selectProduct }: Props) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {products.map(product => (
        <ProductCard key={product.id} product={product} selectProduct={selectProduct} />
      ))}
    </Box>
  )
}