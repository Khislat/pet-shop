import {
	Box,
	Button,
	Stack,
	Typography,
	IconButton,
	Tabs,
	Tab,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ReplayIcon from "@mui/icons-material/Replay";
import withLayoutBasic from "../../libs/components/layout/LayoutBasic";
import React, { ChangeEvent, useEffect, useState } from "react";
import ProductTabs from "../../libs/components/shoppage/ProductTabsSection";
import { Product } from "../../libs/types/product/product";
import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import {
	GET_COMMENTS,
	GET_PRODUCT,
	GET_PRODUCTS,
} from "../../apollo/user/query";
import { T } from "../../libs/types/common";
import { Direction, Message } from "../../libs/enums/common.enum";
import { useRouter } from "next/router";
import { useCart } from "../../libs/context/CartContext";
import {
	sweetErrorAlert,
	sweetErrorHandling,
	sweetTopSmallSuccessAlert,
} from "../../libs/sweetAlert";
import {
	CommentInput,
	CommentsInquiry,
} from "../../libs/types/comment/comment.input";
import { CommentGroup } from "../../libs/enums/comment.enum";
import { userVar } from "../../apollo/store";
import { CREATE_COMMENT } from "../../apollo/user/mutation";
import HeroSectionBasicDetail from "../../libs/components/shoppage/HeroSectionBasicDetail";
import useDeviceDetect from "../../libs/hooks/useDeviceDetect";

interface DetailProps {
	initialInput: CommentsInquiry;
}

const ProductDetailPage = ({
	initialInput = productDetailPage,
}: DetailProps) => {
	const device = useDeviceDetect();
	const router = useRouter();
	const [activeTab, setActiveTab] = React.useState(0);
	const [productId, setProductId] = useState<string | null>(null);

	const [product, setProduct] = useState<Product | any>(null);
	const [slideImage, setSlideImage] = useState<string>("");
	const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
		setActiveTab(newValue);
	};
	const [destinationProperties, setDestinationProperties] = useState<Product[]>(
		[]
	);
	const { addToCart, cartItems } = useCart();
	const [isAdding, setIsAdding] = useState(false);
	const [isWished, setIsWished] = useState(false);
	const { id } = router.query;
	const [commentInquiry, setCommentInquiry] =
		useState<CommentsInquiry>(initialInput);
	const [productComments, setProductComments] = useState<Comment[]>([]);
	const [commentTotal, setCommentTotal] = useState<number>(0);
	const [insertCommentData, setInsertCommentData] = useState<CommentInput>({
		commentGroup: CommentGroup.PRODUCT,
		commentContent: "",
		commentRefId: "",
	});
	const user = useReactiveVar(userVar);
	const sizes = ["500gm", "1Kg", "2Kg", "5Kg", "7Kg"];
	const [selectedSize, setSelectedSize] = useState("2Kg");
	const [qty, setQty] = useState(1); // boshlang'ich qiymat 1

	/** APOLLO REQUESTS **/
	const [createComment] = useMutation(CREATE_COMMENT);

	const {
		loading: getProductLoading,
		data: getProductData,
		error: getProductError,
		refetch: getProductRefetch,
	} = useQuery(GET_PRODUCT, {
		fetchPolicy: "network-only",
		variables: { input: id },
		skip: !id,
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			if (data?.getProduct) setProduct(data?.getProduct);
			if (data?.getProduct?.propertyImages?.[0]) {
				setSlideImage(data?.getProduct?.propertyImages[0]);
			}
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
				setDestinationProperties(data?.getProducts?.list);
		},
	});

	const {
		loading: getComentsLoading,
		data: getComentsData,
		error: getComentsError,
		refetch: getComentsRefetch,
	} = useQuery(GET_COMMENTS, {
		fetchPolicy: "cache-and-network",
		variables: {
			input: initialInput,
		},
		skip: !commentInquiry.search.commentRefId,
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			if (data?.getComments?.list) setProductComments(data?.getComments?.list);
			setCommentTotal(data?.getComments?.metaCounter[0]?.total ?? 0);
		},
	});

	/** LIFECYCLES **/

	useEffect(() => {
		if (router.query.id) {
			setProductId(router.query.id as string);
			setCommentInquiry({
				...commentInquiry,
				search: {
					commentRefId: router.query.id as string,
				},
			});
			setInsertCommentData({
				...insertCommentData,
				commentRefId: router.query.id as string,
			});
		}
	}, [router]);

	useEffect(() => {
		if (commentInquiry.search.commentRefId) {
			getComentsRefetch({ input: commentInquiry });
		}
	}, [commentInquiry]);

	/** HANDLERS */
	const commentPaginationChangeHandler = async (
		event: ChangeEvent<unknown>,
		value: number
	) => {
		commentInquiry.page = value;
		setCommentInquiry({ ...commentInquiry });
	};

	const createCommentHandler = async () => {
		try {
			if (!user._id) throw new Error(Message.NOT_AUTHENTICATED);
			await createComment({ variables: { input: insertCommentData } });

			setInsertCommentData({ ...insertCommentData, commentContent: "" });

			await getComentsRefetch({ input: commentInquiry });
		} catch (err) {
			await sweetErrorHandling(err);
		}
	};

	console.log("productId", productId);
	useEffect(() => {
		if (id && typeof id === "string") {
			setProductId(id);
		}
	}, [id]);

	const increaseQty = () => {
		setQty((prev) => prev + 1);
	};

	const decreaseQty = () => {
		setQty((prev) => (prev > 1 ? prev - 1 : 1));
	};

	const handleAddToCart = async () => {
		setIsAdding(true);
	
		try {
			addToCart(product, qty); // endi qty ni ham yuboramiz
	
			sweetTopSmallSuccessAlert("Product added to cart!");
		} catch (error) {
			console.error("Error adding to cart:", error);
			sweetErrorAlert("Failed to add product to cart");
		} finally {
			setIsAdding(false);
		}
	};

	if (device === "mobile") {
		return (
			<h1 style={{ marginTop: "20px", textAlign: "center" }}>
				DETAIL PAGE MOBILE
			</h1>
		);
	} else {
		return (
			<Stack className={"productDetailSection"}>
				<HeroSectionBasicDetail />
				<Stack className="container">
					<Stack className="productDetailWrapper">
						<Box className={"gallerySection"}>
							<Stack className="thumbnailStack">
								{product?.productImages?.map((img: string, idx: number) => (
									<Box
										key={idx}
										className="thumb"
										onClick={() => setSlideImage(img)}>
										<img
											src={`${process.env.NEXT_PUBLIC_APP_API_URL}/${img}`}
											alt={`thumb-${idx}`}
											width={120}
											height={120}
											style={{
												objectFit: "cover",
												border:
													`${process.env.NEXT_PUBLIC_APP_API_URL}/${img}` ===
													`${process.env.NEXT_PUBLIC_APP_API_URL}/${slideImage}`
														? "2px solid #000"
														: "1px solid #ccc",
												borderRadius: "8px",
												cursor: "pointer",
											}}
										/>
									</Box>
								))}
							</Stack>

							<Box className="mainImage">
								{product?.productImages?.length > 0 && (
									<img
										src={`${process.env.NEXT_PUBLIC_APP_API_URL}/${
											slideImage || product.productImages[0]
										}`}
										alt={product?.productTitle}
										width={400}
										height={400}
										style={{
											objectFit: "cover",
											width: "100%",
											height: "100%",
											borderRadius: "20px",
										}}
									/>
								)}
							</Box>
						</Box>

						<Box className={"infoSection"}>
							<Typography className={"discountTag"}>Save 38%</Typography>
							<Typography className={"title"}>
								{product?.productTitle}
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
									${product?.productPrice}
								</Typography>
								<Typography className={"originalPrice"}>$69.00</Typography>
							</Stack>

							<Typography className={"desc"}>{product?.productDesc}</Typography>

							<Box mt={3}>
								<Typography className={"label"}>Size : 2KG</Typography>
								<Stack direction="row" spacing={2} mt={1}>
									{["500gm", "1Kg", "2Kg", "5Kg", "7Kg"].map((size, i) => (
										<Button key={i} className={`${"sizeBtn"} `}>
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
									<Button onClick={decreaseQty}>
										<RemoveIcon />
									</Button>
									<Typography className={"qty"}>{qty}</Typography>
									<Button onClick={increaseQty}>
										<AddIcon />
									</Button>
								</Box>

								<Button className={"addToCart"} onClick={handleAddToCart}>
									Add to Cart
								</Button>

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
						<ProductTabs
							comments={productComments}
							commentTotal={commentTotal}
							insertCommentData={insertCommentData}
							setInsertCommentData={setInsertCommentData}
							createCommentHandler={createCommentHandler}
							commentInquiry={commentInquiry}
							commentPaginationChangeHandler={commentPaginationChangeHandler}
						/>
					</Box>
				</Stack>
			</Stack>
		);
	}
};

const productDetailPage: CommentsInquiry = {
	page: 1,
	limit: 5,
	sort: "createdAt",
	search: {
		commentRefId: "",
	},
};

export default withLayoutBasic(ProductDetailPage);
