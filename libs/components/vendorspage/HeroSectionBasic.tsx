import { Box, Stack } from "@mui/material";
import React from "react";

const HeroSection = () => {
  return (
    <Stack className="heroSectionBasic" sx={{ background: "#97c8e0" }}>
      <div className="wave">
        <Stack className="heroContainer">
          <Box className="pageName">
            <h1 className="name">VENDORS PAGE</h1>
          </Box>
        </Stack>
      </div>
    </Stack>
  );
};

export default HeroSection;
