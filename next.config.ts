import { i18n } from "./next-i18next.config";
import dotenv from "dotenv";

dotenv.config();

const nextConfig = {
	reactStrictMode: true,
	env: {
		NEXT_PUBLIC_APP_API_URL: process.env.NEXT_PUBLIC_APP_API_URL,
		NEXT_PUBLIC_API_GRAPHQL_URL: process.env.NEXT_PUBLIC_API_GRAPHQL_URL,
		NEXT_PUBLIC_API_WS: process.env.NEXT_PUBLIC_API_WS,
	},
	i18n,
};

export default nextConfig;
