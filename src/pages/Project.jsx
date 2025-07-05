import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { Box, Button, Typography, useTheme } from "@mui/material";

import projects from "../data/projects.json";
import {
  loadProjectImages,
  getThumbnail,
  getProjectPdf,
} from "../utils/loadImages";
import { useColorMode } from "../theme/ThemeProvider";

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

const technologyIconsDarkmodeLarge = import.meta.glob(
  "../assets/technologies/darkmode-large/*.png",
  {
    eager: true,
    import: "default",
  }
);

const technologyIconsLightmodeLarge = import.meta.glob(
  "../assets/technologies/lightmode-large/*.png",
  {
    eager: true,
    import: "default",
  }
);

const Project = () => {
  const { mode } = useColorMode();

  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [fullSizeImages, setFullSizeImages] = useState([]);
  const [pdfFile, setPdfFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    const loadProject = async () => {
      setLoading(true);
      setError(null);

      try {
        const selectedProject = projects.find((p) => p.id === projectId);
        if (!selectedProject) {
          throw new Error(`No project found for ID: ${projectId}`);
        }
        const images = await loadProjectImages(projectId);
        let pdf = null;
        if (selectedProject.pdf) {
          pdf = await getProjectPdf(projectId);
          console.log(`Loaded PDF for ${projectId}:`, pdf);
        }
        setFullSizeImages(images);
        setPdfFile(pdf);
        setProject(selectedProject);
      } catch (err) {
        console.error(`Error loading project ${projectId}:`, err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadProject();
  }, [projectId]);

  if (loading) {
    return (
      <Box sx={{ mt: "80px", textAlign: "center" }}>
        <Typography variant="h5">Loading...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ mt: "80px", textAlign: "center" }}>
        <Typography variant="h5" color="error">
          {error}
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate("/projects")}
          sx={{ mt: 2 }}
        >
          Back to Projects
        </Button>
      </Box>
    );
  }

  return (
    <Box className="project" sx={{ mt: "80px", mb: "40px" }}>
      <Typography
        className="fade up"
        sx={{
          fontWeight: 700,
          fontSize: "clamp(2.4em, 6vw, 3.0625rem)",
          fontFamily: "Inconsolata, monospace",
          animationDelay: "0.5s",
          letterSpacing: "-0.15rem",
          //margin: "0 0 1.5rem",
          p: "1.5rem",
          lineHeight: "2.4rem",
          color: theme.palette.text.main,
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
        }}
      >
        {project.type}
      </Typography>
      <Box
        className="fade delay2"
        sx={{
          display: "flex",
          gap: 2,
          width: "fit-content",
          width: { xs: "100%", sm: "90%", md: "65%", lg: "50%" },
          p: 3,
          flexWrap: "wrap",
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
            const pathLM = `../assets/technologies/lightmode-large/${icon}.png`;
            const imgSrcLM = technologyIconsLightmodeLarge[pathLM];
            const pathDM = `../assets/technologies/darkmode-large/${icon}.png`;
            const imgSrcDM = technologyIconsDarkmodeLarge[pathDM];

            return (
              <img
                key={icon}
                src={mode === "light" ? imgSrcLM : imgSrcDM}
                alt={icon}
                style={{
                  width: "auto",
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

      <Box
        className="fade delay2"
        sx={{ width: "100%", margin: "auto", maxWidth: "800px" }}
      >
        {fullSizeImages.slice(1).map((img, index) => (
          <img
            key={index}
            src={img}
            width="100%"
            height="100%"
            alt={`${project.title} image ${index + 1}`}
            loading="lazy"
          />
        ))}
      </Box>

      {pdfFile && (
        <Box sx={{ width: "100%", maxWidth: "800px", margin: "auto" }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Project Document
          </Typography>
          <embed
            src={pdfFile}
            type="application/pdf"
            width="100%"
            height="600px"
            style={{ borderRadius: "8px", border: "1px solid #ddd" }}
          />
          <Button
            variant="contained"
            href={pdfFile}
            download={`${project.title}.pdf`}
            sx={{ mt: 2 }}
          >
            Download PDF
          </Button>
        </Box>
      )}

      {project.videoLink && (
        // <Box
        //   sx={{
        //     width: {
        //       xs: "100%",
        //     },
        //     height: "100%",
        //     margin: "auto",
        //   }}
        // >
        //   <iframe
        //     width="100%"
        //     height="56.25%"
        //     src={`https://www.youtube.com/embed/${project.videoLink}?si=a7_wv5_cLO7LiGb8`}
        //     title="YouTube video player"
        //     frameborder="0"
        //     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        //     referrerpolicy="strict-origin-when-cross-origin"
        //     allowfullscreen
        //   ></iframe>
        // </Box>

        <Box
          sx={{
            width: "100%",
            maxWidth: "800px",
            maxHeight: "450px",

            position: "relative",
            height: 0,
            pb: "min(56.25%,450px)", // 16:9 aspect ratio (9/16 = 0.5625)
            overflow: "hidden",
            margin: "auto",
          }}
        >
          <Box
            component="iframe"
            title="YouTube Video"
            src={`https://www.youtube.com/embed/${project.videoLink}?si=a7_wv5_cLO7LiGb8`}
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              border: "none",
              transition: "opacity 0.4s",
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default Project;
