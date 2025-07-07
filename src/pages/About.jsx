import { useNavigate } from "react-router-dom";

import { Box, Button, Typography, useTheme } from "@mui/material";
import { TypeAnimation } from "react-type-animation";
import geth from "../assets/full-size/gethin.webp";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useRef } from "react";
import northcodersLogo from "../assets/northcoders.webp";
import brunelLogo from "../assets/brunel.webp";
import brunelLogoDark from "../assets/brunelDark.webp";
import { useColorMode } from "../theme/ThemeProvider";
const About = () => {
  const intro = useRef(null);
  const education = useRef(null);
  const development = useRef(null);

  const { mode } = useColorMode();

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
        About me
      </Typography>

      <Box
        className="fade up delay1"
        sx={{
          margin: "80px auto",
          display: "flex",
          justifyContent: "center",
          width: "clamp(150px, 30vw, 250px)",
          height: "clamp(150px, 30vw, 250px)",
          backgroundImage: `url(${geth})`, // ✅ correct usage
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          borderRadius: "50%",
        }}
      ></Box>

      <Box
        className="fade delay1"
        component={TypeAnimation}
        sequence={[
          2000,
          "Hi, I'm  Gethin :)",
          1000,
          "",
          1000,
          "Hire me for digital design",
          1000,
          "Hire me for web development",
          1000,
          "Hire me for UI/UX design",
          1000,
          "Hire me for branding consultancy",
          1000,
        ]}
        wrapper="span"
        speed={50}
        sx={{
          fontSize: { xs: "1em", sm: "1.2em", md: "2vw" },
          display: "block",
          fontFamily: "Inconsolata, monospace",
        }}
        repeat={Infinity}
      />

      <Box
        sx={{
          // position: "fixed",
          // bottom: "70px",
          // left: "50%",
          // transform: "translateX(-50%)",
          // margin: "auto",
          // animation: "scrollDown2 1s infinite",
          display: "flex",
          justifyContent: "center",
          animation: "scrollDown 1s infinite",
          flexDirection: "column",
          gap: 1,
          pt: 4,
          m: 6,
          alignItems: "center",
        }}
      >
        <Button
          className="fade up delay1"
          onClick={() => {
            intro.current
              ? intro.current.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                })
              : "";
          }}
          sx={{
            mt: 3,
            scrollMarginTop: "10px",
            display: "flex",
            bgcolor: theme.palette.button.main,
            color: theme.palette.secondary.main,
          }}
        >
          <ArrowDownwardIcon />
        </Button>
      </Box>

      <Box
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
          gap: 4,
        }}
        ref={intro}
      >
        <Typography
          className="scrollFadeIn"
          sx={{
            px: 4,
            maxWidth: "800px",

            fontSize: { xs: "1em", sm: "1.2em", lg: "1.5vw" },
            fontWeight: 300,
            letterSpacing: "-1px",
            color: theme.palette.text.seondary,
          }}
        >
          Nice to meet you, my name is Gethin. I am a full-stack web developer
          with a history in design and a real passion for making user-centric
          applications
        </Typography>

        <Button
          onClick={() => {
            education.current
              ? education.current.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                })
              : "";
          }}
          sx={{
            mt: 3,
            display: "flex",
            bgcolor: theme.palette.button.main,
            color: theme.palette.secondary.main,
            animation: "scrollDown 1s infinite",
          }}
        >
          <ArrowDownwardIcon />
        </Button>
      </Box>

      <Box
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
          gap: 4,
        }}
        ref={education}
      >
        <Typography
          className="scrollFadeIn"
          sx={{
            fontSize: "clamp(1.2rem, 3vw, 1.75rem)",
            fontWeight: 300,
            // mt: 1,
            letterSpacing: "-1px",
          }}
        >
          Education
        </Typography>

        <Typography
          className="scrollFadeIn"
          sx={{
            fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
            fontWeight: 300,
            mt: 1,
            letterSpacing: "-1px",
          }}
        >
          I studied Digital Design at Brunel University, gaining a First Class
          Honors Degree and a valuable Design foundation
        </Typography>
        <Typography
          className="scrollFadeIn"
          sx={{
            fontSize: "clamp(0.8rem, 1vw, 1.2rem)",
            fontWeight: 300,
            mt: 1,
            letterSpacing: "-1px",
          }}
        >
          Core modules included: Web Design & Development | Server-side
          Development | Mobile Web Development | Programming for Digital Media |
          Data Modelling | Interaction Design and Usability (UI/UX) | Digital
          Design Theory | Digital Experiences | Business for Digital Creative
          Industries | Experimental Digital Futures | Marketing & Professional
          Development | Video Production | Design Practice | Applied Media
          Aesthetics | Graphics | 3D Design & Animation | Digital Photography
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            height: { xs: "50px", sm: "60px", md: "65px", lg: "70px" },
          }}
        >
          <img
            className="tech"
            src={mode === "light" ? brunelLogo : brunelLogoDark}
            alt="Brunel University Logo"
            style={{
              width: "auto",
              height: "100%",
              margin: "10px",
            }}
          />
        </Box>
      </Box>

      <Box sx={{ mt: 6, mb: 15 }}>
        <Typography
          className="scrollFadeIn"
          sx={{
            fontSize: "clamp(1.2rem, 3vw, 1.75rem)",
            fontWeight: 300,
            // mt: 1,
            letterSpacing: "-1px",
          }}
        >
          Professional Development
        </Typography>
        <Typography
          className="scrollFadeIn"
          sx={{
            fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
            fontWeight: 300,
            mt: 1,
            letterSpacing: "-1px",
          }}
        >
          Since graduating I have spend a lot of time self-learning from online
          platforms to widen my skills. I also embarked on a 3 month JavaScript
          development bootcamp to really polish my skills and get to grips with
          more back-end projects.
        </Typography>
      </Box>

      <Box sx={{ mb: 15 }}>Hello</Box>
    </Box>
  );
};

export default About;
