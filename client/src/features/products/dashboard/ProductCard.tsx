import { Box, Button, Card, CardActions, CardContent, Chip, Typography } from '@mui/material'
import { Link } from 'react-router'

type Props = {
  product: Product
}

export default function ProductCard({ product }: Props) {
  const totalQuantity = product.variants.reduce((sum, v) => sum + v.quantity, 0)
  const lowStock = product.variants.some(v => v.quantity < v.minQuantity)

  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h5">{product.name}</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
          {product.description}
        </Typography>
        <Typography variant="subtitle1">
          Wariantów: {product.variants.length} • na stanie: {totalQuantity} szt.
        </Typography>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'space-between', pb: 2 }}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Chip label={product.category} variant="outlined" />
          {lowStock && <Chip label="Braki" color="warning" />}
        </Box>
        <Button component={Link} to={`/products/${product.id}`} size="medium" variant="contained">
            Zobacz
        </Button>
      </CardActions>
    </Card>
  )
}