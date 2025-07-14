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
import BlogSection from "../libs/components/homepage/CommunityBoards";
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
import CommunityBoards from "../libs/components/homepage/CommunityBoards";
import { Message } from "../libs/enums/common.enum";
import {
	sweetMixinErrorAlert,
	sweetTopSmallSuccessAlert,
} from "../libs/sweetAlert";
import { GetStaticProps } from "next";
import Homepage from "../libs/components/homepage/AboutSection";

interface ProductsProps {
	initialInput: ProductsInquiry;
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale ?? "en", ["common"])),
		},
	};
};

const Home = ({ initialInput = productsInput }: ProductsProps) => {
	const device = useDeviceDetect();
	const [products, setProducts] = useState<Product[]>([]);
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
	const [cartItems, setCartItems] = useState<CartItem[]>([]);
	const [likeTargetProduct] = useMutation(LIKE_TARGET_PRODUCT);

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

	/** HANDLERS **/
	const likeProductHandler = async (user: T, id: string) => {
		try {
			if (!id) return;
			if (!user._id) throw new Error(Message.NOT_AUTHENTICATED);

			await likeTargetProduct({ variables: { input: id } });

			await getProductsRefetch({ input: initialInput });

			await sweetTopSmallSuccessAlert("succes", 800);
		} catch (err: any) {
			console.log("ERROR, likeProductHandler:", err.message);
			sweetMixinErrorAlert(err.message).then();
		}
	};

	if (device === "mobile") {
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
					likeProductHandler={likeProductHandler}
				/>

				<FeaturesSection />
				<TopVendorsSection />
				<TestimonialsSection />
				<CommunityBoards />

				<AppPromoSection />
			</Stack>
		);
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
					likeProductHandler={likeProductHandler}
				/>

				<FeaturesSection />
				<TopVendorsSection />
				<TestimonialsSection />
				<CommunityBoards />
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
