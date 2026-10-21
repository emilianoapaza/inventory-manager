
import { AppBar, Box, Button, Container, List, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function Home() {
    return (
        <>
            <AppBar
                position="static"
                color="transparent"
                elevation={0}
                sx={{ borderBottom: 1, borderColor: "divider" }}
            >
                <Container maxWidth="lg">
                    <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
                        <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
                            Inventory Manager
                        </Typography>

                        <Button
                            component={Link}
                            to="/login"
                            variant="outlined"
                            disableElevation
                        >
                            Log In
                        </Button>
                    </Toolbar>
                </Container>
            </AppBar>
            <Container maxWidth="md" sx={{ p: 15 }}>

                <Box sx={{ textAlign: "center" }} >
                    <Typography
                        variant="h3"
                        component="h1"
                        gutterBottom
                        sx={{ fontWeight: 900, textWrap: "balance" }}
                    >
                        Gestiona tu inventario de forma Rapida y Automatizada en un solo lugar
                    </Typography>

                    <Button
                        component={Link}
                        to="/login"
                        variant="contained"
                        sx={{ mt: 3 }}
                    >
                        Empezar Ahora
                    </Button>
                </Box>

            </Container>
            <Box sx={{ backgroundColor: "custom.main", minHeight: "100vh" }}>

            </Box>
        </>
    );
}

export default Home;