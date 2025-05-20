import { Box, Button, Stack } from "@mui/material";
import React from "react";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import { red } from "@mui/material/colors";

const HeroSection = () => {
	return (
		<Stack className="heroSection">
			<div className={"waveWrapper"}>
				<img
					src="/img/banner/hero-wave.svg"
					alt="wave"
					className={"wave"}
					style={{ background: "EFF9FF" }}
				/>
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
						<Button className="shopButton">
							SHOP NOW
							<span className="buttonIcon"></span>
						</Button>

						<Box className="reviewsContainer">
							<div className={"reviewContainer"}>
								<div className={"circles"}>
									<div className={"circle"}>
										<img
											src="/img/users/user1.jpg"
											alt="User 1"
											className={"avatar"}
										/>
									</div>
									<div className={"circle"}>
										<img
											src="/img/users/user2.jpg"
											alt="User 2"
											className={"avatar"}
										/>
									</div>
									<div className={"circle"}>
										<img
											src="/img/users/user3.jpg"
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
};
export default HeroSection;
