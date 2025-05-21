import React from "react";
import Image from "next/image";
import { Stack } from "@mui/material";

interface ProductProps {
	product: {
		id: number;
		name: string;
		price: number;
		oldPrice: number;
		rating: number;
		image: string;
		discount: number | null;
	};
}

const ProductCard: React.FC<ProductProps> = ({ product }) => {
	return (
		<Stack className={"productCard"}>
			{product.discount && (
				<div className={"discountBadge"}>
					<span>{product.discount}% Off</span>
				</div>
			)}

			<div
				className={"wishlistIcon"}
				style={{ backgroundImage: `url(${product.image})` }}
			/>

			<div className={"productRating"}>
				<div className={"stars"} />
			</div>

			<h3 className={"productName"}>{product.name}</h3>

			<div className={"productPrice"}>
				<span className={"currentPrice"}>
					${product.price.toFixed(2)}{" "}
				</span>
				<span className={"oldPrice"}>${product.oldPrice.toFixed(2)}</span>
			</div>

			<button className={"addToCartButton"}>
				<span>ADD TO CART</span>
			</button>
		</Stack>
	);
};

export default ProductCard;
