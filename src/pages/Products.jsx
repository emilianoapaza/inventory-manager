import { productosIniciales } from "../data/productos";
import ProductCard from "../components/ProductCard";

function Products() {
    return (
        <main>
            <h1>Productos</h1>
            {productosIniciales.map(producto =>
                (<ProductCard key={producto.id} producto={producto} />)
            )}
        </main>
    )
}

export default Products