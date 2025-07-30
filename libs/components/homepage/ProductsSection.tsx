import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { Box, Button, Grid, Stack } from "@mui/material";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import { Product } from "../../types/product/product";

type ProductsSectionProps = {
	products: Product[];
	myFavorites?: boolean;
	likeProductHandler?: any;
};

const categoryNames = [
	{ name: "All Products", key: "ALL" },
	{ name: "Accessories", key: "ACCESSORIES" },
	{ name: "Pet Toys", key: "FUN_TOYS" },
	{ name: "Soaps & Shampoos", key: "SOAPS_SHAMPOOS" },
];

const ProductsSection = ({
	products,
	likeProductHandler,
	myFavorites,
}: ProductsSectionProps) => {
	const device = useDeviceDetect();
	const initialItemsToShow = 4;
	const [itemsToShow, setItemsToShow] = useState(initialItemsToShow);
	const [activeCategory, setActiveCategory] = useState<string>("ALL");
	const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

	useEffect(() => {
		if (activeCategory === "ALL") {
			setFilteredProducts(products);
		} else {
			setFilteredProducts(
				products.filter((p) => p.productCategory === activeCategory)
			);
		}
		setItemsToShow(initialItemsToShow); // category o‘zgarganda ko‘rsatiladigan productlar soni qayta 4 ga tushsin
	}, [activeCategory, products]);
	
	const handleShowMore = () => {
		setItemsToShow((prev) => Math.min(prev + 4, 12)); // Har bosganda 4tadan ko‘payadi, maksimal 12tagacha
	};
	const handleShowLess = () => setItemsToShow(initialItemsToShow);

	const displayedProducts = filteredProducts.slice(0, itemsToShow);
	if (device === "mobile") {
		return (
			<Stack className={"productsSection"}>
				<Stack className={"container"}>
					<Stack className={"sectionHeader"}>
						<h2 className={"sectionTitle"}>Shop By Categories</h2>
						<div className={"categoryIcon"} />

						{/* <Box className={"categoryFilters"}>
						<button className={"filterButtonActive"}>All Products</button>
						<button className={"filterButton"}>Pet Toys</button>
						<button className={"filterButton"}>Accessories</button>
						<button className={"filterButton"}>Soaps & Shampoos</button>
					</Box> */}
					</Stack>
					{/* ... Category Buttons ... */}

					<Box className={"productsGrid"}>
						{displayedProducts.length > 0 ? (
							displayedProducts.map((product) => (
								<ProductCard
									key={product._id}
									product={product}
									memberPage={true}
									likeProductHandler={likeProductHandler}
								/>
							))
						) : (
							<p>No products found in this category.</p>
						)}
					</Box>

					<Box
						className={"viewAllContainer"}
						sx={{ textAlign: "center", mt: 10 }}>
						{itemsToShow < filteredProducts.length ? (
							<Button onClick={handleShowMore} className={"viewAllButton"}>
								VIEW ALL PRODUCTS
								<span className={"buttonIcon"} />
							</Button>
						) : (
							<Button onClick={handleShowLess} className={"viewAllButton"}>
								HIDE ALL PRODUCTS
								<span className={"buttonIcon"} />
							</Button>
						)}
					</Box>
				</Stack>
			</Stack>
		);
	} else {
		return (
			<Stack className={"productsSection"}>
				<Stack className={"container"}>
					<Stack className={"sectionHeader"}>
						<h2 className={"sectionTitle"}>Shop By Categories</h2>
						<div className={"categoryIcon"} />

						{/* <Box className={"categoryFilters"}>
					<button className={"filterButtonActive"}>All Products</button>
					<button className={"filterButton"}>Pet Toys</button>
					<button className={"filterButton"}>Accessories</button>
					<button className={"filterButton"}>Soaps & Shampoos</button>
				</Box> */}
					</Stack>
					{/* ... Category Buttons ... */}

					<Box className={"productsGrid"}>
						{displayedProducts.length > 0 ? (
							displayedProducts.map((product) => (
								<ProductCard
									key={product._id}
									product={product}
									memberPage={true}
									likeProductHandler={likeProductHandler}
								/>
							))
						) : (
							<p>No products found in this category.</p>
						)}
					</Box>

					<Box
						className={"viewAllContainer"}
						sx={{ textAlign: "center", mt: 10 }}>
						{itemsToShow < filteredProducts.length ? (
							<Button onClick={handleShowMore} className={"viewAllButton"}>
								VIEW ALL PRODUCTS
								<span className={"buttonIcon"} />
							</Button>
						) : (
							<Button onClick={handleShowLess} className={"viewAllButton"}>
								HIDE ALL PRODUCTS
								<span className={"buttonIcon"} />
							</Button>
						)}
					</Box>
				</Stack>
			</Stack>
		);
	}
};

export default ProductsSection;
