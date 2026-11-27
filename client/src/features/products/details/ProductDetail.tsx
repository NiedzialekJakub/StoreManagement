import {
  Alert, Box, Button, Card, CardActions, CardContent, Chip, CircularProgress,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography
} from '@mui/material'
import { Link, useNavigate, useParams } from 'react-router'
import { useProducts } from '../../../lib/hooks/useProducts'
import { formatPrice } from '../../../lib/util/util'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { product, isLoadingProduct, deleteProduct } = useProducts(id)

  if (isLoadingProduct) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (!product) return <Alert severity="warning">Nie znaleziono produktu.</Alert>

  const handleDelete = () => {
    if (window.confirm(`Usunąć produkt „${product.name}”? Zniknie z listy, a historia sprzedaży zostanie zachowana.`)) {
      deleteProduct.mutate(product.id, { onSuccess: () => navigate('/products') })
    }
  }

  return (
    <Card sx={{ borderRadius: 3, maxWidth: 1000, mx: 'auto' }}>
      <CardContent>
        <Typography variant="h5">
          {product.name}{' '}
          {!product.isActive && <Chip label="Nieaktywny" size="small" sx={{ ml: 1 }} />}
        </Typography>
        <Typography variant="subtitle1" sx={{ fontWeight: 'light' }}>{product.category}</Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>{product.description}</Typography>

        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Rozmiar</TableCell>
                <TableCell>Kolor</TableCell>
                <TableCell>EAN</TableCell>
                <TableCell align="right">Cena</TableCell>
                <TableCell align="right">Stan / min</TableCell>
                <TableCell>Półka</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {product.variants.map(v => {
                const low = v.quantity < v.minQuantity
                return (
                  <TableRow key={v.id} sx={{ bgcolor: low ? '#fff4e5' : undefined }}>
                    <TableCell>{v.size}</TableCell>
                    <TableCell>{v.color}</TableCell>
                    <TableCell>{v.ean}</TableCell>
                    <TableCell align="right">{formatPrice(v.price)}</TableCell>
                    <TableCell
                      align="right"
                      sx={{ color: low ? 'error.main' : undefined, fontWeight: low ? 'bold' : undefined }}
                    >
                      {v.quantity} / {v.minQuantity}
                    </TableCell>
                    <TableCell>{v.shelfLocation}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>

      <CardActions>
        <Button component={Link} to={`/products/${product.id}/edit`} color="primary">Edytuj</Button>
        <Button onClick={handleDelete} disabled={deleteProduct.isPending} color="error">Usuń</Button>
        <Button onClick={() => navigate('/products')} color="inherit">Wróć do listy</Button>
      </CardActions>
    </Card>
  )
}