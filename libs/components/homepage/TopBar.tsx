import { Box, Stack } from "@mui/material";
import React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";

const TopBar = () => {
	return (
		<Stack className="topBar">
			<Stack className="container">
				<Box className="socialIcons">
					<InstagramIcon />
					<FacebookIcon />
					<YouTubeIcon />
					<TwitterIcon />
					<LinkedInIcon />
				</Box>
				<span className="announcement">
					Summer Sale Starts Now & Free Shipping Order Above $250
				</span>
				<Box className="contactInfo">
					<CallIcon sx={{ color: "white", width: "20px" }} />
					<span className="contactNumber">+82-10-21455662</span>
					<span className="separator">|</span>
					<EmailIcon sx={{ color: "white", width: "20px" }} />
					<span className="contactEmail">khislatolimov29@gmail.com</span>
				</Box>
			</Stack>
		</Stack>
	);
};

export default TopBar;
