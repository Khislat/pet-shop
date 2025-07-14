import React, { useEffect, useRef, useState } from "react";
import { Box, Stack } from "@mui/material";
import { Product } from "../../types/product/product";
import { useTranslation } from "next-i18next";
import { t } from "i18next";
import useDeviceDetect from "../../hooks/useDeviceDetect";

type Props = {
	products: Product[];
	onCategorySelect: (categoryKey: string | null) => void;
};

const categories = [
	{ name: "Dogs", key: "DOGS", imageSrc: "/img/homepage/aboutDog.jpg" },
	{ name: "Cats", key: "CATS", imageSrc: "/img/homepage/cat.webp" },
	{ name: "Birds", key: "BIRDS", imageSrc: "/img/homepage/parrot.webp" },
	{ name: "Fun Toys", key: "FUN_TOYS", imageSrc: "/img/homepage/toy.jpg" },
	{
		name: "Accessories",
		key: "ACCESSORIES",
		imageSrc: "/img/homepage/catbowl.jpg",
	},
	{ name: "Clothings", key: "Clothings", imageClass: "collarImage" },
	// { name: "Accessories", key: "ACCESSORIES", imageClass: "collarImage" },
];
const categoriess = [
	{ name: "Dogs", key: "DOGS", imageSrc: "/img/homepage/aboutDog.jpg" },
	{ name: "Cats", key: "CATS", imageSrc: "/img/homepage/cat.webp" },
	{ name: "Birds", key: "BIRDS", imageSrc: "/img/homepage/parrot.webp" },
	// { name: "Fun Toys", key: "FUN_TOYS", imageSrc: "/img/homepage/toy.jpg" },
	// {
	// 	name: "Accessories",
	// 	key: "ACCESSORIES",
	// 	imageSrc: "/img/homepage/catbowl.jpg",
	// },
	// { name: "Clothings", key: "Clothings", imageClass: "collarImage" },
	// { name: "Accessories", key: "ACCESSORIES", imageClass: "collarImage" },
];

const CategoriesSection = ({ products, onCategorySelect }: Props) => {
	const device = useDeviceDetect();
	const [activeIndex, setActiveIndex] = useState<number>(0);
	const containerRef = useRef<HTMLDivElement | null>(null);
	const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
	const { t } = useTranslation("common");

	useEffect(() => {
		if (containerRef.current) {
			const activeEl =
				containerRef.current.querySelectorAll(".categoryItem")[activeIndex];
			if (activeEl) {
				const { offsetLeft, clientWidth } = activeEl as HTMLElement;
				setIndicatorStyle({ left: offsetLeft, width: clientWidth });
			}
		}
	}, [activeIndex]);

	if (device === "mobile") {
		return (
			<Stack className={"categoriesSection"}>
				<Stack className="background">
					{/* Wave background */}
					<img src="/img/banner/hero-wave.svg" alt="wave" className="wave1" />
					<img src="/img/banner/hero-wave.svg" alt="wave" className="wave2" />

					<Stack className="container">
						<Stack className="sectionHeader">
							<h2 className="sectionTitle">Pets & Food Categories</h2>
							<div className="decorationIcon" />
						</Stack>

						<Stack className="categoriesContainer">
							{categoriess.map((category) => {
								const categoryProducts = products.filter(
									(product) => category.key === product.productCategory
								);

								return (
									<Stack
										key={category.key}
										className="categoryItem"
										sx={{ cursor: "pointer" }}
										onClick={() => onCategorySelect(category.key)}>
										<div className="imageCircle">
											<Box className="categoryImage">
												<img src={category.imageSrc} alt={category.name} />
											</Box>
										</div>

										<h3 className="categoryName">{category.name}</h3>
										<p style={{ fontSize: "12px", color: "#666" }}>
											{categoryProducts.length} products
										</p>
									</Stack>
								);
							})}
						</Stack>

						<div className="divider" />
					</Stack>
				</Stack>
			</Stack>
		);
	} else {
		return (
			<Stack className={"categoriesSection"}>
				<Stack className="background">
					{/* Wave background */}
					<img src="/img/banner/hero-wave.svg" alt="wave" className="wave1" />
					<img src="/img/banner/hero-wave.svg" alt="wave" className="wave2" />

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
										<div className="imageCircle">
											<Box className="categoryImage">
												<img src={category.imageSrc} alt={category.name} />
											</Box>
										</div>

										<h3 className="categoryName">{category.name}</h3>
										<p style={{ fontSize: "16px", color: "#666" }}>
											{categoryProducts.length} products
										</p>
									</Stack>
								);
							})}
						</Stack>

						<div className="divider" />
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

export default CategoriesSection;
