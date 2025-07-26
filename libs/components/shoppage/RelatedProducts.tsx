import React, { useState } from "react";
import {
	Button,
	Divider,
	IconButton,
	Stack,
	Typography,
} from "@mui/material";
import { ArrowBackIosNew, ArrowForwardIos, Star } from "@mui/icons-material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { useMutation, useQuery } from "@apollo/client";
import { LIKE_TARGET_PRODUCT } from "../../../apollo/user/mutation";
import { GET_PRODUCTS } from "../../../apollo/user/query";
import {
	sweetErrorAlert,
	sweetMixinErrorAlert,
	sweetTopSmallSuccessAlert,
} from "../../sweetAlert";
import { NEXT_PUBLIC_APP_API_URL } from "../../config";
import { useCart } from "../../context/CartContext";
import { Product } from "../../types/product/product";
import { ProductsInquiry } from "../../types/product/product.input";
import { Message } from "../../enums/common.enum";
import { T } from "../../types/common";

const defaultProductInput: ProductsInquiry = {
	page: 1,
	limit: 8,
	sort: "createdAt",
	search: {},
};

interface RelatedProductsProps {
	initialInput?: ProductsInquiry;
}

const RelatedProducts = ({
	initialInput = defaultProductInput,
}: RelatedProductsProps) => {
	const [products, setProducts] = useState<Product[]>([]);
	const [likeTargetProduct] = useMutation(LIKE_TARGET_PRODUCT);
	const { addToCart } = useCart();

	const {
		data: getProductsData,
		refetch: getProductsRefetch,
	} = useQuery(GET_PRODUCTS, {
		fetchPolicy: "cache-and-network",
		variables: { input: initialInput },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			if (data?.getProducts?.list) {
				setProducts(data.getProducts.list);
			}
		},
	});

	const likeProductHandler = async (user: T, id: string) => {
		try {
			if (!user._id) throw new Error(Message.NOT_AUTHENTICATED);
			await likeTargetProduct({ variables: { input: id } });
			await getProductsRefetch({ input: initialInput });
			await sweetTopSmallSuccessAlert("Success", 800);
		} catch (err: any) {
			console.error("ERROR, likeProductHandler:", err.message);
			sweetMixinErrorAlert(err.message);
		}
	};

	const handleAddToCart = (product: Product) => {
		try {
			addToCart(product);
			sweetTopSmallSuccessAlert("Product added to cart!", 800);
		} catch (error) {
			console.error("Error adding to cart:", error);
			sweetErrorAlert("Failed to add product to cart");
		}
	};

	return (
		<Stack className="relatedProductWrapper">
			<div className="container">
				<div className="header">
					<h2>Related Products</h2>
					<Divider className="relatedProductDivider" />
					<div className="nav">
						<IconButton className="swiper-prev">
							<ArrowBackIosNew fontSize="small" />
						</IconButton>
						<IconButton className="swiper-next">
							<ArrowForwardIos fontSize="small" />
						</IconButton>
					</div>
				</div>

				<div className="card-box">
					<Swiper
						className="top-property-swiper"
						modules={[Navigation]}
						slidesPerView="auto"
						spaceBetween={26}
						navigation={{
							nextEl: ".swiper-next",
							prevEl: ".swiper-prev",
						}}
					>
						{products.map((product) => (
							<SwiperSlide
								key={product._id}
								className="top-property-slide"
								style={{ width: "300px" }}
							>
								<Stack className="card">
									<div className="discount">10% Off</div>
									<div className="imagePlaceholder">
										{product.productImages?.length > 0 && (
											<img
												src={`${NEXT_PUBLIC_APP_API_URL}/${product.productImages[0]}`}
												alt={product.productTitle}
												className="productImage"
											/>
										)}
									</div>

									<Button
										className="addToCartBtn"
										onClick={() => handleAddToCart(product)}
									>
										ADD TO CART
									</Button>

									<div className="stars">
										{[...Array(5)].map((_, i) => (
											<Star key={i} fontSize="small" />
										))}
									</div>

									<Typography className="name">
										{product.productTitle}
									</Typography>

									<div className="priceRow">
										<span className="current">
											${product.productPrice.toFixed(2)}
										</span>
										<span className="old">$99</span>
									</div>
								</Stack>
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			</div>
		</Stack>
	);
};

export default RelatedProducts;
