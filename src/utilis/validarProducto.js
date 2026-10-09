export function validarProducto(producto) {
    const errores = {};

    if (!producto.nombre.trim()) {
        errores.nombre = "El nombre es obligatorio.";
    }

    if (!producto.categoria.trim()) {
        errores.categoria = "La categoría es obligatoria.";
    }

    if (
        producto.precio === "" ||
        !Number.isFinite(Number(producto.precio)) ||
        Number(producto.precio) <= 0
    ) {
        errores.precio = "El precio debe ser mayor que cero.";
    }

    if (
        producto.stock === "" ||
        !Number.isInteger(Number(producto.stock)) ||
        Number(producto.stock) < 0
    ) {
        errores.stock = "El stock debe ser un entero igual o mayor que cero.";
    }

    return errores;
}