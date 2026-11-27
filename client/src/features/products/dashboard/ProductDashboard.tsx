import { Grid, List, ListItem, ListItemText } from '@mui/material'

type Props = {
  products: Product[]
}

export default function ProductDashboard({ products }: Props) {
  return (
    <Grid container>
      <Grid size={7}>
        <List>
          {products.map(product => (
            <ListItem key={product.id}>
              <ListItemText
                primary={product.name}
                secondary={`${product.category} • wariantów: ${product.variants.length}`}
              />
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  )
}