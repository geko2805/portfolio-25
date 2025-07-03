import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { Box, Typography, useTheme } from "@mui/material";

import projects from "../data/projects.json";
import { loadProjectImages, getThumbnail } from "../utils/loadImages";

const technologyIcons = import.meta.glob("../assets/technologies/*.png", {
  eager: true,
  import: "default",
});

const Project = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [fullSizeImages, setFullSizeImages] = useState([]);
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    const loadProject = async () => {
      const selectedProject = projects.find((p) => p.id === projectId);
      if (selectedProject) {
        const images = await loadProjectImages(projectId);
        setFullSizeImages(images);
        setProject(selectedProject);
      }
    };
    loadProject();
  }, [projectId]);

  if (!project) {
    return <div>Loading...{projectId}</div>;
  }

  return (
    <Box className="project" sx={{ mt: "80px" }}>
      <Typography
        className="fade up"
        sx={{
          fontWeight: 700,
          fontSize: "clamp(2.4em, 6vw, 4.0625rem)",
          fontFamily: "Inconsolata, monospace",
          animationDelay: "0.5s",
          letterSpacing: "-0.15rem",
          //margin: "0 0 1.5rem",
          py: "1.5rem",
          lineHeight: 0.5,
          //   animationName: "fadeInUp",
          //   animationDuration: "2s",
          color: theme.palette.text.main,
          //   animationIterationCount: 1,
          //   animationFillMode: "forwards",
          //   opacity: 0,
          cursor: "default",
          zIndex: 1,
        }}
        variant="h1"
      >
        {project.title}
      </Typography>

      <Typography
        className="fade up delay1"
        sx={{
          fontSize: "clamp(1.2rem, 3vw, 1.75rem)",
          fontWeight: 300,
          mt: "0.5em",
          letterSpacing: "-1px",
          animationName: "fadeInUp",
          animationDuration: "1.5s",

          animationIterationCount: 1,
          animationFillMode: "forwards",
          opacity: 0,
        }}
      >
        {project.type}
      </Typography>
      <Box
        className="fade delay2"
        sx={{
          display: "flex",
          width: "fit-content",
          width: { xs: "100%", sm: "80%", md: "60%", lg: "50%" },
          p: 3,
          //flexWrap: "wrap",
          margin: "auto",
          justifyContent: "center",
          transform: {
            xs: "scale(0.6)",
            sm: "scale(0.7)",
            md: "scale(0.8)",
            lg: "scale(0.9)",
            xl: "scale(1)",
          },
        }}
      >
        {project.technologies &&
          project.technologies.map((icon) => {
            const path = `../assets/technologies/${icon}.png`;
            const imgSrc = technologyIcons[path];

            return (
              <img
                key={icon}
                src={imgSrc}
                alt={icon}
                style={{
                  width: "50px",
                  height: "50px",
                }}
              />
            );
          })}
      </Box>
      <Box
        className="fade delay2"
        sx={{ width: "100%", margin: "auto", maxWidth: "800px" }}
      >
        <img
          src={fullSizeImages[0]}
          width="100%"
          height="100%"
          style={{
            objectFit: "contain",
            maxHeight: "500px",
          }}
        />
      </Box>
    </Box>
  );
};

export default Project;
