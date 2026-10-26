import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material"

function ProductCard({ producto, onDelete, onEdit }) {
    const { nombre, categoria, precio, stock } = producto
    return (
        <Card sx={{ maxWidth: { xs: 350, sm: 270 }, width: "100%" }}>

            <CardMedia
                component="img"
                alt="producto"
                image="https://i.ibb.co/wh8zJYvL/producto.png"
            />
            <CardContent

                sx={{ display: "flex", flexDirection: "column", gap: 1, textAlign: "left" }}
            >
                <Typography
                    component="h2"
                    sx={{
                        m: 0,
                        fontSize: "1.4rem"
                    }}
                >
                    {nombre}
                </Typography>

                <Typography>
                    Categoría: {categoria}
                </Typography>
                <Typography>
                    Precio: {precio}
                </Typography>
                <Typography>
                    Stock: {stock}
                </Typography>

            </CardContent>
            <CardActions
            >
                <Button
                    size="small"
                    type="button"
                    onClick={() => onEdit(producto)}
                    variant="outlined"
                    fullWidth
                >
                    Editar
                </Button>
                <Button
                    fullWidth
                    size="small"
                    onClick={() => onDelete(producto.id)}
                    variant="contained"
                >
                    Eliminar
                </Button>
            </CardActions>
        </Card>
    )
}

export default ProductCard