import { useNavigate } from "react-router-dom";

import { Box, Typography } from "@mui/material";
import { TypeAnimation } from "react-type-animation";

const About = () => {
  const navigate = useNavigate();

  return (
    <Box className="about">
      <Typography>About...</Typography>
      <TypeAnimation
        sequence={[
          2000,
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
        style={{
          fontSize: "2em",
          display: "block",
          fontFamily: "Inconsolata, monospace",
        }}
        repeat={Infinity}
      />
    </Box>
  );
};

export default About;
