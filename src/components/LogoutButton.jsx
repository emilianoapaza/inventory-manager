import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

import { auth } from "../firebase/config";

import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Button } from "@mui/material";

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
            <Button
                variant="outlined"
                color="inherit"
                startIcon={<LogoutOutlinedIcon />}
                fullWidth
                onClick={handleLogout}
                disabled={cerrandoSesion}
            >
                {cerrandoSesion ? "Cerrando Sesion..." : "Cerrar Sesion"}
            </Button>
            {error && <p role="alert">{error}</p>}
        </div>
    )
}