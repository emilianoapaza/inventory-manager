import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

import { useColorMode } from "../context/ThemeContext";

export default function ThemeToggleButton() {
    const { mode, toggleColorMode } = useColorMode()
    const esModoClaro = mode === "light";

    return (
        <Tooltip title={esModoClaro ? "Dark" : "Light"}>
            <IconButton
                onClick={toggleColorMode}
                aria-label={esModoClaro ? "Activar modo oscuro" : "Activar modo claro"}
                sx={{
                    bgcolor: "background.paper",
                    color: "text.primary",
                    border: 1,
                    borderColor: "divider",
                    boxShadow: 1,
                    "&:hover": {
                        bgcolor: "action.hover",
                    },
                }}>
                {esModoClaro ? (
                    <DarkModeOutlinedIcon />
                ) : (
                    <LightModeOutlinedIcon />
                )}
            </IconButton>
        </Tooltip>
    )
}
