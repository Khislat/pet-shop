import React from "react";
import Image from "next/image";
import { Box, Stack } from "@mui/material";
import { Product } from "../../types/product/product";

type CategoryProps = {
	products: Product[];
	onCategorySelect: (categoryKey: string | null) => void;
};

const categories = [
	{ name: "Dogs", key: "DOGS", imageSrc: "/img/animals/dog.jpg" },
	{ name: "Cats", key: "CATS", imageSrc: "/img/animals/cat.jpg" },
	{ name: "Birds", key: "BIRDS", imageSrc: "/img/animals/bird.jpg" },
	{ name: "Fun Toys", key: "FUN_TOYS", imageSrc: "/img/animals/toys.jpg" },
	{ name: "Healthy", key: "HEALTHY", imageClass: "healthyImage" },
	{ name: "Collars & Leash", key: "Collar", imageClass: "collarImage" },
	{ name: "Accessories", key: "ACCESSORIES", imageClass: "collarImage" },
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

					<div className="divider" />
				</Stack>
		</Stack>
	);
};

export default CategoriesSection;
