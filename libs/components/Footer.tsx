import { Box, Link, Stack } from "@mui/material";
import React from "react";

const Footer = () => {
	return (
		<Stack className="footer">
			<Stack className="container">
				<Stack className="footerTop">
					<Stack className="footerColumn">
						<div className={"logo"} />
						<p className="companyDescription">
							Choosing a cat or a dog as pet is depending on person preference
							or purpose. Both animals can become good companion.
						</p>
						<div className={"socialIcons"} />
					</Stack>
					<Stack className="footerColumn">
						<h3 className="columnTitle">CONTACT</h3>
						<Box className="contactItem">
							<div className={"locationIcon"} />
							<span className={"contactText"}>Daegu, South Korea</span>
						</Box>
						<Box className="contactItem">
							<span className={"contactText"}>Suesongu</span>
						</Box>
						<Box className="contactItem">
							<div className={"phoneIcon"} />
							<span className={"contactText"}>+82 10 2145 5662</span>
						</Box>
						<Box className="contactItem">
							<div className={"emailIcon"} />
							<span className={"contactText"}>khislatolimov29@gmail.com</span>
						</Box>
						<Box className="contactItem">
							<div className={"webIcon"} />
							<span className={"contactText"}>www.bowbow.com</span>
						</Box>
					</Stack>
					<Stack className="footerColumn">
						<h3 className="columnTitle">HELP</h3>
						<ul className={"footerLinks"}>
							<li>
								<Link href="/faqs">FAQs</Link>
							</li>
							<li>
								<Link href="/pricing">Pricing Plans</Link>
							</li>
							<li>
								<Link href="/track">Track</Link>
							</li>
							<li>
								<Link href="/order">Your Order</Link>
							</li>
							<li>
								<Link href="/account">My Account</Link>
							</li>
						</ul>
					</Stack>
					<Stack className="footerColumn">
						<h3 className="columnTitle">ABOUT US</h3>
						<ul className={"footerLinks"}>
							<li>
								<Link href="/story">Our Story</Link>
							</li>
							<li>
								<Link href="/jobs">Job Opportunities</Link>
							</li>
							<li>
								<Link href="/store-locator">Store Locator</Link>
							</li>
							<li>
								<Link href="/contact-us">Contact Us</Link>
							</li>
							<li>
								<Link href="/news">News & Blogs</Link>
							</li>
							<li>
								<Link href="/testimonials">Testimonial</Link>
							</li>
						</ul>
					</Stack>
					<Stack className="footerColumn">
						<h3 className={"columnTitle"}>Get Active Updates</h3>
						<p className={"newsletterText"}>
							Get access to the hottest styles, workout secrets and special
							offers Discerning Pet Owners.
						</p>
						<div className={"newsletterForm"}>
							<input
								type="email"
								placeholder="Enter Your Mail Id"
								className={"emailInput"}
							/>
							<button className={"submitButton"}>SUBMIT NOW</button>
						</div>
						<p className={"discountText"}>
							by subscribing to Get Special Discount!
						</p>
					</Stack>
					<div className={"dogImage"} />
				</Stack>
				<div className={"divider"} />
				<Stack className={"footerBottom"}>
					<p className={"copyright"}>
						Copyright © Bowbow. All Rights Reserved.
					</p>

					<div className={"socialIconsRow"} />

					<p className={"termsLinks"}>Privacy & Cookies | Terms of services</p>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default Footer;
