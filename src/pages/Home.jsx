import { useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";

// import Logo from "../assets/images/lotus5.png";
import { Box, Typography, useTheme } from "@mui/material";
import NavButton from "../components/NavButton";
import EastIcon from "@mui/icons-material/East";
const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
      }}
    >
      {/* <img src={Logo} alt="Lotus" className="home-image" /> */}

      <Typography
        variant="h1"
        sx={{
          fontWeight: 700,
          fontSize: "clamp(2.4em, 6vw, 4.0625rem)",
          fontFamily: "Inconsolata, monospace",
          animationDelay: "0.5s",
          letterSpacing: "-0.15rem",
          //margin: "0 0 1.5rem",
          py: "1.5rem",
          lineHeight: 0.5,
          animationName: "fadeInUp",
          animationDuration: "2s",
          color: theme.palette.text.main,

          animationIterationCount: 1,
          animationFillMode: "forwards",
          opacity: 0,
          cursor: "default",
          zIndex: 1,
        }}
      >
        Gethin Jones
      </Typography>

      <Typography
        sx={{
          fontSize: "clamp(1.2rem, 3vw, 1.75rem)",

          fontWeight: 300,
          mt: "0.5em",
          letterSpacing: "-1px",
          animationName: "fadeInUp",
          animationDuration: "1.5s",
          animationDelay: "1s",
          animationIterationCount: 1,
          animationFillMode: "forwards",
          opacity: 0,
        }}
      >
        Full-stack Developer
      </Typography>

      <Typography
        variannt="h4"
        sx={{
          //fontSize: "1rem",
          fontSize: "clamp(0.9rem, 2vw, 1.1rem)",

          fontWeight: 600,
          mx: "auto",
          mt: "2.5em",
          width: { xs: "80%", md: "50%" },

          textAlign: "center",
          letterSpacing: "-0.5px",
          animationName: "fadeIn",
          animationDuration: "2s",
          animationDelay: "1.8s",
          animationIterationCount: 1,
          animationFillMode: "forwards",
          opacity: 0,
        }}
      >
        Professional, accessible{" "}
        <span
          className="yellow"
          style={{
            backgroundColor: theme.palette.accent.main,
            padding: "2px 3px 3px 2px",
          }}
        >
          web design & development.
        </span>{" "}
      </Typography>

      <Box
        sx={{
          mt: "8vh",
          mx: "auto",
          width: { xs: "80%", md: "50%" },
          animationName: "fadeIn",
          animationDuration: "2s",
          animationDelay: "2s",
          animationIterationCount: 1,
          animationFillMode: "forwards",
          opacity: 0,
          height: "50px",
        }}
      >
        <TypeAnimation
          sequence={[
            2000,
            "",
            1000,
            "Web enthusiast specialising in user centric design...",
            1000,
            "Web enthusiast specialising in UI/UX...",
            1000,
            "Web enthusiast specialising in full-stack applications...",
            1000,
            "Web enthusiast specialising in modern responsive layouts...",
            1000,
            "Web enthusiast specialising in SEO...",
            2000,
            "Web enthusiast specialising in Utility first styling...",
            1000,
            "",
          ]}
          wrapper="span"
          speed={50}
          style={{
            fontSize: "1rem",
            fontWeight: 200,
            fontFamily: "Inconsolata, monospace",

            textAlign: "center",
            letterSpacing: "0px",
          }}
          repeat={Infinity}
        />
      </Box>

      <Box
        sx={{
          p: 6,
          animationName: "fadeIn",
          animationDuration: "2s",
          animationDelay: "1.8s",
          animationIterationCount: 1,
          animationFillMode: "forwards",
          opacity: 0,
        }}
      >
        <NavButton
          variant="contained"
          // href={selectedItem.href2}
          onClick={() => {
            navigate("/projects");
          }}
          target="_blank"
          rel="noopener noreferrer"
          endIcon={<EastIcon />}
          sx={{
            backgroundColor: "lightblue",
            color: "white",
            textTransform: "uppercase",
            fontWeight: 200,
            "&:hover": { backgroundColor: "skyblue" },
          }}
        >
          VIEW PROJECTS
        </NavButton>
      </Box>
    </Box>
  );
};

export default Home;
