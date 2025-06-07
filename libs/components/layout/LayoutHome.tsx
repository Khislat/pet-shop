import React, { Component, useEffect } from "react";
import Head from "next/head";
import { Stack } from "@mui/material";
import TopBar from "../homepage/TopBar";
import Footer from "../Footer";
import TopBasic from "../Top";
import FooterBasic from "../Footer";
import TopBarBasic from "../homepage/TopBar";
import Top from "../Top";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import { useReactiveVar } from "@apollo/client";
import { userVar } from "../../../apollo/store";
import { getJwtToken, updateUserInfo } from "../../auth";

const withLayoutMain = (Component: any) => {
	return (props: any) => {
		const device = useDeviceDetect();
		const user = useReactiveVar(userVar);

		/** LIFECYCLES **/
		useEffect(() => {
			const jwt = getJwtToken();
			if (jwt) updateUserInfo(jwt);
		}, []);
		
		return (
			<>
				{" "}
				<Head>
					<title>Bowow | Pet Shop</title>
					<meta
						name="description"
						content="Pet supplies for your furry friends"
					/>
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<Stack id="pc-wrap">
					<Stack className="topBar">
						<TopBar />
					</Stack>

					<Stack id={"top"}>
						<Top />
					</Stack>
					<Stack id={"main"}>
						<Component {...props} />
					</Stack>
					<Stack id={"footer"}>
						<Footer />
					</Stack>
				</Stack>
			</>
		);
	};
};

export default withLayoutMain;
