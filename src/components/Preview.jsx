import { useNavigate } from "react-router-dom";

import {
  Box,
  Typography,
  Button,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  useTheme,
} from "@mui/material";
import { useColorMode } from "../theme/ThemeProvider";
import { useCallback, useEffect, useState } from "react";
import LaptopIcon from "@mui/icons-material/Laptop";
import TabletMacIcon from "@mui/icons-material/TabletMac";
import SmartphoneIcon from "@mui/icons-material/Smartphone";

import LaunchIcon from "@mui/icons-material/Launch";

import laptopImage from "../assets/laptop.webp";
import tabletImage from "../assets/tablet.webp";
import phoneImage from "../assets/phone.webp";

const Preview = ({ selectedProject, applyPadding }) => {
  const [iframeDisplay, setIframeDisplay] = useState("laptop");
  const [isModalLoading, setIsModalLoading] = useState(true);

  const navigate = useNavigate();
  const theme = useTheme();

  const { mode, setMode, toggleColorMode } = useColorMode();

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

  const handleIframeSizeChange = (event) => {
    setIframeDisplay(event.target.value);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          width: "100%",
          alignItems: "flex-end",
          pr: 2,
        }}
      >
        <Button
          onClick={() => {
            window.open(selectedProject.href2);
          }}
          startIcon={<LaunchIcon />}
          sx={{
            backgroundColor: "transparent",
            color: theme.palette.text.primary,
            textTransform: "uppercase",
            fontWeight: 200,
            "&:hover": {
              backgroundColor: theme.palette.accent.main,
            },
          }}
        >
          Launch
        </Button>
      </Box>
      <Box
        sx={{
          width: {
            xs: "100%",
          },
          margin: "auto",
          ...(applyPadding && {
            px: {
              xs: 3,
              sm: 4,
              md: 5,
              lg: 5,
            },
          }),
          pt: 2,
          backgroundColor: "theme.palette.iframe.main",
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
            // onLoad={() => setIsModalLoading(false)}
            className="iframe-preview"
            id="inlineFrameExample"
            title="Inline Frame Example"
            sx={{
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
            display: selectedProject.notResponsive === true ? "none" : "flex",

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
                  <Typography sx={{ display: { xs: "none", sm: "flex" } }}>
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
                  <Typography sx={{ display: { xs: "none", sm: "flex" } }}>
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
                  <Typography sx={{ display: { xs: "none", sm: "flex" } }}>
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
    </>
  );
};

export default Preview;
