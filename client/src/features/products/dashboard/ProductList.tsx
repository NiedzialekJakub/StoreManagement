import { Box } from "@mui/material"
import ProductCard from "./ProductCard"

type Props = {
  products: Product[]
}
export default function ProductList({ products }: Props) {
  return (
        <Box sx={{display: 'flex', flexDirection: 'column', gap: 3}}>
        {products.map(product => (
            <ProductCard key={product.id} product={product} />
        ))}
    </Box>
  )
}
