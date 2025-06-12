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
import React, { useEffect, useState } from "react";
import ProductTabs from "../../libs/components/shoppage/ProductTabsSection";
import { Product } from "../../libs/types/product/product";
import { useQuery } from "@apollo/client";
import { GET_PRODUCT, GET_PRODUCTS } from "../../apollo/user/query";
import { T } from "../../libs/types/common";
import { Direction } from "../../libs/enums/common.enum";
import { useRouter } from "next/router";

const ProductDetailPage = () => {
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
	const { id } = router.query;
	/** APOLLO REQUESTS **/
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
	console.log("productId", productId)
	useEffect(() => {
		if (id && typeof id === "string") {
			setProductId(id);
		}
	}, [id]);

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
						<Typography className={"title"}>{product?.productTitle}</Typography>
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
							<Typography className={"label"}>Size : 2KG</Typography>
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

export default withLayoutBasic(ProductDetailPage);
