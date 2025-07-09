import { useNavigate } from "react-router-dom";

import { Box, Button, Tooltip, Typography, useTheme } from "@mui/material";
import { TypeAnimation } from "react-type-animation";
import geth from "../assets/full-size/gethin.webp";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useRef } from "react";
import northcodersLogo from "../assets/northcoders.webp";
import brunelLogo from "../assets/brunel.webp";
import brunelLogoDark from "../assets/brunelDark.webp";
import udemy from "../assets/udemy.webp";
import udemyDark from "../assets/udemyDark.webp";

import odin from "../assets/odin.webp";

import { useColorMode } from "../theme/ThemeProvider";
import NavButton from "../components/NavButton";
import ScrollProgress from "../components/ScrollProgress";

import {
  Autoplay,
  Navigation,
  Pagination,
  EffectFade,
  A11y,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const technologyIconsDarkmode = import.meta.glob(
  "../assets/technologies/darkmode/*.png",
  {
    eager: true,
    import: "default",
  }
);

const technologyIconsLightmode = import.meta.glob(
  "../assets/technologies/lightmode/*.png",
  {
    eager: true,
    import: "default",
  }
);

const techIconUrls = Object.entries(technologyIconsLightmode);
const techIconUrlsDark = Object.entries(technologyIconsDarkmode);

const About = () => {
  const intro = useRef(null);
  const intro2 = useRef(null);

  const education = useRef(null);
  const development = useRef(null);
  const technologies = useRef(null);
  const contact = useRef(null);

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
          margin: "70px auto",
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
          2000,
          "",
          2000,
          "Hire me for Web development",
          2000,
          "Hire me for UI/UX design",
          2000,
          "Hire me for Digital Design",
          2000,
          "Hire me for Branding consultancy",
          2000,
          "Hire me for SEO",
          2000,
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
          display: "flex",
          justifyContent: "center",
          animation: "scrollDown 1s infinite",
          flexDirection: "column",
          gap: 1,
          pt: 0,
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
            color: theme.palette.text.secondary,
          }}
        >
          Nice to meet you, my name is Gethin. I am a full-stack web developer
          with a history in design and a real passion for making user-centric
          applications.
        </Typography>
        <Box className="scrollFadeIn">
          <Button
            onClick={() => {
              intro2.current
                ? intro2.current.scrollIntoView({
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
        ref={intro2}
      >
        <Typography
          className="scrollFadeIn"
          sx={{
            px: 4,
            maxWidth: "800px",
            fontSize: { xs: "1em", sm: "1.2em", lg: "1.5vw" },
            fontWeight: 300,
            letterSpacing: "-1px",
            color: theme.palette.text.secondary,
          }}
        >
          In my spare time I enjoy hiking, wild camping, bouldering and cruising
          on my skateboard. I love to travel and have had some great experiences
          riding my motorcycle around and sleeping in my hammock.
        </Typography>
        <Box className="scrollFadeIn">
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
      </Box>

      <Box
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
          gap: { xs: 2, sm: 4 },
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

        <Swiper
          // autoHeight={true}
          className="scrollFadeIn"
          loop={true}
          modules={[Autoplay, Navigation, Pagination, EffectFade]}
          spaceBetween={0}
          slidesPerView={1}
          centeredSlides={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: true,
          }}
          navigation={false}
          pagination={{ clickable: true, dynamicBullets: false }}
          style={{
            width: "100%",
            height: "max-content",
          }}
        >
          <SwiperSlide
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "auto",
              paddingBottom: "40px",
            }}
          >
            <Typography
              sx={{
                px: 4,
                maxWidth: "800px",
                fontSize: { xs: "1em", sm: "1.2em", lg: "1.5vw" },
                fontWeight: 300,
                letterSpacing: "-1px",
                color: theme.palette.text.secondary,
              }}
            >
              I studied Digital Design at Brunel University, gaining a First
              Class Honors Degree, exhibiting at the Young Designer of the Year
              Exhibition and establishing a valuable Design foundation
            </Typography>
          </SwiperSlide>
          <SwiperSlide
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "auto",
              paddingBottom: "40px",
            }}
          >
            <Box>
              <Typography
                sx={{
                  px: 4,
                  maxWidth: "800px",
                  fontSize: "clamp(0.8rem, 1vw, 1.2rem)",
                  fontWeight: 600,
                }}
              >
                Core Modules Included
              </Typography>
              <Typography
                sx={{
                  px: 4,
                  maxWidth: "800px",
                  fontSize: "clamp(0.7rem, 1vw, 1.2rem)",
                  fontWeight: 300,
                  mt: 1,
                }}
              >
                Web Design & Development | Server-side Development | Mobile Web
                Development | Programming for Digital Media | Data Modelling |
                Interaction Design and Usability (UI/UX) | Digital Design Theory
                | Digital Experiences | Business for Digital Creative Industries
                | Experimental Digital Futures | Marketing & Professional
                Development | Video Production | Design Practice | Applied Media
                Aesthetics | Graphics | 3D Design & Animation | Digital
                Photography
              </Typography>
            </Box>
          </SwiperSlide>
        </Swiper>

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
        <Box className="scrollFadeIn">
          <Button
            onClick={() => {
              development.current
                ? development.current.scrollIntoView({
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
        ref={development}
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
          Professional Development
        </Typography>
        <Typography
          className="scrollFadeIn"
          sx={{
            px: 4,
            maxWidth: "800px",
            fontSize: { xs: "1em", sm: "1.2em", lg: "1.5vw" },
            fontWeight: 300,
            letterSpacing: "-1px",
            color: theme.palette.text.secondary,
          }}
        >
          Since graduating I have spent a lot of time self-learning from online
          platforms to widen my skills. I also embarked on a 3 month JavaScript
          development bootcamp to really polish my skills and get to grips with
          more back-end projects.
        </Typography>

        <Box
          className="scrollFadeIn"
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            // height: { xs: "50px", sm: "60px" },
          }}
        >
          <Box
            component="img"
            src={northcodersLogo}
            alt="Brunel University Logo"
            sx={{
              width: "auto",
              height: { xs: "40px", sm: "50px", lg: "60px" },
              margin: "10px",
            }}
          />
          <Box
            component="img"
            className="tech"
            src={mode === "light" ? udemy : udemyDark}
            alt="Udemy Logo"
            sx={{
              width: "auto",
              height: { xs: "40px", sm: "50px", lg: "60px" },
              margin: "10px",
            }}
          />
          <Box
            component="img"
            src={odin}
            alt="The Odin Project Logo"
            sx={{
              width: "auto",
              height: { xs: "40px", sm: "50px", lg: "60px" },
              margin: "10px",
            }}
          />{" "}
        </Box>
        <Box className="scrollFadeIn">
          <Button
            onClick={() => {
              technologies.current
                ? technologies.current.scrollIntoView({
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
        ref={technologies}
      >
        <Typography
          className="scrollFadeIn"
          sx={{
            fontSize: "clamp(1.2rem, 3vw, 1.75rem)",
            fontWeight: 300,
            letterSpacing: "-1px",
          }}
        >
          Technologies
        </Typography>
        <Typography
          className="scrollFadeIn"
          sx={{
            px: 4,
            display: { xs: "none", sm: "block" },
            maxWidth: "800px",
            fontSize: { xs: "1em", sm: "1.2em", lg: "1.5vw" },
            fontWeight: 300,
            letterSpacing: "-1px",
            color: theme.palette.text.secondary,
          }}
        >
          I have experience in a wide range of technologies across both
          front-end and back-end, here is a selection of my most used
        </Typography>

        <Box
          className="scrollFadeIn"
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "1rem",
          }}
        >
          {mode === "light"
            ? techIconUrls.map(([path, url]) => {
                const fileName = path.split("/").pop()?.replace(".png", "");
                return (
                  <Tooltip key={fileName} title={fileName}>
                    <img
                      src={url}
                      alt={fileName}
                      style={{ width: "40px", height: "40px" }}
                    />
                  </Tooltip>
                );
              })
            : techIconUrlsDark.map(([path, url]) => {
                const fileName = path.split("/").pop()?.replace(".png", "");
                return (
                  <Tooltip key={fileName} title={fileName}>
                    <img
                      src={url}
                      alt={fileName}
                      style={{ width: "40px", height: "40px" }}
                    />
                  </Tooltip>
                );
              })}
        </Box>
        <Box className="scrollFadeIn">
          <Button
            onClick={() => {
              contact.current
                ? contact.current.scrollIntoView({
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
        ref={contact}
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
          Want to talk business ?{" "}
        </Typography>

        <Box className="scrollFadeIn">
          <NavButton
            onClick={() => {
              navigate("/contact");
            }}
            sx={{
              mt: 3,
              scrollMarginTop: "10px",
              display: "flex",
              bgcolor: theme.palette.button.main,
              color: theme.palette.secondary.main,
            }}
          >
            Get in touch{" "}
          </NavButton>
        </Box>
      </Box>

      <ScrollProgress />
    </Box>
  );
};

export default About;
