import { Alert, Box, CircularProgress, Grid, Paper, Typography } from '@mui/material'
import ProductList from './ProductList'
import { useProducts } from '../../../lib/hooks/useProducts'

export default function ProductDashboard() {
  const { products, isPending, isError } = useProducts()

  if (isPending) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (isError || !products) {
    return <Alert severity="error">Nie udało się pobrać produktów. Czy API jest uruchomione?</Alert>
  }

  return (
    <Grid container spacing={3}>
      <Grid size={7}>
        <ProductList products={products} />
      </Grid>
      <Grid size={5}>
        <Paper sx={{ borderRadius: 3, p: 3 }}>
          <Typography variant="h6">TODO: Filtry i wyszukiwanie</Typography>
          <Typography color="text.secondary">Zadezydujcie jak to filtrować i wyszukiwać, ja bym wyszukiwał po nazwie to na pewno i nie wiem jescze po czym</Typography>
          <Typography color="text.secondary">w filtrach powiny byc opcje filtrowania czy są braki, bo jako sklep trzeba dostarczyć te braki, wymyślcie własne filtry</Typography>
        </Paper>
      </Grid>
    </Grid>
  )
}