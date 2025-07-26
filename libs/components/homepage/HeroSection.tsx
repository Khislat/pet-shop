import { Box, Button, Stack } from "@mui/material";
import React from "react";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import { red } from "@mui/material/colors";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import { useRouter } from "next/router";
import Link from "next/link";

import { useTranslation } from "next-i18next";

const HeroSection = () => {
	const device = useDeviceDetect();
	const router = useRouter();
	const { t } = useTranslation("common");
	const handleClick = () => {
		router.push("/shop");
	};

	if (device === "mobile") {
		return (
			<Stack className="heroSection">
				<div className="wave">
					<svg viewBox="0 0 1440 320" preserveAspectRatio="none">
						<path
							fill="#FFFFFF"
							fillOpacity="1"
							d="M0,224L60,213.3C120,203,240,181,360,181.3C480,181,600,203,720,213.3C840,224,960,224,1080,208C1200,192,1320,160,1380,144L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
					</svg>
				</div>
				<Stack className="container">
					<div className="hero-dog">
						<img src="/img/homepage/Dog.png" alt="dog" className="main-dog" />
						<div className="bg-shapes"></div>
					</div>
					<Box className="qualityBadge">
						<img
							src="/img/icons/homepage/qualityIcon.svg"
							className="badgeIcon"
						/>
						<span className="badgeText">Best Quality</span>
					</Box>
					<Box className="heroContent">
						<h1 className="heroTitle">
							<span className="discountPercent">40% Off </span>
							<span className="discountDescription">Dogs healthy foods</span>
						</h1>

						<p className="heroDescription">
							Quisque nec nisi ut velit bibendum interdum non in nulla.
							Integerquis aliquet mi. Curabitur sit amet dui quis ante tincidunt
							Quisque nec nisi ut velit.
						</p>
						<Box className="heroActions">
							<Link href="/shop" passHref>
								<Button
									component="div"
									className="shopButton"
									sx={{ cursor: "pointer" }}>
									SHOP NOW
									<span className="buttonIcon" />
								</Button>
							</Link>

							<Box className="reviewsContainer">
								<div className={"reviewContainer"}>
									<div className={"circles"}>
										<div className={"circle"}>
											<img
												src="/img/homepage/user1.webp"
												alt="User 1"
												className={"avatar"}
											/>
										</div>
										<div className={"circle"}>
											<img
												src="/img/homepage/user2.jpg"
												alt="User 2"
												className={"avatar"}
											/>
										</div>
										<div className={"circle"}>
											<img
												src="/img/homepage/user3.jpeg"
												alt="User 3"
												className={"avatar"}
											/>
										</div>
										<div className={`${"circle"} ${"highlighted"}`}>
											<span>1k+</span>
										</div>
									</div>
									<span className={"text"}>Client Reviews</span>
								</div>
							</Box>
						</Box>
						<Box className="pagination">
							<TrendingFlatIcon className="arrowRight" />
							<span className="paginationText">1/4</span>
							<TrendingFlatIcon className="arrowLeft" />
						</Box>
					</Box>
				</Stack>
			</Stack>
		);
	} else {
		return (
			<Stack className="heroSection">
				<div className="wave">
					<svg viewBox="0 0 1440 320" preserveAspectRatio="none">
						<path
							fill="#FFFFFF"
							fillOpacity="1"
							d="M0,224L60,213.3C120,203,240,181,360,181.3C480,181,600,203,720,213.3C840,224,960,224,1080,208C1200,192,1320,160,1380,144L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
					</svg>
				</div>
				<Stack className="container">
					<Box className="qualityBadge">
						<img
							src="/img/icons/homepage/qualityIcon.svg"
							className="badgeIcon"
						/>
						<span className="badgeText">Best Quality</span>
					</Box>
					<Box className="heroContent">
						<h1 className="heroTitle">
							<span className="discountPercent">40% Off </span>
							<span className="discountDescription">Dogs healthy foods</span>
						</h1>

						<p className="heroDescription">
							Quisque nec nisi ut velit bibendum interdum non in nulla.
							Integerquis aliquet mi. Curabitur sit amet dui quis ante tincidunt
							Quisque nec nisi ut velit.
						</p>
						<Box className="heroActions">
							<Link href="/shop" passHref>
								<Button
									component="div"
									className="shopButton"
									sx={{ cursor: "pointer" }}>
									SHOP NOW
									<span className="buttonIcon" />
								</Button>
							</Link>

							<Box className="reviewsContainer">
								<div className={"reviewContainer"}>
									<div className={"circles"}>
										<div className={"circle"}>
											<img
												src="/img/homepage/user1.webp"
												alt="User 1"
												className={"avatar"}
											/>
										</div>
										<div className={"circle"}>
											<img
												src="/img/homepage/user2.jpg"
												alt="User 2"
												className={"avatar"}
											/>
										</div>
										<div className={"circle"}>
											<img
												src="/img/homepage/user3.jpeg"
												alt="User 3"
												className={"avatar"}
											/>
										</div>
										<div className={`${"circle"} ${"highlighted"}`}>
											<span>1k+</span>
										</div>
									</div>
									<span className={"text"}>Client Reviews</span>
								</div>
							</Box>
						</Box>
						<Box className="pagination">
							<TrendingFlatIcon className="arrowRight" />
							<span className="paginationText">1/4</span>
							<TrendingFlatIcon className="arrowLeft" />
						</Box>
					</Box>
					<div className="hero-dog">
						<img src="/img/homepage/Dog.png" alt="dog" className="main-dog" />
						<div className="bg-shapes"></div>
					</div>
				</Stack>
			</Stack>
		);
	}
};
export default HeroSection;
