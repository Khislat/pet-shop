import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { Stack } from "@mui/material";
import useDeviceDetect from "../../libs/hooks/useDeviceDetect";
import withLayoutBasic from "../../libs/components/layout/LayoutBasic";

import { Messages } from "../../libs/config";
import MyPageTabsSection from "../../libs/components/mypage/MyPageTabs";

import { Avatar, Box, Tabs, Tab } from "@mui/material";
import {
	FavoriteBorder,
	AddBoxOutlined,
	HomeWorkOutlined,
	HistoryOutlined,
	GroupOutlined,
	PersonAddAlt1Outlined,
	ArticleOutlined,
	PostAddOutlined,
	PersonOutline,
	LogoutOutlined,
} from "@mui/icons-material";
import AddProperty from "../../libs/components/mypage/AddProduct";
import MyProducts from "../../libs/components/mypage/MyProducts";
const tabData = [
	{
		label: "Add Product",
		icon: <AddBoxOutlined />,
		content: <AddProperty />,
	},
	{
		label: "My Products",
		icon: <HomeWorkOutlined />,
		content: <MyProducts />,
	},
	{
		label: "My Favorites",
		icon: <FavoriteBorder />,
		content: "Favorite Listings",
	},
	{
		label: "Recently Visited",
		icon: <HistoryOutlined />,
		content: "Recently Viewed Properties",
	},
	{
		label: "Followers",
		icon: <GroupOutlined />,
		content: "People Following You",
	},
	{
		label: "Followings",
		icon: <PersonAddAlt1Outlined />,
		content: "People You Follow",
	},
	{
		label: "Article",
		icon: <ArticleOutlined />,
		content: "All Published Articles",
	},
	{
		label: "Write Article",
		icon: <PostAddOutlined />,
		content: "Write a New Article",
	},
	{
		label: "My Profile",
		icon: <PersonOutline />,
		content: "Your Profile Settings",
	},
	{ label: "Logout", icon: <LogoutOutlined />, content: "Logout Action" },
];

const MyPage: NextPage = () => {
	const [activeTab, setActiveTab] = useState(2); // Default: My Favorites

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setActiveTab(newValue);
	};
	const device = useDeviceDetect();

	if (device === "mobile") {
		return <div>MY PAGE</div>;
	} else {
		return (
			<div id="my-page" style={{ position: "relative" }}>
				<div className="container">
					<Stack className={"my-page"}>
						<Stack className={"back-frame"}>
							<Stack className={"left-config"}>
									<Box className="sidebar">
										<div className="profile">
											<Avatar
												alt="Arlene McCoy"
												src="https://i.pravatar.cc/150?img=3"
												className="avatar"
											/>
											<div className="info">
												<h3>Arlene McCoy</h3>
												<p>📞 010–1234–3421</p>
												<span className="agent">AGENT</span>
											</div>
										</div>

										<Tabs
											orientation="vertical"
											value={activeTab}
											onChange={handleChange}
											TabIndicatorProps={{ style: { display: "none" } }}
											className="customTabs">
											{tabData.map((tab, index) => (
												<Tab
													key={tab.label}
													label={
														<span className="tabLabel">
															{tab.icon}
															{tab.label}
														</span>
													}
													className={`tab ${
														activeTab === index ? "active" : ""
													}`}
												/>
											))}
										</Tabs>
									</Box>
								
							</Stack>

							<Stack className="main-config" mb={"76px"}>
								<Stack className={"list-config"}>
									<Box className="tabContent">
										<h2>{tabData[activeTab].label}</h2>
										<p>{tabData[activeTab].content}</p>
									</Box>
								</Stack>
							</Stack>
						</Stack>
					</Stack>
				</div>
			</div>
		);
	}
};

export default withLayoutBasic(MyPage);
