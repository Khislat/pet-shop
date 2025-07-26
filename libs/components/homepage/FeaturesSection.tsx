import React from "react";
import { Box, Stack } from "@mui/material";
import useDeviceDetect from "../../hooks/useDeviceDetect";

const FeaturesSection = () => {
	const device = useDeviceDetect();

	if (device === "mobile") {
		return (
			<Stack className={"featuresSection"}>
				<Stack className="background">
					<img
						src="/img/banner/hero-wave.svg"
						alt="wave"
						className={"wave1"}
						style={{ background: "#eff9ff" }}
					/>

					<Stack className={"container"}>
						<Stack className={"featureBox"}>
							<Box className={"leftContent"}>
								<h2 className={"sectionTitle"}>
									Experience the Joy of Pet Companionship
								</h2>

								<p className={"description"}>
									Maecenas ultrices augue id vehicula scelerisque. Nam laoreet
									elit ut porttitor rhoncus.
								</p>
							</Box>

							<div className={"divider"} />

							<Stack className={"featuresGrid"}>
								<Box className={"featureItem"}>
									<div className={"featureIcon1"} />
									<img
										src="/img/icons/homepage/featureElipse.svg"
										className="featureElipse"
									/>
									<Box className={"featureContent"}>
										<h3 className={"featureTitle"}>Play Toys</h3>
										<p className={"featureDescription"}>
											Get Ready for Purrfectly Hilarious Moments Laughter.
										</p>
									</Box>
								</Box>

								<Box className={"featureItem"}>
									<div className={"featureIcon2"} />
									<img
										src="/img/icons/homepage/featureElipse.svg"
										className="featureElipse"
									/>
									<Box className={"featureContent"}>
										<h3 className={"featureTitle"}>Best Food</h3>
										<p className={"featureDescription"}>
											Get Ready for Purrfectly Hilarious Moments Laughter.
										</p>
									</Box>
								</Box>

								<Box className={"featureItem"}>
									<div className={"featureIcon3"} />
									<img
										src="/img/icons/homepage/featureElipse.svg"
										className="featureElipse"
									/>
									<div className={"featureContent"}>
										<h3 className={"featureTitle"}>Medicare</h3>
										<p className={"featureDescription"}>
											Get Ready for Purrfectly Hilarious Moments Laughter.
										</p>
									</div>
								</Box>

								<Box className={"featureItem"}>
									<div className={"featureIcon4"} />
									<img
										src="/img/icons/homepage/featureElipse.svg"
										className="featureElipse"
									/>
									<Box className={"featureContent"}>
										<h3 className={"featureTitle"}>Best Services</h3>
										<p className={"featureDescription"}>
											Get Ready for Purrfectly Hilarious Moments Laughter.
										</p>
									</Box>
								</Box>
							</Stack>
						</Stack>
					</Stack>
				</Stack>
			</Stack>
		);
	} else {
		return (
			<Stack className={"featuresSection"}>
				<Stack className="background">
					<img
						src="/img/banner/hero-wave.svg"
						alt="wave"
						className={"wave1"}
						style={{ background: "#eff9ff" }}
					/>

					<Stack className={"container"}>
						<Stack className={"featureBox"}>
							<Box className={"leftContent"}>
								<h2 className={"sectionTitle"}>
									Experience the Joy of Pet Companionship
								</h2>

								<p className={"description"}>
									Maecenas ultrices augue id vehicula scelerisque. Nam laoreet
									elit ut porttitor rhoncus. nisiet interdum dolor mattis vitae.
									Aliquam gravida vitae nisl ut dignissim.
								</p>
							</Box>

							<div className={"divider"} />

							<Stack className={"featuresGrid"}>
								<Box className={"featureItem"}>
									<div className={"featureIcon1"} />
									<img
										src="/img/icons/homepage/featureElipse.svg"
										className="featureElipse"
									/>
									<Box className={"featureContent"}>
										<h3 className={"featureTitle"}>Play Toys</h3>
										<p className={"featureDescription"}>
											Get Ready for Purrfectly Hilarious Moments Laughter.
										</p>
									</Box>
								</Box>

								<Box className={"featureItem"}>
									<div className={"featureIcon2"} />
									<img
										src="/img/icons/homepage/featureElipse.svg"
										className="featureElipse"
									/>
									<Box className={"featureContent"}>
										<h3 className={"featureTitle"}>Best Food</h3>
										<p className={"featureDescription"}>
											Get Ready for Purrfectly Hilarious Moments Laughter.
										</p>
									</Box>
								</Box>

								<Box className={"featureItem"}>
									<div className={"featureIcon3"} />
									<img
										src="/img/icons/homepage/featureElipse.svg"
										className="featureElipse"
									/>
									<div className={"featureContent"}>
										<h3 className={"featureTitle"}>Medicare</h3>
										<p className={"featureDescription"}>
											Get Ready for Purrfectly Hilarious Moments Laughter.
										</p>
									</div>
								</Box>

								<Box className={"featureItem"}>
									<div className={"featureIcon4"} />
									<img
										src="/img/icons/homepage/featureElipse.svg"
										className="featureElipse"
									/>
									<Box className={"featureContent"}>
										<h3 className={"featureTitle"}>Best Services</h3>
										<p className={"featureDescription"}>
											Get Ready for Purrfectly Hilarious Moments Laughter.
										</p>
									</Box>
								</Box>
							</Stack>
						</Stack>
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

export default FeaturesSection;
