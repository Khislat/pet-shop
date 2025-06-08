import React from "react";
import Image from "next/image";
import { Stack } from "@mui/material";
import { Product, Products } from "../../types/product/product";

interface ProductCardProps {
	product: Product;
}

const ProductCard = (props: ProductCardProps) => {
	const { product } = props;
	return (
		<Stack className={"productCard"}>
			{product.productPrice && (
				<div className={"discountBadge"}>
					<span>{product.productPrice}% Off</span>
				</div>
			)}

			<div
				className={"wishlistIcon"}
				style={{
					backgroundImage: product.productImages?.length
						? `url(${product.productImages[0]})`
						: "none",
				}}
			/>
			{product.productImages?.length > 0 && (
				<Image
					src={product.productImages[0]}
					alt={product.productTitle}
					width={200}
					height={200}
					className="productImage"
				/>
			)}

			<div className={"productRating"}>
				<div className={"stars"} />
			</div>

			<h3 className={"productName"}>{product.productTitle}</h3>

			<div className={"productPrice"}>
				<span className={"currentPrice"}>
					${product.productPrice.toFixed(2)}{" "}
				</span>
				<span className={"oldPrice"}>${product.productPrice.toFixed(2)}</span>
			</div>

			<button className={"addToCartButton"}>
				<span>ADD TO CART</span>
			</button>
		</Stack>
	);
};

export default ProductCard;
