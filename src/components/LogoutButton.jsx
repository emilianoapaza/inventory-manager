import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

import { auth } from "../firebase/config";

export default function LogoutButton() {
    const navigate = useNavigate()

    const [cerrandoSesion, setCerrandoSesion] = useState(false)
    const [error, setError] = useState("")

    async function handleLogout() {
        setError("")
        setCerrandoSesion(true)

        try {
            await signOut(auth)
            navigate("/login", { replace: true })
        } catch (error) {
            console.error("Error al cerrar sesion: ", error)
            setError("No se pudo cerrar la sesión. Intenta nuevamente.")
        } finally {
            setCerrandoSesion(false)
        }
    }

    return (
        <div>
            <button
                type="button"
                onClick={handleLogout}
                disabled={cerrandoSesion}
            >
                {cerrandoSesion ? "Cerrando Sesion..." : "Cerrar Sesion"}
            </button>
            {error && <p role="alert">{error}</p>}
        </div>
    )
}