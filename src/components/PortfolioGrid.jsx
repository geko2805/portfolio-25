// components/PortfolioGrid.jsx
import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Grid,
  Card,
  CardMedia,
  Box,
  Modal,
  Fade,
  Typography,
  Button,
  styled,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import NavButton from "./NavButton";
import { useNavigate } from "react-router-dom";

import LaptopIcon from "@mui/icons-material/Laptop";
import TabletMacIcon from "@mui/icons-material/TabletMac";
import SmartphoneIcon from "@mui/icons-material/Smartphone";

import LaunchIcon from "@mui/icons-material/Launch";
import CloseIcon from "@mui/icons-material/Close";
import ReadMoreIcon from "@mui/icons-material/ReadMore";

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

import { getThumbnail, loadProjectImages } from "../utils/loadImages";

import northcodersLogo from "../assets/northcoders.webp";
import brunelLogo from "../assets/brunel.webp";

// Import iframe container image files
import laptopImage from "../assets/laptop.webp";
import tabletImage from "../assets/tablet.webp";
import phoneImage from "../assets/phone.webp";
import { useColorMode } from "../theme/ThemeProvider";

const StyledCard = styled(Card)(({ theme }) => ({
  position: "relative",
  height: 250,
  overflow: "hidden",
  "&:hover .overlay": {
    opacity: 1,
  },
  "&:hover .projectImg": {
    transform: "scale(1.05)",
  },
  "&:hover .tech": {
    display: "none",
  },
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
  cursor: "pointer",
}));

const Overlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0, 0, 0, 0.6)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  opacity: 0,
  transition: "opacity 0.3s ease",
  color: theme.palette.common.white,
}));

// const ProjectText = styled(Box)(({ theme }) => ({
//   position: "absolute",
//   top: 0,
//   left: 0,
//   width: "100%",
//   height: "100%",
//   display: "flex",
//   flexDirection: "column",
//   justifyContent: "space-between",
//   alignItems: "center",
//   opacity: 1,
//   color: theme.palette.text.primary,
// }));

const Technologies = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "transparent",
  color: "black",
  display: "flex",
  justifyContent: "flex-end",
}));

const ModalBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -52.5%)",
  width: "90%",
  maxWidth: 800,
  background: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[5],
  paddingBottom: theme.spacing(3),
  outline: "none",
  maxHeight: "85%",
  overflowY: "auto",
  display: "flex",
  zIndex: 100000,
  flexDirection: "column",
  gap: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    gap: theme.spacing(1),
  },
}));

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

