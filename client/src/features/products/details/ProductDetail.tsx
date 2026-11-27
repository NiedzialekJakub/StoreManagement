import { Card, CardMedia, CardContent, Typography, CardActions, Button } from "@mui/material";

type Props = {
  product: Product;
};

export default function ProductDetail({ product }: Props) {
  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardMedia
        component="img"
        src={`/images/${product.name}.jpg`}
      />
      <CardContent>
        <Typography variant="h5">{product.name}</Typography>
        <Typography variant="subtitle1" sx={{ fontWeight: "light" }}>
          {product.category}
        </Typography>
        <Typography variant="body1">{product.description}</Typography>
      </CardContent>
      <CardActions>
        <Button color="primary">Edit</Button>
        <Button color="inherit">Cancel</Button>
      </CardActions>
    </Card>
  );
}