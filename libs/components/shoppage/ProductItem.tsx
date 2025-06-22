import React, { useState } from "react";
import { Box, Button, Typography, Rating } from "@mui/material";
import { Product } from "../../types/product/product";
import { NEXT_PUBLIC_APP_API_URL } from "../../config";
import { useCart } from "../../context/CartContext";
import { sweetErrorAlert, sweetTopSmallSuccessAlert } from "../../sweetAlert";
type ProductItemProps = {
	product: Product;
};

const ProductItem = ({ product }: ProductItemProps) => {
	const { addToCart, cartItems } = useCart();
	const [isAdding, setIsAdding] = useState(false);
	const handleAddToCart = async () => {
		setIsAdding(true);

		try {
			addToCart(product);

			// Success feedback (optional)
			// toast.success('Product added to cart!');
			sweetTopSmallSuccessAlert("Product added to cart!");
		} catch (error) {
			console.error("Error adding to cart:", error);
			// toast.error('Failed to add product to cart');
			sweetErrorAlert("Failed to add product to cart");
		} finally {
			setIsAdding(false);
		}
	};
	return (
		<Box className={"productItem"}>
			<Box className={"image"}>
				<img
					src={`${NEXT_PUBLIC_APP_API_URL}/${product.productImages[0]}`}
					alt={product.productTitle}
				/>
			</Box>
			<Box className={"content"}>
				<Typography className={"title"}>{product.productTitle}</Typography>
				<Box className={"prices"}>
					{" "}
					<Typography className={"price"}>$ {product.productPrice}</Typography>
					<Typography className={"price"}>$ {product.productPrice}</Typography>
				</Box>

				<Button className={"button"} onClick={handleAddToCart}>
					ADD TO CART
				</Button>
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
