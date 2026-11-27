import { useRef, useState, type FormEvent } from 'react'
import axios from 'axios'
import {
  Alert, Box, Button, FormControlLabel, IconButton, Paper, Switch, TextField, Typography
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import { useProducts } from '../../../lib/hooks/useProducts'

type Props = {
  product?: Product
  closeForm: () => void
  onSaved: (id: string) => void
}

type VariantRow = {
  key: number
  id?: string
  ean: string
  sku: string
  size: string
  color: string
  price: string
  minQuantity: string
  shelfLocation: string
}

const emptyRow = (key: number): VariantRow => ({
  key, ean: '', sku: '', size: '', color: '', price: '', minQuantity: '5', shelfLocation: ''
})

const rowFromVariant = (v: ProductVariant, key: number): VariantRow => ({
  key,
  id: v.id,
  ean: v.ean,
  sku: v.sku,
  size: v.size,
  color: v.color,
  price: String(v.price),
  minQuantity: String(v.minQuantity),
  shelfLocation: v.shelfLocation ?? ''
})

const toNumber = (value: string) => Number(value.replace(',', '.'))

function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (!error.response) return 'Brak połączenia z serwerem.'
    const data = error.response.data
    if (data?.detail) return data.detail
    if (data?.errors) return Object.values(data.errors).flat().join(' ')
  }
  return 'Nie udało się zapisać produktu.'
}

export default function ProductForm({ product, closeForm, onSaved }: Props) {
  const isEdit = product !== undefined
  const { createProduct, updateProduct } = useProducts()
  const saving = createProduct.isPending || updateProduct.isPending

  const [name, setName] = useState(product?.name ?? '')
  const [description, setDescription] = useState(product?.description ?? '')
  const [category, setCategory] = useState(product?.category ?? '')
  const [isActive, setIsActive] = useState(product?.isActive ?? true)
  const [rows, setRows] = useState<VariantRow[]>(
    product ? product.variants.map((v, i) => rowFromVariant(v, i)) : [emptyRow(0)]
  )
  const [error, setError] = useState<string | null>(null)
  const nextKey = useRef(1)

  const updateRow = (key: number, field: keyof Omit<VariantRow, 'key' | 'id'>, value: string) => {
    setRows(rows.map(r => (r.key === key ? { ...r, [field]: value } : r)))
  }
  const addRow = () => setRows([...rows, emptyRow(nextKey.current++)])
  const removeRow = (key: number) => setRows(rows.filter(r => r.key !== key))

  const handleSubmit = async (e: FormEvent) => {
      e.preventDefault()
      setError(null)
      try {
        if (product) {
          await updateProduct.mutateAsync({
            id: product.id,
            data: {
              name,
              description: description || undefined,
              category,
              isActive,
              variants: rows.map(r => ({
                id: r.id!,
                price: toNumber(r.price),
                minQuantity: Number(r.minQuantity),
                shelfLocation: r.shelfLocation || undefined
              }))
            }
          })
          onSaved(product.id)
        } else {
          const newId = await createProduct.mutateAsync({
            name,
            description: description || undefined,
            category,
            variants: rows.map(r => ({
              ean: r.ean,
              sku: r.sku,
              size: r.size,
              color: r.color,
              price: toNumber(r.price),
              minQuantity: Number(r.minQuantity),
              shelfLocation: r.shelfLocation || undefined
            }))
          })
          onSaved(newId)
        }
      } catch (err) {
        setError(getErrorMessage(err))
      }
    }

  return (
    <Paper sx={{ borderRadius: 3, padding: 3 }}>
      <Typography variant="h5" gutterBottom color="primary">
        {isEdit ? 'Edycja produktu' : 'Nowy produkt'}
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField label="Nazwa" value={name} onChange={e => setName(e.target.value)} required />
        <TextField
          label="Opis" multiline rows={3}
          value={description} onChange={e => setDescription(e.target.value)}
        />
        <TextField label="Kategoria" value={category} onChange={e => setCategory(e.target.value)} required />

        {isEdit && (
          <FormControlLabel
            control={<Switch checked={isActive} onChange={e => setIsActive(e.target.checked)} />}
            label="Produkt aktywny (widoczny na liście)"
          />
        )}

        <Typography variant="subtitle1">Warianty</Typography>
        {rows.map(row => (
          <Paper key={row.key} variant="outlined" sx={{ p: 2 }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              <TextField size="small" label="EAN" required disabled={isEdit} value={row.ean}
                onChange={e => updateRow(row.key, 'ean', e.target.value)} />
              <TextField size="small" label="SKU" required disabled={isEdit} value={row.sku}
                onChange={e => updateRow(row.key, 'sku', e.target.value)} />
              <TextField size="small" label="Rozmiar" required disabled={isEdit} value={row.size}
                onChange={e => updateRow(row.key, 'size', e.target.value)} />
              <TextField size="small" label="Kolor" required disabled={isEdit} value={row.color}
                onChange={e => updateRow(row.key, 'color', e.target.value)} />
              <TextField size="small" label="Cena (zł)" required value={row.price}
                onChange={e => updateRow(row.key, 'price', e.target.value)} />
              <TextField size="small" label="Minimum" required value={row.minQuantity}
                onChange={e => updateRow(row.key, 'minQuantity', e.target.value)} />
              <TextField size="small" label="Półka" value={row.shelfLocation}
                onChange={e => updateRow(row.key, 'shelfLocation', e.target.value)} />
              {!isEdit && (
                <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
                  <IconButton
                    onClick={() => removeRow(row.key)}
                    disabled={rows.length === 1}
                    aria-label="usuń wariant"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              )}
            </Box>
          </Paper>
        ))}
        {!isEdit && <Button startIcon={<AddIcon />} onClick={addRow}>Dodaj wariant</Button>}

        {error && <Alert severity="error">{error}</Alert>}

        <Box sx={{ display: 'flex', justifyContent: 'end', gap: 3 }}>
          <Button color="inherit" onClick={closeForm}>Anuluj</Button>
          <Button type="submit" color="success" variant="contained" disabled={saving}>
            Zapisz
          </Button>
        </Box>
      </Box>
    </Paper>
  )
}