import { useState } from "react";
import { productosIniciales } from "../data/productos";
import ProductCard from "../components/ProductCard";
import { validarProducto } from "../utilis/validarProducto";

function Products() {
    const [productos, setProductos] = useState(productosIniciales);
    const [formulario, setFormulario] = useState({
        nombre: "",
        categoria: "",
        precio: "",
        stock: "",
    })
    const [errores, setErrores] = useState({})

    function handleDelete(id) {
        setProductos(productosActuales => {
            return productosActuales.filter(producto => producto.id !== id)
        })
    }

    function handleSubmit(e) {
        e.preventDefault()

        const nuevosErrores = validarProducto(formulario);
        setErrores(nuevosErrores)

        if (Object.keys(nuevosErrores).length > 0) {
            return
        }

        const { nombre, categoria, precio, stock } = formulario;

        const nuevoProducto = {
            id: crypto.randomUUID(),
            nombre: nombre.trim(),
            categoria: categoria.trim(),
            precio: Number(precio),
            stock: Number(stock)
        }

        setProductos(productos => {
            return [...productos, nuevoProducto]
        })

        setFormulario({
            nombre: "",
            categoria: "",
            precio: "",
            stock: "",
        });

        setErrores({})
    }

    function handleChange(e) {
        const { name, value } = e.target
        setFormulario(formularioActual => ({
            ...formularioActual,
            [name]: value
        }))
    }

    return (
        <main>
            <h1>Productos</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="nombre">Nombre</label>
                    <input id="nombre" name="nombre" value={formulario.nombre} onChange={handleChange} required />
                    {errores.nombre && (
                        <p role="alert">{errores.nombre}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="categoria">Categoría</label>
                    <input id="categoria" name="categoria" value={formulario.categoria} onChange={handleChange} required />
                    {errores.categoria && (
                        <p role="alert">{errores.categoria}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="precio">Precio</label>
                    <input id="precio" name="precio" type="number" value={formulario.precio} onChange={handleChange} required />
                    {errores.precio && (
                        <p role="alert">{errores.precio}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="stock">Stock</label>
                    <input id="stock" name="stock" type="number" value={formulario.stock} onChange={handleChange} required />
                    {errores.stock && (
                        <p role="alert">{errores.stock}</p>
                    )}
                </div>

                <button type="submit">Agregar producto</button>
            </form>

            <div className="product-list">
                {productos.length === 0 ? <p>No hay productos registrados</p> :
                    productos.map(producto => (
                        <ProductCard key={producto.id} producto={producto} onDelete={handleDelete} />
                    ))
                }
            </div>
        </main>
    )
}

export default Products