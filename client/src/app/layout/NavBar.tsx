import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material'
import StorefrontIcon from '@mui/icons-material/Storefront'

type Props = {
  openForm: () => void
}

export default function NavBar({ openForm }: Props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundImage: 'linear-gradient(135deg, #182a73, #218aae 69%, #20a7ac 89%)' }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <StorefrontIcon fontSize="large" />
              <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                POSAdvanced
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button sx={{ fontSize: '1.2rem', color: 'white', fontWeight: 'bold' }}>
                Produkty
              </Button>
              <Button sx={{ fontSize: '1.2rem', color: 'white', fontWeight: 'bold' }}>
                Magazyn
              </Button>
              <Button sx={{ fontSize: '1.2rem', color: 'white', fontWeight: 'bold' }}>
                Sprzedaż
              </Button>
            </Box>

              <Button onClick={openForm} size="large" variant="contained" color="warning">
                Dodaj produkt
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  )
}