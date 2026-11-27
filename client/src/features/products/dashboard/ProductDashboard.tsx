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
  openForm: (id: string) => void
  closeForm: () => void
  createProduct: (data: CreateProductData) => Promise<void>
  editProduct: (id: string, data: EditProductData) => Promise<void>
}

export default function ProductDashboard({
  products, selectProduct, cancelSelectProduct, selectedProduct,
  editMode, openForm, closeForm, createProduct, editProduct
}: Props) {
  return (
    <Grid container spacing={3}>
      <Grid size={7}>
        <ProductList products={products} selectProduct={selectProduct} />
      </Grid>
      <Grid size={5}>
        {selectedProduct && !editMode && (
          <ProductDetail
            product={selectedProduct}
            cancelSelectProduct={cancelSelectProduct}
            openForm={openForm}
          />
        )}
        {editMode && (
          <ProductForm
            key={selectedProduct?.id ?? 'new'}
            product={selectedProduct}
            closeForm={closeForm}
            createProduct={createProduct}
            editProduct={editProduct}
          />
        )}
      </Grid>
    </Grid>
  )
}