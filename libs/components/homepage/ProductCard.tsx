import React, { useState } from "react";
import Image from "next/image";
import { Stack, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Product } from "../../types/product/product";
import { NEXT_PUBLIC_APP_API_URL } from "../../config";
import { useCart } from "../../context/CartContext";
import { sweetErrorAlert, sweetTopSmallSuccessAlert } from "../../sweetAlert";
import Link from "next/link";
import { userVar } from "../../../apollo/store";
import { useReactiveVar } from "@apollo/client";

interface ProductCardProps {
	product: Product;
	memberPage: boolean;
	likeProductHandler?: any;
	myFavorites?: boolean;
}

const ProductCard = ({
	product,
	memberPage,
	likeProductHandler,
	myFavorites,
}: ProductCardProps) => {
	const [isWished, setIsWished] = useState(
		myFavorites || (product?.meLiked && product?.meLiked[0]?.myFavorite)
	);
	const [likes, setLikes] = useState<number>(product?.productLikes || 0);
	const { addToCart, cartItems } = useCart();
	const [isAdding, setIsAdding] = useState(false);
	const user = useReactiveVar(userVar);

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

	const toggleWishlist = () => {
		likeProductHandler(user, product._id);
		setIsWished((prev) => !prev);
		setLikes((prev) => (isWished ? prev - 1 : prev + 1));
	};
	const handleLikeClick = async () => {
		if (!user?._id) {
			sweetErrorAlert("You are not Authenticate pleace login first!");
			return;
		}

		if (likeProductHandler) {
			await likeProductHandler(user, product._id);
			setIsWished((prev) => !prev);
		}
	};

	return (
		<Stack className={"productCard"}>
			{product.productPrice && (
				<div className={"discountBadge"}>
					<span>{product.productPrice}% Off</span>
				</div>
			)}

			<IconButton className="wishlistIcon" onClick={handleLikeClick}>
				{user?._id && isWished ? (
					<FavoriteIcon sx={{ color: "#ff4d4f" }} />
				) : (
					<FavoriteBorderIcon sx={{ color: "#888" }} />
				)}
			</IconButton>

			<Link
				href={{
					pathname: "/shop/detail",
					query: { id: product?._id },
				}}>
				{product.productImages?.length > 0 && (
					<img
						src={`${NEXT_PUBLIC_APP_API_URL}/${product.productImages[0]}`}
						alt={product.productTitle}
						className="productImage"
					/>
				)}
			</Link>

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
