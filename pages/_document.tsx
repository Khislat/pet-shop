import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<meta name="robots" content="index,follow" />
				<link rel="icon" type="image/png" href="/img/logo/BOWOW.png" />

				{/* SEO */}
				<meta
					name="keyword"
					content={"nestar, nestar.uz, devex mern, mern nestjs fullstack"}
				/>
				<meta
					name={"description"}
					content={
						"Shop the best pet food, toys, and accessories for your furry friends at any time, anywhere in South Korea — only on bowow.uz | " +
						"Покупайте лучший корм, игрушки и аксессуары для домашних животных в любое время и в любом месте Южной Кореи — только на bowow.uz | " +
						"언제 어디서나 최고의 반려동물 사료, 장난감, 액세서리를 bowow.uz에서 만나보세요."
					}
				/>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
