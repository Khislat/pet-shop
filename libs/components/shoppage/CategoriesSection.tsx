import React from "react";
import Image from "next/image";
import { Box, Stack } from "@mui/material";
import { Product } from "../../types/product/product";

type CategoryProps = {
	products: Product[];
	onCategorySelect: (categoryKey: string | null) => void;
};

const categories = [
	{ name: "Dogs", key: "DOGS", imageSrc: "/img/homepage/aboutDog.jpg" },
	{ name: "Cats", key: "CATS", imageSrc: "/img/homepage/cat.webp" },
	{ name: "Birds", key: "BIRDS", imageSrc: "/img/homepage/birds2.jpg" },
	{ name: "Fun Toys", key: "FUN_TOYS", imageSrc: "/img/homepage/toys.jpg" },
	{
		name: "Accessories",
		key: "ACCESSORIES",
		imageSrc: "/img/homepage/bowl2.jpg",
	},
	{ name: "Furniture", key: "FURNITURES", imageSrc: "/img/homepage/furniture.jpg" },

];

const CategoriesSection = ({ products, onCategorySelect }: CategoryProps) => {
	return (
		<Stack className={"categoriesSectionShop"}>
			<Stack className="container">
				<Stack className="sectionHeader">
					<h2 className="sectionTitle">Pets & Food Categories</h2>
					<div className="decorationIcon" />
				</Stack>

				<Stack className="categoriesContainer">
					{categories.map((category) => {
						const categoryProducts = products.filter(
							(product) => category.key === product.productCategory
						);
						console.log("product", products);

						return (
							<Stack
								key={category.key}
								className="categoryItem"
								sx={{ cursor: "pointer" }}
								onClick={() => onCategorySelect(category.key)}>
								<Box className="categoryImage">
									<div className="imageCircle">
										<Box className="categoryImage">
											<img src={category.imageSrc} alt={category.name} />
										</Box>
									</div>
								</Box>
								<h3 className="categoryName">{category.name}</h3>
								<p style={{ fontSize: "14px", color: "#666" }}>
									{categoryProducts.length} products
								</p>
							</Stack>
						);
					})}
				</Stack>
			</Stack>
		</Stack>
	);
};

export default CategoriesSection;
