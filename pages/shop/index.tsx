// pages/shop.tsx
import React, { useState, useEffect, ChangeEvent, MouseEvent } from "react";
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
import useDeviceDetect from "../../libs/hooks/useDeviceDetect";
import { useRouter } from "next/router";
import { ProductsInquiry } from "../../libs/types/product/product.input";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextPage } from "next";
import { useMutation, useQuery } from "@apollo/client";
import { LIKE_TARGET_PRODUCT } from "../../apollo/user/mutation";
import { GET_PRODUCTS } from "../../apollo/user/query";
import { T } from "../../libs/types/common";
import { Direction, Message } from "../../libs/enums/common.enum";
import {
	sweetMixinErrorAlert,
	sweetTopSmallSuccessAlert,
} from "../../libs/sweetAlert";

interface Product {
	id: number;
	name: string;
	price: number;
	originalPrice?: number;
	image: string;
	category: string;
	rating: number;
	reviews: number;
	discount?: number;
	isNew?: boolean;
	isFavorite: boolean;
	inStock: boolean;
	brand: string;
}

interface Category {
	id: string;
	name: string;
	icon: string;
	color: string;
	count: number;
}
export const getStaticProps = async ({ locale }: any) => ({
	props: {
		...(await serverSideTranslations(locale, ["common"])),
	},
});

