import { useState } from 'react'
import { Alert, Box, CircularProgress, Container, CssBaseline } from '@mui/material'
import NavBar from './NavBar'
import ProductDashboard from '../../features/products/dashboard/ProductDashboard'
import { useProducts } from '../../lib/hooks/useProducts'

function App() {
  const { products, isPending, isError } = useProducts()
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined)
  const [editMode, setEditMode] = useState(false)

  // produkt zawsze z aktualnej listy, więc po edycji dane są świeże
  const selectedProduct = products?.find(p => p.id === selectedId)

  const handleSelectProduct = (id: string) => {
    setSelectedId(id)
    setEditMode(false)
  }

  const handleCancelSelectProduct = () => setSelectedId(undefined)

  const handleOpenForm = (id?: string) => {
    setSelectedId(id)
    setEditMode(true)
  }

  const handleFormClose = () => setEditMode(false)

  const handleSaved = (id: string) => {
    setSelectedId(id)
    setEditMode(false)
  }

  return (
    <Box sx={{ bgcolor: '#eeeeee', minHeight: '100vh' }}>
      <CssBaseline />
      <NavBar openForm={handleOpenForm} />
      <Container maxWidth="xl" sx={{ mt: 3 }}>
        {isPending && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
            <CircularProgress />
          </Box>
        )}
        {isError && (
          <Alert severity="error">Nie udało się pobrać produktów. Czy API jest uruchomione?</Alert>
        )}
        {products && (
          <ProductDashboard
            products={products}
            selectProduct={handleSelectProduct}
            cancelSelectProduct={handleCancelSelectProduct}
            selectedProduct={selectedProduct}
            editMode={editMode}
            openForm={handleOpenForm}
            closeForm={handleFormClose}
            onSaved={handleSaved}
          />
        )}
      </Container>
    </Box>
  )
}

export default App