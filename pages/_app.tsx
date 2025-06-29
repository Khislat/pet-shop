import type { AppProps } from "next/app";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { light } from "../scss/MaterialTheme";
import { useState } from "react";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../apollo/client";
import "../scss/pc/main.scss";
import "../scss/mobile/main.scss";
import "../scss/app.scss";
import "../scss/pc/homepage/homepage.scss";
import { CartProvider } from "../libs/context/CartContext";

export default function App({ Component, pageProps }: AppProps) {
	// @ts-ignore
	const [theme, setTheme] = useState(createTheme(light));
	const client = useApollo(pageProps.initialApolloState);
	return (
		<ApolloProvider client={client}>
			{" "}
			<ThemeProvider theme={theme}>
				<CartProvider>
					<CssBaseline />
					<Component {...pageProps} />
				</CartProvider>
			</ThemeProvider>
		</ApolloProvider>
	);
}
