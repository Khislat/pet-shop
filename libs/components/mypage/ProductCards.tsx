// libs/components/shoppage/ShopCard.tsx
import React, { useState } from "react";
import { Button, IconButton, Stack, Typography } from "@mui/material";
import Link from "next/link";
import SearchIcon from "@mui/icons-material/Search";
import CachedIcon from "@mui/icons-material/Cached";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Product } from "../../types/product/product";
import { NEXT_PUBLIC_APP_API_URL } from "../../config";
import { useCart } from "../../context/CartContext";
import { sweetErrorAlert, sweetTopSmallSuccessAlert } from "../../sweetAlert";
import { userVar } from "../../../apollo/store";
import { useReactiveVar } from "@apollo/client";

type ProductCardProps = {
	product: Product;
	likeProductHandler?: any;
	recentlyVisited?: boolean;
	myFavorites?: boolean;
	deleteProductHandler?: any;
	updateProductHandler?: any;
};

const ProductCards = ({
	product,
	likeProductHandler,
	recentlyVisited,
	myFavorites,
	deleteProductHandler,
	updateProductHandler,
}: ProductCardProps) => {
	const { addToCart, cartItems } = useCart();
	const [isAdding, setIsAdding] = useState(false);
	const [isWished, setIsWished] = useState(false);
	const user = useReactiveVar(userVar);

	const [likes, setLikes] = useState<number>(product?.productLikes || 0);

	const toggleWishlist = () => {
		likeProductHandler(user, product._id);
		setIsWished((prev) => !prev);
		setLikes((prev) => (isWished ? prev - 1 : prev + 1));
	};

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
		<div className="card">
			{product.productPrice && (
				<div className="discountBadge">{product.productPrice}% Off</div>
			)}

			<div className="iconGroup">
				{!recentlyVisited && (
					<Stack className="buttons">
						<IconButton color="default">
							<RemoveRedEyeIcon />
						</IconButton>
						<Typography className="view-cnt">
							{product?.productViews}
						</Typography>

						<IconButton color="default" onClick={toggleWishlist}>
							{isWished ? (
								<FavoriteIcon sx={{ color: "#ff4d4f" }} />
							) : (
								<FavoriteBorderIcon sx={{ color: "#888" }} />
							)}
						</IconButton>

						<Typography className="view-cnt">
							{product?.productLikes}
						</Typography>
					</Stack>
				)}
			</div>

			{/* <div className="imagePlaceholder">
        <img src={product.image} alt={product.productTitle} />
      </div> */}
			<Link
				href={{
					pathname: "/shop/detail",
					query: { id: product?._id },
				}}>
				{product.productImages?.length > 0 && (
					<img
						src={`${NEXT_PUBLIC_APP_API_URL}/${product.productImages[0]}`}
						alt={product.productTitle}
						width={180}
						height={180}
						className="productImage"
					/>
				)}
			</Link>

			<Button className="cartBtn" variant="contained" onClick={handleAddToCart}>
				ADD TO CART
			</Button>

			<div className="stars">
				{"★".repeat(product.productRank)} {"☆".repeat(5 - product.productRank)}
			</div>

			<h3 className="title">{product.productTitle}</h3>
			<div className="price">
				<span className="newPrice">${product.productPrice.toFixed(2)}</span>
				{product.productPrice && (
					<span className="oldPrice">${product.productPrice.toFixed(2)}</span>
				)}
			</div>
		</div>
	);
};

export default ProductCards;
