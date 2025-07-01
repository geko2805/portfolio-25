import { useNavigate, useParams } from "react-router-dom";

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
import { useState } from "react";

import LaptopIcon from "@mui/icons-material/Laptop";
import TabletMacIcon from "@mui/icons-material/TabletMac";
import SmartphoneIcon from "@mui/icons-material/Smartphone";

import LaunchIcon from "@mui/icons-material/Launch";
import NavButton from "../components/NavButton";

import "react-slideshow-image/dist/styles.css";
import { Fade, Zoom } from "react-slideshow-image";
const previews = import.meta.glob("../assets/previews/*.{png,jpg,jpeg,svg}", {
  eager: true,
});
const Project = () => {
  const { project_id } = useParams();

  const navigate = useNavigate();
  const [iframeSize, setIframeSize] = useState("100%");
  const [siteToDisplay, setSiteToDisplay] = useState(
    "https://gjonesncnews.netlify.app/"
  );

  const theme = useTheme();

  const handleIframeSizeChange = (event) => {
    setIframeSize(event.target.value);
  };

  const images = [
    previews["../assets/previews/lotus-responsive.png"]?.default,
    previews["../assets/previews/lotus-responsive.png"]?.default,
    previews["../assets/previews/lotus-responsive.png"]?.default,
  ];

  return (
    <Box className="project" sx={{ mt: "80px" }}>
      {/* <Typography
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
        {project_id}
      </Typography> */}

      <Box className="fade up delay1" sx={{ width: "80%", margin: "auto" }}>
        <Fade
          onChange={function noRefCheck() {}}
          onStartChange={function noRefCheck() {}}
          indicators={true}
        >
          {images.map((each, index) => (
            <div key={index} style={{ width: "100%" }}>
              <img
                style={{
                  objectFit: "cover",
                  width: "70vw",
                  maxWidth: "600px",
                  display: "block",
                  marginLeft: "auto",
                  marginRight: "auto",
                  //   animationName: "fadeInUp",
                  //   animationDuration: "2s",
                  //   animationIterationCount: 1,
                  //   animationFillMode: "forwards",
                  //   opacity: 0,
                }}
                alt="Slide Image"
                src={each}
              />
            </div>
          ))}
        </Fade>

        <Zoom scale={0.7} indicators={true}>
          {images.map((each, index) => (
            <div key={index} style={{ width: "100%" }}>
              <img
                style={{ objectFit: "cover", width: "100%" }}
                alt="Slide Image"
                src={each}
              />
            </div>
          ))}
        </Zoom>
      </Box>
      <Button
        onClick={() => {
          setSiteToDisplay("https://thetawave.netlify.app/");
        }}
      >
        Meditation
      </Button>

      <Button
        onClick={() => {
          setSiteToDisplay("https://www.gethsworld.com/occupy/");
        }}
      >
        Occupy
      </Button>

      <Box
        sx={{
          width: { xs: "100%", sm: "80%", md: "70%", lg: "60%" },
          margin: "auto",
        }}
      >
        <Box
          sx={{
            width: "100%",
            position: "relative",
            height: 0,
            pb: "56.25%",
          }}
        >
          <iframe
            id="inlineFrameExample"
            title="Inline Frame Example"
            style={{
              margin: "auto",
              position: "absolute",

              left: "50%",
              transform: "translateX(-50%)",
              top: 0,
              height: "100%",
              width: iframeSize,
              zoom: 0.5,
              transition: "width 1s",
            }}
            // width="100%"
            // height=""
            src={siteToDisplay}
          ></iframe>
        </Box>

        {/* {iframeSize === "100%" ? (
          <Button
            onClick={() => {
              setIframeSize("33%");
            }}
          >
            Show mobile
          </Button>
        ) : (
          <Button
            onClick={() => {
              setIframeSize("100%");
            }}
          >
            Show desktop
          </Button>
        )} */}

        <FormControl
          component="fieldset"
          sx={{
            mt: 3,
            mb: 2,
            pl: 1.5,
            display: "flex",
            justifyContent: "center",
            py: 0,

            borderRadius: "10px",
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{ color: "rgba(255,255,255,0.6)", alignSelf: "center" }}
          >
            Preview display
          </Typography>
          <RadioGroup
            row
            value={iframeSize}
            onChange={handleIframeSizeChange}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <FormControlLabel
              value="100%"
              control={
                <Radio
                  sx={{
                    color: theme.palette.text.secondary,
                    "&.Mui-checked": {
                      color: "#cf5600",
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
                    sx={{ mr: 0.5, color: theme.palette.text.primary }}
                  />
                  Laptop
                </Box>
              }
              sx={{
                color:
                  iframeSize === "100%" ? "#cf5600" : "rgba(255,255,255,0.7)",
                padding: "10px",
                "& .MuiFormControlLabel-label": {
                  fontWeight: 400,
                  fontSize: { xs: "0.8rem", sm: "0.9rem" },
                },
              }}
            />
            <FormControlLabel
              value="66%"
              control={
                <Radio
                  sx={{
                    color: "white",
                    "&.Mui-checked": {
                      color: "#cf5600",
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
                    sx={{ mr: 0.5, color: theme.palette.text.primary }}
                  />
                  Tablet
                </Box>
              }
              sx={{
                color:
                  iframeSize === "66%" ? "#cf5600" : "rgba(255,255,255,0.7)",
                padding: "10px",
                "& .MuiFormControlLabel-label": {
                  fontWeight: 400,
                  fontSize: { xs: "0.8rem", sm: "0.9rem" },
                },
              }}
            />
            <FormControlLabel
              value="33%"
              control={
                <Radio
                  sx={{
                    color: "white",

                    "&.Mui-checked": {
                      color: "#cf5600",
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
                    sx={{ mr: 0.5, color: theme.palette.text.primary }}
                  />
                  Mobile
                </Box>
              }
              sx={{
                //color: "rgba(255,255,255,0.7)",
                color:
                  iframeSize === "33%" ? "#cf5600" : "rgba(255,255,255,0.7)",
                padding: "10px",
                "& .MuiFormControlLabel-label": {
                  fontWeight: 400,
                  fontSize: { xs: "0.8rem", sm: "0.9rem" },
                },
              }}
            />
          </RadioGroup>
        </FormControl>
        <NavButton
          startIcon={<LaunchIcon />}
          onClick={() => {
            window.open(siteToDisplay);
          }}
        >
          Visit Site
        </NavButton>
      </Box>
    </Box>
  );
};

export default Project;
