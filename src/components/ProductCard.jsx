function ProductCard({ producto, onDelete, onEdit }) {
    const { nombre, categoria, precio, stock, id } = producto
    return (
        <article>
            <h2>{nombre}</h2>
            <p>Categoría: {categoria}</p>
            <p>Precio: {precio}</p>
            <p>Stock: {stock}</p>
            <p>id: {id}</p>
            <button type="button" onClick={() => onEdit(producto)}>Editar</button>
            <button onClick={() => onDelete(producto.id)}>Eliminar</button>
        </article>
    )
}

export default ProductCard