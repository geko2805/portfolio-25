import React, { useEffect, useState } from "react";
import { Box, LinearProgress, useTheme } from "@mui/material";

const ScrollProgress = () => {
  const theme = useTheme();
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setPercent(Math.round(progress));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Box
      sx={{
        position: "fixed",
        left: { xs: "0vw", sm: "10vw", md: "20vw", lg: "25vw" },
        bottom: { xs: "60px", sm: "70px", md: "80px", lg: "120px" },
        height: "8px",
        width: { xs: "100vw", sm: "80vw", md: "60vw", lg: "50vw" },
        bgcolor: theme.palette.divider,
        zIndex: 1500,
        borderRadius: { xs: "0px", sm: "5px" },
      }}
    >
      <Box
        sx={{
          height: "100%",
          width: `${percent}%`,
          bgcolor: theme.palette.secondary.main,
          transition: "width 0.1s ease-out",
          borderRadius: {
            xs: percent === 100 ? "0px" : "0px 5px 5px 0px",
            sm: "5px",
          },
          bgcolor:
            percent === 100
              ? theme.palette.secondary.main
              : theme.palette.button.main,
        }}
      />
    </Box>
  );
};

export default ScrollProgress;
