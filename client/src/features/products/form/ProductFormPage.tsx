import { Alert, Box, CircularProgress } from '@mui/material'
import { useParams } from 'react-router'
import { useProducts } from '../../../lib/hooks/useProducts'
import ProductForm from './ProductForm'

export default function ProductFormPage() {
  const { id } = useParams()
  const { product, isLoadingProduct } = useProducts(id)

  if (id && isLoadingProduct) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (id && !product) return <Alert severity="warning">Nie znaleziono produktu.</Alert>

  // key = formularz buduje się od nowa przy zmianie produktu lub przejściu na "nowy"
  return <ProductForm key={product?.id ?? 'new'} product={product} />
}