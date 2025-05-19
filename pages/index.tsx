import Head from "next/head";
import { NextPage } from "next";
import withLayoutMain from "../libs/components/layout/LayoutHome";
import { Stack } from "@mui/material";
import useDeviceDetect from "../libs/hooks/useDeviceDetect";
import HeroSection from "../libs/components/homepage/HeroSection";


const Home: NextPage = () => {
	const device = useDeviceDetect();

	if (device === "mobile") {
		return <Stack className={"home-page"}>joijjopijoipjpojpojopij</Stack>;
	} else {
		return <Stack className={"home-page"}>
			<HeroSection  />
		</Stack>;
	}
};

export default withLayoutMain(Home);
