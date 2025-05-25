// components/TestimonialsSection.tsx
import React from "react";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { FaStar, FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

const TestimonialsSection = () => {
	return (
		<Stack className={"wrapper"}>
			<Stack className="container">
				<Box className={"ctaBanner"}>
					<Typography className={"ctaText"}>TIME TO FEED YOUR PETS</Typography>
					<Box className={"ctaRight"}>
						<div className={"desc"}>Purchase Our New Pets Food</div>
						<Button className={"ctaButton"}>Purchase Now</Button>
					</Box>
				</Box>

				{/* Testimonial Content */}
				<Container className={"testimonialContent"}>
					<div className="faQuoteLeft">
            <img src="/img/vaectors/FaQuoteLeft.svg" alt="faquote"/>
          </div>
					<Box className={"imageBox"}>
						<div className={"imgPlaceholder"}></div>
					</Box>

					<Box className={"textBox"}>
						<Typography className={"heading"}>
							OUR HAPPY CLIENTS SAYS,
						</Typography>
						<div className={"stars"}>
							{"★★★★★".split("").map((star, idx) => (
								<span key={idx} className={"star"}>
									{star}
								</span>
							))}
						</div>
						<Typography className={"description"}>
							Etiam eros dolor, eleifend vel lacus id, porttitor lacinia nunc.
							Nulla sit amet velit vitae nisl sollicitudin ornare. Aenean
							suscipit. Duis volutpat magna vitae luctus condimentum. Nullam
							ante magna, fringilla imperdiet leo vitae, viverra rutrum metus...
						</Typography>
						<Typography className={"name"}>
							JENIFER FERCHOL - DOG LOVER
						</Typography>
						<Typography className={"role"}>CEO - Peties</Typography>

						<Box className={"dots"}>
							<span className={"activeDot"}></span>
							<span></span>
							<span></span>
						</Box>
					</Box>
          <div className="faQuoteRight">
            <img src="/img/vaectors/FaQuoteLeft.svg" alt="faquote"/>
          </div>
				</Container>
			</Stack>
			{/* CTA Block */}
		</Stack>
	);
};

export default TestimonialsSection;
