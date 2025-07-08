import { useNavigate } from "react-router-dom";

// import Logo from "../assets/images/lotus5.png";
import { Box, Typography, useTheme } from "@mui/material";

import Preview from "../components/Preview";
import projects from "../data/projects.json";
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

const Featured = () => {
  const theme = useTheme();
  const theta = projects.find((project) => project.id === "meditation-timer");
  const occupy = projects.find((project) => project.id === "occupy-sound");
  const ncNews = projects.find((project) => project.id === "nc-news");

  return (
    <Box
      className="fade up delay1"
      sx={{ width: "100%", bgcolor: theme.palette.background.default }}
    >
      <Typography
        variant="h5"
        sx={{
          fontSize: "clamp(1.2em, 3vw, 2.03125rem)",
          fontFamily: "Inconsolata, monospace",
          pt: 6,
          fontWeight: 700,
          letterSpacing: "-0.15rem",
          lineHeight: 0.5,
        }}
      >
        Featured
      </Typography>
      <Box sx={{ maxWidth: "800px", margin: "auto" }}>
        <Swiper
          loop={true}
          modules={[Autoplay, Navigation, Pagination, EffectFade]}
          spaceBetween={0}
          slidesPerView={1}
          centeredSlides={true}
          // autoplay={{
          //   delay: 5000,
          //   disableOnInteraction: false,
          // }}
          navigation={true}
          //pagination={{ clickable: true, dynamicBullets: true }}
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <SwiperSlide>
            <Box sx={{ margin: "auto", p: 6 }}>
              <Preview selectedProject={theta} applyPadding={false} />
            </Box>
          </SwiperSlide>
          <SwiperSlide>
            <Box sx={{ margin: "auto", p: 6 }}>
              <Preview selectedProject={occupy} applyPadding={false} />
            </Box>
          </SwiperSlide>
          <SwiperSlide>
            <Box sx={{ margin: "auto", p: 6 }}>
              <Preview selectedProject={ncNews} applyPadding={false} />
            </Box>
          </SwiperSlide>
        </Swiper>
      </Box>
    </Box>
  );
};

export default Featured;
