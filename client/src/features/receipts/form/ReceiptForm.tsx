import { useMemo, useRef, useState, type FormEvent, type KeyboardEvent } from 'react'
import { Link, useNavigate } from 'react-router'
import {
  Alert, Autocomplete, Box, Button, IconButton, MenuItem, Paper, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, TextField, Typography
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { useProducts } from '../../../lib/hooks/useProducts'
import { useSuppliers } from '../../../lib/hooks/useSuppliers'
import { useGoodsReceipts } from '../../../lib/hooks/useGoodsReceipts'
import { findVariantByEan } from '../../../lib/api/variant'
import { getErrorMessage } from '../../../lib/util/error'

type ReceiptLine = {
  variantId: string
  productName: string
  size: string
  color: string
  ean: string
  currentQuantity: number
  quantity: string          // jako tekst, żeby dało się wyczyścić pole przy wpisywaniu
}

// to, czego potrzebujemy, żeby dodać wariant do dokumentu
type Addable = {
  id: string
  productName: string
  size: string
  color: string
  ean: string
  quantity: number          // aktualny stan w magazynie
}

type VariantOption = Addable & { label: string }

const isValidQuantity = (value: string) => /^\d+$/.test(value) && Number(value) >= 1

export default function ReceiptForm() {
  const navigate = useNavigate()
  const { products, isPending: loadingProducts } = useProducts()
  const { suppliers, isPending: loadingSuppliers } = useSuppliers()
  const { createReceipt } = useGoodsReceipts()

  const [supplierId, setSupplierId] = useState('')
  const [invoiceNumber, setInvoiceNumber] = useState('')
  const [lines, setLines] = useState<ReceiptLine[]>([])
  const [scan, setScan] = useState('')
  const [scanProblem, setScanProblem] = useState<{ text: string; notFound: boolean } | null>(null)
  const [pick, setPick] = useState('')
  const [error, setError] = useState<string | null>(null)
  const scanRef = useRef<HTMLInputElement>(null)

  // opcje wyszukiwarki budujemy z produktów, które już mamy w cache
  const options = useMemo<VariantOption[]>(
    () =>
      (products ?? []).flatMap(p =>
        p.variants.map(v => ({
          id: v.id,
          label: `${p.name} • ${v.size} • ${v.color} • ${v.sku}`,
          productName: p.name,
          size: v.size,
          color: v.color,
          ean: v.ean,
          quantity: v.quantity
        }))
      ),
    [products]
  )

  const addVariant = (v: Addable) => {
    setLines(prev => {
      const existing = prev.find(l => l.variantId === v.id)
      if (existing) {
        // ten sam towar drugi raz = +1 do ilości, a nie nowy wiersz
        return prev.map(l =>
          l.variantId === v.id ? { ...l, quantity: String((Number(l.quantity) || 0) + 1) } : l
        )
      }
      return [
        ...prev,
        {
          variantId: v.id,
          productName: v.productName,
          size: v.size,
          color: v.color,
          ean: v.ean,
          currentQuantity: v.quantity,
          quantity: '1'
        }
      ]
    })
  }

  const handleScan = async () => {
    const ean = scan.trim()
    if (!ean) return

    setScan('')            // czyścimy od razu, żeby skaner mógł wpisywać kolejny kod
    setScanProblem(null)

    try {
      const variant = await findVariantByEan(ean)
      if (!variant) {
        setScanProblem({ text: `Kodu ${ean} nie ma w kartotece.`, notFound: true })
      } else if (!variant.productIsActive) {
        setScanProblem({ text: `Produkt „${variant.productName}” jest nieaktywny.`, notFound: false })
      } else {
        addVariant(variant)
      }
    } catch {
      setScanProblem({ text: 'Nie udało się wyszukać kodu. Czy API jest uruchomione?', notFound: false })
    } finally {
      scanRef.current?.focus()
    }
  }

  // Enter w polu skanowania nie może wysłać całego formularza
  const handleScanKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleScan()
    }
  }

  const updateQuantity = (variantId: string, value: string) =>
    setLines(prev => prev.map(l => (l.variantId === variantId ? { ...l, quantity: value } : l)))

  const removeLine = (variantId: string) =>
    setLines(prev => prev.filter(l => l.variantId !== variantId))

  const validQuantity = (l: ReceiptLine) => (isValidQuantity(l.quantity) ? Number(l.quantity) : 0)
  const totalQuantity = lines.reduce((sum, l) => sum + validQuantity(l), 0)
  const canSubmit =
    supplierId !== '' &&
    lines.length > 0 &&
    lines.every(l => isValidQuantity(l.quantity)) &&
    !createReceipt.isPending

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return
    if (!window.confirm('Zatwierdzić przyjęcie? Dokumentu nie będzie można edytować.')) return

    setError(null)
    try {
      const id = await createReceipt.mutateAsync({
        supplierId,
        invoiceNumber: invoiceNumber.trim() || undefined,
        lines: lines.map(l => ({ productVariantId: l.variantId, quantity: Number(l.quantity) }))
      })
      navigate(`/receipts/${id}`)
    } catch (err) {
      setError(getErrorMessage(err, 'Nie udało się zapisać przyjęcia.'))
    }
  }

  return (
    <Paper sx={{ borderRadius: 3, p: 3, maxWidth: 1000, mx: 'auto' }}>
      <Typography variant="h5" color="primary" gutterBottom>
        Nowe przyjęcie (PZ)
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
          <TextField
            select
            required
            label="Dostawca"
            value={supplierId}
            onChange={e => setSupplierId(e.target.value)}
            disabled={loadingSuppliers}
          >
            {(suppliers ?? []).map(s => (
              <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>
            ))}
          </TextField>
          <TextField
            label="Numer faktury (opcjonalnie)"
            value={invoiceNumber}
            onChange={e => setInvoiceNumber(e.target.value)}
          />
        </Box>

        <TextField
          label="Skanuj kod EAN i naciśnij Enter"
          value={scan}
          onChange={e => setScan(e.target.value)}
          onKeyDown={handleScanKeyDown}
          inputRef={scanRef}
          autoFocus
        />

        {scanProblem && (
          <Alert
            severity="warning"
            onClose={() => setScanProblem(null)}
            action={
              scanProblem.notFound ? (
                <Button component={Link} to="/products/new" size="small" color="inherit">
                  Dodaj produkt
                </Button>
              ) : undefined
            }
          >
            {scanProblem.text}
          </Alert>
        )}

        <Autocomplete
          options={options}
          loading={loadingProducts}
          value={null}
          inputValue={pick}
          onInputChange={(_, value, reason) => {
            if (reason !== 'reset') setPick(value)
          }}
          onChange={(_, option) => {
            if (option) {
              addVariant(option)
              setPick('')
            }
          }}
          getOptionLabel={o => o.label}
          isOptionEqualToValue={(a, b) => a.id === b.id}
          noOptionsText="Brak pasujących produktów"
          renderInput={params => (
            <TextField {...params} label="Albo wyszukaj produkt (nazwa, rozmiar, kolor, SKU)" />
          )}
        />

        {lines.length === 0 ? (
          <Typography color="text.secondary">
            Brak pozycji. Zeskanuj kod EAN albo wyszukaj produkt powyżej.
          </Typography>
        ) : (
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Produkt</TableCell>
                  <TableCell>EAN</TableCell>
                  <TableCell align="right">Stan obecny</TableCell>
                  <TableCell align="right" sx={{ width: 110 }}>Ilość</TableCell>
                  <TableCell align="right">Stan po</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {lines.map(l => (
                  <TableRow key={l.variantId}>
                    <TableCell>
                      {l.productName}
                      <Typography variant="body2" color="text.secondary">
                        {l.size} • {l.color}
                      </Typography>
                    </TableCell>
                    <TableCell>{l.ean}</TableCell>
                    <TableCell align="right">{l.currentQuantity}</TableCell>
                    <TableCell align="right">
                      <TextField
                        type="number"
                        size="small"
                        value={l.quantity}
                        onChange={e => updateQuantity(l.variantId, e.target.value)}
                        error={!isValidQuantity(l.quantity)}
                        slotProps={{ htmlInput: { min: 1, step: 1 } }}
                      />
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                      {l.currentQuantity + validQuantity(l)}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => removeLine(l.variantId)} aria-label="usuń pozycję">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <Typography>
          Razem: <b>{totalQuantity} szt.</b> w {lines.length} poz.
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        <Box sx={{ display: 'flex', justifyContent: 'end', gap: 3 }}>
          <Button color="inherit" onClick={() => navigate('/receipts')}>Anuluj</Button>
          <Button type="submit" color="success" variant="contained" disabled={!canSubmit}>
            Zatwierdź przyjęcie
          </Button>
        </Box>
      </Box>
    </Paper>
  )
}