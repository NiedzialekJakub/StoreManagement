import { Grid} from '@mui/material'
import ProductList from './ProductList'
import ProductDetail from '../details/ProductDetail'

type Props = {
  products: Product[]
}

export default function ProductDashboard({ products }: Props) {
  return (
    <Grid container>
      <Grid size={7}>
        <ProductList products={products} />
      </Grid>
        <Grid size={5}>
          {products[0] && (
            <ProductDetail product={products[0]} />
          )}
        </Grid>
    </Grid>
  )
}