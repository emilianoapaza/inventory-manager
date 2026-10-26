import { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";

import { useAuth } from "../context/AuthContext";
import { obtenerProductos } from "../services/productosService";

const STOCK_BAJO = 5;

function AppHome() {
    const { usuario } = useAuth();
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let activo = true;

        async function cargarProductos() {
            if (!usuario?.uid) {
                setProductos([]);
                setError("No se encontró un usuario autenticado.");
                setCargando(false);
                return;
            }

            setCargando(true);
            setError("");

            try {
                const productosObtenidos = await obtenerProductos(usuario.uid);
                if (activo) {
                    setProductos(productosObtenidos);
                }
            } catch (err) {
                console.error("Error al cargar el resumen:", err);
                if (activo) {
                    setError("No se pudo cargar el resumen del inventario.");
                }
            } finally {
                if (activo) {
                    setCargando(false);
                }
            }
        }

        cargarProductos();

        return () => activo = false;
    }, [usuario?.uid]);

    const totalProductos = productos.length;

    const totalUnidades = productos.reduce(
        (total, producto) => total + (Number(producto.stock) || 0),
        0
    );

    const productosStockBajo = productos.filter(
        producto => Number(producto.stock) <= STOCK_BAJO
    ).length;

    const indicadores = [
        {
            titulo: "Productos registrados",
            valor: totalProductos,
            Icono: Inventory2OutlinedIcon,
        },
        {
            titulo: "Unidades disponibles",
            valor: totalUnidades,
            Icono: WidgetsOutlinedIcon,
        },
        {
            titulo: "Productos con stock bajo",
            valor: productosStockBajo,
            Icono: WarningAmberOutlinedIcon,
        },
    ];

    return (
        <Box sx={{ width: "100%", maxWidth: "lg", mx: "auto", p: 3 }}>
            <Typography
                variant="h4"
                component="h1"
                sx={{ fontWeight: "bold", mb: 1 }}
            >
                Panel de administración
            </Typography>

            <Typography color="text.secondary" sx={{ mb: 4 }}>
                Resumen de tu inventario.
            </Typography>

            {cargando ? (
                <Typography role="status">
                    Cargando resumen del inventario...
                </Typography>
            ) : error ? (
                <Typography color="error" role="alert">
                    {error}
                </Typography>
            ) : (
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            sm: "repeat(2, minmax(0, 1fr))",
                            lg: "repeat(3, minmax(0, 1fr))",
                        },
                        gap: 3,
                    }}
                >
                    {indicadores.map(({ titulo, valor, Icono }) => (
                        <Card key={titulo} elevation={2}>
                            <CardContent
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 2,
                                    p: 3,
                                    "&:last-child": { pb: 3 },
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        p: 1.5,
                                        borderRadius: 1.6,
                                        bgcolor: "action.hover",
                                    }}
                                >
                                    <Icono sx={{ color: "primary.main" }} fontSize="large" />
                                </Box>

                                <Box>
                                    <Typography
                                        color="text.secondary"
                                        variant="body2"
                                    >
                                        {titulo}
                                    </Typography>

                                    <Typography
                                        variant="h4"
                                        component="p"
                                        sx={{ fontWeight: "bold" }}
                                    >
                                        {valor}
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            )}
        </Box>
    );
}

export default AppHome;