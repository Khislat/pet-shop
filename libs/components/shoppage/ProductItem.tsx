import React from "react";
import { Box, Button, Typography, Rating } from "@mui/material";

interface ProductItemProps {
	title: string;
	price: string;
	rating: number;
}

const ProductItem: React.FC<ProductItemProps> = ({ title, price, rating }) => {
	return (
		<Box className={"productItem"}>
			<Box className={"image"} />
			<Box className={"content"}>
				<Typography className={"title"}>{title}</Typography>
				<Typography className={"price"}>{price}</Typography>
				<Button className={"button"}>ADD TO CART</Button>
			</Box>
			<Rating
				value={rating}
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
