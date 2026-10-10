import { productosIniciales } from "../data/productos";

export function obtenrProductos() {
    return productosIniciales
}

export function crearProducto(datosProducto) {
    return {
        id: crypto.randomUUID(),
        ...datosProducto
    }
}

export function actualizarProducto(productos, id, datosActualizados) {
    return productos.map((producto) =>
        producto.id === id
            ? { ...producto, ...datosActualizados }
            : producto
    )
}

export function eliminarProducto(productos, id) {
    return productos.filter((producto) => producto.id !== id);
}