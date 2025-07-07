import { useNavigate } from "react-router-dom";

import { Box, Typography, Button, useTheme } from "@mui/material";

import { useState } from "react";

import cv from "../assets/pdfs/Gethin Jones CV.pdf";

const Header = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "800px",
        margin: "auto",
        mt: "80px",
        mb: "40px",
      }}
    >
      <Typography
        className="fade up"
        sx={{
          fontWeight: 700,
          fontSize: "clamp(2.4em, 6vw, 4.0625rem)",
          fontFamily: "Inconsolata, monospace",
          letterSpacing: "-0.15rem",
          margin: "0 0 1.5rem",
          lineHeight: 0.5,
          color: theme.palette.text.main,
          cursor: "default",
          zIndex: 1,
        }}
        variant="h1"
      >
        C.V.
      </Typography>
      <embed
        className="fade up delay1"
        src={cv}
        type="application/pdf"
        width="100%"
        height="600px"
        style={{
          borderRadius: "8px",
          border: "1px solid #ddd",
          marginTop: "20px",
        }}
      />
      <Button
        variant="contained"
        href={cv}
        download={`Gethin Jones CV.pdf`}
        sx={{ mt: 2 }}
      >
        Download PDF
      </Button>
    </Box>
  );
};

export default Header;
