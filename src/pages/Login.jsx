
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import {
    Alert,
    Box,
    Button,
    Container,
    Divider,
    InputAdornment,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";

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
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                py: { xs: 3, md: 6 },
                px: { xs: 0, md: 3 }
            }}
        >
            <Container sx={{ px: { xs: 3, sm: 6 } }}>
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                        gap: { xs: 3, md: 6 }
                    }}
                >
                    <Box
                        sx={{
                            display: { xs: "none", md: "flex" },
                            flexDirection: "column",
                            justifyContent: "space-between",
                            p: { md: 4, lg: 6 },
                            borderRadius: 4,
                            minHeight: 560,
                            color: "#FFFFFF",
                            background: "linear-gradient(135deg, #312E81 0%, #4338CA 50%, #6366F1 100%)"
                        }}
                    >
                        <Box
                            sx={{ display: "flex", gap: 2, alignItems: "center", mb: 5 }}
                        >
                            <Box
                                sx={{
                                    display: "grid",
                                    placeItems: "center",
                                    width: 44,
                                    height: 44,
                                    borderRadius: 2.5,
                                    bgcolor: "hsla(0, 0%, 100%, 0.15)"
                                }}
                            >
                                <Inventory2OutlinedIcon />
                            </Box>
                            <Typography >
                                Inventory Manager
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 3
                            }}
                        >
                            <Typography
                                variant="h3"
                                sx={{ mb: 2, lineHeight: 1.2 }}
                            >
                                Tu inventario, bajo control.
                            </Typography>
                            <Typography
                                sx={{ color: "rgba(255,255,255,0.8)", lineHeight: 1.8 }}
                            >
                                Organiza tus productos y mantene la informacion de tu inventario en un solo lugar.
                            </Typography>
                            <Box
                                sx={{
                                    p: 3,
                                    borderRadius: 3,
                                    border: "1px solid  rgba(255,255,255,0.18)",
                                    bgcolor: "#ffffff14",
                                    maxWidth: 390
                                }}
                            >
                                <Typography>
                                    Una gestión más clara.
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        mt: 1,
                                        color: "rgba(255,255,255,0.8)",
                                        lineHeight: 1.7,
                                    }}
                                >
                                    Accede a tu espacio de trabajo y administra tus productos desde una interfaz simple
                                </Typography>
                            </Box>
                        </Box>

                        <Typography
                            sx={{
                                color: "rgba(255,255,255,0.8)", mt: 2
                            }}
                        >
                            INVENTORY MANAGER · GESTIÓN DE INVENTARIO
                        </Typography>
                    </Box>
                    <Paper
                        elevation={0}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            border: 1,
                            borderColor: "divider",
                            borderRadius: 4,
                            bgcolor: "background.paper",
                            p: { xs: 3, sm: 6 }
                        }}
                    >
                        <Box sx={{ mb: 4 }}>
                            <Box
                                sx={{
                                    display: "grid",
                                    placeItems: "center",
                                    width: 44,
                                    height: 44,
                                    borderRadius: 2.5,
                                    bgcolor: "rgba(255,255,255,0.15)",
                                    mb: 3
                                }}
                            >
                                <Inventory2OutlinedIcon />
                            </Box>
                            <Typography variant="h4" gutterBottom>
                                {modoRegistro ? "Crear una Cuenta" : "Bienvenido de nuevo"}
                            </Typography>
                            <Typography>
                                {modoRegistro
                                    ? "Registrate para comenzar a gestionar tu inventario"
                                    : "Ingresá tus credenciales para acceder a tu espacio de trabajo"}
                            </Typography>
                        </Box>
                        <Box
                            component="form"
                            onSubmit={handleSubmit}
                        >
                            <Stack spacing={2.5}>
                                <TextField
                                    label="Correo Electronico"
                                    name="email"
                                    type="email"
                                    value={email}
                                    placeholder="nombre@empresa.com"
                                    required
                                    autoComplete="email"
                                    onChange={(event) => setEmail(event.target.value)}
                                    slotProps={{
                                        input: {
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <AlternateEmailOutlinedIcon
                                                        fontSize="small"
                                                    />
                                                </InputAdornment>
                                            ),
                                        },
                                    }}
                                    disabled={cargando}
                                />
                                <TextField
                                    label="Contraseña"
                                    name="password"
                                    type="password"
                                    value={password}
                                    autoComplete={
                                        modoRegistro ? "new-password" : "current-password"
                                    }
                                    onChange={(event) => setPassword(event.target.value)}
                                    required
                                    slotProps={{
                                        htmlInput: {
                                            minLength: 6
                                        },
                                        input: {
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <LockOutlinedIcon fontSize="small" />
                                                </InputAdornment>
                                            )
                                        }
                                    }}
                                    disabled={cargando}
                                />

                                {error && (
                                    <Alert severity="error" role="alert">
                                        {error}
                                    </Alert>
                                )}

                                <Button
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    disabled={cargando}
                                    endIcon={
                                        !cargando ? <ArrowForwardRoundedIcon /> : undefined
                                    }
                                    sx={{ minHeight: 50 }}
                                >
                                    {cargando ? "Procesando..." : modoRegistro ? "Crear Cuenta" : "Iniciar Sesion"}
                                </Button>
                            </Stack>
                        </Box>

                        <Divider sx={{ my: 3 }} />

                        <Box sx={{
                            display: "flex",
                            flexDirection: { xs: "column", md: "row" },
                            gap: 2,
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <Typography variant="body2">
                                {modoRegistro ? "¿Ya tenes una cuenta?" : "¿Todavia no tenes una cuenta?"}
                            </Typography>
                            <Button
                                variant="outlined"
                                onClick={cambiarModo}
                                disabled={cargando}
                                size="small"
                                sx={{ ":hover": { backgroundColor: "primary.main", color: "background.default" } }}
                            >

                                {modoRegistro ? "Iniciar Sesion" : "Registrarme"}
                            </Button>
                        </Box>
                        <Box sx={{ mt: 3, textAlign: "center" }}>
                            <Button
                                component={RouterLink}
                                to="/"
                                size="small"
                            >
                                Volver al inicio
                            </Button>
                        </Box>
                    </Paper>
                </Box>
            </Container>
        </Box>
    )
}

export default Login;