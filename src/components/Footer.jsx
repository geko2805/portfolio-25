import { useNavigate } from "react-router-dom";

import { Box, Typography, IconButton, Link, useTheme } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import ArticleIcon from "@mui/icons-material/Article";
import GitHubIcon from "@mui/icons-material/GitHub";
const Footer = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box
      className="footer"
      sx={{
        bottom: 0,
        left: 0,
        width: "100%",
        height: "60px",
        p: 2,
        display: "flex",
        alignItems: "center",
        position: "fixed",
        zIndex: 10000,
        overflow: "hidden",
      }}
    >
      <Box
        sx={(theme) => ({
          position: "absolute",
          top: 0,
          left: 0,

          height: "100%",
          width: "100%",
          backdropFilter: "blur(5px)",
          maskImage: `linear-gradient(to bottom, transparent 0%, ${theme.palette.background.default} 20%, ${theme.palette.background.default} 100%)`,
          WebkitMaskImage: `linear-gradient(to bottom, transparent 0%, ${theme.palette.background.default} 20%, ${theme.palette.background.default} 100%)`,
          background: `linear-gradient(to top, ${theme.palette.background.default}, transparent)`,
        })}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            display: "flex",
            alignItems: "center",
            height: "100%",
            mt: 0.5,
          }}
        >
          <Box
            id="socials"
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
              gap: { xs: 2, sm: 3, md: 4, lg: 5 },
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <Link
              href="https://www.linkedin.com/in/gethin-jones-8b6957a8/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: theme.palette.text.secondary,
                fontSize: "16px",
                display: { xs: "flex", sm: "flex" },
                gap: "5px",
                justifyContent: "center",
                alignItems: "center",

                borderRadius: "5px",
              }}
            >
              <GitHubIcon
                sx={{ color: theme.palette.text.primary, fontSize: "16px" }}
              />{" "}
              GitHub
            </Link>
            <Link
              href="https://www.linkedin.com/in/gethin-jones-8b6957a8/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: theme.palette.text.secondary,
                fontSize: "16px",
                display: { xs: "flex", sm: "flex" },
                gap: "5px",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "5px",
              }}
            >
              <LinkedInIcon sx={{ color: "#0077b5", fontSize: "16px" }} />{" "}
              LinkedIn
            </Link>
            <Link
              href="https://www.linkedin.com/in/gethin-jones-8b6957a8/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: theme.palette.text.secondary,
                fontSize: "16px",
                display: { xs: "flex", sm: "flex" },
                gap: "5px",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "5px",
              }}
            >
              <ArticleIcon
                sx={{ color: theme.palette.text.primary, fontSize: "16px" }}
              />{" "}
              CV
            </Link>
          </Box>

          <Box sx={{ marginLeft: "auto", mr: 2 }}>
            {/* <Link
              href="https://www.linkedin.com/in/gethin-jones-8b6957a8/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: theme.palette.text.secondary,
                fontSize: "16px",
                display: { xs: "flex", sm: "flex" },
                gap: "5px",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "5px",
              }}
            >
              <ArticleIcon
                sx={{ color: theme.palette.text.primary, fontSize: "16px" }}
              />{" "}
              CV
            </Link> */}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
