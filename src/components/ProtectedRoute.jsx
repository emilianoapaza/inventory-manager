import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
    const { usuario, cargandoSesion } = useAuth()

    if (cargandoSesion) {
        return <p>Verificando Sesion...</p>
    }
    if (!usuario) {
        return <Navigate to="/login" replace />;
    }
    return children
}