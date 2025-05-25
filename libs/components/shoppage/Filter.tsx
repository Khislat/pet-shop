// components/Filter.tsx
import React from "react";
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

const categories = [
	{ name: "Bowls", count: 10 },
	{ name: "Clothings", count: 15 },
	{ name: "Crates", count: 35 },
	{ name: "Flea & Tick", count: 26 },
	{ name: "Food", count: 78 },
	{ name: "Furniture", count: 30 },
	{ name: "Pharmacy", count: 48 },
	{ name: "Toys", count: 23 },
	{ name: "Treats", count: 75 },
	{ name: "Uncategorized", count: 96 },
];

const products = [
	{
		id: 1,
		title: "Practical Bronze Bench",
		price: "$18.00 – $32.00",
		rating: 4.5,
	},
	{
		id: 2,
		title: "Purina Pro Plan Complete",
		price: "$18.00 – $32.00",
		rating: 4.5,
	},
	{
		id: 3,
		title: "High Protein Probiotics",
		price: "$18.00 – $32.00",
		rating: 4.5,
	},
];
const brands = [
	{ name: "Majestic Metals", count: 2 },
	{ name: "Radiant Rings", count: 7 },
	{ name: "Glamour Gems", count: 3 },
	{ name: "Chic Charms", count: 1 },
	{ name: "Tranquil Treasures", count: 5 },
	{ name: "Elegance Jewelers", count: 2 },
	{ name: "Ornaments", count: 5 },
];

const tags = [
	"Collections",
	"Food Pet",
	"Kitten Food",
	"Pet Essentials",
	"Puppy",
	"Treat",
];

const Filter = () => {
	const [priceRange, setPriceRange] = React.useState<number[]>([20, 700]);

	const handleSliderChange = (event: Event, newValue: number | number[]) => {
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
      />
      <button className={"button"}>
        <SearchIcon />
      </button>
    </div>
			{/* Categories */}
			<Box className={"categoryContainer"}>
				<Typography className={"header"}>SHOP BY CATEGORIES</Typography>
				<ul className={"list"}>
					{categories.map((item, index) => (
						<li key={index} className={"listItem"}>
							<Box className={"left"}>
								<PetsIcon fontSize="small" className={"icon"} />
								<span>{item.name}</span>
							</Box>
							<span className={"count"}>{item.count}</span>
						</li>
					))}
				</ul>
			</Box>

			{/* Filter by Price */}
			<Box className={"priceFilterContainer"}>
				<Typography className={"header"}>FILTER BY PRICE</Typography>

				<Box className={"inputsRow"}>
					<Box className={"inputGroup"}>
						<Typography>Min Price</Typography>
						<TextField
							value={`$${priceRange[0].toFixed(2)}`}
							variant="outlined"
							size="small"
							InputProps={{ readOnly: true }}
							className="textField"
						/>
					</Box>
					<Typography className={"dash"}>-</Typography>
					<Box className={"inputGroup"}>
						<Typography>Max Price</Typography>
						<TextField
							value={`$999.00`}
							variant="outlined"
							size="small"
							InputProps={{ readOnly: true }}
							className="textField"
						/>
					</Box>
				</Box>

				<Slider
					value={priceRange}
					onChange={handleSliderChange}
					min={20}
					max={999}
					step={1}
					className={"slider"}
				/>

				<Box className={"bottomRow"}>
					<Typography className={"priceText"}>
						Price : ${priceRange[0].toFixed(2)} - ${priceRange[1].toFixed(2)}
					</Typography>
					<Button className={"filterButton"}>FILTER</Button>
				</Box>
			</Box>

			{/* Products (simplified preview) */}
			<Box className={"productsContainer"}>
				<Typography className={"header"}>PRODUCTS</Typography>
				{products.map((product, index) => (
					<React.Fragment key={product.id}>
						<ProductItem {...product} />
						{index < products.length - 1 && <hr className={"divider"} />}
					</React.Fragment>
				))}
			</Box>

			{/* Product Brands */}
			<Box className={"productBrandsContainer"}>
				<div className={"header"}>PRODUCT BRANDS</div>
				<ul className={"list"}>
					{brands.map((brand, index) => (
						<li key={index} className={"item"}>
							<FormControlLabel
								control={<Checkbox sx={{ padding: 0, marginRight: "12px" }} />}
								label={
									<div className={"label"}>
										<span>{brand.name}</span>
										<span>{brand.count}</span>
									</div>
								}
								className={"checkboxLabel"}
							/>
						</li>
					))}
				</ul>
			</Box>

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
