import {
  Alert, Box, Button, CircularProgress, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Typography
} from '@mui/material'
import { useNavigate, useParams } from 'react-router'
import { useGoodsReceipts } from '../../../lib/hooks/useGoodsReceipts'
import { formatDateTime } from '../../../lib/util/util'

export default function ReceiptDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { receipt, isLoadingReceipt } = useGoodsReceipts(id)

  if (isLoadingReceipt) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (!receipt) return <Alert severity="warning">Nie znaleziono dokumentu.</Alert>

  const total = receipt.lines.reduce((sum, l) => sum + l.quantity, 0)

  return (
    <Paper sx={{ borderRadius: 3, p: 3, maxWidth: 1000, mx: 'auto' }}>
      <Typography variant="h5" color="primary">{receipt.number}</Typography>
      <Typography color="text.secondary">
        {formatDateTime(receipt.receivedAt)} • {receipt.supplierName}
        {receipt.invoiceNumber ? ` • faktura ${receipt.invoiceNumber}` : ''}
      </Typography>

      <TableContainer sx={{ mt: 2 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Produkt</TableCell>
              <TableCell>Rozmiar</TableCell>
              <TableCell>Kolor</TableCell>
              <TableCell>EAN</TableCell>
              <TableCell align="right">Ilość</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {receipt.lines.map(l => (
              <TableRow key={l.productVariantId}>
                <TableCell>{l.productName}</TableCell>
                <TableCell>{l.size}</TableCell>
                <TableCell>{l.color}</TableCell>
                <TableCell>{l.ean}</TableCell>
                <TableCell align="right">{l.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography sx={{ mt: 2 }}>
        Razem: <b>{total} szt.</b> w {receipt.lines.length} poz.
      </Typography>

      <Box sx={{ mt: 2 }}>
        <Button onClick={() => navigate('/receipts')} color="inherit">Wróć do listy</Button>
      </Box>
    </Paper>
  )
}