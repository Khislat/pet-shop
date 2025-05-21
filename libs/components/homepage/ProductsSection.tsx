import React from "react";
import ProductCard from "./ProductCard";
import { Box, Stack } from "@mui/material";

const ProductsSection = () => {
	// Sample product data
	const products = [
		{
			id: 1,
			name: "Butterscotch Pet Food",
			price: 15.0,
			oldPrice: 25.0,
			rating: 4,
			image:
				"https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-05-17/QNLVLsxpVX.png",
			discount: null,
		},
		{
			id: 2,
			name: "Butterscotch Pet Food",
			price: 15.0,
			oldPrice: 25.0,
			rating: 4,
			image:
				"https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-05-17/kLzCW12DDK.png",
			discount: 10,
		},
		{
			id: 3,
			name: "Butterscotch Pet Food",
			price: 15.0,
			oldPrice: 25.0,
			rating: 4,
			image:
				"https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-05-17/GLfuM4Q4FG.png",
			discount: null,
		},
		{
			id: 4,
			name: "Butterscotch Pet Food",
			price: 15.0,
			oldPrice: 25.0,
			rating: 4,
			image:
				"https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-05-17/aVjY4hLmBW.png",
			discount: null,
		},
		{
			id: 5,
			name: "Shiny Silver Metal Bowl",
			price: 15.0,
			oldPrice: 25.0,
			rating: 4,
			image:
				"https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-05-17/aVjY4hLmBW.png",
			discount: null,
		},
	];

	const secondRowProducts = [
		{
			id: 6,
			name: "Butterscotch Pet Food",
			price: 15.0,
			oldPrice: 25.0,
			rating: 4,
			image:
				"https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-05-17/DnXqa2oS9v.png",
			discount: null,
		},
		{
			id: 7,
			name: "Butterscotch Pet Food",
			price: 15.0,
			oldPrice: 25.0,
			rating: 4,
			image:
				"https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-05-17/PBSdQ7DEyg.png",
			discount: null,
		},
		{
			id: 8,
			name: "Butterscotch Pet Food",
			price: 15.0,
			oldPrice: 25.0,
			rating: 4,
			image:
				"https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-05-17/PtCdGUnCs8.png",
			discount: 10,
		},
		{
			id: 9,
			name: "Butterscotch Pet Food",
			price: 15.0,
			oldPrice: 25.0,
			rating: 4,
			image:
				"https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-05-17/h5CvgpRJqq.png",
			discount: null,
		},
		{
			id: 10,
			name: "Butterscotch Pet Food",
			price: 15.0,
			oldPrice: 25.0,
			rating: 4,
			image:
				"https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-05-17/q52qoywpap.png",
			discount: null,
		},
	];

	return (
		<Stack className={"productsSection"}>
			<Stack className={"container"}>
				<Stack className={"sectionHeader"}>
					<h2 className={"sectionTitle"}>Shop By Categories</h2>
					<div className={"categoryIcon"} />

					<Box className={"categoryFilters"}>
						<button className={"filterButtonActive"}>All Products</button>
						<button className={"filterButton"}>Pet Toys</button>
						<button className={"filterButton"}>Accessories</button>
						<button className={"filterButton"}>Soaps & Shampoos</button>
					</Box>
				</Stack>

				<Box className={"productsGrid"}>
					{products.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
				</Box>

				<Box className={"productsGrid"}>
					{secondRowProducts.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
				</Box>

				<Box className={"viewAllContainer"}>
					<button className={"viewAllButton"}>
						VIEW ALL PRODUCTS
						<span className={"buttonIcon"} />
					</button>
				</Box>
			</Stack>
		</Stack>
	);
};

export default ProductsSection;