const ShopPage: NextPage = ({ initialInput, ...props }: any) => {
	const [products, setProducts] = useState<Product[]>([]);
	const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [sortBy, setSortBy] = useState<string>("default");
	const [priceRange, setPriceRange] = useState<number[]>([0, 100]);
	const [selectedCategory, setSelectedCategory] = useState<string>("");
	const [selectedBrand, setSelectedBrand] = useState<string>("");
	const [openCategories, setOpenCategories] = useState<boolean>(true);
	const [openBrands, setOpenBrands] = useState<boolean>(true);
	const [openPrice, setOpenPrice] = useState<boolean>(true);

	const device = useDeviceDetect();
	const router = useRouter();
	const [searchFilter, setSearchFilter] = useState<ProductsInquiry>(
		router?.query?.input
			? JSON.parse(router?.query?.input as string)
			: initialInput
	);
	const [properties, setProperties] = useState<Product[]>([]);
	const [total, setTotal] = useState<number>(0);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [sortingOpen, setSortingOpen] = useState(false);
	const [filterSortName, setFilterSortName] = useState("New");

		/** APOLLO REQUESTS **/
		const [likeTargetProperty] = useMutation(LIKE_TARGET_PRODUCT);

		const {
			loading: getPropertiesLoading,
			data: getPropertiesData,
			error: getPropertiesError,
			refetch: getPropertiesRefetch,
		} = useQuery(GET_PRODUCTS, {
			fetchPolicy: "network-only",
			variables: { input: searchFilter },
			notifyOnNetworkStatusChange: true,
			onCompleted: (data: T) => {
				console.log("data", data);
				setProperties(data?.getProperties?.list);
				setTotal(data?.getProperties?.metaCounter[0]?.total);
			},
		});
	
		/** LIFECYCLES **/
		useEffect(() => {
			if (router.query.input) {
				const inputObj = JSON.parse(router?.query?.input as string);
				setSearchFilter(inputObj);
			}
	
			setCurrentPage(searchFilter.page === undefined ? 1 : searchFilter.page);
		}, [router]);
	
		useEffect(() => {
			console.log("searchFilter", searchFilter);
			getPropertiesRefetch({ input: searchFilter }).then();
		}, [searchFilter]);
	
		/** HANDLERS **/
		const likePropertyHandler = async (user: T, id: string) => {
			try {
				if (!id) return;
				if (!user._id) throw new Error(Message.NOT_AUTHENTICATED);
	
				await likeTargetProperty({ variables: { input: id } });
	
				await getPropertiesRefetch({ input: initialInput });
	
				await sweetTopSmallSuccessAlert("succes", 800);
			} catch (err: any) {
				console.log("ERROR, likePropertyHandler:", err.message);
				sweetMixinErrorAlert(err.message).then();
			}
		};
	
		const handlePaginationChange = async (
			event: ChangeEvent<unknown>,
			value: number
		) => {
			searchFilter.page = value;
			await router.push(
				`/property?input=${JSON.stringify(searchFilter)}`,
				`/property?input=${JSON.stringify(searchFilter)}`,
				{
					scroll: false,
				}
			);
			setCurrentPage(value);
		};
	
		const sortingClickHandler = (e: MouseEvent<HTMLElement>) => {
			setAnchorEl(e.currentTarget);
			setSortingOpen(true);
		};
	
		const sortingCloseHandler = () => {
			setSortingOpen(false);
			setAnchorEl(null);
		};
	
		const sortingHandler = (e: React.MouseEvent<HTMLLIElement>) => {
			switch (e.currentTarget.id) {
				case "new":
					setSearchFilter({
						...searchFilter,
						sort: "createdAt",
						direction: Direction.ASC,
					});
					setFilterSortName("New");
					break;
				case "lowest":
					setSearchFilter({
						...searchFilter,
						sort: "propertyPrice",
						direction: Direction.ASC,
					});
					setFilterSortName("Lowest Price");
					break;
				case "highest":
					setSearchFilter({
						...searchFilter,
						sort: "propertyPrice",
						direction: Direction.DESC,
					});
					setFilterSortName("Highest Price");
			}
			setSortingOpen(false);
			setAnchorEl(null);
		};
	

	const productsPerPage = 16;

	// Mock data
	const categories: Category[] = [
		{ id: "dogs", name: "Dogs", icon: "🐕", color: "#A8DADC", count: 12 },
		{ id: "cats", name: "Cats", icon: "🐱", color: "#F1A501", count: 8 },
		{ id: "birds", name: "Birds", icon: "🐦", color: "#A8DADC", count: 15 },
		{
			id: "fun-toys",
			name: "Fun Toys",
			icon: "🎾",
			color: "#A8DADC",
			count: 20,
		},
		{ id: "healthy", name: "Healthy", icon: "🥗", color: "#A8DADC", count: 18 },
		{
			id: "collars",
			name: "Collars & Leash",
			icon: "🦮",
			color: "#A8DADC",
			count: 10,
		},
	];

	const mockProducts: Product[] = [
		{
			id: 1,
			name: "Heavy Duty Wool Bottle",
			price: 15.0,
			originalPrice: 20.0,
			image: "/api/placeholder/300/300",
			category: "toys",
			rating: 5,
			reviews: 24,
			discount: 25,
			isNew: false,
			isFavorite: false,
			inStock: true,
			brand: "Majestic Metals",
		},
		{
			id: 2,
			name: "Fantastic Marble Shoes",
			price: 15.0,
			originalPrice: 18.0,
			image: "/api/placeholder/300/300",
			category: "accessories",
			rating: 4,
			reviews: 18,
			discount: 17,
			isNew: false,
			isFavorite: false,
			inStock: true,
			brand: "Radiant Rings",
		},
		{
			id: 3,
			name: "Shiny Silver and Steel",
			price: 16.0,
			originalPrice: 19.0,
			image: "/api/placeholder/300/300",
			category: "accessories",
			rating: 5,
			reviews: 32,
			discount: 16,
			isNew: false,
			isFavorite: false,
			inStock: true,
			brand: "Shimmer Gems",
		},
		{
			id: 4,
			name: "Butterscotch Pet Food",
			price: 15.0,
			originalPrice: 18.0,
			image: "/api/placeholder/300/300",
			category: "food",
			rating: 4,
			reviews: 15,
			discount: 17,
			isNew: false,
			isFavorite: false,
			inStock: true,
			brand: "Elite Charms",
		},
		{
			id: 5,
			name: "Butterscotch Pet Food",
			price: 15.0,
			originalPrice: 18.0,
			image: "/api/placeholder/300/300",
			category: "food",
			rating: 5,
			reviews: 28,
			discount: 17,
			isNew: false,
			isFavorite: false,
			inStock: true,
			brand: "Tranquil Treasures",
		},
		{
			id: 6,
			name: "Butterscotch Pet Food",
			price: 15.0,
			originalPrice: 18.0,
			image: "/api/placeholder/300/300",
			category: "food",
			rating: 4,
			reviews: 22,
			discount: 17,
			isNew: true,
			isFavorite: false,
			inStock: true,
			brand: "Elegance Jewelers",
		},
		{
			id: 7,
			name: "Premium Dog Collar",
			price: 25.0,
			originalPrice: 30.0,
			image: "/api/placeholder/300/300",
			category: "collars",
			rating: 5,
			reviews: 45,
			discount: 17,
			isNew: false,
			isFavorite: false,
			inStock: true,
			brand: "Majestic Metals",
		},
		{
			id: 8,
			name: "Cat Toy Bundle",
			price: 12.0,
			originalPrice: 15.0,
			image: "/api/placeholder/300/300",
			category: "toys",
			rating: 4,
			reviews: 28,
			discount: 20,
			isNew: false,
			isFavorite: false,
			inStock: true,
			brand: "Ornaments",
		},
		{
			id: 9,
			name: "Bird Cage Cleaner",
			price: 8.0,
			originalPrice: 12.0,
			image: "/api/placeholder/300/300",
			category: "accessories",
			rating: 4,
			reviews: 12,
			discount: 33,
			isNew: true,
			isFavorite: false,
			inStock: true,
			brand: "Radiant Rings",
		},
		{
			id: 9,
			name: "Bird Cage Cleaner",
			price: 8.0,
			originalPrice: 12.0,
			image: "/api/placeholder/300/300",
			category: "accessories",
			rating: 4,
			reviews: 12,
			discount: 33,
			isNew: true,
			isFavorite: false,
			inStock: true,
			brand: "Radiant Rings",
		},
		{
			id: 9,
			name: "Bird Cage Cleaner",
			price: 8.0,
			originalPrice: 12.0,
			image: "/api/placeholder/300/300",
			category: "accessories",
			rating: 4,
			reviews: 12,
			discount: 33,
			isNew: true,
			isFavorite: false,
			inStock: true,
			brand: "Radiant Rings",
		},
		{
			id: 9,
			name: "Bird Cage Cleaner",
			price: 8.0,
			originalPrice: 12.0,
			image: "/api/placeholder/300/300",
			category: "accessories",
			rating: 4,
			reviews: 12,
			discount: 33,
			isNew: true,
			isFavorite: false,
			inStock: true,
			brand: "Radiant Rings",
		},
		{
			id: 9,
			name: "Bird Cage Cleaner",
			price: 8.0,
			originalPrice: 12.0,
			image: "/api/placeholder/300/300",
			category: "accessories",
			rating: 4,
			reviews: 12,
			discount: 33,
			isNew: true,
			isFavorite: false,
			inStock: true,
			brand: "Radiant Rings",
		},
		{
			id: 9,
			name: "Bird Cage Cleaner",
			price: 8.0,
			originalPrice: 12.0,
			image: "/api/placeholder/300/300",
			category: "accessories",
			rating: 4,
			reviews: 12,
			discount: 33,
			isNew: true,
			isFavorite: false,
			inStock: true,
			brand: "Radiant Rings",
		},
		{
			id: 9,
			name: "Bird Cage Cleaner",
			price: 8.0,
			originalPrice: 12.0,
			image: "/api/placeholder/300/300",
			category: "accessories",
			rating: 4,
			reviews: 12,
			discount: 33,
			isNew: true,
			isFavorite: false,
			inStock: true,
			brand: "Radiant Rings",
		},
	];

	useEffect(() => {
		setProducts(mockProducts);
		setFilteredProducts(mockProducts);
	}, []);

	useEffect(() => {
		let filtered = products.filter((product) =>
			product.name.toLowerCase().includes(searchQuery.toLowerCase())
		);

		if (selectedCategory) {
			filtered = filtered.filter(
				(product) => product.category === selectedCategory
			);
		}

		if (selectedBrand) {
			filtered = filtered.filter((product) => product.brand === selectedBrand);
		}

		filtered = filtered.filter(
			(product) =>
				product.price >= priceRange[0] && product.price <= priceRange[1]
		);

		// Sorting
		switch (sortBy) {
			case "price-low":
				filtered.sort((a, b) => a.price - b.price);
				break;
			case "price-high":
				filtered.sort((a, b) => b.price - a.price);
				break;
			case "rating":
				filtered.sort((a, b) => b.rating - a.rating);
				break;
			case "name":
				filtered.sort((a, b) => a.name.localeCompare(b.name));
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
		products,
	]);

	const handleFavoriteToggle = (productId: number) => {
		setProducts(
			products.map((product) =>
				product.id === productId
					? { ...product, isFavorite: !product.isFavorite }
					: product
			)
		);
	};

	const handleAddToCart = (productId: number) => {
		console.log("Added to cart:", productId);
		// Add your cart logic here
	};

	const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
	const currentProducts = filteredProducts.slice(
		(currentPage - 1) * productsPerPage,
		currentPage * productsPerPage
	);

	return (
		<Stack className="shop-page">
			{/* Hero Section */}
			<HeroSectionBasic />
			<Stack className="category-wraper">
				{/* Categories Section */}
				<CategoriesSection />
			</Stack>

			{/* Main Content */}
			<section className="main-content">
				<div className="container">
					<div className="content-wrapper">
						<div className="filter">
							<Filter />
						</div>

						{/* Main Products Area */}
						<main className="products-area">
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
											<MenuItem value="default" onClick={sortingHandler}>
												New
											</MenuItem>
											<MenuItem value="price-low" onClick={sortingHandler}>
												Lowest Price
											</MenuItem>
											<MenuItem value="price-high" onClick={sortingHandler}>
												Highest Price
											</MenuItem>
										</Select>
									</FormControl>
								</div>
							</div>

							{/* Products Grid */}
							<div className="products-grid">
								{currentProducts.map((product) => (
									<ShopCard />
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
						</main>
					</div>
				</div>
			</section>
		</Stack>
	);
};

ShopPage.defaultProps = {
	initialInput: {
		page: 1,
		limit: 5,
		sort: "createdAt",
		direction: "DESC",
		search: {},
	},
};

export default withLayoutBasic(ShopPage);
