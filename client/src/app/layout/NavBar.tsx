import { AppBar, Box, Button, Container, MenuItem, MenuList, Toolbar, Typography } from '@mui/material'
import StorefrontIcon from '@mui/icons-material/Storefront'
import { Link, NavLink } from 'react-router'
import MenuItemLink from '../shared/components/MenuItemLink'

export default function NavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundImage: 'linear-gradient(135deg, #182a73, #218aae 69%, #20a7ac 89%)' }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <MenuList sx={{ display: 'flex', padding: 0 }}>
              <MenuItem component={NavLink} to="/" sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <StorefrontIcon fontSize="large" />
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>POSAdvanced</Typography>
              </MenuItem>
            </MenuList>

            <MenuList sx={{ display: 'flex', gap: 2, padding: 0 }}>
              <MenuItemLink to="/products">Produkty</MenuItemLink>
              <MenuItemLink to="/warehouse">Magazyn</MenuItemLink>
              <MenuItemLink to="/sales">Sprzedaż</MenuItemLink>
            </MenuList>

            <Button component={Link} to="/products/new" size="large" variant="contained" color="warning">
              Dodaj produkt
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  )
}