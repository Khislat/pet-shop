// pages/shop.tsx
import React, { useState, useEffect } from "react";
import {
	Grid,
	Typography,
	MenuItem,
	FormControl,
	Select,
	SelectChangeEvent,
	Box,
	Pagination,
	Stack,
} from "@mui/material";
import Filter from "../../libs/components/shoppage/Filter";
import CategoriesSection from "../../libs/components/shoppage/CategoriesSection";
import withLayoutBasic from "../../libs/components/layout/LayoutBasic";
import HeroSectionBasic from "../../libs/components/shoppage/HeroSectionBasic";
import ShopCard from "../../libs/components/shoppage/ShopCard";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { ProductsInquiry } from "../../libs/types/product/product.input";
import { Product } from "../../libs/types/product/product";
import { useMutation, useQuery } from "@apollo/client";
import { LIKE_TARGET_PRODUCT } from "../../apollo/user/mutation";
import { GET_PRODUCTS } from "../../apollo/user/query";
import { T } from "../../libs/types/common";
import { useRouter } from "next/router";
import { Message } from "../../libs/enums/common.enum";
import {
	sweetMixinErrorAlert,
	sweetTopSmallSuccessAlert,
} from "../../libs/sweetAlert";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import useDeviceDetect from "../../libs/hooks/useDeviceDetect";

export const getStaticProps = async ({ locale }: any) => ({
	props: {
		...(await serverSideTranslations(locale, ["common"])),
	},
});

interface ShopProps {
	initialInput: ProductsInquiry;
}

type CartItem = Product & { quantity: number };

