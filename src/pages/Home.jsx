
import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material";
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
                        sx={{
                            mt: 3,
                            transition: "background-position 0.7s ease-in-out, transform 0.2s",
                            background: 'linear-gradient(90deg, #8115d3 0%, #8d2fd5 30%, #a16dc9 50%, #8d2fd5 70%, #8115d3 100%)',
                            backgroundSize: '220% 100%',
                            backgroundPosition: 'left center',
                            '&:hover': {
                                backgroundPosition: 'right center',
                            }
                        }}
                    >Empezar Ahora
                    </Button>
                </Box>

            </Container>
            <Box sx={{ backgroundColor: "custom.main", minHeight: "100vh" }}>

            </Box>
        </>
    );
}

export default Home;