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


const Home: NextPage = () => {
	const device = useDeviceDetect();

	if (device === "mobile") {
		return <Stack className={"home-page"}>joijjopijoipjpojpojopij</Stack>;
	} else {
		return (
			<Stack className={"home-page"}>
				<HeroSection />
				<AboutSection />
				<CategoriesSection />
				<ProductsSection />
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

export default withLayoutMain(Home);
