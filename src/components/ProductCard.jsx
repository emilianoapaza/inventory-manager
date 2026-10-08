function ProductCard({ producto, onDelete }) {
    const { nombre, categoria, precio, stock } = producto
    return (
        <article>
            <h2>{nombre}</h2>
            <p>Categoría: {categoria}</p>
            <p>Precio: {precio}</p>
            <p>Stock: {stock}</p>
            <button onClick={() => onDelete(producto.id)}>Eliminar</button>
        </article>
    )
}

export default ProductCard