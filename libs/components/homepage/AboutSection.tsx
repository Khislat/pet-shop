import { Box, Button, Stack } from "@mui/material";
import React from "react";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const AboutSection = () => {
	const device = useDeviceDetect();
	const { t } = useTranslation("common");

	if (device === "mobile") {
		return (
			<Stack className="aboutSection">
				<Stack className="imagesContainer">
					<div className="mainImage">
						<img
							src="/img/homepage/aboutDog.jpg"
							alt="dog"
							className="main-dog"
						/>
					</div>

					<div className="smallImage">
						<img
							src="/img/homepage/aboutGirl.jpg"
							alt="girl"
							className="girl"
						/>
					</div>
					<div className="batchLogo" />
					<div className="borderedImage">
						<img
							src="/img/homepage/dogCat.png"
							alt="cat-and-dog"
							className="catDog"
						/>
					</div>
				</Stack>
				<Stack className="contentContainer">
					<Box className="aboutHeader">
						<h2 className="aboutTitle">About Us</h2>
						<div className="aboutIcon" />
					</Box>
					<h3 className="treatsTitle">
						Delicious Treats to Keep
						<br />
						Your Pet Happy Healthy
					</h3>
					<p className="aboutDescription">
						{" "}
						Maecenas ultrices augue id vehicula scelerisque. Nam laoreet elit ut
						porttitor rhoncus.
						<br />
						nisiet interdum dolor mattis vitae. Aliquam gravida vitae nisl ut
						dignissim.
					</p>
					<Stack className="servicesContainer">
						<Box className="serviceItem">
							<div className="serviceIcon1" />
							<div className="serviceContent">
								<h4 className="serviceTitle">Dog Training</h4>
							</div>
						</Box>
						<Box className="serviceItem">
							<div className="serviceIcon2" />
							<div className="serviceContent">
								<h4 className="serviceTitle">Pets Care</h4>
							</div>
						</Box>
						<Box className="serviceItem">
							<div className="serviceIcon3" />
							<div className="serviceContent">
								<h4 className="serviceTitle">Pets Services</h4>
							</div>
						</Box>
					</Stack>
					<Button className="knowMoreButton">
						Know More
						<span className="buttonIcon" />
					</Button>
					<Stack className="contactInfo">
						<Box className="contactItem">
							<div className="contactIcon1" />
							<div>
								<p className="contactLabel">Call Us Anytime</p>
								<p className="contactValue">+82 10 2145 5662</p>
							</div>
						</Box>
						<Box className="contactItem">
							<div className="contactIcon2" />
							<div>
								<p className="contactLabel">Email Us Anytime</p>
								<p className="contactValue">khislatolimov29@gmail.com</p>
							</div>
						</Box>
					</Stack>
				</Stack>
			</Stack>
		);
	} else {
		return (
			<Stack className="aboutSection">
				<Stack className="container">
					<Stack className="imagesContainer">
						<div className="mainImage">
							<img
								src="/img/homepage/aboutDog.jpg"
								alt="dog"
								className="main-dog"
							/>
						</div>
						<div className="smallImage">
							<img
								src="/img/homepage/aboutGirl.jpg"
								alt="girl"
								className="girl"
							/>
						</div>
						<div className="batchLogo"></div>
						<div className="borderedImage">
							<img
								src="/img/homepage/dogCat.png"
								alt="cat-and-dog"
								className="catDog"
							/>
						</div>
					</Stack>
					<Stack className="contentContainer">
						<Box className="aboutHeader">
							<h2 className="aboutTitle">About Us</h2>
							<div className="aboutIcon" />
						</Box>
						<h3 className="treatsTitle">
							Delicious Treats to Keep
							<br />
							Your Pet Happy Healthy
						</h3>
						<p className="aboutDescription">
							{" "}
							Maecenas ultrices augue id vehicula scelerisque. Nam laoreet elit
							ut porttitor rhoncus.
							<br />
							nisiet interdum dolor mattis vitae. Aliquam gravida vitae nisl ut
							dignissim.
						</p>
						<Stack className="servicesContainer">
							<Box className="serviceItem">
								<div className="serviceIcon1" />
								<div className="serviceContent">
									<h4 className="serviceTitle">Dog Training</h4>
								</div>
							</Box>
							<Box className="serviceItem">
								<div className="serviceIcon2" />
								<div className="serviceContent">
									<h4 className="serviceTitle">Pets Care</h4>
								</div>
							</Box>
							<Box className="serviceItem">
								<div className="serviceIcon3" />
								<div className="serviceContent">
									<h4 className="serviceTitle">Pets Services</h4>
								</div>
							</Box>
						</Stack>
						<Button className="knowMoreButton">
							Know More
							<span className="buttonIcon" />
						</Button>
						<Stack className="contactInfo">
							<Box className="contactItem">
								<div className="contactIcon1" />
								<div>
									<p className="contactLabel">Call Us Anytime</p>
									<p className="contactValue">+82 10 2145 5662</p>
								</div>
							</Box>
							<Box className="contactItem">
								<div className="contactIcon2" />
								<div>
									<p className="contactLabel">Email Us Anytime</p>
									<p className="contactValue">khislatolimov29@gmail.com</p>
								</div>
							</Box>
						</Stack>
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

export default AboutSection;
