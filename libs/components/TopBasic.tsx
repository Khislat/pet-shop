"use client";
import {
	AppBar,
	Toolbar,
	Typography,
	Box,
	Button,
	Stack,
	MenuItem,
	IconButton,
	Badge,
	alpha,
	styled,
	MenuProps,
	Menu,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import NotificationIcon from "@mui/icons-material/Notifications";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { useCallback, useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useReactiveVar } from "@apollo/client";
import { userVar } from "../../apollo/store";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import useDeviceDetect from "../hooks/useDeviceDetect";
import { CaretDown } from "phosphor-react";
import MobileMenu from "./mobile/MobileMenu";

export default function TopBasic() {
	const device = useDeviceDetect();
	const user = useReactiveVar(userVar);
	const router = useRouter();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [anchorEl2, setAnchorEl2] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const [language, setLanguage] = useState("English");
	const { t, i18n } = useTranslation("common");
	const [lang, setLang] = useState<string | null>("en");
	const drop = Boolean(anchorEl2);

	useEffect(() => {
		if (localStorage.getItem("locale") === null) {
			localStorage.setItem("locale", "en");
			setLang("en");
		} else {
			setLang(localStorage.getItem("locale"));
		}
	}, [router]);

	const langClick = (e: any) => {
		setAnchorEl2(e.currentTarget);
	};

	const langClose = () => {
		setAnchorEl2(null);
	};
	const langChoice = useCallback(
		async (e: any) => {
			const selected = e.currentTarget.getAttribute("id") || "en";
			setLang(selected);
			localStorage.setItem("locale", selected);
			setAnchorEl2(null);
			await router.push(router.asPath, router.asPath, { locale: selected });
		},
		[router]
	);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};
	const handleHover = (event: any) => {
		if (anchorEl !== event.currentTarget) {
			setAnchorEl(event.currentTarget);
		} else {
			setAnchorEl(null);
		}
	};

	const StyledMenu = styled((props: MenuProps) => (
		<Menu
			elevation={0}
			anchorOrigin={{
				vertical: "bottom",
				horizontal: "right",
			}}
			transformOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
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
			"& .MuiMenu-list": {
				padding: "4px 0",
			},
			"& .MuiMenuItem-root": {
				"& .MuiSvgIcon-root": {
					fontSize: 18,
					color: theme.palette.text.secondary,
					marginRight: theme.spacing(1.5),
				},
				"&:active": {
					backgroundColor: alpha(
						theme.palette.primary.main,
						theme.palette.action.selectedOpacity
					),
				},
			},
		},
	}));

	/** Cart state */
	const { addToCart, cartItems } = useCart();
	const [cartCount, setCartCount] = useState(0);

	useEffect(() => {
		const totalCount = cartItems.reduce(
			(acc, item) => acc + (item.quantity || 1),
			0
		);
		setCartCount(totalCount);
	}, [cartItems]);
	if (device === "mobile") {
		return (
			<Stack className="topBasic">
				<Stack className="container">
					<Box className="logo">
						<img src="/img/logo/BOWOW.svg" />
					</Box>
					<MobileMenu />
				</Stack>
			</Stack>
		);
	} else {
		return (
			<Stack className="topBasic">
				<Stack className="container">
					<Box className="logo">
						<img src="/img/logo/BOWOW.svg" />
					</Box>
					<Box className="navigation">
						<Link href="/">
							{" "}
							<div className="collor">{t("Home")}</div>
						</Link>
						<Link href="/shop">
							{" "}
							<div className="collor">{t("Shop")}</div>
						</Link>
						<Link href="/vendors">
							{" "}
							<div className="collor">{t("Vendors")}</div>
						</Link>
						{user?._id && (
							<Link href={"/mypage"}>
								<div className="collor">
									{" "}
									<div>{t("My Page")}</div>
								</div>
							</Link>
						)}
						<Link href={"/cs"}>
							<div className="collor"> {t("CS")} </div>
						</Link>
					</Box>
					<Box className="headerActions">
						{/* Language selector */}
						<Button
							sx={{ color: "white", marginRight: "15px" }}
							disableRipple
							className="btn-lang-text"
							onClick={langClick}
							endIcon={<CaretDown size={14} color="white" weight="bold" />}>
							{lang === "en" && t("English")}
							{lang === "kr" && t("한국어")}
							{lang === "ru" && t("Русский")}
						</Button>
						<StyledMenu anchorEl={anchorEl2} open={drop} onClose={langClose}>
							<MenuItem onClick={langChoice} id="en">
								English
							</MenuItem>
							<MenuItem onClick={langChoice} id="kr">
								한국어
							</MenuItem>
							<MenuItem onClick={langChoice} id="ru">
								Русский
							</MenuItem>
						</StyledMenu>

						{/* Icons */}
						<Stack
							direction="row"
							spacing={4}
							alignItems="center"
							className="headerIcons">
							{/* Search */}

							{/* Cart with badge */}
							<Link href="/cart">
								<IconButton>
									<Badge
										badgeContent={cartCount}
										sx={{
											"& .MuiBadge-badge": {
												backgroundColor: "#FF5722",
												color: "white",
												fontSize: 10,
												width: "18px",
												height: "18px",
												borderRadius: "50%",
												top: 2,
												right: 2,
											},
										}}
										overlap="circular">
										<ShoppingBagOutlinedIcon
											sx={{ width: "28px", height: "28px", color: "white" }}
										/>
									</Badge>
								</IconButton>
							</Link>

							{/* Wishlist / Notifications */}
							<IconButton>
								<Badge
									badgeContent={3}
									sx={{
										"& .MuiBadge-badge": {
											backgroundColor: "#FF5722",
											color: "white",
											fontSize: 10,
											width: "18px",
											height: "18px",
											borderRadius: "50%",
											top: 2,
											right: 2,
										},
									}}
									overlap="circular">
									<NotificationIcon
										sx={{ width: "28px", height: "28px", color: "white" }}
									/>
								</Badge>
							</IconButton>

							{/* User account */}
							<Link href="/account">
								<IconButton>
									<PersonOutlineIcon
										sx={{ width: "28px", height: "28px", color: "white" }}
									/>
								</IconButton>
							</Link>
							<div className={"lan-box"}>
								<StyledMenu
									anchorEl={anchorEl2}
									open={drop}
									onClose={langClose}>
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
														display: "inline-block",
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
							</div>
						</Stack>
					</Box>
				</Stack>
			</Stack>
		);
	}
}
