import { Grid} from '@mui/material'
import ProductList from './ProductList'
import ProductDetail from '../details/ProductDetail'
import ProductForm from '../form/ProductForm'

type Props = {
  products: Product[]
  selectProduct: (id: string) => void;
  cancelSelectProduct: () => void;
  selectedProduct?: Product;
}

export default function ProductDashboard({ products, selectedProduct, selectProduct, cancelSelectProduct }: Props) {
  return (
    <Grid container>
      <Grid size={7}>
        <ProductList 
        products={products}
        selectProduct={selectProduct}
         />
      </Grid>
        <Grid size={5}>
        {selectedProduct && (
            <ProductDetail product={selectedProduct}
            cancelSelectProduct={cancelSelectProduct}
             />
        )}
        <ProductForm/>
        </Grid>
    </Grid>
  )
}