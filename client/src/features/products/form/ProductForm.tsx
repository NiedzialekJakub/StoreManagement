import { useRef, useState, type FormEvent } from 'react'
import { Box, Button, IconButton, Paper, TextField, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'

type Props = {
  closeForm: () => void
}

type VariantRow = {
  key: number
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

export default function ProductForm({ closeForm }: Props) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [rows, setRows] = useState<VariantRow[]>([emptyRow(0)])
  const nextKey = useRef(1)

  const updateRow = (key: number, field: keyof Omit<VariantRow, 'key'>, value: string) => {
    setRows(rows.map(r => (r.key === key ? { ...r, [field]: value } : r)))
  }

  const addRow = () => setRows([...rows, emptyRow(nextKey.current++)])
  const removeRow = (key: number) => setRows(rows.filter(r => r.key !== key))

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const payload = {
      name,
      description: description || undefined,
      category,
      variants: rows.map(r => ({
        ean: r.ean,
        sku: r.sku,
        size: r.size,
        color: r.color,
        price: Number(r.price.replace(',', '.')),
        minQuantity: Number(r.minQuantity),
        shelfLocation: r.shelfLocation || undefined
      }))
    }
    console.log(payload)
  }

  return (
    <Paper sx={{ borderRadius: 3, padding: 3 }}>
      <Typography variant="h5" gutterBottom color="primary">
        Nowy produkt
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField label="Nazwa" value={name} onChange={e => setName(e.target.value)} required />
        <TextField
          label="Opis" multiline rows={3}
          value={description} onChange={e => setDescription(e.target.value)}
        />
        <TextField label="Kategoria" value={category} onChange={e => setCategory(e.target.value)} required />

        <Typography variant="subtitle1">Warianty</Typography>
        {rows.map(row => (
          <Paper key={row.key} variant="outlined" sx={{ p: 2 }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              <TextField size="small" label="EAN" required value={row.ean}
                onChange={e => updateRow(row.key, 'ean', e.target.value)} />
              <TextField size="small" label="SKU" required value={row.sku}
                onChange={e => updateRow(row.key, 'sku', e.target.value)} />
              <TextField size="small" label="Rozmiar" required value={row.size}
                onChange={e => updateRow(row.key, 'size', e.target.value)} />
              <TextField size="small" label="Kolor" required value={row.color}
                onChange={e => updateRow(row.key, 'color', e.target.value)} />
              <TextField size="small" label="Cena (zł)" required value={row.price}
                onChange={e => updateRow(row.key, 'price', e.target.value)} />
              <TextField size="small" label="Minimum" required value={row.minQuantity}
                onChange={e => updateRow(row.key, 'minQuantity', e.target.value)} />
              <TextField size="small" label="Półka" value={row.shelfLocation}
                onChange={e => updateRow(row.key, 'shelfLocation', e.target.value)} />
              <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
                <IconButton onClick={() => removeRow(row.key)} disabled={rows.length === 1} aria-label="usuń wariant">
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
          </Paper>
        ))}
        <Button startIcon={<AddIcon />} onClick={addRow}>Dodaj wariant</Button>

        <Box sx={{ display: 'flex', justifyContent: 'end', gap: 3 }}>
          <Button color="inherit" onClick={closeForm}>Anuluj</Button>
          <Button type="submit" color="success" variant="contained">Zapisz</Button>
        </Box>
      </Box>
    </Paper>
  )
}