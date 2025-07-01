import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
  useTheme,
} from "@mui/material";
import { TypeAnimation } from "react-type-animation";
// import ImageGrid from "../components/Grid";
// import Grid from "../components/Grid";
import PortfolioGrid from "../components/PortfolioGrid";

//import all thumbs
const thumbs = import.meta.glob("../assets/thumbs/*.{png,jpg,jpeg,svg}", {
  eager: true,
});

//import all previews
const previews = import.meta.glob("../assets/previews/*.{png,jpg,jpeg,svg}", {
  eager: true,
});

const Projects = () => {
  const navigate = useNavigate();

  const theme = useTheme();

  const items = [
    {
      href: "/projects/theta-timer",
      href2: "https://thetawave.netlify.app",
      iframeLink: "https://thetawave.netlify.app",
      largesrc: previews["../assets/previews/lotus-responsive.png"]?.default,
      thumbnail: thumbs["../assets/thumbs/lotus-responsive.jpg"]?.default,
      title: "Meditation Timer",
      description:
        "A comprehensive meditation timer built in React, where users can create a custom soundscape, store and retrieve session data (firestore), view their history, see session data on weekly or monthly charts, earn badges for reaching milestones and more",
    },
    {
      href: "https://example.com",
      href2: "https://example.com",

      largesrc: previews["../assets/previews/occupy-responsive.png"]?.default,
      thumbnail: "src/assets/thumbs/occupy.jpg",
      title: "Item 2",
      description: "Description for item 2",
    },
    {
      href: "https://example.com",
      href2: "https://example.com",

      largesrc: "src/assets/thumbs/occupy.jpg",
      thumbnail: "src/assets/thumbs/occupy.jpg",
      title: "Item 1",
      description: "Description for item 1",
    },
    {
      href: "https://example.com",
      largesrc: "src/assets/thumbs/occupy.jpg",
      thumbnail: "src/assets/thumbs/occupy.jpg",
      title: "Item 2",
      description: "Description for item 2",
    },
    {
      href: "https://example.com",
      href2: "https://example.com",

      largesrc: "src/assets/thumbs/occupy.jpg",
      thumbnail: "src/assets/thumbs/occupy.jpg",
      title: "Item 1",
      description: "Description for item 1",
    },
    {
      href: "https://example.com",
      largesrc: "src/assets/thumbs/occupy.jpg",
      thumbnail: "src/assets/thumbs/occupy.jpg",
      title: "Item 2",
      description: "Description for item 2",
    },
    {
      href: "https://example.com",
      largesrc: "src/assets/thumbs/occupy.jpg",
      thumbnail: "src/assets/thumbs/inspire.png",
      title: "STEM Inspire",
      description: "Description for item 2",
    },
  ];

  return (
    <Box className="projects" sx={{ mt: "80px" }}>
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: "clamp(2.4em, 6vw, 4.0625rem)",
          fontFamily: "Inconsolata, monospace",
          animationDelay: "0.5s",
          letterSpacing: "-0.15rem",
          margin: "0 0 1.5rem",
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
        variant="h1"
      >
        Projects
      </Typography>

      <Typography
        sx={{
          fontSize: "clamp(1.2rem, 4vw, 1.75rem)",

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
        Collection of Previous Work
      </Typography>

      <Box sx={{ width: "100", position: "relative" }} class="container">
        <PortfolioGrid items={items} />
      </Box>
    </Box>
  );
};

export default Projects;
