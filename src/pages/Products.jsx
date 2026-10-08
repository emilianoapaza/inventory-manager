import { productosIniciales } from "../data/productos";
import ProductCard from "../components/ProductCard";

function Products() {
    return (
        <main>
            <h1>Productos</h1>
            <div className="product-list">
                {productosIniciales.map(producto =>
                    (<ProductCard key={producto.id} producto={producto} />)
                )}
            </div>
        </main>
    )
}

export default Products