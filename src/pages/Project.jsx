import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  styled,
  Typography,
  useTheme,
} from "@mui/material";

import projects from "../data/projects.json";
import {
  loadProjectImages,
  getThumbnail,
  getProjectPdf,
} from "../utils/loadImages";
import { useColorMode } from "../theme/ThemeProvider";

import northcodersLogo from "../assets/northcoders.webp";
import brunelLogo from "../assets/brunel.webp";
import brunelLogoDark from "../assets/brunelDark.webp";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import GitHubIcon from "@mui/icons-material/GitHub";
import LaunchIcon from "@mui/icons-material/Launch";

//  Swiper core and required modules
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

const StyledSwiperContainer = styled("div")(({ theme }) => ({
  // Target the Swiper pagination bullets
  "& .swiper-pagination-bullet": {
    backgroundColor: theme.palette.secondary.main,
    // opacity: 1,
  },
  "& .swiper-pagination-bullet-active": {
    backgroundColor: theme.palette.secondary.main,
  },
}));

import Preview from "../components/Preview";
import NavButton from "../components/NavButton";

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
  const scrollDown = useRef(null);
  const topOfPage = useRef(null);

  useEffect(() => {
    const loadProject = async () => {
      setLoading(true);
      setError(null);
      window.scrollTo(0, 0);

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
      <Box sx={{ textAlign: "center" }}>
        <CircularProgress
          size="20px"
          sx={{ color: "theme.palette.secondary.main" }}
        />

        <Typography variant="h6">Loading...</Typography>
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
    <Box
      ref={topOfPage}
      className="project"
      sx={{
        pb: "50px",
        bgcolor: theme.palette.background.project,
        width: "100%",
        top: 0,
        position: "absolute",
      }}
    >
      <Box sx={{ mt: "80px", position: "relative" }}>
        <Typography
          className="fade up"
          sx={{
            fontWeight: 700,
            fontSize: "clamp(2.4em, 6vw, 3.0625rem)",
            fontFamily: "Inconsolata, monospace",
            animationDelay: "0.5s",
            letterSpacing: "-0.15rem",
            //margin: "0 0 1.5rem",
            p: "0.7rem",
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
            // mt: 1,
            letterSpacing: "-1px",
          }}
        >
          {project.type}
        </Typography>

        <Button
          className="slideIn delay3"
          onClick={() => {
            navigate(-1);
          }}
          sx={{
            zIndex: 300,
            mt: 3,
            ml: "40px",
            display: "flex",
          }}
          startIcon={<ArrowBackIcon />}
        >
          Back
        </Button>

        <Box
          className="fade delay2"
          sx={{
            width: "100%",
            margin: "auto",
            maxWidth: "800px",
            position: "relative",
          }}
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
      <Box
        className="fade delay3"
        sx={{ bgcolor: theme.palette.background.projectMain }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            animation: "scrollDown 1s infinite",
          }}
        >
          <Button
            ref={scrollDown}
            onClick={() => {
              scrollDown.current
                ? scrollDown.current.scrollIntoView({
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
            p: { xs: 0, sm: 2 },
            width: { xs: "100%", sm: "90%", md: "80%", lg: "70%" },
            maxWidth: "800px",
            margin: "auto",
          }}
        >
          {project.company && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",

                height: { xs: "50px", sm: "60px", md: "65px", lg: "70px" },
              }}
            >
              <img
                className="tech"
                src={
                  project.company
                    ? project.company === "Brunel"
                      ? mode === "light"
                        ? brunelLogo
                        : brunelLogoDark
                      : northcodersLogo
                    : ""
                }
                alt={project.company ? project.company : ""}
                style={{
                  width: "auto",
                  height: "100%",
                  margin: "10px",
                }}
              />
            </Box>
          )}

          {project.iframeLink && (
            <>
              <Typography
                sx={{ mt: 2, pt: 2, fontSize: "1.4rem" }}
                variant="h6"
              >
                Live Preview
              </Typography>
              <Preview selectedProject={project} applyPadding={true} />
              {project.githubLinks && (
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    p: 2,
                    gap: 2,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {Object.keys(project.githubLinks).map((link) => {
                    return (
                      <Button
                        startIcon={<GitHubIcon />}
                        onClick={() => {
                          window.open(project.githubLinks[link]);
                        }}
                        key={link}
                      >
                        {link}
                      </Button>
                    );
                  })}
                </Box>
              )}
            </>
          )}

          <Typography
            sx={{
              px: { xs: 2, sm: 0 },
              pt: 2,
              mt: 2,
              fontSize: { xs: "1.1rem", sm: "1.2rem" },
            }}
          >
            {project.description}
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              //width: "fit-content",
              width: { xs: "100%", sm: "90%", md: "90%", lg: "90%" },
              py: 6,
              px: { xs: 0, md: 2, lg: 3 },
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
            sx={{
              display: "flex",
              gap: { xs: 4, sm: 5, md: 6 },
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              pb: 6,
            }}
          >
            {fullSizeImages && fullSizeImages.length > 1 && (
              <Box
                sx={{
                  mt: 2,
                  width: "100%",
                  maxWidth: "800px",
                  "&:hover": {
                    transform: { xs: "scale(1)", sm: "scale(1.05)" },
                  },
                }}
              >
                <img
                  className="grow"
                  src={fullSizeImages[1]}
                  alt={`${project.title} image 2`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain", // Ensure image maintains aspect ratio
                  }}
                  loading="lazy"
                />
              </Box>
            )}

            {project.text1 && (
              <Typography
                className="scrollFadeIn"
                sx={{
                  px: { xs: 2, sm: 0 },
                  pt: 2,
                  fontSize: { xs: "1.1rem", sm: "1.2rem" },
                }}
              >
                {project.text1}
              </Typography>
            )}

            {fullSizeImages && fullSizeImages.length > 2 && (
              <Box
                sx={{
                  mt: 2,
                  width: "100%",
                  maxWidth: "800px",
                  "&:hover": {
                    transform: { xs: "scale(1)", sm: "scale(1.05)" },
                  },
                }}
              >
                <img
                  className="grow"
                  src={fullSizeImages[2]}
                  alt={`${project.title} image 3`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain", // Ensure image maintains aspect ratio
                  }}
                  loading="lazy"
                />
              </Box>
            )}

            {project.text2 && (
              <Typography
                className="scrollFadeIn"
                sx={{
                  px: { xs: 2, sm: 0 },
                  fontSize: { xs: "1.1rem", sm: "1.2rem" },
                }}
              >
                {project.text2}
              </Typography>
            )}

            {fullSizeImages && fullSizeImages.length > 3 && (
              <Box
                sx={{
                  mt: 2,
                  width: "100%",
                  maxWidth: "800px",
                  pb: 2,
                  "&:hover": {
                    transform: { xs: "scale(1)", sm: "scale(1.05)" },
                  },
                }}
              >
                <img
                  className="grow"
                  src={fullSizeImages[3]}
                  alt={`${project.title} image 3`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain", // Ensure image maintains aspect ratio
                  }}
                  loading="lazy"
                />
              </Box>
            )}

            {project.text3 && (
              <Typography
                className="scrollFadeIn"
                sx={{
                  px: { xs: 2, sm: 0 },

                  fontSize: { xs: "1.1rem", sm: "1.2rem" },
                }}
              >
                {project.text3}
              </Typography>
            )}

            {fullSizeImages && fullSizeImages.length === 5 && (
              <Box
                sx={{
                  mt: 2,
                  width: "100%",
                  maxWidth: "800px",
                  pb: 2,
                  "&:hover": {
                    transform: { xs: "scale(1)", sm: "scale(1.05)" },
                  },
                }}
              >
                <img
                  className="grow"
                  src={fullSizeImages[4]}
                  alt={`${project.title} image 3`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain", // Ensure image maintains aspect ratio
                  }}
                  loading="lazy"
                />
              </Box>
            )}
          </Box>

          {project.href2 && (
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                p: 3,
                gap: 2,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <NavButton
                startIcon={<LaunchIcon />}
                onClick={() => {
                  window.open(project.href2);
                }}
              >
                Launch Project
              </NavButton>
            </Box>
          )}
        </Box>
      </Box>

      <Box
        sx={{
          width: "100%",
          maxWidth: "800px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 3,
          margin: "auto",
        }}
      >
        {fullSizeImages && fullSizeImages.length > 5 ? (
          <Typography
            className="scrollFadeIn"
            sx={{ mt: 2, pt: 2, fontSize: "1.4rem" }}
            variant="h6"
          >
            Additional Images
          </Typography>
        ) : (
          ""
        )}

        {fullSizeImages && fullSizeImages.length > 5 && (
          <StyledSwiperContainer
            className="grow"
            sx={{
              // display: "flex",
              alignItems: "center",
              justifyContent: "start",
              width: "100%",
              px: {
                xs: 0,
                md: 5,
                lg: 5,
              },
              height: { xs: "auto", sm: "auto" },
              width: { xs: "100%", sm: "90%", md: "80%", lg: "70%" },
              maxHeight: "650px",
            }}
          >
            <Swiper
              autoHeight={true}
              modules={[Autoplay, Navigation, Pagination, EffectFade]}
              loop={true}
              // effect={"fade"}
              // fadeEffect={{ crossFade: true }}
              spaceBetween={0}
              slidesPerView={1}
              centeredSlides={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              navigation={false}
              pagination={{ clickable: true, dynamicBullets: true }}
              style={{
                width: "auto",
                maxWidth: "100%",
                // height: "clamp(200px, 80vh, 700px)",
              }}
            >
              {fullSizeImages.slice(4).map((img, index) => (
                <SwiperSlide
                  className="swiper-slide"
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "auto",
                    paddingBottom: "30px",
                  }}
                >
                  <img
                    loading="lazy"
                    key={index}
                    src={img}
                    alt={`${project.title} image ${index + 1}`}
                    style={{
                      maxWidth: "100%",
                      objectFit: "contain",
                      maxHeight: "600px",
                      height: "auto",
                    }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </StyledSwiperContainer>
        )}
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

      <Box
        sx={{
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
          onClick={() => {
            topOfPage.current
              ? topOfPage.current.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                })
              : "";
          }}
          sx={{
            justifyContent: "center",

            display: "flex",
          }}
        >
          <ArrowUpwardIcon />
        </Button>
        <Typography
          sx={{ fontSize: "0.8rem", cursor: "pointer" }}
          onClick={() => {
            topOfPage.current
              ? topOfPage.current.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                })
              : "";
          }}
        >
          Return to top
        </Typography>
      </Box>
    </Box>
  );
};

export default Project;
