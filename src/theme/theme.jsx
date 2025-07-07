import { createTheme } from "@mui/material/styles";
import { lightPalette, darkPalette } from "./palette";

export const getTheme = (mode) => {
  const palette = mode === "dark" ? darkPalette : lightPalette;
  return createTheme({
    palette,
    typography: {
      fontFamily: " 'Lato', Calibri, Arial, sans-serif",
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: "8px",
            //backgroundColor: "rgba(0, 188, 212, 0.5)",
            // backgroundColor: "#87d5fa20",
            color: "#000000",
            backgroundColor: palette.button.main,
            transition: "transform 0.1s",
            "&:hover": {
              transform: "scale(1.02) translateY(-2px)",
            },
          },
          containedPrimary: {
            boxShadow: "none",
          },
        },
      },
      MuiLink: {
        styleOverrides: {
          root: {
            textDecoration: "none",
            color: palette.secondary.main,
            transition: "transform 0.2s",
            "&:hover": {
              //   textDecoration: "underline",
              transform: "translateY(-2px) scale(1.02)",
            },
          },
        },
      },
    },
  });
};
