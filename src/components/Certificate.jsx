import React, { useState } from "react";
import {
  Modal,
  IconButton,
  Box,
  Typography,
  Backdrop,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FullscreenIcon from "@mui/icons-material/Fullscreen";

const Certificate = ({ ImgSertif }) => {
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ width: "100%" }}>
      {/* Thumbnail */}
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          borderRadius: "14px",
          background: "var(--bg-card)",
          border: "1px solid var(--border-main)",
          transition: "all 0.35s ease",
          cursor: "pointer",
          "&:hover": {
            transform: "translateY(-6px)",
            boxShadow: "0 20px 40px rgba(99,102,241,0.15)",
          },
        }}
        onClick={() => setOpen(true)}
      >
        {/* Image */}
        <img
          src={ImgSertif}
          alt="Certificate"
          loading="lazy"
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            objectFit: "cover",
            transition: "transform 0.4s ease",
          }}
        />

        {/* Hover Overlay */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.15), rgba(0,0,0,0.45))",
            opacity: 0,
            transition: "opacity 0.35s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            "&:hover": {
              opacity: 1,
            },
          }}
        >
          <Box
            sx={{
              textAlign: "center",
              color: "#fff",
              backdropFilter: "blur(4px)",
            }}
          >
            <FullscreenIcon sx={{ fontSize: 42, mb: 1 }} />
            <Typography fontWeight={600}>
              View Certificate
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Modal */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 300,
            sx: {
              backgroundColor: "rgba(0,0,0,0.85)",
              backdropFilter: "blur(6px)",
            },
          },
        }}
      >
        <Box
          sx={{
            position: "relative",
            maxWidth: "90vw",
            maxHeight: "90vh",
            outline: "none",
          }}
        >
          {/* Close */}
          <IconButton
            onClick={() => setOpen(false)}
            sx={{
              position: "absolute",
              top: 14,
              right: 14,
              bgcolor: "rgba(0,0,0,0.6)",
              color: "#fff",
              "&:hover": {
                bgcolor: "rgba(0,0,0,0.8)",
                transform: "scale(1.1)",
              },
            }}
          >
            <CloseIcon />
          </IconButton>

          {/* Full Image */}
          <img
            src={ImgSertif}
            alt="Certificate Full View"
            style={{
              maxWidth: "100%",
              maxHeight: "90vh",
              display: "block",
              margin: "0 auto",
              objectFit: "contain",
              borderRadius: "12px",
            }}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default Certificate;
