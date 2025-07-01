// palette.jsx (export palettes as plain objects, not full themes)

export const lightPalette = {
  mode: "light",
  primary: {
    main: "#00bcd4",
  },
  secondary: {
    main: "#607d8b",
  },
  background: {
    default: "#f4f6f8",
    paper: "#ffffff",
    transparent: "rgba(255,255,255,0.5)",
  },
  text: {
    primary: "#1e1e1e",
    secondary: "#4a4a4a",
  },
  accent: {
    main: "#ffbe16",
  },
};

export const darkPalette = {
  mode: "dark",
  primary: {
    main: "#00bcd4",
  },
  secondary: {
    main: "#607d8b",
  },
  background: {
    default: "#121212",
    paper: "#1e1e1e",
    transparent: "rgba(0,0,0,0.5)",
  },
  text: {
    primary: "#ffffff",
    secondary: "#cccccc",
  },
  accent: {
    main: "#607d8b",
  },
};
