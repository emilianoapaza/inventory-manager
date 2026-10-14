import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";

function Login() {
    const navigate = useNavigate();

    const [modoRegistro, setModoRegistro] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [cargando, setCargando] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()
        setError("")
        setCargando(true)

        try {
            if (modoRegistro) {
                await createUserWithEmailAndPassword(auth, email, password)
            } else {
                await signInWithEmailAndPassword(auth, email, password)
            }
            navigate("/app")
        } catch (error) {

            console.error("Error de autenticación:", error);
            switch (error.code) {
                case "auth/email-already-in-use":
                    setError("Ya existe una cuenta con ese correo.");
                    break;

                case "auth/invalid-email":
                    setError("El correo electrónico no es válido.");
                    break;

                case "auth/weak-password":
                    setError("La contraseña debe tener al menos 6 caracteres.");
                    break;

                case "auth/invalid-credential":
                    setError("El correo o la contraseña son incorrectos.");
                    break;

                case "auth/too-many-requests":
                    setError("Demasiados intentos. Probá nuevamente más tarde.");
                    break;

                default:
                    setError("No se pudo completar la autenticación.");
            }
        } finally {
            setCargando(false)
        }
    }

    function cambiarModo() {
        setModoRegistro(modoActual => !modoActual)
        setError("")
    }

    return (
        <main>
            <h1>{modoRegistro ? "Crear Cuenta" : "Iniciar Sesion"}</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Correo electrónico</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="password">Contraseña</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete={
                            modoRegistro ? "new-password" : "current-password"
                        }
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        minLength={6}
                        required
                    />
                </div>

                {error && <p role="alert">{error}</p>}

                <button type="submit" disabled={cargando}>
                    {cargando
                        ? "Procesando..."
                        : modoRegistro
                            ? "Crear cuenta"
                            : "Iniciar sesión"}
                </button>
            </form>

            <p>
                {modoRegistro
                    ? "¿Ya tenés una cuenta?"
                    : "¿Todavía no tenés una cuenta?"}{" "}
                <button
                    type="button"
                    onClick={cambiarModo}
                    disabled={cargando}
                >
                    {modoRegistro ? "Iniciar sesión" : "Registrarme"}
                </button>
            </p>

        </main>
    );
}

export default Login;