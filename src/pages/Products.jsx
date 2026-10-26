import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { validarProducto } from "../utilis/validarProducto";
import {
    obtenerProductos,
    crearProducto,
    actualizarProducto,
    eliminarProducto,
} from "../services/productosService";
import { useAuth } from "../context/AuthContext";

import { Box, Button, TextField, Typography, Paper } from "@mui/material";

function Products() {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [guardando, setGuardando] = useState(false);
    const [error, setError] = useState('');
    const [formulario, setFormulario] = useState({
        nombre: "",
        categoria: "",
        precio: "",
        stock: "",
    });
    const [errores, setErrores] = useState({});
    const [productoEditando, setProductoEditando] = useState(null);
    const [errorOperacion, setErrorOperacion] = useState("");
    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    // Estados para busqueda
    const [busqueda, setBusqueda] = useState("");
    const [categoriaFiltro, setCategoriaFiltro] = useState("Todas");

    const { usuario } = useAuth();

    useEffect(() => {
        async function cargarProductos() {
            if (!usuario?.uid) return;
            try {
                const productosObtenidos = await obtenerProductos(usuario.uid);
                setProductos(productosObtenidos);
                setError("");
            } catch (err) {
                console.error("Error al cargar productos:", err);
                setError("No se pudieron cargar los productos.");
            } finally {
                setCargando(false);
            }
        }
        cargarProductos();
    }, [usuario?.uid]);

    const categorias = [
        ...new Set(productos.map(producto => producto.categoria.trim())
            .filter(Boolean)
        )].sort((a, b) => a.localeCompare(b))

    const productosFiltrados = productos.filter(producto => {
        const coincideNombre = producto.nombre.toLowerCase().includes(busqueda.trim().toLowerCase())

        const coincideCategoria = categoriaFiltro === "Todas" || producto.categoria === categoriaFiltro

        return coincideNombre && coincideCategoria
    })

    async function handleDelete(id) {
        try {
            await eliminarProducto(usuario.uid, id);
            setProductos(productosActuales =>
                productosActuales.filter(producto => producto.id !== id)
            );
        } catch (err) {
            console.error("Error al eliminar el producto:", err);
            setErrorOperacion("No se pudo eliminar el producto.");
        }
    }

    function handleEdit(producto) {
        const { nombre, categoria, precio, stock } = producto;
        setProductoEditando(producto);
        setFormulario({
            nombre: nombre,
            categoria: categoria,
            precio: String(precio),
            stock: String(stock),
        });
        setErrores({});
        setMostrarFormulario(true)
    }

    function handleCancelEdit() {
        setProductoEditando(null);
        setFormulario({
            nombre: "",
            categoria: "",
            precio: "",
            stock: "",
        });
        setErrores({});
        setMostrarFormulario(false)
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const nuevosErrores = validarProducto(formulario);
        setErrores(nuevosErrores);

        if (Object.keys(nuevosErrores).length > 0) {
            return;
        }

        const { nombre, categoria, precio, stock } = formulario;
        const datosProducto = {
            nombre: nombre.trim(),
            categoria: categoria.trim(),
            precio: Number(precio),
            stock: Number(stock),
        };

        try {
            setGuardando(true);

            if (productoEditando) {
                const productoActualizado = await actualizarProducto(
                    usuario.uid, productoEditando.id, datosProducto
                );
                setProductos(productosActuales =>
                    productosActuales.map(producto =>
                        producto.id === productoActualizado.id
                            ? { ...producto, ...productoActualizado }
                            : producto
                    )
                );
            } else {
                const nuevoProducto = await crearProducto(usuario.uid, datosProducto);
                setProductos(productosActuales => [...productosActuales, nuevoProducto]);
            }

            handleCancelEdit()
        } catch (err) {
            console.error("Error al guardar el producto:", err);
            setErrorOperacion(
                productoEditando ? "No se pudieron guardar los cambios del producto" : "No se pudo guardar el producto."
            );
        } finally {
            setGuardando(false);
        }
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setFormulario(formularioActual => ({
            ...formularioActual,
            [name]: value
        }));
    }

    return (
        <Box sx={{ maxWidth: "lg", mx: "auto", textAlign: { xs: "center", sm: "left" } }}>
            <Typography variant="h3" component="h1" sx={{ fontSize: "2.5rem", textAlign: "center" }}>
                Productos
            </Typography>

            {cargando && <p>Cargando productos...</p>}
            {!cargando && error && <p role="alert">{error}</p>}
            {errorOperacion && <p role="alert">{errorOperacion}</p>}

            {!mostrarFormulario ? (
                <>
                    <Button
                        variant="contained"
                        onClick={() => { setMostrarFormulario(true); setErrores({}); }}
                        sx={{ m: 3 }}
                    >
                        Agregar Producto
                    </Button>

                    <Box
                        sx={{
                            display: "flex",
                            gap: 2,
                            flexWrap: "wrap",
                            px: 3,
                            mt: 2,
                        }}
                    >
                        <TextField
                            label="Buscar por nombre"
                            value={busqueda}
                            onChange={e => setBusqueda(e.target.value)}
                            size="small"
                            sx={{ flex: "1 1 220px" }}
                        />

                        <TextField
                            select
                            label="Filtrar por categoría"
                            value={categoriaFiltro}
                            onChange={e => setCategoriaFiltro(e.target.value)}
                            size="small"
                            sx={{ flex: "1 1 220px" }}
                            slotProps={{
                                select: {
                                    native: true,
                                },
                            }}
                        >
                            <option value="Todas">Todas las categorías</option>

                            {categorias.map(categoria => (
                                <option key={categoria} value={categoria}>
                                    {categoria}
                                </option>
                            ))}
                        </TextField>
                    </Box>

                    {!cargando && !error && (
                        <Box
                            sx={{ display: "flex", justifyContent: "center", gap: 3, flexWrap: "wrap", py: 3 }}
                        >
                            {productos.length === 0 ?
                                <p>No hay productos registrados</p>
                                : productosFiltrados.length === 0 ? (
                                    <p>No se encontraron productos con esos filtros.</p>
                                ) :
                                    productosFiltrados.map(producto => (
                                        <ProductCard
                                            key={producto.id}
                                            producto={producto}
                                            onDelete={handleDelete}
                                            onEdit={handleEdit}
                                        />
                                    ))
                            }
                        </Box>
                    )}
                </>
            ) : (
                <Paper
                    component="form"
                    onSubmit={handleSubmit}
                    elevation={3}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2.5,
                        maxWidth: 450,
                        mx: "auto",
                        my: 4,
                        p: 4,
                        textAlign: "left"
                    }}
                >
                    <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                        {productoEditando ? "Editar Producto" : "Nuevo Producto"}
                    </Typography>

                    <TextField
                        id="nombre"
                        name="nombre"
                        label="Nombre"
                        variant="outlined"
                        fullWidth
                        required
                        value={formulario.nombre}
                        onChange={handleChange}
                        error={Boolean(errores.nombre)}
                        helperText={errores.nombre}
                    />

                    <TextField
                        id="categoria"
                        name="categoria"
                        label="Categoría"
                        variant="outlined"
                        fullWidth
                        required
                        value={formulario.categoria}
                        onChange={handleChange}
                        error={Boolean(errores.categoria)}
                        helperText={errores.categoria}
                    />

                    <TextField
                        id="precio"
                        name="precio"
                        label="Precio"
                        type="number"
                        variant="outlined"
                        fullWidth
                        required
                        value={formulario.precio}
                        onChange={handleChange}
                        error={Boolean(errores.precio)}
                        helperText={errores.precio}
                    />

                    <TextField
                        id="stock"
                        name="stock"
                        label="Stock"
                        type="number"
                        variant="outlined"
                        fullWidth
                        required
                        value={formulario.stock}
                        onChange={handleChange}
                        error={Boolean(errores.stock)}
                        helperText={errores.stock}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        fullWidth
                        disabled={guardando}
                        sx={{ mt: 1 }}
                    >
                        {guardando
                            ? "Guardando..."
                            : (productoEditando ? "Guardar cambios" : "Agregar producto")}
                    </Button>

                    <Button
                        type="button"
                        variant="outlined"
                        color="inherit"
                        fullWidth
                        onClick={handleCancelEdit}
                    >
                        Cancelar
                    </Button>
                </Paper>
            )}
        </Box>
    );
}

export default Products;