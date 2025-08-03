import React, { useState } from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import withLayoutBasic from "../../libs/components/layout/LayoutBasic";
import HeroSection from "../../libs/components/blog/HeroSectionBasic";
import { BoardArticle } from "../../libs/types/board-article/board-article";
import { useQuery } from "@apollo/client";
import {
	GET_BOARD_ARTICLE_BY_ID,
	GET_BOARD_ARTICLES,
} from "../../apollo/user/query";
import { BoardArticleCategory } from "../../libs/enums/board-article.enum";
import { T } from "../../libs/types/common";
import { NEXT_PUBLIC_APP_API_URL } from "../../libs/config";
import Moment from "react-moment";
import Link from "next/link";
import { useRouter } from "next/router";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

const BlogPage = () => {
	const services = [
		{ icon: <img src="/img/icons/blogIcon1.png" />, title: "Cat Training" },
		{ icon: <img src="/img/icons/blogIcon2.png" />, title: "Food Service" },
		{ icon: <img src="/img/icons/blogIcon3.png" />, title: "Safe Shifting" },
		{ icon: <img src="/img/icons/blogIcon4.png" />, title: "Pets Mating" },
	];
	const router = useRouter();
	const { id } = router.query;

	const { data, loading, error } = useQuery(GET_BOARD_ARTICLES, {
		variables: {
			input: {
				page: 1,
				limit: 10,
				search: {},
			},
		},
		skip: !id,
	});

	console.log("ID from router:", id);
	console.log("Data from query:", data);

	const articles = data?.getBoardArticles?.list || [];
	const article = articles.find((art: BoardArticle) => art._id === id);

	if (loading) return <p>Yuklanmoqda...</p>;
	if (error) {
		console.error("Error:", error);
		return <p>Xatolik yuz berdi: {error.message}</p>;
	}
	if (!article) return <p>Maqola topilmadi.</p>;

	return (
		<Box className="blogPage">
			<HeroSection />
			<Stack className="container">
				{/* Gallery Section */}
				<Stack className="gallerySection">
					<Box className="mainImage">
						<img
							src={
								article.articleImage?.startsWith("http")
									? article.articleImage
									: `${NEXT_PUBLIC_APP_API_URL}/${article.articleImage}`
							}
							alt={article.articleTitle}
						/>
					</Box>
					<Stack className="infoSection">
						<Typography className="title">{article.articleTitle}</Typography>

						<Typography className="date" variant="body2" sx={{ mb: 2 }}>
							<Moment format="DD.MM.YYYY">{article.createdAt}</Moment>
						</Typography>

						<Typography className="content">
							{article.articleContent}
						</Typography>

						{typeof article.articleViews === "number" && (
							<Typography
								variant="body2"
								sx={{ mt: 2, display: "flex", alignItems: "center", gap: 1 }}>
								<RemoveRedEyeIcon fontSize="small" />
								Views: {article.articleViews}
							</Typography>
						)}
					</Stack>
				</Stack>

				<Stack className="blogIcons">
					<div className="pet-services">
						{services.map((service, idx) => (
							<div className="service-item" key={idx}>
								<div className="icon-wrapper">
									<span className="icon">{service.icon}</span>
								</div>
								<p>{service.title}</p>
							</div>
						))}
					</div>
				</Stack>
				<Stack className="blogPageDescr">
					<Box className="blogPageText">
						<h2 className="blogPagetitle">
							Excellence That Transcends Time and Trends.
						</h2>
						<p className="descr">
							Aliquam suscipit, erat vel pharetra tempus, enim sem pellentesque
							est, dapibus efficitur lacus ipsum porttitor augue. Nullam sit
							amet vehicula ex. Vivamus ac enim eu lacus ornare sollicitudin.
							Integer lacus dui, gravida sit amet pellentesque sed, posuere nec
							eros. Pellentesque mattis viverra erat, at lacinia elit. Quisque
							convallis pharetra metus finibus volutpat. Vestibulum ante ipsum
							primis in faucibus orci luctus et ultrices posuere cubilia curae.
						</p>
					</Box>
					<Box className="blogPageImg">
						<img src="/img/detailpage/blogPageImg.jpg" />
					</Box>
				</Stack>
				<Stack className="blogPageInfo">
					<Box className="blogPageInfoText">
						<h2 className="blogPageInfoTitle">
							Excellence That Transcends Time and Trends.
						</h2>
						<p className="blogPageInfoDescr">
							Aliquam suscipit, erat vel pharetra tempus, enim sem pellentesque
							est, dapibus efficitur lacus ipsum porttitor augue. Nullam sit
							amet vehicula ex. Vivamus ac enim eu lacus ornare sollicitudin.
							Integer lacus dui, gravida sit amet pellentesque sed, posuere nec
							eros. Pellentesque mattis viverra erat, at lacinia elit. Quisque
							convallis pharetra metus finibus volutpat.
						</p>
					</Box>
					<Box className="infoBox">
						<Box className="infoImg">
							<img src="/img/detailpage/blogInfoImg.jpg" />
						</Box>

						<p className="infoDescr">
							<ul className="elegantList">
								<li>Elevate Your Space with Our Classy Electrical Solutions</li>
								<li>Embracing Sophistication, Lighting Dreams Experience.</li>
								<li>Class and Reliability, Choose Us Transforming Spaces.</li>
								<li>Classy Electrical Design Excellence That Works.</li>
								<li>Trends the Epitome of Class in Every Circuit Ageless.</li>
								<li>Craftsmanship for the Classy Clientele & Symphony.</li>
							</ul>
						</p>
					</Box>
				</Stack>
			</Stack>
		</Box>
	);
};

export default withLayoutBasic(BlogPage);
