import React, { Component } from "react";
import Head from "next/head";
import { Stack } from "@mui/material";
import TopBar from "../homepage/TopBar";
import Footer from "../Footer";
import TopBasic from "../TopBasic";

const withLayoutBasic = (Component: any) => {
	return (props: any) => {
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
						<TopBasic />
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

export default withLayoutBasic;
