import Head from "next/head";
import { NextPage } from "next";
import withLayoutMain from "../libs/components/layout/LayoutHome";
import { Stack } from "@mui/material";
import useDeviceDetect from "../libs/hooks/useDeviceDetect";
import HeroSection from "../libs/components/homepage/HeroSection";
import AboutSection from "../libs/components/homepage/AboutSection";
import CategoriesSection from "../libs/components/homepage/CategoriesSection";
import ProductsSection from "../libs/components/homepage/ProductsSection";
import FeaturesSection from "../libs/components/homepage/FeaturesSection";
import TeamSection from "../libs/components/homepage/VendorsSection";
import TestimonialsSection from "../libs/components/homepage/TestimonialsSection";
import BlogSection from "../libs/components/homepage/BlogSection";
import AppPromoSection from "../libs/components/homepage/AppPromoSection";
import LogoSection from "../libs/components/homepage/CompaniesLogoSection";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { VendorsInquiry } from "../libs/types/member/member.input";
import TopVendorsSection from "../libs/components/homepage/VendorsSection";
import { useState } from "react";
import { Product } from "../libs/types/product/product";
import { useMutation, useQuery } from "@apollo/client";
import { LIKE_TARGET_PRODUCT } from "../apollo/user/mutation";
import { GET_PRODUCTS } from "../apollo/user/query";
import { T } from "../libs/types/common";
import { ProductsInquiry } from "../libs/types/product/product.input";
import { CartItem } from "../libs/context/CartContext";

interface ProductsProps {
	initialInput: ProductsInquiry;
}

const Home = ({ initialInput = productsInput }: ProductsProps) => {
	const device = useDeviceDetect();
	const [products, setProducts] = useState<Product[]>([]);
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
	const [cartItems, setCartItems] = useState<CartItem[]>([]);

	/** APOLLO REQUESTS **/
	const [likeTargetProperty] = useMutation(LIKE_TARGET_PRODUCT);
	const {
		loading: getProductsLoading,
		data: getProductsData,
		error: getProductsError,
		refetch: getProductsRefetch,
	} = useQuery(GET_PRODUCTS, {
		fetchPolicy: "cache-and-network",
		variables: { input: initialInput },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setProducts(data?.getProducts?.list);
		},
	});

	if (device === "mobile") {
		return <Stack className={"home-page"}>joijjopijoipjpojpojopij</Stack>;
	} else {
		return (
			<Stack className={"home-page"}>
				<HeroSection />
				<AboutSection />
				<CategoriesSection
					products={products}
					onCategorySelect={(category) => setSelectedCategory(category)}
				/>
		
					<ProductsSection
						products={
							selectedCategory
								? products.filter((p) => p.productCategory === selectedCategory)
								: products
						}
					
					/>

				<FeaturesSection />
				<TopVendorsSection />
				<TestimonialsSection />
				<BlogSection />
				<LogoSection />
				<AppPromoSection />
			</Stack>
		);
	}
};

const productsInput: ProductsInquiry = {
	page: 1,
	limit: 8,
	sort: "createdAt",
	search: {},
};

export default withLayoutMain(Home);
