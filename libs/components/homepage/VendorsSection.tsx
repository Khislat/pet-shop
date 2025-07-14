import { Stack, IconButton, Divider, Box } from "@mui/material";
import React, { useState } from "react";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import { useRouter } from "next/router";
import { Member } from "../../types/member/member";
import { LIKE_TARGET_PRODUCT } from "../../../apollo/user/mutation";
import { useMutation, useQuery } from "@apollo/client";
import { T } from "../../types/common";
import { Message } from "../../enums/common.enum";
import {
	sweetMixinErrorAlert,
	sweetTopSmallSuccessAlert,
} from "../../sweetAlert";
import { VendorsInquiry } from "../../types/member/member.input";
import { GET_VENDORS } from "../../../apollo/user/query";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper";
import {
	ArrowBackIosNew,
	ArrowForwardIos,
	Facebook,
	Instagram,
	Star,
	Twitter,
	YouTube,
} from "@mui/icons-material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import CallIcon from "@mui/icons-material/Call";
import { relative } from "path";
import { NEXT_PUBLIC_APP_API_URL } from "../../config";
import Link from "next/link";

interface TopVendorsProps {
	initialInput?: VendorsInquiry;
}

const TopVendorsSection = ({ initialInput = vendorsInput }: TopVendorsProps) => {
	const device = useDeviceDetect();
	const router = useRouter();
	const [topVendors, setTopVendors] = useState<Member[]>([]);
	const [likeTargetMember] = useMutation(LIKE_TARGET_PRODUCT);
	const {
		loading: getVendorsLoading,
		data: getVendorsData,
		error: getVendorsError,
		refetch: getVendorsRefetch,
	} = useQuery(GET_VENDORS, {
		fetchPolicy: "network-only",
		variables: { input: initialInput },
		notifyOnNetworkStatusChange: true,
		onCompleted(data: T) {
			setTopVendors(data?.getVendors?.list ?? []);
		},
	});

	const likeMemberHandler = async (user: T, id: string) => {
		try {
			if (!id) return;
			if (!user._id) throw new Error(Message.NOT_AUTHENTICATED);

			await likeTargetMember({ variables: { input: id } });
			await getVendorsRefetch({ input: initialInput });
			await sweetTopSmallSuccessAlert("success", 800);
		} catch (err: any) {
			console.log("ERROR, likeMemberHandler:", err.message);
			sweetMixinErrorAlert(err.message).then();
		}
	};

	if(device === "mobile") {
		return (
			<Stack className="teamSection">
				<Stack className="background">
					<img
						src="/img/banner/hero-wave.svg"
						alt="wave"
						className="wave2"
						style={{ background: "#eff9ff" }}
					/>
					<Stack className="container">
						<Stack className="sectionHeader">
							<h2 className="sectionTitle">Our Top Brands</h2>
							<div className="decorationIcon" />
							<Divider className="topVendorDivider" />
							<div className={"nav"}>
								<IconButton>
									<ArrowBackIosNew fontSize="small" className="swiper-prev" />
								</IconButton>
								<IconButton>
									<ArrowForwardIos fontSize="small" className="swiper-next" />
								</IconButton>
							</div>
						</Stack>
	
						<Swiper
							modules={[Navigation, Pagination]}
							spaceBetween={16}
							slidesPerView={"auto"}
							navigation={{
								nextEl: ".swiper-next",
								prevEl: ".swiper-prev",
							}}
							pagination={{ clickable: true }}
							className="teamSwiper">
							{topVendors?.map((member) => {
								return (
									<SwiperSlide key={member._id} style={{ width: "200px" }}>
										<Stack className="teamCard">
											<div className="profileImageContainer">
												<div className="profileImage">
												<Link
													href={{
														pathname: "/member",
														query: { memberId: member._id },
													}}>
													<img
														src={`${NEXT_PUBLIC_APP_API_URL}/${member?.memberImage}`}
														alt={member.memberNick}
														className="clickableImage"
													/>
												</Link>
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
									</SwiperSlide>
								);
							})}
						</Swiper>
					</Stack>
				</Stack>
			</Stack>
		);
	}else {
		return (
			<Stack className="teamSection">
				<Stack className="background">
					<img
						src="/img/banner/hero-wave.svg"
						alt="wave"
						className="wave2"
						style={{ background: "#eff9ff" }}
					/>
					<Stack className="container">
						<Stack className="sectionHeader">
							<h2 className="sectionTitle">Our Top Brands</h2>
							<div className="decorationIcon" />
							<Divider className="topVendorDivider" />
							<div className={"nav"}>
								<IconButton>
									<ArrowBackIosNew fontSize="small" className="swiper-prev" />
								</IconButton>
								<IconButton>
									<ArrowForwardIos fontSize="small" className="swiper-next" />
								</IconButton>
							</div>
						</Stack>
	
						<Swiper
							modules={[Navigation, Pagination]}
							spaceBetween={26}
							slidesPerView={"auto"}
							navigation={{
								nextEl: ".swiper-next",
								prevEl: ".swiper-prev",
							}}
							pagination={{ clickable: true }}
							className="teamSwiper">
							{topVendors?.map((member) => {
								return (
									<SwiperSlide key={member._id} style={{ width: "300px" }}>
										<Stack className="teamCard">
											<div className="profileImageContainer">
												<div className="profileImage">
												<Link
													href={{
														pathname: "/member",
														query: { memberId: member._id },
													}}>
													<img
														src={`${NEXT_PUBLIC_APP_API_URL}/${member?.memberImage}`}
														alt={member.memberNick}
														className="clickableImage"
													/>
												</Link>
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
									</SwiperSlide>
								);
							})}
						</Swiper>
					</Stack>
				</Stack>
			</Stack>
		);
	}


};

const vendorsInput: VendorsInquiry = {
	page: 1,
	limit: 5,
	sort: "createdAt",
	search: {
		text: "",
	},
};

export default TopVendorsSection;
