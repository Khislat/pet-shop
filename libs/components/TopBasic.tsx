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
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import NotificationIcon from "@mui/icons-material/Notifications";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useReactiveVar } from "@apollo/client";
import { userVar } from "../../apollo/store";

export default function TopBasic() {
	const user = useReactiveVar(userVar);
	/** Handler */

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const langChoice = (event: any) => {
		const lang = event.currentTarget.id;
		// Lang tanlash funksiyasi shu yerda yoziladi
		handleClose();
	};
	function t(arg0: string): import("react").ReactNode {
		throw new Error("Function not implemented.");
	}

	const { addToCart, cartItems } = useCart();
	const [cartCount, setCartCount] = useState(0);

	useEffect(() => {
		const totalCount = cartItems.reduce(
			(acc, item) => acc + (item.quantity || 1),
			0
		);
		setCartCount(totalCount);
	}, [cartItems]);

	return (
		<Stack className="topBasic">
			<Stack className="container">
				<Box className="logo">
					<img src="/img/logo/BOWOW.svg" />
				</Box>
				<Box className="navigation">
					<Link href="/">Home</Link>
					<Link href="/shop">Shop</Link>
					<Link href="/vendors">Vendors</Link>
					{user?._id && (
								<Link href={'/mypage'}>
									<div> {('My Page')} </div>
								</Link>
							)}
					<Link href="/">Blog</Link>
					<Link href="/">Contact</Link>
				</Box>
				<Box className="headerActions">
					<Stack
						className="languageCurrency"
						gap={0.5}
						sx={{ color: "#1C2A67", cursor: "pointer" }}
						onClick={handleClick}>
						<Typography sx={{ fontSize: "16px", fontWeight: 500 }}>
							English
						</Typography>
						<ExpandMoreIcon sx={{ fontSize: 22 }} />
					</Stack>
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
						<Link href={"/cart"}>
							{" "}
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
						{/* Wishlist with badge */}
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
						{/* User */}
						<Link href="/account">
							<IconButton>
								<PersonOutlineIcon
									sx={{ width: "28px", height: "28px", color: "#1C2A67" }}
								/>
							</IconButton>
						</Link>
					</Stack>
				</Box>
			</Stack>
		</Stack>
	);
}
