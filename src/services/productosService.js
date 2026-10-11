import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";

export async function obtenerProductos() {
    const referencia = collection(db, "productos")
    const resultados = await getDocs(referencia)
    return resultados.docs.map(documento => ({
        id: documento.id,
        ...documento.data()
    }))
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