// components/PortfolioGrid.jsx
import React, { useState, useRef, useEffect } from "react";
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

const StyledCard = styled(Card)(({ theme }) => ({
  position: "relative",
  height: 250,
  overflow: "hidden",
  "&:hover .overlay": {
    opacity: 1,
  },
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
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

const ModalBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 800,
  background: theme.palette.background.paper,
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

const PortfolioGrid = ({ items }) => {
  const [iframeDisplay, setIframeDisplay] = useState("laptop");
  const [iframeSize, setIframeSize] = useState("100%");
  const [isModalLoading, setIsModalLoading] = useState(true);

  //modal
  const [open, setOpen] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);
  const theme = useTheme();

  const handleOpen = (item) => {
    setSelectedItem(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedItem(null);
    setIsModalLoading(true);
  };

  const handleIframeSizeChange = (event) => {
    // setIframeSize(event.target.value);

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
        {items.map((item, index) => (
          <Grid
            item
            // size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={index}
            sx={{
              animationName: "fadeIn",
              animationDuration: "2s",
              animationDelay: "1.3s",
              animationIterationCount: 1,
              animationFillMode: "forwards",
              opacity: 0,
            }}
          >
            <StyledCard onClick={() => handleOpen(item)}>
              <CardMedia
                component="img"
                height="250"
                image={item.thumbnail}
                alt={item.title}
                sx={{
                  objectFit: "cover",
                  maxWidth: 300,
                  margin: "auto",
                  width: 300,
                }}
              />
              <Overlay className="overlay">
                <Typography variant="h6" sx={{ fontWeight: 200 }}>
                  {item.title}
                </Typography>
                <Typography variant="body2">Click to Preview</Typography>
              </Overlay>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropProps={{
          timeout: 500,
          sx: { background: "rgba(0, 0, 0, 0.7)" },
        }}
      >
        <Fade in={open}>
          <ModalBox>
            {selectedItem && (
              <>
                <Box sx={{ textAlign: "right" }}>
                  <Button
                    onClick={handleClose}
                    sx={{ color: theme.palette.text.secondary }}
                  >
                    Close
                  </Button>
                </Box>

                <Typography
                  variant="h4"
                  sx={{ fontWeight: 200, margin: "auto" }}
                >
                  {selectedItem.title}
                </Typography>

                {selectedItem.iframeLink ? (
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
                      {isModalLoading && (
                        <Box className="iframe-loading-overlay">
                          Loading preview...
                        </Box>
                      )}

                      <iframe
                        scrolling="no"
                        onLoad={() => setIsModalLoading(false)}
                        className="iframe-preview"
                        id="inlineFrameExample"
                        title="Inline Frame Example"
                        style={{
                          //   opacity: isModalLoading ? 0 : 1,
                          overflow: "hidden",
                          margin: "auto",
                          position: "absolute",
                          border: "none",
                          borderRadius:
                            iframeDisplay === "laptop"
                              ? "3% 3% 0 0 "
                              : iframeDisplay === "tablet"
                              ? "3% 3% 0 0 "
                              : 0,
                          left: "50%",
                          transform: "translateX(-50%)",
                          top: 0,
                          marginTop:
                            iframeDisplay === "laptop"
                              ? `7px`
                              : iframeDisplay === "tablet"
                              ? `50px`
                              : `11%`,

                          height:
                            iframeDisplay === "laptop"
                              ? `93%`
                              : iframeDisplay === "tablet"
                              ? `50%`
                              : `62%`,
                          width:
                            iframeDisplay === "laptop"
                              ? `80%`
                              : iframeDisplay === "tablet"
                              ? `50%`
                              : `18.9%`,
                          zoom: 0.4,
                          transition: "width 0.4s",
                          scrollbarWidth: "none",
                        }}
                        // width="100%"
                        // height=""
                        src={selectedItem.href2}
                      ></iframe>
                    </Box>

                    <FormControl
                      component="fieldset"
                      sx={{
                        mt: 3,
                        //mb: 2,
                        pl: 1.5,
                        display: "flex",
                        justifyContent: "center",
                        py: 0,

                        borderRadius: "10px",
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        sx={{
                          color: "rgba(255,255,255,0.6)",
                          alignSelf: "center",
                        }}
                      >
                        Preview display
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
                              Laptop
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
                              Tablet
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
                              Mobile
                            </Box>
                          }
                          sx={{
                            //color: "rgba(255,255,255,0.7)",
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
                  </Box>
                ) : (
                  <Box
                    component="img"
                    src={selectedItem.largesrc}
                    alt={selectedItem.title}
                    sx={{
                      width: "100%",
                      maxHeight: 400,
                      objectFit: "contain",
                      borderRadius: theme.shape.borderRadius,
                    }}
                  />
                )}
                <Typography
                  variant="body1"
                  sx={{ color: theme.palette.text.secondary }}
                >
                  {selectedItem.description}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    mt: 2,
                    justifyContent: "center",
                  }}
                >
                  {selectedItem.href && (
                    <NavButton
                      onClick={() => {
                        navigate(selectedItem.href);
                      }}
                      //   variant="outlined"
                      //   href={selectedItem.href}
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
                  {selectedItem.href2 && (
                    <NavButton
                      onClick={() => {
                        window.open(selectedItem.href2);
                      }}
                      //   variant="contained"
                      //   href={selectedItem.href2}
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
