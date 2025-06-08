import {
	Box,
	Button,
	Stack,
	Typography,
	IconButton,
	Tabs,
	Tab,
	CircularProgress,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ReplayIcon from "@mui/icons-material/Replay";
import withLayoutBasic from "../../libs/components/layout/LayoutBasic";
import React, { useEffect, useState } from "react";
import ProductTabs from "../../libs/components/shoppage/ProductTabsSection";
import useDeviceDetect from "../../libs/hooks/useDeviceDetect";
import { useRouter } from "next/router";
import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { userVar } from "../../apollo/store";
import { Product } from "../../libs/types/product/product";
import { LIKE_TARGET_PRODUCT } from "../../apollo/user/mutation";
import { GET_PRODUCT, GET_PRODUCTS } from "../../apollo/user/query";
import { T } from "../../libs/types/common";
import { Direction, Message } from "../../libs/enums/common.enum";
import {
	sweetMixinErrorAlert,
	sweetTopSmallSuccessAlert,
} from "../../libs/sweetAlert";
import { text } from "stream/consumers";

const ProductDetailPage = () => {
	const [activeTab, setActiveTab] = React.useState(0);

	const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
		setActiveTab(newValue);
	};

	const device = useDeviceDetect();
	const router = useRouter();
	const user = useReactiveVar(userVar);
	const [productId, setProductId] = useState<string | null>(null);
	const [product, setProduct] = useState<Product | any>(null);
	const [slideImage, setSlideImage] = useState<string>("");
	const [destinationProducts, setDestinationProducts] = useState<Product[]>([]);

	/** APOLLO REQUESTS **/
	const [likeTargetProperty] = useMutation(LIKE_TARGET_PRODUCT);

	const {
		loading: getProductLoading,
		data: getProductData,
		error: getProductError,
		refetch: getProductRefetch,
	} = useQuery(GET_PRODUCT, {
		fetchPolicy: "network-only",
		variables: { input: productId },
		skip: !productId,
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			if (data?.getProduct) setProduct(data?.getProduct);
			if (data?.getProduct) setSlideImage(data?.getProduct?.productImages[0]);
		},
	});
	const {
		loading: getProductsLoading,
		data: getProductsData,
		error: getProductsError,
		refetch: getProductsRefetch,
	} = useQuery(GET_PRODUCTS, {
		fetchPolicy: "cache-and-network",
		variables: {
			input: {
				page: 1,
				limit: 4,
				sort: "createdAt",
				direction: Direction.DESC,
				search: {},
			},
		},
		skip: !productId && !product,
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			if (data?.getProducts?.list)
				setDestinationProducts(data?.getProducts?.list);
		},
	});

	/** LIFECYCLES **/
	useEffect(() => {
		if (router?.query?.id && typeof router.query.id === "string") {
			setProductId(router.query.id);
		}
	}, [router.query]);

	useEffect(() => {
		if (getProductError) {
			console.log("GET_PRODUCT error:", getProductError.message);
		}
	}, [getProductError]);

	useEffect(() => {
		if (getProductsError) {
			console.log("GET_PRODUCTS error:", getProductsError.message);
		}
	}, [getProductsError]);
	/** HANDLERS **/

	const changeImageHandler = (image: string) => {
		setSlideImage(image);
	};

	const likePropertyHandler = async (user: T, id: string) => {
		try {
			if (!id) return;
			if (!user._id) throw new Error(Message.NOT_AUTHENTICATED);

			await likeTargetProperty({
				variables: { input: id },
			});
			await getProductRefetch({ input: id });
			await getProductRefetch({
				input: {
					page: 1,
					limit: 4,
					sort: "createdAt",
					direction: Direction.DESC,
					search: {
						text: "",
					},
				},
			});

			await sweetTopSmallSuccessAlert("success", 800);
		} catch (err: any) {
			console.log("ERROR, likePropertyHandler:", err.message);
			sweetMixinErrorAlert(err.message).then();
		}
	};

	// const commentPaginationChangeHandler = async (
	// 	event: ChangeEvent<unknown>,
	// 	value: number
	// ) => {
	// 	commentInquiry.page = value;
	// 	setCommentInquiry({ ...commentInquiry });
	// };

	// const createCommentHandler = async () => {
	// 	try {
	// 		if (!user._id) throw new Error(Message.NOT_AUTHENTICATED);
	// 		await createComment({ variables: { input: insertCommentData } });

	// 		setInsertCommentData({ ...insertCommentData, commentContent: "" });

	// 		await getComentsRefetch({ input: commentInquiry });
	// 	} catch (err) {
	// 		await sweetErrorHandling(err);
	// 	}
	// }

	if (getProductsLoading) {
		return (
			<Stack
				sx={{
					display: "flex",
					justifyContent: "center",
					aligntItems: "center",
					width: "100%",
					height: "1080px",
				}}>
				<CircularProgress size={"4rem"} />
			</Stack>
		);
	}

	return (
		<Stack className={"productDetailSection"}>
			<Stack className="container">
				<Stack className="productDetailWrapper">
					<Box className={"gallerySection"}>
						<Stack className={"thumbnailStack"}>
							<Box className={"thumb"} style={{ backgroundColor: "#DFE9F0" }} />
							<Box className={"thumb"} style={{ backgroundColor: "#97C8E0" }} />
							<Box className={"thumb"} style={{ backgroundColor: "#E8F1E5" }} />
							<Box className={"thumb"} style={{ backgroundColor: "#FAE6A2" }} />
						</Stack>
						<Box className={"mainImage"} />
					</Box>

					<Box className={"infoSection"}>
						<Typography className={"discountTag"}>Save 38%</Typography>
						<Typography className={"title"}>
							{product?.propertyTitle}
						</Typography>
						<Box className="reviews">
							<div className={"stars"}>
								{"★★★★★".split("").map((star, idx) => (
									<span key={idx} className={"star"}>
										{star}
									</span>
								))}
							</div>

							<Typography className={"reviews"}>
								24 Reviews &nbsp; | &nbsp; Sku :KD-566498 &nbsp; | &nbsp;{" "}
							</Typography>

							<span className={"inStock"}>IN STOCK</span>
						</Box>

						<Stack direction="row" spacing={2} alignItems="center">
							<Typography className={"price"}>
								{product?.productPrice}
							</Typography>
							<Typography className={"originalPrice"}>$69.00</Typography>
						</Stack>

						<Typography className={"desc"}>{product?.productDesc}</Typography>

						<Box mt={3}>
							<Typography className={"label"}>
								Weight : {product?.productWeight}KG
							</Typography>
							<Stack direction="row" spacing={2} mt={1}>
								{["500gm", "1Kg", "2Kg", "5Kg", "7Kg"].map((size, i) => (
									<Button
										key={i}
										className={`${"sizeBtn"} ${
											size === "2Kg" ? "selected" : ""
										}`}>
										{size}
									</Button>
								))}
							</Stack>
						</Box>

						<Typography className={"stockWarning"}>
							Hurry! Only <span>24 Items</span> Left In Stock.
						</Typography>

						<Stack className={"actionSection"}>
							<Box className={"qtyBox"}>
								<Button>
									<RemoveIcon />
								</Button>
								<Typography className={"qty"}>3</Typography>
								<Button>
									<AddIcon />
								</Button>
							</Box>
							<Button className={"addToCart"}>Add to Cart</Button>
							<IconButton className={"iconBtn"}>
								<FullscreenIcon />
							</IconButton>
							<IconButton className={"iconBtn"}>
								<FavoriteBorderIcon />
							</IconButton>
						</Stack>

						<Button className={"buyNow"}>Buy Now</Button>
					</Box>
				</Stack>

				<Box className="productTabsWrapper">
					<ProductTabs />
				</Box>
			</Stack>
		</Stack>
	);
};

ProductDetailPage.defaultProps = {
	initialComment: {
		page: 1,
		limit: 5,
		sort: "createdAt",
		direction: "DESC",
		search: {
			commentRefId: "",
		},
	},
};

export default withLayoutBasic(ProductDetailPage);
