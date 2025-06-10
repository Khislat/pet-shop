import React from "react";
import { Box, Button, Typography, Rating } from "@mui/material";
import { Product } from "../../types/product/product"; // `Product` tipidan foydalandik


const ProductItem: React.FC= () => {
	return (
		<Box className={"productItem"}>
			<Box className={"image"} /> {/* Hozircha rasm yo‘q */}
			<Box className={"content"}>
				<Typography className={"title"}>dhksfh</Typography>
				<Typography className={"price"}>dfs</Typography>
				<Button className={"button"}>ADD TO CART</Button>
			</Box>
			<Rating
				
				precision={0.5}
				readOnly
				className={"rating"}
				sx={{
					"& .MuiRating-icon": {
						width: "15.69px",
						height: "15.21px",
						fontSize: "15.69px",
					},
				}}
			/>
		</Box>
	);
};

export default ProductItem;
