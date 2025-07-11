import { ThemeContext } from "@emotion/react";
import { Button, useTheme } from "@mui/material";
import { useEffect, useRef } from "react";

const NavButton = ({
  children,
  className,
  onClick,
  startIcon,
  endIcon,
  disabled,
}) => {
  const buttonRef = useRef(null);
  const theme = useTheme();

  return (
    <Button
      ref={buttonRef}
      className={`navbtn ${className}`}
      onClick={onClick}
      startIcon={startIcon}
      endIcon={endIcon}
      sx={{
        position: "relative",
        p: "10px 20px 10px 20px",
        cursor: "pointer",
        color: "#000000",
        bgcolor: theme.palette.button.main,
        border: "none",
        width: 200,
        height: 40,
        transition: "transform 0.3s",
        fontSize: "1rem",
        lineHeight: "1.2rem",
        textTransform: "capitalize",
        borderRadius: "5px",
        "&:hover": {
          transform: "translateY(-2px) scale(1.02)",
        },
        "&:hover .MuiSvgIcon-root": {
          animation: "pulseRight 1s infinite",
        },
      }}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

export default NavButton;
