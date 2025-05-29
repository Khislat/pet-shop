// components/ProductTabs/RelatedProducts.tsx
import React, { useState } from "react";
import { Button, Divider, IconButton, Stack } from "@mui/material";
import { ArrowBackIosNew, ArrowForwardIos, Star } from "@mui/icons-material";
import { Swiper, SwiperSlide } from "swiper/react";
import RelatedProductsCard from "./RelatedProductsCard";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

const RelatedProducts = () => {
	const [relatedProducts, setRelatedProducts] = useState<number[]>([
		1, 2, 3, 4, 5, 6, 7,
	]);
	return (
		<Stack className={"relatedProductWrapper"}>
			<div className="container">
				<div className={"header"}>
					<h2>Related Products</h2>
					<Divider className="relatedProductDivider" />
					<div className={"nav"}>
						<IconButton>
							<ArrowBackIosNew fontSize="small" className="swiper-prev" />
						</IconButton>
						<IconButton>
							<ArrowForwardIos fontSize="small" className="swiper-next" />
						</IconButton>
					</div>
				</div>
				<div className="card-box">
					<Swiper
						className={"top-property-swiper"}
						modules={[Navigation]}
						slidesPerView={"auto"}
						spaceBetween={12}
						navigation={{
							nextEl: ".swiper-next",
							prevEl: ".swiper-prev",
						}}>
						{relatedProducts.map((property, index) => {
							return (
								<SwiperSlide
									key={index}
									className="top-property-slide"
									style={{ width: "300px"}}>
									<Stack className={"card"}>
										<div className={"discount"}>10% Off</div>
										<div className={"imagePlaceholder"}></div>
										<div className={"addToCartBtn"}>ADD TO CART</div>
										<div className={"stars"}>
											{[...Array(5)].map((_, i) => (
												<Star key={i} fontSize="small" />
											))}
										</div>
										<div className={"name"}>"Butterscotch Pet Food"</div>
										<div className={"priceRow"}>
											<span className={"current"}>$15</span>
											<span className={"old"}>$25</span>
										</div>
									</Stack>
								</SwiperSlide>
							);
						})}
					</Swiper>
				</div>
			</div>
		</Stack>
	);
};

export default RelatedProducts;
