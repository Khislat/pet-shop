"use client";
import {
	Typography,
	Box,
	Stack,
	IconButton,
	Badge,
	Menu,
	MenuItem,
	styled,
	MenuProps,
	alpha,
	Button,
} from "@mui/material";
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
import useDeviceDetect from "../hooks/useDeviceDetect";
import MobileMenu from "./mobile/MobileMenu";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { CaretDown } from "phosphor-react";
import { useRouter } from "next/router";



export default function Top() {
	/** Language menu state */
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
			const selectedLang = e.currentTarget.id;
			setLang(selectedLang);
			localStorage.setItem("locale", selectedLang);
			await i18n.changeLanguage(selectedLang); // <-- ENG MUHIM QADAM
			setAnchorEl2(null);
		},
		[i18n]
	);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	// const langChoice = (event: any) => {
	// 	const lang = event.currentTarget.innerText;
	// 	setLanguage(lang);
	// 	handleClose();
	// };
	// function t(arg0: string): import("react").ReactNode {
	// 	throw new Error("Function not implemented.");
	// }

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
			<Stack className="top">
				{/* Logo */}
				<Box className="logo">
					<img src="/img/logo/BOWOW.svg" />
				</Box>
				<MobileMenu />
			</Stack>
		);
	} else {
		return (
			<Stack className="top">
				<Stack className="container">
					{/* Logo */}
					<Box className="logo">
						<img src="/img/logo/BOWOW.svg" />
					</Box>

					{/* Navigation */}
					<Box className="navigation">
						<Link href="/">
							{" "}
							<div>{t("Home")}</div>
						</Link>
						<Link href="/shop">
							{" "}
							<div>{t("Shop")}</div>
						</Link>
						<Link href="/vendors">
							{" "}
							<div>{t("Vendors")}</div>
						</Link>
						{user?._id && (
							<Link href={"/mypage"}>
								<div>
									{" "}
									<div>{t("My Page")}</div>
								</div>
							</Link>
						)}
						<Link href="/">Blog</Link>
						<Link href="/">Contact</Link>
					</Box>

					{/* Header actions */}
					<Box className="headerActions">
						{/* Language selector */}
						<Button
							disableRipple
							className="btn-lang-text"
							onClick={langClick}
							endIcon={<CaretDown size={14} color="black" weight="bold" />}>
							{lang === "en" && t("English")}
							{lang === "kr" && t("Korean")}
							{lang === "ru" && t("Russian")}
						</Button>
						<StyledMenu anchorEl={anchorEl2} open={drop} onClose={langClose}>
							<MenuItem onClick={langChoice} id="en">
								English
							</MenuItem>
							<MenuItem onClick={langChoice} id="kr">
								Korean
							</MenuItem>
							<MenuItem onClick={langChoice} id="ru">
								Russian
							</MenuItem>
						</StyledMenu>

						{/* Icons */}
						<Stack
							direction="row"
							spacing={4}
							alignItems="center"
							className="headerIcons">
							{/* Search */}
							<IconButton>
								<SearchIcon
									sx={{ width: "28px", height: "28px", color: "#1C2A67" }}
								/>
							</IconButton>

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
											sx={{ width: "28px", height: "28px", color: "#1C2A67" }}
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
										sx={{ width: "28px", height: "28px", color: "#1C2A67" }}
									/>
								</Badge>
							</IconButton>

							{/* User account */}
							<Link href="/account">
								<IconButton>
									<PersonOutlineIcon
										sx={{ width: "28px", height: "28px", color: "#1C2A67" }}
									/>
								</IconButton>
							</Link>
							{/* <div className={"lan-box"}>
								<Button
									disableRipple
									className="btn-lang"
									onClick={langClick}
									endIcon={
										<CaretDown size={14} color="#616161" weight="fill" />
									}>
									<Box component={"div"} className={"flag"}>
										{lang !== null ? (
											<img src={`/img/flag/lang${lang}.png`} alt={"usaFlag"} />
										) : (
											<img src={`/img/flag/langen.png`} alt={"usaFlag"} />
										)}
									</Box>
								</Button>

								<StyledMenu
									anchorEl={anchorEl2}
									open={drop}
									onClose={langClose}
									sx={{ position: "absolute" }}>
									<MenuItem disableRipple onClick={langChoice} id="en">
										<Box display="flex" alignItems="center" gap="5px">
											{" "}
											<img
												className="img-flag"
												src={"/img/flag/langen.png"}
												onClick={langChoice}
												id="en"
												alt={"usaFlag"}
												style={{
													width: "24px",
													height: "24px",
													objectFit: "contain",
													display: "inline-block",
												}}
											/>
											{t("English")}
										</Box>
									</MenuItem>
									<MenuItem disableRipple onClick={langChoice} id="kr">
										<Box display="flex" alignItems="center" gap="5px">
											{" "}
											<img
												className="img-flag"
												src={"/img/flag/langkr.png"}
												onClick={langChoice}
												alt={"koreanFlag"}
												style={{
													width: "24px",
													height: "24px",
													objectFit: "contain",
													display: "inline-block",
												}}
											/>
											{t("Korean")}
										</Box>
									</MenuItem>
									<MenuItem disableRipple onClick={langChoice} id="ru">
										<Box display="flex" alignItems="center" gap="5px">
											{" "}
											<img
												className="img-flag"
												src={"/img/flag/langru.png"}
												onClick={langChoice}
												id="ru"
												alt={"russiaFlag"}
												style={{
													width: "24px",
													height: "24px",
													objectFit: "contain",
													display: "inline-block",
												}}
											/>
											{t("Russian")}
										</Box>
									</MenuItem>
								</StyledMenu>
							</div> */}
						</Stack>
					</Box>
				</Stack>
			</Stack>
		);
	}
}
