import { IconButton, Menu, MenuItem, Stack, Typography } from "@mui/material";
import { useState } from "react";
import Moment from "react-moment";

import ModeIcon from "@mui/icons-material/Mode";
import DeleteIcon from "@mui/icons-material/Delete";

export const ProductCard = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleClose = () => {
		setAnchorEl(null);
	};
	return (
		<Stack className="product-card-box">
			<Stack className="image-box">
				<img src="/img/semple-foto.png" />
			</Stack>
			<Stack className="information-box">
				<Typography className="name">Pet Toy</Typography>
				<Typography className="price">
					<strong>$15</strong>
				</Typography>
			</Stack>
			<Stack className="date-box">
				<Moment format="DD MMMM, YYYY"></Moment>
			</Stack>
			<Stack className="status-box">
				<Stack className="coloured-box" sx={{ background: "#E5F0FD" }}>
					<Typography className="status" sx={{ color: "#3554d1" }}>
						ACTIVE
					</Typography>
				</Stack>
			</Stack>
			<Menu
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				PaperProps={{
					elevation: 0,
					sx: {
						width: "70px",
						mt: 1,
						ml: "10px",
						overflow: "visible",
						filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
					},
					style: {
						padding: 0,
						display: "flex",
						justifyContent: "center",
					},
				}}>
				<MenuItem disableRipple>Sold</MenuItem>
			</Menu>
			<Stack className="views-box">
				<Typography className="views">20</Typography>
			</Stack>

			<Stack className="action-box">
				<IconButton className="icon-button">
					<ModeIcon className="buttons" />
				</IconButton>
				<IconButton className="icon-button">
					<DeleteIcon className="buttons" />
				</IconButton>
			</Stack>
		</Stack>
	);
};
