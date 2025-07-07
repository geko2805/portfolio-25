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
    transparent: "##f4f6f8b4",

    project: "#ffffff",
    projectMain: "#f4f6f8",
  },
  text: {
    primary: "#1e1e1e",
    secondary: "#4a4a4a",
  },
  accent: {
    main: "#ffbe16",
  },
  iframe: {
    main: "#ffffff",
  },
  button: {
    main: "#87d5fa66",
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
    //paper: "#121212",
    // paper: "#0b0b0b",
    //paper: "#000f14",
    //paper: "#000f14",
    paper: "#112233",

    default: "#010101",
    project: "#010101",
    projectMain: "#112233",

    transparent: "#121212b4",
  },
  text: {
    primary: "#ffffff",
    secondary: "#cccccc",
  },
  accent: {
    main: "#607d8b",
    // main: "rgba(0,188,207,0.8)",
  },
  iframe: {
    main: "#112233",
  },
  button: {
    main: "#a9e7da",
  },
};
