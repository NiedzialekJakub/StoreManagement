import { Grid } from '@mui/material'
import ProductList from './ProductList'
import ProductDetail from '../details/ProductDetail'
import ProductForm from '../form/ProductForm'

type Props = {
  products: Product[]
  selectProduct: (id: string) => void
  cancelSelectProduct: () => void
  selectedProduct?: Product
  editMode: boolean
  closeForm: () => void
}

export default function ProductDashboard({
  products, selectProduct, cancelSelectProduct, selectedProduct, editMode, closeForm
}: Props) {
  return (
    <Grid container spacing={3}>
      <Grid size={7}>
        <ProductList products={products} selectProduct={selectProduct} />
      </Grid>
      <Grid size={5}>
        {selectedProduct && !editMode && (
          <ProductDetail product={selectedProduct} cancelSelectProduct={cancelSelectProduct} />
        )}
        {editMode && <ProductForm closeForm={closeForm} />}
      </Grid>
    </Grid>
  )
}