const PortfolioGrid = ({ projects }) => {
  const { mode } = useColorMode();

  //modal
  const [open, setOpen] = useState(false);

  const [selectedProject, setSelectedProject] = useState(null);
  const [fullSizeImages, setFullSizeImages] = useState([]);
  const [iframeDisplay, setIframeDisplay] = useState("laptop");
  const [iframeSize, setIframeSize] = useState("100%");
  const [isModalLoading, setIsModalLoading] = useState(true);

  const theme = useTheme();

  //scaling for iframe
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };
  const [scale, setScale] = useState(0.18);

  const updateScale = useCallback(() => {
    const vw = window.innerWidth;
    const minScale = 0.18;
    const maxScale = 0.35;
    const minWidth = 360; // Mobile-first starting point
    const maxWidth = 900; // Max scale at 900px
    // Linear interpolation: scale = minScale + (vw - minWidth) / (maxWidth - minWidth) * (maxScale - minScale)
    const newScale = Math.min(
      maxScale,
      Math.max(
        minScale,
        minScale +
          ((vw - minWidth) / (maxWidth - minWidth)) * (maxScale - minScale)
      )
    );
    setScale(newScale);
  }, []);

  useEffect(() => {
    const debouncedUpdateScale = debounce(updateScale, 100); // 100ms delay
    updateScale(); // Initial call
    window.addEventListener("resize", debouncedUpdateScale);
    return () => window.removeEventListener("resize", debouncedUpdateScale);
  }, [updateScale]);

  const openModal = async (projectId) => {
    const project = projects.find((p) => p.id === projectId);
    if (project) {
      const images = await loadProjectImages(projectId);
      setFullSizeImages(images);
      setSelectedProject(project);
    }
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setFullSizeImages([]); // Clear images to free memory
    setSelectedProject(null);
    setIsModalLoading(true);
    setIframeDisplay("laptop");
  };

  const handleIframeSizeChange = (event) => {
    setIframeDisplay(event.target.value);
  };

  const navigate = useNavigate();

  return (
    <Box
      sx={{
        pt: 5,
        px: 2,
        pb: 3,
        // padding: 2,
        background: theme.palette.background.main,
        maxWidth: "1280px",
        margin: "0 auto",
      }}
    >
      <Grid container spacing={2} justifyContent="center">
        {projects.map((project) => (
          <Grid
            item
            // size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={project.id}
            sx={{
              animationName: "fadeIn",
              animationDuration: "2s",
              animationDelay: "1.3s",
              animationIterationCount: 1,
              animationFillMode: "forwards",
              opacity: 0,
            }}
          >
            <StyledCard onClick={() => openModal(project.id)}>
              <CardMedia
                className="projectImg"
                component="img"
                height="250"
                image={getThumbnail(project.id)}
                alt={`${project.title} thumbnail`}
                sx={{
                  objectFit: "contain",
                  maxWidth: 300,
                  margin: "auto",
                  width: 250,
                  // transform: "scale(0.92)",
                }}
              />

              <Technologies className="technologies">
                {project.technologies && project.technologies.length > 0 && (
                  <img
                    className="tech"
                    src={
                      mode === "light"
                        ? technologyIconsLightmode[
                            `../assets/technologies/lightmode/${project.technologies[0]}.png`
                          ]
                        : technologyIconsLightmode[
                            `../assets/technologies/lightmode/${project.technologies[0]}.png`
                          ]
                    }
                    alt={project.technologies[0]}
                    style={{ width: "auto", height: "30px", margin: "10px" }}
                  />
                )}
              </Technologies>

              <Overlay className="overlay">
                <Typography variant="h6" sx={{ fontWeight: 200 }}>
                  {project.title}
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 200,
                    fontSize: "1rem",
                    mb: 1,
                    fontStyle: "italic",
                  }}
                >
                  {project.type}
                </Typography>
                <Typography variant="body2">Click to Preview</Typography>
              </Overlay>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
      <Modal
        open={open}
        onClose={closeModal}
        closeAfterTransition
        BackdropProps={{
          timeout: 500,
          sx: { background: "rgba(0, 0, 0, 0.7)" },
        }}
      >
        <Fade in={open}>
          <ModalBox>
            {selectedProject && (
              <>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    position: "sticky",
                    top: 0,
                    backdropFilter: "blur(10px)",
                    zIndex: 100,
                  }}
                >
                  <Box
                    sx={{
                      textAlign: "left",
                      pt: 0,
                      pl: 2,
                    }}
                  >
                    <img
                      className="tech"
                      src={
                        selectedProject.company
                          ? selectedProject.company === "Brunel"
                            ? brunelLogo
                            : northcodersLogo
                          : ""
                      }
                      alt={
                        selectedProject.company ? selectedProject.company : ""
                      }
                      style={{
                        width: "auto",
                        height: "50px",
                        margin: "10px",
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      textAlign: "right",
                      pt: 0,
                      pr: 2,
                    }}
                  >
                    <Button
                      onClick={closeModal}
                      sx={{ color: theme.palette.text.secondary }}
                      endIcon={<CloseIcon />}
                    >
                      Close
                    </Button>
                  </Box>
                </Box>
                <Box
                  sx={{
                    margin: "auto",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    mb: 1,
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: "clamp(2em, 5vw, 2.5rem)",
                      fontFamily: "Inconsolata, monospace",
                      letterSpacing: "-0.15rem",
                      lineHeight: "2.4rem",
                      color: theme.palette.text.main,
                      cursor: "default",
                      zIndex: 1,
                      p: 0,
                      mt: 0,
                    }}
                    variant="h1"
                  >
                    {selectedProject.title}
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 200,
                      fontSize: "clamp(1em, 2.5vw, 1.25rem)",
                      p: 0,
                      mt: 0,
                    }}
                  >
                    {selectedProject.type}
                  </Typography>
                </Box>
                {selectedProject.iframeLink ? (
                  <Box
                    sx={{
                      width: {
                        xs: "100%",
                      },
                      margin: "auto",
                      px: {
                        xs: 3,
                        sm: 4,
                        md: 5,
                        lg: 5,
                      },
                      pt: 1,
                      backgroundColor: theme.palette.iframe.main,
                      borderRadius: "5px",
                    }}
                  >
                    <Box
                      sx={{
                        width: "100%",
                        position: "relative",
                        height: 0,
                        pb: "56.25%",
                        backgroundImage:
                          iframeDisplay === "laptop"
                            ? `url(${laptopImage})`
                            : iframeDisplay === "tablet"
                            ? `url(${tabletImage})`
                            : `url(${phoneImage})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "contain",
                        backgroundPosition: "center",
                        overflow: "hidden",
                      }}
                    >
                      {/* {isModalLoading && (
                        <Box
                          className="iframe-loading-overlay"
                          sx={{ zIndex: 30000, color: "red", fontSize: "2rem" }}
                        >
                          Loading preview...
                        </Box>
                      )} */}

                      <Box
                        component="iframe"
                        // scrolling="no"
                        onLoad={() => setIsModalLoading(false)}
                        className="iframe-preview"
                        id="inlineFrameExample"
                        title="Inline Frame Example"
                        sx={{
                          // zoom - not supported by all browsers
                          // height:
                          //   iframeDisplay === "laptop"
                          //     ? `93%`
                          //     : iframeDisplay === "tablet"
                          //     ? `78.4%`
                          //     : `70.1%`,
                          // width:
                          //   iframeDisplay === "laptop"
                          //     ? `80%`
                          //     : iframeDisplay === "tablet"
                          //     ? `33.4%`
                          //     : `22.2%`,
                          // zoom: { xs: 0.2, sm: 0.3, md: 0.4 },
                          // transition: "width 0.4s",
                          // scrollbarWidth: "none",

                          //original laptop image scaling
                          //   margin: "auto",
                          // position: "absolute",
                          // border: "none",
                          // borderRadius:
                          //   iframeDisplay === "laptop"
                          //     ? "3% 3% 0 0 "
                          //     : iframeDisplay === "tablet"
                          //     ? 0
                          //     : "1.5%",
                          // left: iframeDisplay === "phone" ? `50.08%` : "50%",
                          // top: 0,
                          // marginTop:
                          //   iframeDisplay === "laptop"
                          //     ? "0.75%"
                          //     : iframeDisplay === "tablet"
                          //     ? "6%"
                          //     : "8.27%",
                          // width:
                          //   iframeDisplay === "laptop"
                          //     ? //  {
                          //       //     xs: "calc(80%/0.2)",
                          //       //     sm: "calc(80%/0.3)",
                          //       //     md: "calc(80%/0.4)",
                          //       //   }
                          //       `calc(79.5% / ${scale})` //divide height and width by same valuee as transform scale
                          //     : iframeDisplay === "tablet"
                          //     ? `calc(33.4% / ${scale})`
                          //     : `calc(22.5% / ${scale})`,
                          // height:
                          //   iframeDisplay === "laptop"
                          //     ? // {
                          //       //     xs: "calc(93%/0.2)",
                          //       //     sm: "calc(93%/0.3)",
                          //       //     md: "calc(93%/0.4)",
                          //       //   }
                          //       `calc(91.5% / ${scale})`
                          //     : iframeDisplay === "tablet"
                          //     ? `calc(78.4% / ${scale})`
                          //     : `calc(70.5% / ${scale})`,
                          // // transform: {
                          // //   xs: `translateX(-50%) scale(0.2)`,
                          // //   sm: `translateX(-50%) scale(0.3)`,
                          // //   md: `translateX(-50%) scale(0.4)`,
                          // // },
                          // transform: `translateX(-50%) scale(${scale})`,
                          // transformOrigin: "center top",
                          // //transition: "width 0.4s, height 0.4s, transform 0.4s",

                          margin: "auto",
                          position: "absolute",
                          border: "none",
                          borderRadius:
                            iframeDisplay === "laptop"
                              ? "0"
                              : iframeDisplay === "tablet"
                              ? 0
                              : "10px 10px 60px 60px",
                          left:
                            iframeDisplay === "laptop"
                              ? `50.078%`
                              : iframeDisplay === "tablet"
                              ? "50.08%"
                              : "50.08%",
                          top: 0,
                          marginTop:
                            iframeDisplay === "laptop"
                              ? "3.9%"
                              : iframeDisplay === "tablet"
                              ? "4.8%"
                              : "4.75%",
                          width:
                            iframeDisplay === "laptop"
                              ? `calc(73.6% / ${scale})` //divide height and width by same valuee as transform scale
                              : iframeDisplay === "tablet"
                              ? `calc(33.4% / ${scale})`
                              : `calc(25.8% / ${scale})`,
                          height:
                            iframeDisplay === "laptop"
                              ? `calc(85% / ${scale})`
                              : iframeDisplay === "tablet"
                              ? `calc(82.2% / ${scale})`
                              : `calc(90% / ${scale})`,
                          transform: `translateX(-50%) scale(${scale})`,
                          transformOrigin: "center top",
                          //transition: "width 0.4s, height 0.4s, transform 0.4s",
                        }}
                        src={selectedProject.iframeLink}
                      ></Box>
                    </Box>

                    {selectedProject.notResponsive && (
                      <Typography
                        variant="subtitle2"
                        sx={{
                          pt: 2,
                          color: theme.palette.text.primary,
                          textAlign: "center",
                        }}
                      >
                        Viewed best on desktop
                      </Typography>
                    )}

                    <FormControl
                      component="fieldset"
                      sx={{
                        mt: 3,
                        //mb: 2,
                        pl: 1.5,
                        display:
                          selectedProject.notResponsive === true
                            ? "none"
                            : "flex",

                        justifyContent: "center",
                        py: 0,

                        borderRadius: "10px",
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        sx={{
                          color: theme.palette.text.primary,
                          alignSelf: "center",
                        }}
                      >
                        Preview size
                      </Typography>
                      <RadioGroup
                        row
                        value={iframeDisplay}
                        onChange={handleIframeSizeChange}
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <FormControlLabel
                          value="laptop"
                          control={
                            <Radio
                              sx={{
                                color: theme.palette.text.secondary,
                                "&.Mui-checked": {
                                  color: theme.palette.primary.main,
                                },
                              }}
                            />
                          }
                          label={
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: theme.palette.text.primary,
                                padding: "0px",
                              }}
                            >
                              <LaptopIcon
                                sx={{
                                  mr: 0.5,
                                  color: theme.palette.text.primary,
                                }}
                              />
                              <Typography
                                sx={{ display: { xs: "none", sm: "flex" } }}
                              >
                                Laptop
                              </Typography>
                            </Box>
                          }
                          sx={{
                            padding: {
                              xs: "5px",
                              sm: "5px",
                              md: "10px",
                              lg: "15px",
                            },
                            "& .MuiFormControlLabel-label": {
                              fontWeight: 400,
                              fontSize: { xs: "0.8rem", sm: "0.9rem" },
                            },
                          }}
                        />
                        <FormControlLabel
                          value="tablet"
                          control={
                            <Radio
                              sx={{
                                color: theme.palette.text.primary,
                                "&.Mui-checked": {
                                  color: theme.palette.primary.main,
                                },
                              }}
                            />
                          }
                          label={
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: theme.palette.text.primary,
                                padding: "0px",
                              }}
                            >
                              <TabletMacIcon
                                sx={{
                                  mr: 0.5,
                                  color: theme.palette.text.primary,
                                }}
                              />
                              <Typography
                                sx={{ display: { xs: "none", sm: "flex" } }}
                              >
                                Tablet
                              </Typography>
                            </Box>
                          }
                          sx={{
                            padding: {
                              xs: "5px",
                              sm: "5px",
                              md: "10px",
                              lg: "15px",
                            },
                            "& .MuiFormControlLabel-label": {
                              fontWeight: 400,
                              fontSize: { xs: "0.8rem", sm: "0.9rem" },
                            },
                          }}
                        />
                        <FormControlLabel
                          value="phone"
                          control={
                            <Radio
                              sx={{
                                color: theme.palette.text.primary,

                                "&.Mui-checked": {
                                  color: "#cf5600",
                                  color: theme.palette.primary.main,
                                },
                              }}
                            />
                          }
                          label={
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: theme.palette.text.primary,
                                padding: "0px",
                              }}
                            >
                              <SmartphoneIcon
                                sx={{
                                  mr: 0.5,
                                  color: theme.palette.text.primary,
                                }}
                              />
                              <Typography
                                sx={{ display: { xs: "none", sm: "flex" } }}
                              >
                                Mobile
                              </Typography>
                            </Box>
                          }
                          sx={{
                            padding: {
                              xs: "5px",
                              sm: "5px",
                              md: "10px",
                              lg: "15px",
                            },
                            "& .MuiFormControlLabel-label": {
                              fontWeight: 400,
                              fontSize: { xs: "0.8rem", sm: "0.9rem" },
                            },
                          }}
                        />
                      </RadioGroup>
                    </FormControl>
                  </Box>
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                      px: {
                        xs: 0,
                        md: 5,
                        lg: 5,
                      },
                      height: "300px",
                      margin: "auto",
                      maxHeight: 500,
                    }}
                  >
                    <Swiper
                      modules={[Autoplay, Navigation, Pagination, EffectFade]}
                      // loop={true}
                      // effect={"fade"}
                      // fadeEffect={{ crossFade: true }}
                      spaceBetween={0}
                      slidesPerView={1}
                      centeredSlides={true}
                      autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                      }}
                      navigation={false}
                      pagination={{ clickable: true, dynamicBullets: true }}
                      style={{
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      {fullSizeImages.length > 0 ? (
                        fullSizeImages.map((img, index) => (
                          <SwiperSlide>
                            <img
                              loading="lazy"
                              key={index}
                              src={img}
                              alt={`${selectedProject.title} image ${
                                index + 1
                              }`}
                              style={{
                                width: "100%",
                                margin: "auto",
                                height: "90%",
                                borderRadius: "8px",
                                objectFit: "contain",
                              }}
                            />
                          </SwiperSlide>
                        ))
                      ) : (
                        <SwiperSlide>
                          <Box
                            sx={{
                              display: "flex",
                              width: "100%",
                              height: "100%",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <p>No images available</p>
                          </Box>
                        </SwiperSlide>
                      )}
                    </Swiper>
                  </Box>
                )}
                <Typography
                  variant="body1"
                  sx={{
                    color: theme.palette.text.secondary,
                    px: { xs: 2, sm: 3, md: 6, lg: 7 },
                    margin: "auto",
                    textAlign: "center",
                  }}
                >
                  {selectedProject.description}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 2,
                    mt: 1,
                    justifyContent: "center",
                  }}
                >
                  {selectedProject.previewOnly ? (
                    ""
                  ) : (
                    <NavButton
                      onClick={() => {
                        navigate(`/projects/${selectedProject.id}`);
                      }}
                      endIcon={<ReadMoreIcon />}
                      sx={{
                        borderColor: theme.palette.primary.main,
                        color: theme.palette.primary.main,
                        textTransform: "uppercase",
                        fontWeight: 200,
                      }}
                    >
                      More info
                    </NavButton>
                  )}
                  {selectedProject.href2 && (
                    <NavButton
                      onClick={() => {
                        window.open(selectedProject.href2);
                      }}
                      endIcon={<LaunchIcon />}
                      sx={{
                        backgroundColor: "lightblue",
                        color: "white",
                        textTransform: "uppercase",
                        fontWeight: 200,
                        "&:hover": { backgroundColor: "skyblue" },
                      }}
                    >
                      Launch website
                    </NavButton>
                  )}
                </Box>
                <Box
                  sx={{
                    margin: "auto",
                    display: "flex",
                    flexDirection: "column",
                    mt: 1,
                  }}
                >
                  <Typography sx={{ fontWeight: 700, alignSelf: "center" }}>
                    {" "}
                    Tech Stack
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexWrap: "wrap",
                      width: "fit-content",
                      alignSelf: "center",
                      px: 2,
                      mt: 1,
                      gap: 2,
                      //bgcolor: "#cccccc",
                    }}
                  >
                    {" "}
                    {selectedProject.technologies.map((icon) => {
                      const pathLM = `../assets/technologies/lightmode-large/${icon}.png`;
                      const imgSrcLM = technologyIconsLightmodeLarge[pathLM];
                      const pathDM = `../assets/technologies/darkmode-large/${icon}.png`;
                      const imgSrcDM = technologyIconsDarkmodeLarge[pathDM];

                      return (
                        <>
                          <img
                            className="tech"
                            key={icon}
                            src={mode === "light" ? imgSrcLM : imgSrcDM}
                            alt={icon}
                            style={{
                              width: "auto",
                              height: "40px",
                            }}
                          />{" "}
                        </>
                      );
                    })}
                  </Box>
                </Box>
              </>
            )}
          </ModalBox>
        </Fade>
      </Modal>
    </Box>
  );
};

export default PortfolioGrid;
