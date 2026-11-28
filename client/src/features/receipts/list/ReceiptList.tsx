import {
  Alert, Box, Button, CircularProgress, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Typography
} from '@mui/material'
import { Link, useNavigate } from 'react-router'
import { useGoodsReceipts } from '../../../lib/hooks/useGoodsReceipts'
import { formatDateTime } from '../../../lib/util/util'

export default function ReceiptList() {
  const { receipts, isPending, isError } = useGoodsReceipts()
  const navigate = useNavigate()

  if (isPending) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (isError || !receipts) {
    return <Alert severity="error">Nie udało się pobrać przyjęć. Czy API jest uruchomione?</Alert>
  }

  return (
    <Paper sx={{ borderRadius: 3, p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" color="primary">Przyjęcia towaru (PZ)</Typography>
        <Button component={Link} to="/receipts/new" variant="contained" color="warning">
          Nowe przyjęcie
        </Button>
      </Box>

      {receipts.length === 0 ? (
        <Typography color="text.secondary">Brak przyjęć. Dodaj pierwsze, żeby zwiększyć stan magazynu.</Typography>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Numer</TableCell>
                <TableCell>Data</TableCell>
                <TableCell>Dostawca</TableCell>
                <TableCell>Faktura</TableCell>
                <TableCell align="right">Pozycji</TableCell>
                <TableCell align="right">Sztuk</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {receipts.map(r => (
                <TableRow
                  key={r.id}
                  hover
                  sx={{ cursor: 'pointer' }}
                  onClick={() => navigate(`/receipts/${r.id}`)}
                >
                  <TableCell sx={{ fontWeight: 'bold' }}>{r.number}</TableCell>
                  <TableCell>{formatDateTime(r.receivedAt)}</TableCell>
                  <TableCell>{r.supplierName}</TableCell>
                  <TableCell>{r.invoiceNumber}</TableCell>
                  <TableCell align="right">{r.linesCount}</TableCell>
                  <TableCell align="right">{r.totalQuantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  )
}