import { Box, Stack } from "@mui/material";
import React from "react";
import useDeviceDetect from "../../hooks/useDeviceDetect";

const TestimonialsSection = () => {
	const device = useDeviceDetect();

	if (device === "mobile") {
		return (
			<Stack className={"testimonialsSection"}>
				<Stack className={"container"}>
					<div className={"sectionHeader"}>
						<h2 className={"sectionTitle"}>Our Customer Says</h2>
						<div className={"decorationIcon"} />
					</div>

					<Box className={"testimonialLayout"}>
						<div className={"leftImage"}>
							<img src="/img/homepage/costumer.avif" alt="costumer" />
							<div className={"quoteIcon"} />
						</div>

						<div className={"testimonialContent"}>
							<p className={"testimonialText"}>
								Nunc in mollis lorem, eget gravida ex. Nulla id leo nibh. Duis
								volutpat magna nunc, vel dapibus metus luctus Nulla in nisl sit
								amet ex dictum mollis. Curabitur ultricies odio turpis, a
								ullamcorper mauris posuere Integer vestibulum
							</p>

							<div className={"testimonialAuthor"}>
								<span className={"authorName"}>Jhon Wick</span>
								<span className={"authorRole"}> - Manager</span>
							</div>
						</div>

						{/* <div className={"rightImages"}>
							<div className={"singleImage"}>
								{" "}
								<img src="/img/homepage/costumer2.jpeg" alt="costumer" />
							</div>
							<div className={"moreImages"}>
								{" "}
								<img src="/img/homepage/costumer3.jpeg" alt="costumer" />
								
							</div>
						</div> */}
					</Box>

					<div className={"pagination"} />
				</Stack>
			</Stack>
		);
	} else {
		return (
			<Stack className={"testimonialsSection"}>
				<Stack className={"container"}>
					<div className={"sectionHeader"}>
						<h2 className={"sectionTitle"}>Our Customer Says</h2>
						<div className={"decorationIcon"} />
					</div>

					<Box className={"testimonialLayout"}>
						<div className={"leftImage"}>
							<img src="/img/homepage/costumer.avif" alt="costumer" />
							<div className={"quoteIcon"} />
						</div>

						<div className={"testimonialContent"}>
							<p className={"testimonialText"}>
								Nunc in mollis lorem, eget gravida ex. Nulla id leo nibh. Duis
								volutpat magna nunc, vel dapibus metus luctus Nulla in nisl sit
								amet ex dictum mollis. Curabitur ultricies odio turpis, a
								ullamcorper mauris posuere Integer vestibulum sem in nulla
								fermentum vulputate. Morbi ipsum nunc.
							</p>

							<div className={"testimonialAuthor"}>
								<span className={"authorName"}>Jhon Wick</span>
								<span className={"authorRole"}> - Manager</span>
							</div>
						</div>

						<div className={"rightImages"}>
							<div className={"singleImage"}>
								{" "}
								<img src="/img/homepage/costumer2.jpeg" alt="costumer" />
							</div>
							<div className={"moreImages"}>
								{" "}
								<img src="/img/homepage/costumer3.jpeg" alt="costumer" />
							</div>
						</div>
					</Box>

					<div className={"pagination"} />
				</Stack>
			</Stack>
		);
	}
};

export default TestimonialsSection;
