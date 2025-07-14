import React, { useState } from "react";
import { Box, Container, IconButton, Stack, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import withLayoutBasic from "../../libs/components/layout/LayoutBasic";
import HeroSectionBasic from "../../libs/components/admin/cs/HeroSectionBasic";
import useDeviceDetect from "../../libs/hooks/useDeviceDetect";
const faqData = [
	{
		question: "What kind of products do you offer?",
		answer:
			"We offer food, toys, accessories, grooming items, and clothing for dogs, cats, birds, and other pets.",
	},
	{
		question: "How can I place an order?",
		answer:
			"Simply select your desired products, click “Add to Cart”, then proceed to checkout to complete your order.",
	},
	{
		question: "How long does delivery take?",
		answer:
			"Delivery usually takes between 1–3 business days depending on your location.",
	},
	{
		question: "How can I track my order?",
		answer:
			"You can track your order in your account under the “My Orders” section.",
	},
	{
		question: "Is there a minimum order amount?",
		answer: "Yes, the minimum order value is $10.",
	},
];

const productAndService = [
	{
		question: "What types of pet food do you sell?",
		answer:
			"We provide healthy, natural, and vet-recommended foods for dogs, cats, birds, and small pets.",
	},
	{
		question: "Do you offer pet training services?",
		answer:
			"Yes, we provide basic obedience training services by certified trainers, especially for dogs.",
	},
	{
		question: "Are your products certified and safe?",
		answer:
			"Absolutely. All our pet food and care products are certified and meet international safety standards.",
	},
	{
		question: "Do you have gift items for pet birthdays?",
		answer:
			"Yes! We offer special gift boxes and party accessories for pet birthdays and celebrations.",
	},
];

const payment = [
	{
		question: "What payment methods do you accept?",
		answer: "We accept Visa, MasterCard, PayPal, and local bank transfers.",
	},
	{
		question: "Can I return a product if it doesn’t fit or suit my pet?",
		answer: "Yes, you can return unused items within 7 days of delivery.",
	},
	{
		question: "When will I get my refund?",
		answer:
			"Refunds are processed within 3 business days after we receive the returned item.",
	},
];
const FaqPage = () => {
	const device = useDeviceDetect();
	const [openIndex, setOpenIndex] = useState<number | null>(2); // Only 3rd is open by default

	const handleToggle = (index: number) => {
		setOpenIndex(openIndex === index ? null : index);
	};
	if (device === "mobile") {
		return (
			<h1 style={{ marginTop: "20px", textAlign: "center" }}>CS PAGE MOBILE</h1>
		);
	} else {
		return (
			<Stack className={"faqPage"}>
				<HeroSectionBasic />
				<div className="container">
					{" "}
					<Typography className={"subtitle"}>
						FREQUENTLY ASKED QUESTIONS
					</Typography>
					<Typography className={"faqTitle"}>
						HAVE ANY QUESTION? FIND ANSWER HERE
					</Typography>
					<Typography className={"sectionTitle"}>
						SHOPPING INFORMATION
					</Typography>
					<Stack spacing={1} className={"accordionList"}>
						{faqData.map((item, index) => (
							<Box key={index} className={"accordionItem"}>
								<Box
									className={"questionBox"}
									onClick={() => handleToggle(index)}>
									<Typography className={"question"}>
										{item.question}
									</Typography>
									<IconButton>
										{openIndex === index ? (
											<ExpandLessIcon />
										) : (
											<ExpandMoreIcon />
										)}
									</IconButton>
								</Box>
								{openIndex === index && item.answer && (
									<Typography className={"answer"}>{item.answer}</Typography>
								)}
							</Box>
						))}
					</Stack>
					<Typography className={"sectionTitlePayment"}>
						SHOPPING INFORMATION
					</Typography>
					<Stack spacing={1} className={"accordionList"}>
						{productAndService.map((item, index) => (
							<Box key={index} className={"accordionItem"}>
								<Box
									className={"questionBox"}
									onClick={() => handleToggle(index)}>
									<Typography className={"question"}>
										{item.question}
									</Typography>
									<IconButton>
										{openIndex === index ? (
											<ExpandLessIcon />
										) : (
											<ExpandMoreIcon />
										)}
									</IconButton>
								</Box>
								{openIndex === index && item.answer && (
									<Typography className={"answer"}>{item.answer}</Typography>
								)}
							</Box>
						))}
					</Stack>
					<Typography className={"sectionTitlePayment"}>PAYMENT</Typography>
					<Stack spacing={1} className={"accordionList"}>
						{payment.map((item, index) => (
							<Box key={index} className={"accordionItem"}>
								<Box
									className={"questionBox"}
									onClick={() => handleToggle(index)}>
									<Typography className={"question"}>
										{item.question}
									</Typography>
									<IconButton>
										{openIndex === index ? (
											<ExpandLessIcon />
										) : (
											<ExpandMoreIcon />
										)}
									</IconButton>
								</Box>
								{openIndex === index && item.answer && (
									<Typography className={"answer"}>{item.answer}</Typography>
								)}
							</Box>
						))}
					</Stack>
				</div>
			</Stack>
		);
	}
};

export default withLayoutBasic(FaqPage);
