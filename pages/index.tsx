import Head from "next/head";

import { NextPage } from "next";
import withLayoutMain from "../libs/components/layout/LayoutHome";

const Home: NextPage = () => {
	return (
		<>
			<Head>
				<title>Bowow | Pet Shop</title>
				<meta
					name="description"
					content="Pet supplies for your furry friends"
				/>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
		</>
	);
};

export default withLayoutMain(Home);
