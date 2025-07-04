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
import LaunchIcon from "@mui/icons-material/Launch";
import NavButton from "./NavButton";
import { useNavigate } from "react-router-dom";

import LaptopIcon from "@mui/icons-material/Laptop";
import TabletMacIcon from "@mui/icons-material/TabletMac";
import SmartphoneIcon from "@mui/icons-material/Smartphone";

import ReactIcon from "../assets/technologies/react.png";
import ReactNativeIcon from "../assets/technologies/react-native.png";

// import Swiper core and required modules
import {
  Autoplay,
  Navigation,
  Pagination,
  EffectFade,
  A11y,
} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import { getThumbnail, loadProjectImages } from "../utils/loadImages";

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
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 800,
  background: theme.palette.background.default,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[5],
  padding: theme.spacing(4),
  outline: "none",
  maxHeight: "90vh",
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
  },
}));

const PortfolioGrid = ({ projects }) => {
  //modal
  const [open, setOpen] = useState(false);

  const [selectedProject, setSelectedProject] = useState(null);
  const [fullSizeImages, setFullSizeImages] = useState([]);
  const [iframeDisplay, setIframeDisplay] = useState("laptop");
  const [iframeSize, setIframeSize] = useState("100%");
  const [isModalLoading, setIsModalLoading] = useState(true);

  const theme = useTheme();

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
                  objectFit: "cover",
                  maxWidth: 300,
                  margin: "auto",
                  width: 300,
                  // transform: "scale(0.92)",
                }}
              />
              <Technologies className="technologies">
                {project.technologies.includes("react") ? (
                  <img
                    className="tech"
                    style={{ width: "40px", height: "40px", margin: "10px" }}
                    src={ReactIcon}
                  />
                ) : (
                  ""
                )}
                {project.technologies.includes("react-native") ? (
                  <img
                    className="tech"
                    style={{ width: "40px", height: "40px", margin: "10px" }}
                    src={ReactNativeIcon}
                  />
                ) : (
                  ""
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
                <Box sx={{ textAlign: "right" }}>
                  <Button
                    onClick={closeModal}
                    sx={{ color: theme.palette.text.secondary }}
                  >
                    Close
                  </Button>
                </Box>

                <Typography
                  variant="h4"
                  sx={{ fontWeight: 200, margin: "auto" }}
                >
                  {selectedProject.title}
                </Typography>

                {selectedProject.iframeLink ? (
                  <Box
                    sx={{
                      width: {
                        xs: "100%",
                      },
                      margin: "auto",
                      px: {
                        xs: 1,
                        md: 5,
                        lg: 5,
                      },
                      py: 4,
                      backgroundColor: theme.palette.background.paper,
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
                            ? `url("src/assets/laptop.png")`
                            : iframeDisplay === "tablet"
                            ? `url("src/assets/tablet.png")`
                            : `url("src/assets/phone.png")`,
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

                      <iframe
                        scrolling="no"
                        onLoad={() => setIsModalLoading(false)}
                        className="iframe-preview"
                        id="inlineFrameExample"
                        title="Inline Frame Example"
                        style={{
                          // opacity: isModalLoading ? 0 : 1,
                          margin: "auto",
                          position: "absolute",
                          border: "none",
                          borderRadius:
                            iframeDisplay === "laptop"
                              ? "3% 3% 0 0 "
                              : iframeDisplay === "tablet"
                              ? 0
                              : 0,
                          left: "50%",
                          transform: "translateX(-50%)",
                          top: 0,
                          marginTop:
                            iframeDisplay === "laptop"
                              ? `7px`
                              : iframeDisplay === "tablet"
                              ? `6%`
                              : `11%`,

                          height:
                            iframeDisplay === "laptop"
                              ? `93%`
                              : iframeDisplay === "tablet"
                              ? `78.4%`
                              : `62%`,
                          width:
                            iframeDisplay === "laptop"
                              ? `80%`
                              : iframeDisplay === "tablet"
                              ? `33.4%`
                              : `18.9%`,
                          zoom: 0.4,
                          transition: "width 0.4s",
                          scrollbarWidth: "none",
                        }}
                        // width="100%"
                        // height=""
                        src={selectedProject.iframeLink}
                      ></iframe>
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
                        sx={{ display: "flex", justifyContent: "center" }}
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
                            color:
                              iframeSize === "laptop"
                                ? "#cf5600"
                                : "rgba(255,255,255,0.7)",
                            padding: "10px",
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
                            color:
                              iframeSize === "tablet"
                                ? "#cf5600"
                                : "rgba(255,255,255,0.7)",
                            padding: "10px",
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
                            color:
                              iframeSize === "phone"
                                ? "#cf5600"
                                : "rgba(255,255,255,0.7)",
                            padding: "10px",
                            "& .MuiFormControlLabel-label": {
                              fontWeight: 400,
                              fontSize: { xs: "0.8rem", sm: "0.9rem" },
                            },
                          }}
                        />
                      </RadioGroup>
                    </FormControl>

                    <Box
                      sx={{
                        display: "flex",
                        gap: 2,
                        mt: 2,
                        justifyContent: "center",
                      }}
                    >
                      {selectedProject.href2 && (
                        <NavButton
                          onClick={() => {
                            window.open(selectedProject.href2);
                          }}
                          startIcon={<LaunchIcon />}
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
                  </Box>
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex",
                      justifyContent: "center",
                      width: "100%",
                      px: {
                        xs: 1,
                        md: 5,
                        lg: 5,
                      },
                      height: "400px",
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
                  sx={{ color: theme.palette.text.secondary }}
                >
                  {selectedProject.description}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    mt: 2,
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
                      sx={{
                        borderColor: theme.palette.primary.main,
                        color: theme.palette.primary.main,
                        textTransform: "uppercase",
                        fontWeight: 200,
                      }}
                    >
                      View Project
                    </NavButton>
                  )}
                  {selectedProject.href2 && (
                    <NavButton
                      onClick={() => {
                        window.open(selectedProject.href2);
                      }}
                      //   variant="contained"
                      //   href={selectedProject.href2}
                      //   target="_blank"
                      //   rel="noopener noreferrer"
                      startIcon={<LaunchIcon />}
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
              </>
            )}
          </ModalBox>
        </Fade>
      </Modal>
    </Box>
  );
};

export default PortfolioGrid;
