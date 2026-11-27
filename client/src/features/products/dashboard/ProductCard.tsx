import { Card, CardContent, CardActions, Chip, Button } from '@mui/material'
import Typography from '@mui/material/Typography'

type Props ={
    product: Product
}

export default function ProductCard({ product }: Props) {
  return (
        <Card sx={{borderRadius: 3}}>
        <CardContent>
	    <Typography variant="h5">{product.name}</Typography>
            <Typography sx={{color: 'text.secondary', mb: 1}}>{product.category}</Typography>
            <Typography variant="body2">{product.description}</Typography>
            <Typography variant="subtitle1">{product.variants.length} warianty</Typography>
        </CardContent>
        <CardActions sx={{display: 'flex', justifyContent: 'space-between', pb: 2}}>
            <Chip label={product.category} variant="outlined" />
            <Button size="medium" variant="contained">View</Button>
        </CardActions>
    </Card>
  )
}
