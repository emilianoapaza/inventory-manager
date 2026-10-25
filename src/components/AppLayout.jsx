import { useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";

import { AppBar, Box, Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import ThemeToggleButton from "./ThemeToggleButton";
import LogoutButton from "./LogoutButton";

const drawerWidth = 250

const navigationItems = [
    {
        label: "Panel Principal",
        path: "/app",
        icon: <DashboardOutlinedIcon />,
        end: true
    },
    {
        label: "Productos",
        path: "/app/productos",
        icon: <Inventory2OutlinedIcon />,
        end: false
    }
]

export default function AppLayout() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const currentPage = navigationItems.find((item) =>
        item.end ? location.pathname === item.path : location.pathname.startsWith(item.path)
    )?.label ?? "inventario"

    const closeMobileDrawer = () => setMobileOpen(false)

    const sidebarContent = (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
            }}
        >
            <Box sx={{ px: 3, py: 3 }}>
                <Typography variant="h6" fontWeight={800}>
                    Inventory<span style={{ color: "#818CF8" }}>.</span>
                </Typography>

                <Typography variant="caption" color="text.secondary">
                    GESTIÓN DE INVENTARIO
                </Typography>
            </Box>

            <List sx={{ px: 1.5, pt: 1 }}>
                {navigationItems.map((item) => (
                    <ListItemButton
                        key={item.path}
                        component={NavLink}
                        to={item.path}
                        end={item.end}
                        onClick={closeMobileDrawer}
                        sx={{
                            mb: 0.5,
                            borderRadius: 1,
                            color: "text.secondary",
                            "&.active": {
                                color: "primary.main",
                                bgcolor: "action.selected",
                                "& .MuiListItemIcon-root": {
                                    color: "primary.main",
                                },
                            },
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 40,
                                color: "inherit",
                            }}
                        >
                            {item.icon}
                        </ListItemIcon>

                        <ListItemText
                            primary={item.label}
                        />
                    </ListItemButton>
                ))}
            </List>

            <Box sx={{ flexGrow: 1 }} />

            <Box sx={{ p: 2 }}>
                <LogoutButton />
            </Box>
        </Box>
    );

    return (
        <Box sx={{ display: "flex", minHeight: "100vh" }}>
            {isMobile ? (
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={closeMobileDrawer}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        "& .MuiDrawer-paper": {
                            width: drawerWidth,
                            boxSizing: "border-box",
                            bgcolor: "background.paper",
                        },
                    }}
                >
                    {sidebarContent}
                </Drawer>
            ) : (
                <Drawer
                    variant="permanent"
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        "& .MuiDrawer-paper": {
                            width: drawerWidth,
                            boxSizing: "border-box",
                            bgcolor: "background.paper",
                            borderRight: 1,
                            borderColor: "divider",
                        },
                    }}
                >
                    {sidebarContent}
                </Drawer>
            )}

            <Box sx={{ display: "flex", flexDirection: "column", flex: 1, minWidth: 0 }}>
                <AppBar
                    position="sticky"
                    color="inherit"
                    elevation={0}
                    sx={{
                        bgcolor: "background.default",
                        borderBottom: 1,
                        borderColor: "divider",
                    }}
                >
                    <Toolbar sx={{ gap: 2 }}>
                        {isMobile && (
                            <IconButton
                                onClick={() => setMobileOpen((open) => !open)}
                                aria-label={mobileOpen ? "Cerrar navegación" : "Abrir navegación"}
                            >
                                {mobileOpen ? <CloseIcon /> : <MenuIcon />}
                            </IconButton>
                        )}

                        <Typography
                            variant="h6"
                            component="h1"
                            fontWeight={700}
                            sx={{ flexGrow: 1 }}
                        >
                            {currentPage}
                        </Typography>

                        <ThemeToggleButton />
                    </Toolbar>
                </AppBar>

                <Box
                    component="main"
                    sx={{
                        flex: 1,
                        width: "100%",
                        maxWidth: 1600,
                        mx: "auto",
                        p: { xs: 2, sm: 3, lg: 4 },
                        boxSizing: "border-box",
                    }}
                >
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
}