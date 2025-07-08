import { useNavigate } from "react-router-dom";

import { Box, Typography, IconButton, Switch, useTheme } from "@mui/material";
import SideDrawer from "./SideDrawer";
import { useColorMode } from "../theme/ThemeProvider";

import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const { mode, setMode, toggleColorMode } = useColorMode();
  const [checked, setChecked] = useState(mode === "dark");
  const handleToggle = () => {
    const newChecked = !checked;
    const newMode = newChecked ? "dark" : "light";
    setMode(newMode);
    setChecked(newChecked);
  };

  return (
    <Box
      className="header"
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: 80,
        //backgroundColor: "red",
        zIndex: 1000,
        // p: 2,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%", // Match parent width
          backdropFilter: "blur(5px)",
          maskImage: `linear-gradient(to top, transparent 0%, ${theme.palette.background.default} 30%, ${theme.palette.background.default} 100%)`,
          WebkitMaskImage: `linear-gradient(to top, transparent 0%, ${theme.palette.background.default} 30%, ${theme.palette.background.default} 100%)`,
          // background: `linear-gradient(to bottom, ${theme.palette.background.transparent}, transparent)`,

          //maskImage: `linear-gradient(to top, transparent 0%, transparent 30%, transparent 100%)`,
          // WebkitMaskImage: `linear-gradient(to top, transparent 0%, transparent 30%, transparent 100%)`,
          // background: `linear-gradient(to bottom, transparent, transparent)`,

          // maskImage: `transparent`,
          // WebkitMaskImage: `transparent`,
          background: `transparent`,

          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          overflow: "hidden",
          px: 2,
        }}
      >
        <Box sx={{ ml: 2 }}>
          <SideDrawer />
        </Box>

        <Box
          component="button"
          onClick={handleToggle}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            m: 1,
            border: "none",
            background: "transparent",
            cursor: "pointer",
          }}
        >
          <LightModeIcon sx={{ color: theme.palette.text.secondary }} />
          <Switch
            checked={checked}
            onChange={handleToggle}
            aria-label="toggle dark mode switch"
            sx={{
              "& .MuiSwitch-switchBase": {
                // Unchecked state
                color: "#fff", // Thumb color
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.1)", // Light gray hover effect
                },
              },
              "& .MuiSwitch-switchBase.Mui-checked": {
                // Checked state
                color: "#a9e7da", // Thumb color
                "&:hover": {
                  backgroundColor: "rgba(33, 150, 243, 0.2)", // Light blue hover effect
                },
              },
              "& .MuiSwitch-track": {
                // Unchecked track
                backgroundColor: theme.palette.accent.main, // Gray
                opacity: 1,
              },
              "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                // Checked track
                backgroundColor: theme.palette.secondary.main, // Blue (e.g., MUI primary blue)
                opacity: 1,
              },
            }}
          />
          <DarkModeIcon sx={{ color: theme.palette.text.secondary }} />
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
