// libs/components/shoppage/ShopCard.tsx
import React, { useState } from "react";
import { Button, IconButton } from "@mui/material";
import Link from 'next/link';
import SearchIcon from "@mui/icons-material/Search";
import CachedIcon from "@mui/icons-material/Cached";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Product } from "../../types/product/product";
import { NEXT_PUBLIC_APP_API_URL } from "../../config";

type ProductCardProps = {
	product: Product;
};

const ShopCard = ({ product }: ProductCardProps) => {
	const [isWished, setIsWished] = useState(false);

	const toggleWishlist = () => {
		setIsWished((prev) => !prev);
		// Istasangiz bu yerda like mutation yuborishingiz mumkin
	};
	return (
		<div className="card">
			{product.productPrice && (
				<div className="discountBadge">{product.productPrice}% Off</div>
			)}

			<div className="iconGroup">
				<IconButton className="wishlistIcon" onClick={toggleWishlist}>
					{isWished ? (
						<FavoriteIcon sx={{ color: "#ff4d4f" }} />
					) : (
						<FavoriteBorderIcon sx={{ color: "#888" }} />
					)}
				</IconButton>
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

			<Button className="cartBtn" variant="contained">
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

export default ShopCard;
