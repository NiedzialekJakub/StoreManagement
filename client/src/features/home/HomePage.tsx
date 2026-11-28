import { Box, Button, Typography } from '@mui/material'
import { Link } from 'react-router'

export default function HomePage() {
  return (
    <Box sx={{ textAlign: 'center', mt: 8 }}>
      <Typography variant="h3" gutterBottom>POSAdvanced</Typography>
      <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
        System kasowy i magazynowy
      </Typography>
      <Button component={Link} to="/products" variant="contained" size="large">
        Przejdź do magazynu
      </Button>
    </Box>
  )
}