const ShopPage = ({ initialInput = shopInput }: ShopProps) => {
	const router = useRouter();
	const device = useDeviceDetect();
	const [shopProducts, setShopProducts] = useState<Product[]>([]);
	const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [sortBy, setSortBy] = useState<string>("default");
	const [priceRange, setPriceRange] = useState<number[]>([0, 100]);
	const [selectedBrand, setSelectedBrand] = useState<string>("");
	const [openCategories, setOpenCategories] = useState<boolean>(true);
	const [openBrands, setOpenBrands] = useState<boolean>(true);
	const [openPrice, setOpenPrice] = useState<boolean>(true);

	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

	const [searchFilter, setSearchFilter] = useState<ProductsInquiry>(
		router?.query?.input
			? JSON.parse(router?.query?.input as string)
			: initialInput
	);

	const [cartItems, setCartItems] = useState<CartItem[]>([]);

	const [likeTargetProduct] = useMutation(LIKE_TARGET_PRODUCT);
	const {
		loading: getShopProductsLoading,
		data: getShopProductsData,
		error: getShopProductsError,
		refetch: getShopProductsRefetch,
	} = useQuery(GET_PRODUCTS, {
		fetchPolicy: "cache-and-network",
		variables: { input: initialInput },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setShopProducts(data?.getProducts?.list);
		},
	});

	const productsPerPage = 16;

	/** HANDLERS **/
	const likeProductHandler = async (user: T, id: string) => {
		try {
			if (!id) return;
			if (!user._id) throw new Error(Message.NOT_AUTHENTICATED);

			await likeTargetProduct({ variables: { input: id } });

			await getShopProductsRefetch({ input: initialInput });

			await sweetTopSmallSuccessAlert("succes", 800);
		} catch (err: any) {
			console.log("ERROR, likeProductHandler:", err.message);
			sweetMixinErrorAlert(err.message).then();
		}
	};
	// Mock data
	// const categories: Category[] = [
	// 	{ id: "dogs", name: "Dogs", icon: "🐕", color: "#A8DADC", count: 12 },
	// 	{ id: "cats", name: "Cats", icon: "🐱", color: "#F1A501", count: 8 },
	// 	{ id: "birds", name: "Birds", icon: "🐦", color: "#A8DADC", count: 15 },
	// 	{
	// 		id: "fun-toys",
	// 		name: "Fun Toys",
	// 		icon: "🎾",
	// 		color: "#A8DADC",
	// 		count: 20,
	// 	},
	// 	{ id: "healthy", name: "Healthy", icon: "🥗", color: "#A8DADC", count: 18 },
	// 	{
	// 		id: "collars",
	// 		name: "Collars & Leash",
	// 		icon: "🦮",
	// 		color: "#A8DADC",
	// 		count: 10,
	// 	},
	// ];

	// const mockProducts: Product[] = [
	// 	{
	// 		id: 1,
	// 		name: "Heavy Duty Wool Bottle",
	// 		price: 15.0,
	// 		originalPrice: 20.0,
	// 		image: "/api/placeholder/300/300",
	// 		category: "toys",
	// 		rating: 5,
	// 		reviews: 24,
	// 		discount: 25,
	// 		isNew: false,
	// 		isFavorite: false,
	// 		inStock: true,
	// 		brand: "Majestic Metals",
	// 	},
	// 	{
	// 		id: 2,
	// 		name: "Fantastic Marble Shoes",
	// 		price: 15.0,
	// 		originalPrice: 18.0,
	// 		image: "/api/placeholder/300/300",
	// 		category: "accessories",
	// 		rating: 4,
	// 		reviews: 18,
	// 		discount: 17,
	// 		isNew: false,
	// 		isFavorite: false,
	// 		inStock: true,
	// 		brand: "Radiant Rings",
	// 	},
	// 	{
	// 		id: 3,
	// 		name: "Shiny Silver and Steel",
	// 		price: 16.0,
	// 		originalPrice: 19.0,
	// 		image: "/api/placeholder/300/300",
	// 		category: "accessories",
	// 		rating: 5,
	// 		reviews: 32,
	// 		discount: 16,
	// 		isNew: false,
	// 		isFavorite: false,
	// 		inStock: true,
	// 		brand: "Shimmer Gems",
	// 	},
	// 	{
	// 		id: 4,
	// 		name: "Butterscotch Pet Food",
	// 		price: 15.0,
	// 		originalPrice: 18.0,
	// 		image: "/api/placeholder/300/300",
	// 		category: "food",
	// 		rating: 4,
	// 		reviews: 15,
	// 		discount: 17,
	// 		isNew: false,
	// 		isFavorite: false,
	// 		inStock: true,
	// 		brand: "Elite Charms",
	// 	},
	// 	{
	// 		id: 5,
	// 		name: "Butterscotch Pet Food",
	// 		price: 15.0,
	// 		originalPrice: 18.0,
	// 		image: "/api/placeholder/300/300",
	// 		category: "food",
	// 		rating: 5,
	// 		reviews: 28,
	// 		discount: 17,
	// 		isNew: false,
	// 		isFavorite: false,
	// 		inStock: true,
	// 		brand: "Tranquil Treasures",
	// 	},
	// 	{
	// 		id: 6,
	// 		name: "Butterscotch Pet Food",
	// 		price: 15.0,
	// 		originalPrice: 18.0,
	// 		image: "/api/placeholder/300/300",
	// 		category: "food",
	// 		rating: 4,
	// 		reviews: 22,
	// 		discount: 17,
	// 		isNew: true,
	// 		isFavorite: false,
	// 		inStock: true,
	// 		brand: "Elegance Jewelers",
	// 	},
	// 	{
	// 		id: 7,
	// 		name: "Premium Dog Collar",
	// 		price: 25.0,
	// 		originalPrice: 30.0,
	// 		image: "/api/placeholder/300/300",
	// 		category: "collars",
	// 		rating: 5,
	// 		reviews: 45,
	// 		discount: 17,
	// 		isNew: false,
	// 		isFavorite: false,
	// 		inStock: true,
	// 		brand: "Majestic Metals",
	// 	},
	// 	{
	// 		id: 8,
	// 		name: "Cat Toy Bundle",
	// 		price: 12.0,
	// 		originalPrice: 15.0,
	// 		image: "/api/placeholder/300/300",
	// 		category: "toys",
	// 		rating: 4,
	// 		reviews: 28,
	// 		discount: 20,
	// 		isNew: false,
	// 		isFavorite: false,
	// 		inStock: true,
	// 		brand: "Ornaments",
	// 	},
	// 	{
	// 		id: 9,
	// 		name: "Bird Cage Cleaner",
	// 		price: 8.0,
	// 		originalPrice: 12.0,
	// 		image: "/api/placeholder/300/300",
	// 		category: "accessories",
	// 		rating: 4,
	// 		reviews: 12,
	// 		discount: 33,
	// 		isNew: true,
	// 		isFavorite: false,
	// 		inStock: true,
	// 		brand: "Radiant Rings",
	// 	},
	// 	{
	// 		id: 9,
	// 		name: "Bird Cage Cleaner",
	// 		price: 8.0,
	// 		originalPrice: 12.0,
	// 		image: "/api/placeholder/300/300",
	// 		category: "accessories",
	// 		rating: 4,
	// 		reviews: 12,
	// 		discount: 33,
	// 		isNew: true,
	// 		isFavorite: false,
	// 		inStock: true,
	// 		brand: "Radiant Rings",
	// 	},
	// 	{
	// 		id: 9,
	// 		name: "Bird Cage Cleaner",
	// 		price: 8.0,
	// 		originalPrice: 12.0,
	// 		image: "/api/placeholder/300/300",
	// 		category: "accessories",
	// 		rating: 4,
	// 		reviews: 12,
	// 		discount: 33,
	// 		isNew: true,
	// 		isFavorite: false,
	// 		inStock: true,
	// 		brand: "Radiant Rings",
	// 	},
	// 	{
	// 		id: 9,
	// 		name: "Bird Cage Cleaner",
	// 		price: 8.0,
	// 		originalPrice: 12.0,
	// 		image: "/api/placeholder/300/300",
	// 		category: "accessories",
	// 		rating: 4,
	// 		reviews: 12,
	// 		discount: 33,
	// 		isNew: true,
	// 		isFavorite: false,
	// 		inStock: true,
	// 		brand: "Radiant Rings",
	// 	},
	// 	{
	// 		id: 9,
	// 		name: "Bird Cage Cleaner",
	// 		price: 8.0,
	// 		originalPrice: 12.0,
	// 		image: "/api/placeholder/300/300",
	// 		category: "accessories",
	// 		rating: 4,
	// 		reviews: 12,
	// 		discount: 33,
	// 		isNew: true,
	// 		isFavorite: false,
	// 		inStock: true,
	// 		brand: "Radiant Rings",
	// 	},
	// 	{
	// 		id: 9,
	// 		name: "Bird Cage Cleaner",
	// 		price: 8.0,
	// 		originalPrice: 12.0,
	// 		image: "/api/placeholder/300/300",
	// 		category: "accessories",
	// 		rating: 4,
	// 		reviews: 12,
	// 		discount: 33,
	// 		isNew: true,
	// 		isFavorite: false,
	// 		inStock: true,
	// 		brand: "Radiant Rings",
	// 	},
	// 	{
	// 		id: 9,
	// 		name: "Bird Cage Cleaner",
	// 		price: 8.0,
	// 		originalPrice: 12.0,
	// 		image: "/api/placeholder/300/300",
	// 		category: "accessories",
	// 		rating: 4,
	// 		reviews: 12,
	// 		discount: 33,
	// 		isNew: true,
	// 		isFavorite: false,
	// 		inStock: true,
	// 		brand: "Radiant Rings",
	// 	},
	// ];

	useEffect(() => {
		let filtered = shopProducts.filter((product) =>
			product.productTitle.toLowerCase().includes(searchQuery.toLowerCase())
		);

		if (selectedCategory) {
			filtered = filtered.filter(
				(product) => product.productCategory === selectedCategory
			);
		}

		if (selectedBrand) {
			filtered = filtered.filter(
				(product) => product.productCategory === selectedBrand
			);
		}

		filtered = filtered.filter(
			(product) =>
				product.productPrice >= priceRange[0] &&
				product.productPrice <= priceRange[1]
		);

		// Sorting
		switch (sortBy) {
			case "price-low":
				filtered.sort((a, b) => a.productPrice - b.productPrice);
				break;
			case "price-high":
				filtered.sort((a, b) => b.productPrice - a.productPrice);
				break;
			case "rating":
				filtered.sort((a, b) => b.productRank - a.productRank);
				break;
			case "name":
				filtered.sort((a, b) => a.productTitle.localeCompare(b.productTitle));
				break;
			default:
				break;
		}

		setFilteredProducts(filtered);
		setCurrentPage(1);
	}, [
		searchQuery,
		selectedCategory,
		selectedBrand,
		priceRange,
		sortBy,
		shopProducts,
	]);

	const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
	const currentProducts = filteredProducts.slice(
		(currentPage - 1) * productsPerPage,
		currentPage * productsPerPage
	);
	if (device === "mobile") {
		return <h1 style={{marginTop: "20px", textAlign: "center"}}>SHOP MOBILE</h1>;
	} else {
		return (
			<Stack className="shop-page">
				{/* Hero Section */}
				<HeroSectionBasic />
				<Stack className="category-wraper">
					{/* Categories Section */}
					<CategoriesSection
						products={shopProducts}
						onCategorySelect={(category) => setSelectedCategory(category)}
					/>
				</Stack>

				{/* Main Content */}
				<section className="main-content">
					<Stack className="container">
						<div className="content-wrapper">
							<div className="filter">
								<Filter
									products={shopProducts}
									onCategorySelect={(category) => setSelectedCategory(category)}
									searchFilter={searchFilter}
									setSearchFilter={setSearchFilter}
									onFilteredProductsChange={setFilteredProducts}
								/>
							</div>

							{/* Main Products Area */}
							<Stack className="products-area">
								{/* Products Header */}
								<div className="products-header">
									<div className="results-info">
										<span>
											Showing 1 -{" "}
											{Math.min(productsPerPage, filteredProducts.length)} of{" "}
											{filteredProducts.length} Results
										</span>
									</div>
									<div className="sort-controls">
										<span>Filter</span>
										<FormControl size="small" className="sort-select">
											<Select
												value={sortBy}
												onChange={(e) => setSortBy(e.target.value)}
												displayEmpty>
												<MenuItem value="default">Default Sorting</MenuItem>
												<MenuItem value="price-low">
													Price: Low to High
												</MenuItem>
												<MenuItem value="price-high">
													Price: High to Low
												</MenuItem>
												<MenuItem value="rating">Highest Rated</MenuItem>
												<MenuItem value="name">Name: A to Z</MenuItem>
											</Select>
										</FormControl>
									</div>
								</div>

								{/* Products Grid */}
								<div className="products-grid">
									{filteredProducts.map((product) => (
										<ShopCard
											key={product._id}
											product={product}
											likeProductHandler={likeProductHandler}
										/>
									))}
								</div>

								{/* Empty State */}
								{filteredProducts.length === 0 && (
									<div className="empty-state">
										<Typography variant="h6" color="textSecondary">
											No products found matching your criteria
										</Typography>
									</div>
								)}

								{/* Pagination */}

								<Stack className={"pagination-section"}>
									<Pagination
										renderItem={(item) => (
											<PaginationItem
												components={{
													previous: ArrowBackIcon,
													next: ArrowForwardIcon,
												}}
												{...item}
												sx={{
													color: "#3c5a6c",
													borderColor: "#3c5a6c",
													"&.Mui-selected": {
														backgroundColor: "#3c5a6c",
														color: "white",
													},
												}}
											/>
										)}
									/>
								</Stack>
							</Stack>
						</div>
					</Stack>
				</section>
			</Stack>
		);
	}
};

const shopInput: ProductsInquiry = {
	page: 1,
	limit: 100,
	sort: "createdAt",
	search: {},
};

export default withLayoutBasic(ShopPage);
