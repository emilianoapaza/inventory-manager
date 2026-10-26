import { collection, doc, getDocs, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/config";


export async function obtenerProductos(uid) {

    if (!uid) {
        throw new Error("Se requiere un usuario autenticado")
    }

    const referencia = collection(db, "usuarios", uid, "productos")
    const resultados = await getDocs(referencia)
    return resultados.docs.map(documento => ({
        id: documento.id,
        ...documento.data()
    }))
}

export async function crearProducto(uid, datosProducto) {
    if (!uid) {
        throw new Error("Se requiere un usuario autenticado.");
    }
    const referencia = collection(db, "usuarios", uid, "productos");
    const documento = await addDoc(referencia, datosProducto);
    return {
        id: documento.id,
        ...datosProducto
    }
}

export async function actualizarProducto(uid, id, datosActualizados) {

    if (!uid) {
        throw new Error("Se requiere un usuario autenticado")
    }

    if (!id) {
        throw new Error("Se requiere ID del producto")
    }

    const referencia = doc(
        db,
        "usuarios",
        uid,
        "productos",
        id
    );

    await updateDoc(referencia, datosActualizados)

    return { id, ...datosActualizados }

}

export async function eliminarProducto(uid, id) {
    if (!uid) {
        throw new Error("Se requiere un usuario autenticado")
    }

    if (!id) {
        throw new Error("Se requiere el id del producto")
    }

    const referencia = doc(
        db,
        "usuarios",
        uid,
        "productos",
        id
    )

    await deleteDoc(referencia)
}