import { Box, Stack, Typography } from "@mui/material";
import React from "react";

const HeroSection = () => {
  return (
    <Stack className="heroSectionMyPage">
      <Box className="heroContent">
        <Typography className="title">MY PAGE</Typography>
     
      </Box>
      <div className="wave">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path
            fill="#F6F6F6"
            fillOpacity="1"
            d="M0,224L60,213.3C120,203,240,181,360,181.3C480,181,600,203,720,213.3C840,224,960,224,1080,208C1200,192,1320,160,1380,144L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>
        </svg>
      </div>
    </Stack>
  );
};

export default HeroSection;
