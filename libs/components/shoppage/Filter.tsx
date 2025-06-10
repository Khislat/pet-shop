// components/Filter.tsx
import React, { useCallback, useEffect, useState } from "react";
import {
	Box,
	Typography,
	TextField,
	Button,
	Slider,
	Checkbox,
	FormControlLabel,
	Chip,
	Stack,
	Divider,
} from "@mui/material";

import PetsIcon from "@mui/icons-material/Pets";
import ProductItem from "./ProductItem";
import SearchIcon from "@mui/icons-material/Search";
import { Product } from "../../types/product/product";
import { ProductsInquiry } from "../../types/product/product.input";
import { useRouter } from "next/router";

const categories = [
	{ name: "Bowls", key: "BOWLS" },
	{ name: "Clothings", key: "CLOTHINGS" },
	{ name: "Crates", key: "CREATES" },
	{ name: "Flea & Tick", key: "FLEA_AND_TICK" },
	{ name: "Food", key: "FOODS" },
	{ name: "Furniture", key: "FURNITURES" },
	{ name: "Pharmacy", key: "HEALTHY" },
	{ name: "Toys", key: "FUN_TOYS" },
	{ name: "Treats", key: "TREATS" },
	{ name: "Uncategorized", key: "ALL" },
];



const tags = [
	"Collections",
	"Food Pet",
	"Kitten Food",
	"Pet Essentials",
	"Puppy",
	"Treat",
];
type FilterProps = {
	products: Product[];
	onCategorySelect: (categoryKey: string | null) => void;
	searchFilter: ProductsInquiry;
	setSearchFilter: any;
	onFilteredProductsChange?: (products: Product[]) => void;
};

const Filter = ({
	products,
	onCategorySelect,
	searchFilter,
	setSearchFilter,
	onFilteredProductsChange,
}: FilterProps) => {
	const router = useRouter();
	const [priceRange, setPriceRange] = React.useState<number[]>([20, 700]);
	const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
	const [searchText, setSearchText] = useState<string>("");

	useEffect(() => {
		const filtered = products.filter((product) => {
			const textMatch = product.productTitle
				.toLowerCase()
				.includes(searchFilter.search?.text?.toLowerCase() || "");

			const priceStr = product.productPrice
				?.toString()
				.replace(/[^0-9.–]/g, "");
			const [minStr, maxStr] = priceStr.split("–");
			const minPrice = parseFloat(minStr);
			const maxPrice = maxStr ? parseFloat(maxStr) : minPrice;

			const priceMatch =
				(!searchFilter.search?.pricesRange?.start ||
					maxPrice >= searchFilter.search.pricesRange.start) &&
				(!searchFilter.search?.pricesRange?.end ||
					minPrice <= searchFilter.search.pricesRange.end);
		});

		setFilteredProducts(filtered);
		onFilteredProductsChange?.(filtered);
	}, [
		searchFilter.search?.text,
		searchFilter.search?.pricesRange?.start,
		searchFilter.search?.pricesRange?.end,

		products,
	]);

	/** HANDLERS */

	const handleSliderChange = (_event: Event, newValue: number | number[]) => {
		setPriceRange(newValue as number[]);
	};

	return (
		<Stack className={"filterWrapper"}>
			{/* Search Filter */}
			<div className={"searchBar"}>
				<input
					type="text"
					placeholder="Search Products"
					className={"input"}
					value={searchText}
					onChange={(e: any) => setSearchText(e.target.value)}
					onKeyDown={(event: any) => {
						if (event.key == "Enter") {
							setSearchFilter({
								...searchFilter,
								search: { ...searchFilter.search, text: searchText },
							});
						}
					}}
				/>
				<button
					className={"button"}
					onClick={() => {
						setSearchText("");
						setSearchFilter({
							...searchFilter,
							search: { ...searchFilter.search, text: "" },
						});
					}}>
					<SearchIcon />
				</button>
			</div>
			{/* Categories */}
			<Box className={"categoryContainer"}>
				<Typography className={"header"}>SHOP BY CATEGORIES</Typography>
				<ul className={"list"}>
					{categories.map((item, index) => {
						const filterProductsByCategory = products.filter(
							(product) => product.productCategory === item.key
						);

						return (
							<li
								key={item.key}
								className={"listItem"}
								onClick={() => onCategorySelect(item.key)}>
								<Box className={"left"}>
									<PetsIcon fontSize="small" className={"icon"} />
									<span>{item.name}</span>
								</Box>
								<span className={"count"}>
									{filterProductsByCategory.length}
								</span>
							</li>
						);
					})}
				</ul>
			</Box>
			{/* Filter by Price */}
			<Box className={"priceFilterContainer"}>
				<Typography className={"header"}>FILTER BY PRICE</Typography>

				<Box className={"inputsRow"}>
					<Box className={"inputGroup"}>
						<Typography>Min Price</Typography>
						<TextField
							value={priceRange[0]}
							onChange={(e: any) => {
								const value = parseInt(e.target.value);
								if (value >= 0) {
									setPriceRange([value, priceRange[1]]);
								}
							}}
							variant="outlined"
							size="small"
							className="textField"
						/>
					</Box>
					<Typography className={"dash"}>-</Typography>
					<Box className={"inputGroup"}>
						<Typography>Max Price</Typography>
						<TextField
							value={priceRange[1]}
							onChange={(e: any) => {
								const value = parseInt(e.target.value);
								if (value >= 0) {
									setPriceRange([priceRange[0], value]);
								}
							}}
							variant="outlined"
							size="small"
							className="textField"
						/>
					</Box>
				</Box>

				<Slider
					value={priceRange}
					onChange={handleSliderChange}
					min={0}
					max={999}
					step={1}
					className={"slider"}
				/>

				<Box className={"bottomRow"}>
					<Typography className={"priceText"}>
						Price : ${priceRange[0].toFixed(2)} - ${priceRange[1].toFixed(2)}
					</Typography>
					<Button
						className={"filterButton"}
						onClick={() => {
							setSearchFilter({
								...searchFilter,
								search: {
									...searchFilter.search,
									pricesRange: {
										start: priceRange[0],
										end: priceRange[1],
									},
								},
							});
						}}>
						FILTER
					</Button>
				</Box>
			</Box>
			{/* Products (simplified preview) */}
			/**
			<Box className={"productsContainer"}>
				<Typography className={"header"}>PRODUCTS</Typography>

				<React.Fragment>
					<ProductItem />
					<hr className={"divider"} />
				</React.Fragment>
			</Box>{" "}
			**/
			{/* Product Brands */}
			{/* Filter by Tags */}
			<Box className={"filterContainer"}>
				<div className={"header"}>FILTER BY TAGS</div>
				<div className={"tags"}>
					{tags.map((tag, index) => (
						<Chip
							key={index}
							label={tag}
							className={"chip"}
							variant="outlined"
						/>
					))}
				</div>
			</Box>
		</Stack>
	);
};

export default Filter;
