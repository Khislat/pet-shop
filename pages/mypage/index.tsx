import { NextPage } from "next";
import withLayoutBasic from "../../libs/components/layout/LayoutBasic";
import { Button, Stack } from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SettingsIcon from "@mui/icons-material/Settings";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import StorefrontIcon from "@mui/icons-material/Storefront";
import StoreIcon from "@mui/icons-material/Store";
import SwapHorizontalCircleIcon from "@mui/icons-material/SwapHorizontalCircle";
import SensorWindowIcon from "@mui/icons-material/SensorWindow";
import ReceiptIcon from "@mui/icons-material/Receipt";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useState } from "react";
import { useRouter } from "next/router";
import { RippleBadge } from "../../scss/MaterialTheme/styled";
import { useReactiveVar } from "@apollo/client";
import { logOut } from "../../libs/auth";
import { useTranslation } from "next-i18next";

const MyPage: NextPage = () => {
	const router = useRouter();
	const [valueMainTab, setValueMainTab] = useState<string>("profile");
	const [valueChildTab, setValueChildTab] = useState<string>("account");
	const { t, i18n } = useTranslation("common");

	const handleChangeMainTab = (newValue: string) => {
		setValueMainTab(newValue);
		router.push({
			pathname: "/mypage",
			query: {
				categoryMain: newValue,
				childCategory: valueChildTab,
			},
		});
	};

	const logOutHandler = async () => {
		await logOut();
		await router.push({ pathname: "/" });
	};

	return (
		<Stack className="my-page">
			<Stack className="my-content">
				<Stack className="container">
					<Stack className="select">
						<Button
							className="select-button"
							onClick={() => handleChangeMainTab("profile")}
							sx={{
								opacity: valueMainTab === "profile" ? 1 : 0.5,
							}}>
							<HomeWorkIcon />
							{t("Account")}
						</Button>
						<Button
							onClick={() => handleChangeMainTab("item")}
							sx={{
								opacity: valueMainTab === "item" ? 1 : 0.5,
							}}
							className="select-button">
							<StorefrontIcon />
							{t("Products")}
						</Button>
						<Button
							onClick={() => handleChangeMainTab("live")}
							sx={{
								opacity: valueMainTab === "live" ? 1 : 0.5,
							}}
							className="select-button">
							<SwapHorizontalCircleIcon />
							{t("Chats")}
						</Button>
						<Button
							onClick={() => handleChangeMainTab("recently")}
							sx={{
								opacity: valueMainTab === "recently" ? 1 : 0.5,
							}}
							className="select-button">
							<ReceiptIcon />
							{t("Recently")}
						</Button>
						<Button
							onClick={() => handleChangeMainTab("notification")}
							sx={{
								opacity: valueMainTab === "notification" ? 1 : 0.5,
							}}
							className="select-button">
							<NotificationsIcon />
							{t("Notifications")}
						</Button>
						<Button
							onlick={() => logOutHandler()}
							sx={{
								opacity: valueMainTab === "logout" ? 1 : 0.5,
							}}
							className="select-button">
							<SensorWindowIcon />
							{t("Logout")}
						</Button>
					</Stack>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default withLayoutBasic(MyPage);
