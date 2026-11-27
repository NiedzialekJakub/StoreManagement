import { Box, Button, Paper, TextField, Typography } from "@mui/material";

export default function ProductForm() {
  return (
    <Paper sx={{borderRadius: 3, padding: 3}}>
        <Typography variant="h5" gutterBottom color="primary">Create Product</Typography>
        <Box component="form" sx={{display: 'flex', flexDirection: 'column', gap: 3}}>
            <TextField label="Name" />
            <TextField label="Description" multiline rows={4} />
            <TextField label="Category" />
            <TextField label="Variant" />
            <Box sx={{display: 'flex', gap: 3, justifyContent: 'end'}}>
                <Button color='inherit'>Cancel</Button>
                <Button color='success'>Submit</Button>
            </Box>
        </Box>
    </Paper>
  )
}
