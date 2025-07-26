"use client";
import React, { useCallback, useEffect, useState } from "react";
import {
	Drawer,
	IconButton,
	List,
	ListItemButton,
	ListItemText,
	Box,
	Badge,
	MenuItem,
	Button,
	Stack,
	styled,
	MenuProps,
	Menu,
	alpha,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import Link from "next/link";
import { useReactiveVar } from "@apollo/client";
import { userVar } from "../../../apollo/store";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { CaretDown } from "phosphor-react";
import NotificationMenu from "../NotificationMenu";

const MobileMenu: React.FC = () => {
	const [open, setOpen] = useState(false);
	const [anchorEl2, setAnchorEl2] = useState<null | HTMLElement>(null);
	const [lang, setLang] = useState("en");
	const user = useReactiveVar(userVar);
	const cartCount = 2;
	const router = useRouter();
	const drop = Boolean(anchorEl2);
	const { t } = useTranslation();

	// Drawer toggle
	const toggleDrawer = (state: boolean) => () => {
		setOpen(state);
	};

	useEffect(() => {
		const stored = localStorage.getItem("locale") || "en";
		setLang(stored);
	}, []);

	const langClick = (e: React.MouseEvent<HTMLElement>) => {
		setAnchorEl2(e.currentTarget);
	};

	const langClose = () => {
		setAnchorEl2(null);
	};

	const langChoice = async (e: any) => {
		const newLang = e.currentTarget.getAttribute("id") || "en";
		localStorage.setItem("locale", newLang);
		setLang(newLang);
		setAnchorEl2(null);

		// Drawer yopilib ketmasligi uchun delay (kutish)
		setTimeout(() => {
			router.push(router.asPath, router.asPath, { locale: newLang });
		}, 200);
	};

	const menuItems = [
		{ label: t("Home"), path: "/" },
		{ label: t("Shop"), path: "/shop" },
		{ label: t("Vendors"), path: "/vendors" },
		...(user?._id ? [{ label: t("My Page"), path: "/mypage" }] : []),
		{ label: t("CS"), path: "/cs" },
	];

	const StyledMenu = styled((props: MenuProps) => (
		<Menu
			elevation={0}
			anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
			transformOrigin={{ vertical: "top", horizontal: "right" }}
			{...props}
		/>
	))(({ theme }) => ({
		"& .MuiPaper-root": {
			top: "109px",
			borderRadius: 6,
			marginTop: theme.spacing(1),
			minWidth: 160,
			color:
				theme.palette.mode === "light"
					? "rgb(55, 65, 81)"
					: theme.palette.grey[300],
			boxShadow:
				"rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
			"& .MuiMenuItem-root": {
				"&:active": {
					backgroundColor: alpha(
						theme.palette.primary.main,
						theme.palette.action.selectedOpacity
					),
				},
			},
		},
	}));

	return (
		<Box>
			<IconButton onClick={toggleDrawer(true)} edge="start" size="small">
				<MenuIcon fontSize="medium" />
			</IconButton>

			<Drawer
				anchor="left"
				open={open}
				onClose={toggleDrawer(false)}
				PaperProps={{
					sx: {
						width: 280,
						backgroundColor: "#fff",
						p: 2,
						border: "1px solid #4a9abd",
						background: "#EEF9FF",
					},
				}}>
				<Box role="presentation">
					<Box
						className="logo"
						sx={{ marginBottom: "20px", marginLeft: "15px" }}>
						<img src="/img/logo/BOWOW.svg" />
					</Box>

					<Stack
						direction="row"
						spacing={2}
						alignItems="center"
						sx={{ mt: 4, justifyContent: "center" }}>
						<Link href="/cart">
							<IconButton>
								<Badge
									badgeContent={cartCount}
									overlap="circular"
									sx={{
										"& .MuiBadge-badge": {
											backgroundColor: "#FF5722",
											color: "white",
											fontSize: 10,
											width: 18,
											height: 18,
											borderRadius: "50%",
										},
									}}>
									<ShoppingBagOutlinedIcon sx={{ color: "#1C2A67" }} />
								</Badge>
							</IconButton>
						</Link>

						{/* <IconButton>
							<Badge
								badgeContent={3}
								overlap="circular"
								sx={{
									"& .MuiBadge-badge": {
										backgroundColor: "#FF5722",
										color: "white",
										fontSize: 10,
										width: 18,
										height: 18,
										borderRadius: "50%",
									},
								}}>
								<NotificationsNoneIcon sx={{ color: "#1C2A67" }} />
							</Badge>
						</IconButton> */}
						<NotificationMenu />

						<Link href="/account">
							<IconButton>
								<PersonOutlineIcon sx={{ color: "#1C2A67" }} />
							</IconButton>
						</Link>

						<Button
							sx={{ marginRight: "15px" }}
							disableRipple
							className="btn-lang-text"
							onClick={langClick}
							endIcon={<CaretDown size={14} color="black" weight="bold" />}>
							{lang === "en" && t("English")}
							{lang === "kr" && t("한국어")}
							{lang === "ru" && t("Русский")}
						</Button>

						<StyledMenu anchorEl={anchorEl2} open={drop} onClose={langClose}>
							{["en", "kr", "ru"].map((code) => (
								<MenuItem key={code} onClick={langChoice} id={code}>
									<Box display="flex" alignItems="center" gap="5px">
										<img
											src={`/img/flag/lang${code}.png`}
											alt={`${code}Flag`}
											style={{
												width: "24px",
												height: "24px",
												objectFit: "contain",
											}}
										/>
										{t(
											code === "en"
												? "English"
												: code === "kr"
												? "한국어"
												: "Русский"
										)}
									</Box>
								</MenuItem>
							))}
						</StyledMenu>
					</Stack>

					<List sx={{ mt: 3 }}>
						{menuItems.map((item) => (
							<Link key={item.path} href={item.path} passHref>
								<ListItemButton
									component="a"
									sx={{
										backgroundColor: "#4a9abd",
										borderRadius: "50px",
										width: "100%",
										height: "45px",
										mb: 1,
										justifyContent: "center",
										textAlign: "center",
										"&:hover": {
											backgroundColor: "#97c8e0",
											color: "#fff",
										},
									}}>
									<ListItemText
										primary={item.label}
										primaryTypographyProps={{
											fontSize: 14,
											fontWeight: 500,
											textAlign: "center",
										}}
									/>
								</ListItemButton>
							</Link>
						))}
					</List>
					<div
						style={{
							width: 194,
							height: 32,
							marginLeft: 25,
							marginTop: "40px",
							background:
								"url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-05-17/4788eb89-ff5e-42d9-8eb0-e57748117a4d.png) no-repeat center",
							backgroundSize: "cover",
						}}
					/>
				</Box>
			</Drawer>
		</Box>
	);
};

export default MobileMenu;
