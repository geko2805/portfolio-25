import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  useTheme,
} from "@mui/material";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Debug environment variables
    console.log("Service ID:", import.meta.env.VITE_EMAILJS_SERVICE_ID);
    console.log("Template ID:", import.meta.env.VITE_EMAILJS_TEMPLATE_ID);
    console.log("Public Key:", import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formData,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setStatus("success");
          setFormData({ name: "", email: "", message: "" });
          setErrors({});
          setLoading(false);
        },
        (error) => {
          setStatus("error");
          console.error("EmailJS error:", error);
          setLoading(false);
        }
      );
  };
  const theme = useTheme();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box
      sx={{
        // height: "100vh",
        // width: "100%",
        // maxWidth: "800px",
        // margin: "auto",
        // mt: "80px",
        // height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        className="fade up"
        sx={{
          fontWeight: 700,
          fontSize: "clamp(2.4em, 6vw, 4.0625rem)",
          fontFamily: "Inconsolata, monospace",
          letterSpacing: "-0.15rem",
          margin: "0 0 1.5rem",
          lineHeight: 0.5,
          color: theme.palette.text.main,
          cursor: "default",
          zIndex: 1,
        }}
        variant="h1"
      >
        Contact
      </Typography>

      <Box
        className="fade up delay1"
        sx={{
          maxWidth: 500,
          mt: 2,
          mx: "auto",
          p: 3,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          align="center"
          sx={{ fontWeight: 800 }}
        >
          Interested in hiring or collaborating?
        </Typography>
        <Typography
          variant="h6"
          component="h2"
          sx={{ fontSize: "1.2rem" }}
          gutterBottom
          align="center"
        >
          Drop me a message and I will get back to you 🙏
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Message"
            name="message"
            multiline
            rows={4}
            value={formData.message}
            onChange={handleChange}
            error={!!errors.message}
            helperText={errors.message}
            margin="normal"
            variant="outlined"
          />
          <Button
            disabled={loading}
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            {loading ? "Sending" : "Send Message"}
          </Button>
          {status === "success" && (
            <Alert severity="success" sx={{ mt: 2 }}>
              Message sent successfully!
            </Alert>
          )}
          {status === "error" && (
            <Alert severity="error" sx={{ mt: 2 }}>
              Failed to send message. Please try again.
            </Alert>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Contact;
