import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    console.log('AuthProvider')
    const [usuario, setUsuario] = useState(null)
    const [cargandoSesion, setCargandoSesion] = useState(true)

    useEffect(() => {
        const cancelarSuscripcion = onAuthStateChanged(auth, (usuarioActual) => {
            setUsuario(usuarioActual)
            setCargandoSesion(false)
        })
        return cancelarSuscripcion
    }, [])

    return (
        <AuthContext.Provider value={{ usuario, cargandoSesion }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const contexto = useContext(AuthContext)
    if (contexto === null) {
        throw new Error("useAuth debe utilizarse dentro de AuthProvider.");
    }
    return contexto
}