"use client";
import { Typography, Box, Stack, IconButton, Badge, Menu, MenuItem } from "@mui/material";
import Link from "next/link";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import NotificationIcon from "@mui/icons-material/Notifications";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

export default function Top() {
	/** Language menu state */
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const [language, setLanguage] = useState("English");

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const langChoice = (event: any) => {
		const lang = event.currentTarget.innerText;
		setLanguage(lang);
		handleClose();
	};

	/** Cart state */
	const { addToCart, cartItems } = useCart();
	const [cartCount, setCartCount] = useState(0);

	useEffect(() => {
		const totalCount = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);
		setCartCount(totalCount);
	}, [cartItems]);

	return (
		<Stack className="top">
			<Stack className="container">
				{/* Logo */}
				<Box className="logo">
					<img src="/img/logo/BOWOW.svg" />
				</Box>

				{/* Navigation */}
				<Box className="navigation">
					<Link href="/">Home</Link>
					<Link href="/shop">Shop</Link>
					<Link href="/vendors">Vendors</Link>
					<Link href="/mypage">My page</Link>
					<Link href="/">Blog</Link>
					<Link href="/">Contact</Link>
				</Box>

				{/* Header actions */}
				<Box className="headerActions">
					{/* Language selector */}
					<Stack
						className="languageCurrency"
						gap={0.5}
						sx={{ color: "#1C2A67", cursor: "pointer" }}
						onClick={handleClick}
					>
						<Typography sx={{ fontSize: "16px", fontWeight: 500 }}>
							{language}
						</Typography>
						<ExpandMoreIcon sx={{ fontSize: 22 }} />
					</Stack>

					{/* Language menu */}
					<Menu
						anchorEl={anchorEl}
						open={open}
						onClose={handleClose}
						MenuListProps={{
							"aria-labelledby": "language-button",
						}}
					>
						<MenuItem onClick={langChoice}>English</MenuItem>
						<MenuItem onClick={langChoice}>Russian</MenuItem>
						<MenuItem onClick={langChoice}>Korean</MenuItem>
					</Menu>

					{/* Icons */}
					<Stack direction="row" spacing={4} alignItems="center" className="headerIcons">
						{/* Search */}
						<IconButton>
							<SearchIcon sx={{ width: "28px", height: "28px", color: "#1C2A67" }} />
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
									overlap="circular"
								>
									<ShoppingBagOutlinedIcon sx={{ width: "28px", height: "28px", color: "#1C2A67" }} />
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
								overlap="circular"
							>
								<NotificationIcon sx={{ width: "28px", height: "28px", color: "#1C2A67" }} />
							</Badge>
						</IconButton>

						{/* User account */}
						<Link href="/account">
							<IconButton>
								<PersonOutlineIcon sx={{ width: "28px", height: "28px", color: "#1C2A67" }} />
							</IconButton>
						</Link>
					</Stack>
				</Box>
			</Stack>
		</Stack>
	);
}
