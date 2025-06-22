import React, { useState } from "react";
import Image from "next/image";
import { Stack, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Product } from "../../types/product/product";
import { NEXT_PUBLIC_APP_API_URL } from "../../config";
import { useCart } from "../../context/CartContext";
import { sweetErrorAlert, sweetTopSmallSuccessAlert } from "../../sweetAlert";

interface ProductCardProps {
	product: Product;
	memberPage: boolean;
}

const ProductCard = ({ product, memberPage }: ProductCardProps) => {
	const [isWished, setIsWished] = useState(false);
	const { addToCart, cartItems } = useCart();
	const [isAdding, setIsAdding] = useState(false);

	const handleAddToCart = async () => {
		setIsAdding(true);

		try {
			addToCart(product);

			// Success feedback (optional)
			// toast.success('Product added to cart!');
			sweetTopSmallSuccessAlert('Product added to cart!')
		} catch (error) {
			console.error("Error adding to cart:", error);
			// toast.error('Failed to add product to cart');
			sweetErrorAlert('Failed to add product to cart')
		} finally {
			setIsAdding(false);
		}
	};

	const toggleWishlist = () => {
		setIsWished((prev) => !prev);
		// Istasangiz bu yerda like mutation yuborishingiz mumkin
	};

	return (
		<Stack className={"productCard"}>
			{product.productPrice && (
				<div className={"discountBadge"}>
					<span>{product.productPrice}% Off</span>
				</div>
			)}

			<IconButton className="wishlistIcon" onClick={toggleWishlist}>
				{isWished ? (
					<FavoriteIcon sx={{ color: "#ff4d4f" }} />
				) : (
					<FavoriteBorderIcon sx={{ color: "#888" }} />
				)}
			</IconButton>

			{product.productImages?.length > 0 && (
				<Image
					src={`${NEXT_PUBLIC_APP_API_URL}/${product.productImages[0]}`}
					alt={product.productTitle}
					width={180}
					height={180}
					className="productImage"
				/>
			)}

			<div className={"productRating"}>
				<div className={"stars"} />
			</div>

			<h3 className={"productName"}>{product.productTitle}</h3>

			<div className={"productPrice"}>
				<span className={"currentPrice"}>
					${product.productPrice.toFixed(2)}
				</span>
				{product.productPrice && (
					<span className={"oldPrice"}>${product.productPrice.toFixed(2)}</span>
				)}
			</div>

			<button className={"addToCartButton"} onClick={handleAddToCart}>
				<span>ADD TO CART</span>
			</button>
		</Stack>
	);
};

export default ProductCard;
