import { useState } from "react";
import { productosIniciales } from "../data/productos";
import ProductCard from "../components/ProductCard";

function Products() {
    const [productos, setProductos] = useState(productosIniciales);

    function handleDelete(id) {
        setProductos(productosActuales => {
            return productosActuales.filter(producto => producto.id !== id)
        })
    }

    return (
        <main>
            <h1>Productos</h1>
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