import React, { useState } from "react";

// import SmallLogo from "../assets/images/lotus5.png";

import { Navigate, NavLink, useNavigate } from "react-router-dom";

import {
  Box,
  Drawer,
  Button,
  List,
  ListItem,
  ListItemButton,
  Typography,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const SideDrawer = () => {
  const theme = useTheme();

  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box
      role="presentation"
      className="main-nav drawer"
      sx={{
        width: "clamp(280px, 80vw, 400px)",
        backgroundColor: "transparent",
        backdropFilter: "blur(10px)",
        borderRight: "0.5px solid #ffffff30",
        maxHeight: "100vh",
        minHeight: "100vh",

        height: "100vh",
        overflow: "auto",
      }}
    >
      <Button
        onClick={toggleDrawer(false)}
        sx={{
          display: "flex",
          pointerEvents: "auto",
          alignItems: "center",
          gap: 0.5,
          cursor: "pointer",
          position: "absolute",
          right: 0,
          mr: 2,
          mt: 2,

          bgcolor: theme.palette.button.main,

          // bgcolor: "transparent",
          zIndex: 200000,
          "&:hover .MuiSvgIcon-root": {
            animation: "spin 1s",
          },
        }}
      >
        <Typography
          component="label"
          htmlFor="close-icon"
          sx={{
            cursor: "pointer",
            color: "#000000",

            fontSize: "sm",
            fontWeight: "lg",
            //color: theme.palette.text.primary,
          }}
        >
          Close
        </Typography>

        <CloseIcon
          id="close-icon"
          sx={{
            position: "initial",
            color: "#000000",

            //color: theme.palette.text.primary
          }}
        />
      </Button>
      <List
        sx={{
          fontSize: "1.4rem",
          textTransform: "uppercase",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ListItem
          sx={{
            padding: "0",
            "&:hover": {
              backgroundColor: theme.palette.secondary.main,

              color: "white",
            },
          }}
        >
          <NavLink
            style={{
              width: "100%",
              padding: "10px",
              textAlign: "center",
              color: theme.palette.text.primary,
            }}
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={toggleDrawer(false)}
          >
            Home
          </NavLink>
        </ListItem>
        <ListItem
          sx={{
            padding: "0",
            "&:hover": {
              backgroundColor: theme.palette.secondary.main,
              color: "white",
            },
          }}
        >
          <NavLink
            style={{
              width: "100%",
              padding: "10px",
              textAlign: "center",
              color: theme.palette.text.primary,
            }}
            to="/projects"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={toggleDrawer(false)}
          >
            Projects
          </NavLink>
        </ListItem>
        <ListItem
          sx={{
            padding: "0",
            "&:hover": {
              backgroundColor: theme.palette.secondary.main,

              color: "white",
            },
          }}
        >
          <NavLink
            style={{
              width: "100%",
              padding: "10px",
              textAlign: "center",
              color: theme.palette.text.primary,
            }}
            to="/about"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={toggleDrawer(false)}
          >
            About
          </NavLink>
        </ListItem>{" "}
        <ListItem
          sx={{
            padding: "0",
            "&:hover": {
              backgroundColor: theme.palette.secondary.main,

              color: "white",
            },
          }}
        >
          <NavLink
            style={{
              width: "100%",
              padding: "10px",
              textAlign: "center",
              color: theme.palette.text.primary,
            }}
            to="/contact"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={toggleDrawer(false)}
          >
            Contact
          </NavLink>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <div>
        <Box sx={{ opacity: open ? "0" : "1" }}>
          <label
            onClick={toggleDrawer(true)}
            className="main-nav-open nav-toggle"
            htmlFor="main-nav-toggle"
            tabIndex="0"
            aria-label="Menu"
            style={{
              padding: "1rem 2rem",
              margin: "1rem 0",
              //  top: 0,
              //right: 0,
              zIndex: 300000,
              cursor: "pointer",
              // position: "fixed",
            }}
          >
            <svg
              aria-hidden="true"
              width="28px"
              height="20px"
              viewBox="0 0 28 20"
              style={{ fill: theme.palette.text.primary }}
            >
              <rect x="0" y="2" width="28" height="2"></rect>
              <rect x="0" y="10" width="24" height="2"></rect>
              <rect x="0" y="18" width="28" height="2"></rect>
            </svg>
          </label>
        </Box>
        <Drawer
          sx={{
            width: "clamp(280px, 80vw, 400px)",

            minHeight: "100vh",
            maxHeight: "100vh",
            backgroundColor: "transparent",

            height: "100vh",
          }}
          open={open}
          onClose={toggleDrawer(false)}
          slotProps={{
            paper: {
              sx: {
                minHeight: "100vh",
                maxHeight: "100vh",
                backgroundColor: "transparent",
                backgroundImage: `linear-gradient(to top,  ${theme.palette.background.default}, transparent) !important`,

                height: "100vh",
              },
            },
          }}
        >
          {DrawerList}
        </Drawer>
      </div>
    </>
  );
};

export default SideDrawer;
