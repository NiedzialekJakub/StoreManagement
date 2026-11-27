import { Box, Typography } from '@mui/material'

export default function ComingSoon({ title }: { title: string }) {
  return (
    <Box sx={{ textAlign: 'center', mt: 8 }}>
      <Typography variant="h4" gutterBottom>{title}</Typography>
      <Typography color="text.secondary">TODO: Magayn i Sprzedaż</Typography>
    </Box>
  )
}