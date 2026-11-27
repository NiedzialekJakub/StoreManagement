import {
  Button, Card, CardActions, CardContent, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Typography
} from '@mui/material'
import { formatPrice } from '../../../lib/util/util'
import { useProducts } from '../../../lib/hooks/useProducts'

type Props = {
  product: Product
  cancelSelectProduct: () => void
  openForm: (id: string) => void
}

export default function ProductDetail({ product, cancelSelectProduct, openForm }: Props) {
  const { deleteProduct } = useProducts()

  const handleDelete = () => {
  if (window.confirm(`Usunąć produkt „${product.name}”? Zniknie z listy, a historia sprzedaży zostanie zachowana.`)) {
    deleteProduct.mutate(product.id)
  }
}

  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h5">{product.name}</Typography>
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
        <Button onClick={() => openForm(product.id)} color="primary">Edytuj</Button>
        <Button onClick={cancelSelectProduct} color="inherit">Zamknij</Button>
        <Button onClick={handleDelete} disabled={deleteProduct.isPending} color="error">Usuń</Button>
      </CardActions>
    </Card>
  )
}