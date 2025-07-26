"use client";
import React, { useState } from "react";
import {
	IconButton,
	Badge,
	Menu,
	MenuItem,
	Box,
	Typography,
	Stack,
	alpha,
	styled,
	MenuProps,
} from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

const notifications = [
	{ id: 1, title: "New order received", time: "2 mins ago" },
	{ id: 2, title: "New user registered", time: "10 mins ago" },
	{ id: 3, title: "Product out of stock", time: "30 mins ago" },
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
		borderRadius: 6,
		marginTop: theme.spacing(1),
		minWidth: 250,
		color:
			theme.palette.mode === "light"
				? "rgb(55, 65, 81)"
				: theme.palette.grey[300],
		boxShadow:
			"rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
		padding: "10px 0",
	},
	"& .MuiMenuItem-root": {
		padding: "10px 16px",
		display: "block",
		"&:hover": {
			backgroundColor: "#f5f5f5",
		},
	},
}));

const NotificationMenu: React.FC = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<IconButton onClick={handleClick}>
				<Badge
					badgeContent={notifications.length}
					overlap="circular"
					sx={{
						"& .MuiBadge-badge": {
							backgroundColor: "#FF5722",
							color: "#fff",
							fontSize: 10,
							width: 18,
							height: 18,
							borderRadius: "50%",
							top: 2,
							right: 2,
						},
					}}>
					<NotificationsNoneIcon
						sx={{ width: 28, height: 28, color: "#fff" }}
					/>
				</Badge>
			</IconButton>

			<StyledMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
				<Box sx={{ px: 2, pb: 1 }}>
					<Typography variant="subtitle1" fontWeight={600}>
						Notifications
					</Typography>
				</Box>
				{notifications.map((n) => (
					<MenuItem key={n.id} onClick={handleClose}>
						<Typography variant="body2" fontWeight={500}>
							{n.title}
						</Typography>
						<Typography variant="caption" color="text.secondary">
							{n.time}
						</Typography>
					</MenuItem>
				))}
			</StyledMenu>
		</>
	);
};

export default NotificationMenu;
