// TeamSection.tsx
import React, { useEffect, useState } from "react";
import Image from "next/image";

import useDeviceDetect from "../../libs/hooks/useDeviceDetect";
import { Box, Grid, Typography, Stack, Button, Container } from "@mui/material";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import withLayoutBasic from "../../libs/components/layout/LayoutBasic";
import HeroSectionBasic from "../../libs/components/vendorspage/HeroSectionBasic";

import { FaStar, FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import TestimonialsSection from "../../libs/components/vendorspage/TestimonialsSection";
import { VendorsInquiry } from "../../libs/types/member/member.input";
import { useRouter } from "next/router";
import { Member } from "../../libs/types/member/member";
import { LIKE_TARGET_PRODUCT } from "../../apollo/user/mutation";
import { useMutation, useQuery } from "@apollo/client";
import { GET_VENDORS } from "../../apollo/user/query";
import { T } from "../../libs/types/common";
import { Message } from "../../libs/enums/common.enum";
import {
	sweetMixinErrorAlert,
	sweetTopSmallSuccessAlert,
} from "../../libs/sweetAlert";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import CallIcon from "@mui/icons-material/Call";
import { NEXT_PUBLIC_APP_API_URL } from "../../libs/config";

interface VendorsPageProps {
	initialInput?: VendorsInquiry;
	showMoreBtn: boolean;
}

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

const VendorsSectionPage = ({
	initialInput = vendorsInput,
	showMoreBtn,
}: VendorsPageProps) => {
	const device = useDeviceDetect();
	const router = useRouter();

	const initialItemsToShow = 4;
	const [itemsToShow, setItemsToShow] = useState(initialItemsToShow);
	const [allVendors, setAllVendors] = useState<Member[]>([]);
	const [likeTargetMember] = useMutation(LIKE_TARGET_PRODUCT);
	const {
		loading: getAllVendorsLoading,
		data: getAllVendorsData,
		error: getAllVendorsError,
		refetch: getAllVendorsRefetch,
	} = useQuery(GET_VENDORS, {
		fetchPolicy: "network-only",
		variables: { input: initialInput },
		notifyOnNetworkStatusChange: true,
		onCompleted(data: T) {
			setAllVendors(data?.getVendors?.list ?? []);
		},
	});

	const likeMemberHandler = async (user: T, id: string) => {
		try {
			if (!id) return;
			if (!user._id) throw new Error(Message.NOT_AUTHENTICATED);

			await likeTargetMember({ variables: { input: id } });
			await getAllVendorsRefetch({ input: initialInput });
			await sweetTopSmallSuccessAlert("success", 800);
		} catch (err: any) {
			console.log("ERROR, likeMemberHandler:", err.message);
			sweetMixinErrorAlert(err.message).then();
		}
	};

	useEffect(() => {
		console.log("allVendors:", allVendors);
	}, [allVendors]);

	/** HANDLERS */
	const handleMenuShowMore = () => setItemsToShow(allVendors.length);
	const handleMenuShowLess = () => setItemsToShow(initialItemsToShow);

	// const handleMenuShowMore = () => {
	// 	// When the "Show More" button is clicked, set itemsToShow to the total number of items in the list
	// 	setMenuItemsToShow(allVendors.length);
	// };
	// const handleMenuShowLess = () => {
	// 	setMenuItemsToShow(initialMenuItemsToShow);
	// };

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
						{allVendors?.slice(0, itemsToShow).map((member, index) => (
							<Grid item xs={12} sm={6} md={3} key={index}>
								<Stack className="teamCard">
									<div className="profileImageContainer">
										<div className="profileImage">
											<img
												src={`${NEXT_PUBLIC_APP_API_URL}/${member?.memberImage}`}
												alt={member.memberNick}
											/>
										</div>
									</div>
									<h3 className="memberName">{member.memberNick}</h3>
									<p className="memberRole">
										<CallIcon
											fontSize="small"
											sx={{
												position: "relative",
												top: "5px",
												marginRight: "5px",
												marginLeft: "-15px",
											}}
											color="action"
										/>
										{member.memberPhone}
									</p>
									<div className="social-icons">
										<FacebookIcon color="action" />
										<InstagramIcon color="action" />
										<TwitterIcon color="action" />
										<YouTubeIcon color="action" />
									</div>
								</Stack>
							</Grid>
						))}
					</Grid>

					<Box sx={{ textAlign: "center", mt: 10 }}>
						{itemsToShow < allVendors.length ? (
							<Button
								variant="contained"
								color="primary"
								onClick={handleMenuShowMore}
								className="viewAllButton">
								VIEW MORE
								<span className={"buttonIcon"} />
							</Button>
						) : (
							<Button
								variant="contained"
								color="primary"
								onClick={handleMenuShowLess}
								className="viewAllButton">
								VIEW LESS
								<span className={"buttonIcon"} />
							</Button>
						)}
					</Box>

					<Stack className="testimonialsWrapper">
						<TestimonialsSection />
					</Stack>
				</Stack>
			</Stack>
		);
	}
};
const vendorsInput: VendorsInquiry = {
	page: 1,
	limit: 8,
	sort: "createdAt",
	search: {
		text: "",
	},
};

export default withLayoutBasic(VendorsSectionPage);
