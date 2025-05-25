// TeamSection.tsx
import React from "react";
import Image from "next/image";

import useDeviceDetect from "../../libs/hooks/useDeviceDetect";
import { Box, Grid, Typography, Stack, Button, Container } from "@mui/material";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import withLayoutBasic from "../../libs/components/layout/LayoutBasic";
import HeroSectionBasic from "../../libs/components/vendorspage/HeroSectionBasic";

import { FaStar, FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import TestimonialsSection from "../../libs/components/vendorspage/TestimonialsSection";

const teamMembers = [
	{
		name: "Linda Himloton",
		role: "Pets Care Trainer",
	},
	{
		name: "Andreya Kishore",
		role: "Pets Care Trainer",
	},
	{
		name: "Mariya Joesph",
		role: "Pets Care Trainer",
	},
	{
		name: "Amanda Losya",
		role: "Pets Care Trainer",
	},
];

const VendorsSection = () => {
	const device = useDeviceDetect();
	if (device === "mobile") {
		return <h1>PROPERTIES MOBILE</h1>;
	} else {
		return (
			<Stack className={"teamSectionWrapper"}>
				<HeroSectionBasic />
				<Stack className="container">
					<Box className="titleBox">
						{" "}
						<Typography className={"sectionTitle"}>
							Properly Care For Their Pets
						</Typography>
						<div className={"decorationIcon"} />
					</Box>

					<Grid container spacing={3} justifyContent="center">
						{[...teamMembers, ...teamMembers].map((member, index) => (
							<Grid item xs={12} sm={6} md={3} key={index}>
								<Stack className={"teamCard"}>
									<div className={"profileImageContainer"}>
										<div className={"profileImage"} />
									</div>
									<h3 className={"memberName"}>{member.name}</h3>
									<p className={"memberRole"}>{member.role}</p>
									<Stack direction="row" spacing={2} justifyContent="center">
										<FaFacebookF />
										<FaInstagram />
										<FaTwitter />
										<FaYoutube />
									</Stack>
								</Stack>
							</Grid>
						))}
					</Grid>
					<Stack
						className="testimonialsWrapper">
						<TestimonialsSection />
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

export default withLayoutBasic(VendorsSection);
