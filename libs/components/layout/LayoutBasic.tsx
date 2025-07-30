import React, { Component, useEffect, useState } from "react";
import Head from "next/head";
import { Stack } from "@mui/material";
import TopBar from "../homepage/TopBar";
import Footer from "../Footer";
import TopBasic from "../TopBasic";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import { useReactiveVar } from "@apollo/client";
import { userVar } from "../../../apollo/store";
import { getJwtToken, updateUserInfo } from "../../auth";
import Chat from "../Chat";

const withLayoutBasic = (Component: any) => {
	return (props: any) => {
		const router = useRouter();
		const { t, i18n } = useTranslation("common");
		const device = useDeviceDetect();
		const [authHeader, setAuthHeader] = useState<boolean>(false);
		const user = useReactiveVar(userVar);

		useEffect(() => {
			const jwt = getJwtToken();
			if (jwt) updateUserInfo(jwt);
		}, []);

		if (device === "mobile") {
			return (
				<>
					{" "}
					<Head>
						<title>Bowow | Pet Shop</title>
						<meta
							name="description"
							content="Pet supplies for your furry friends"
						/>
						<meta
							name="viewport"
							content="width=device-width, initial-scale=1"
						/>
						<link rel="icon" type="image/png" href="/img/logo/BOWOW.png" />
					</Head>
					<Stack id="mobile-wrap">
						{/* <Stack className="topBar">
							<TopBar />
						</Stack> */}

						<Stack id={"top"}>
							<TopBasic />
						</Stack>

						<Stack id={"main"}>
							<Component {...props} />
						</Stack>

						<Chat />

						<Stack id={"footer"}>
							<Footer />
						</Stack>
					</Stack>
				</>
			);
		} else {
			return (
				<>
					{" "}
					<Head>
						<title>Bowow | Pet Shop</title>
						<meta
							name="description"
							content="Pet supplies for your furry friends"
						/>
						<meta
							name="viewport"
							content="width=device-width, initial-scale=1"
						/>
						<link rel="icon" type="image/png" href="/img/logo/BOWOW.png" />
					</Head>
					<Stack id="pc-wrap">
						{/* <Stack className="topBar">
							<TopBar />
						</Stack> */}

						<Stack id={"top"}>
							<TopBasic />
						</Stack>
						<Stack id={"main"}>
							<Component {...props} />
						</Stack>

						<Chat />

						<Stack id={"footer"}>
							<Footer />
						</Stack>
					</Stack>
				</>
			);
		}
	};
};

export default withLayoutBasic;
