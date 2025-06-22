import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { Pagination, Stack, Typography } from "@mui/material";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { T } from "../../types/common";
import { userVar } from "../../../apollo/store";
import { useRouter } from "next/router";
import { sweetConfirmAlert, sweetErrorHandling } from "../../sweetAlert";
import { Product } from "../../types/product/product";
import { VendorProductsInquiry } from "../../types/product/product.input";
import { GET_VEDOR_PRODUCTS } from "../../../apollo/user/query";
import { UPDATE_PRODUCT } from "../../../apollo/user/mutation";
import { ProductStatus } from "../../enums/product.enum";
import ProductCards from "./ProductCards";
import { MyProductsCard } from "./MyProductsCard";

interface MyProducProps {
	initialInput?: VendorProductsInquiry;
}

const MyProducts = ({ initialInput = myProducts }: MyProducProps) => {
	const device = useDeviceDetect();
	const [searchFilter, setSearchFilter] =
		useState<VendorProductsInquiry>(initialInput);
	const [vendorProducts, setVendorProducts] = useState<Product[]>([]);
	const [total, setTotal] = useState<number>(0);
	const user = useReactiveVar(userVar);
	const router = useRouter();

	/** APOLLO REQUESTS **/
	const [updateProduct] = useMutation(UPDATE_PRODUCT);

	const {
		loading: getVendorProductsLoading,
		data: getVendorProductsData,
		error: getVendorProductsError,
		refetch: getVendorProductsRefetch,
	} = useQuery(GET_VEDOR_PRODUCTS, {
		fetchPolicy: "network-only",
		variables: { input: searchFilter },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setVendorProducts(data?.getVendorProducts?.list);
			setTotal(data?.getVendorProducts?.metaCounter[0]?.total ?? 0);
		},
	});
	console.log("Vendor products: ", vendorProducts);
	useEffect(() => {
		getVendorProductsRefetch({ input: searchFilter });
	}, [searchFilter]);
	/** HANDLERS **/
	const paginationHandler = (e: T, value: number) => {
		setSearchFilter({ ...searchFilter, page: value });
	};

	const changeStatusHandler = (value: ProductStatus) => {
		setSearchFilter({ ...searchFilter, search: { productStatus: value } });
	};

	const deleteProductHandler = async (id: string) => {
		try {
			if (await sweetConfirmAlert("Are you sure to delete this product?")) {
				await updateProduct({
					variables: {
						input: {
							_id: id,
							productStatus: "DELETE",
						},
					},
				});
				await getVendorProductsRefetch({ input: searchFilter });
			}
		} catch (err: any) {
			await sweetErrorHandling(err);
		}
	};

	const updateProductHandler = async (status: string, id: string) => {
		try {
			if (await sweetConfirmAlert(`Are you sure change to ${status}?`)) {
				await updateProduct({
					variables: {
						input: {
							_id: id,
							productStatus: status,
						},
					},
				});
				await getVendorProductsRefetch({ input: searchFilter });
			}
		} catch (err: any) {
			await sweetErrorHandling(err);
		}
	};

	if (user?.memberType !== "VENDOR") {
		router.back();
	}

	if (device === "mobile") {
		return <div>PETSHOP PRODUCTS MOBILE</div>;
	} else {
		return (
			<div id="my-property-page">
				<Stack className="main-title-box">
					<Stack className="right-box">
						<Typography className="main-title">My Products</Typography>
						<Typography className="sub-title">
							We are glad to see you again!
						</Typography>
					</Stack>
				</Stack>
				<Stack className="property-list-box">
					<Stack className="tab-name-box">
						<Typography
							onClick={() => changeStatusHandler(ProductStatus.ACTIVE)}
							className={
								searchFilter?.search?.productStatus === "ACTIVE"
									? "active-tab-name"
									: "tab-name"
							}>
							On Sale
						</Typography>
						<Typography
							onClick={() => changeStatusHandler(ProductStatus.SOLD)}
							className={
								searchFilter?.search?.productStatus === "SOLD"
									? "active-tab-name"
									: "tab-name"
							}>
							On Sold
						</Typography>
					</Stack>
					<Stack className="list-box">
						<Stack className="listing-title-box">
							<Typography className="title-text">Listing title</Typography>
							<Typography className="title-text">Date Published</Typography>
							<Typography className="title-text">Status</Typography>
							<Typography className="title-text">View</Typography>
							{searchFilter.search.productStatus === "ACTIVE" && (
								<Typography className="title-text">Action</Typography>
							)}
						</Stack>

						<div className="products-grid">
							{vendorProducts.length === 0 ? (
								<div className={"no-data"}>
									<img src="/img/icons/icoAlert.svg" alt="" />
									<p>No Product found!</p>
								</div>
							) : (
								vendorProducts.map((product: Product) => (
									<MyProductsCard
										key={product._id}
										product={product}
										deleteProductHandler={deleteProductHandler}
										updateProductHandler={updateProductHandler}
									/>
								))
							)}
						</div>
					</Stack>

					{vendorProducts.length !== 0 && (
						<Stack className="pagination-config">
							<Stack className="pagination-box">
								<Pagination
									count={Math.ceil(total / searchFilter.limit)}
									page={searchFilter.page}
									shape="circular"
									color="primary"
									onChange={paginationHandler}
								/>
							</Stack>
							<Stack className="total-result">
								<Typography>
									{vendorProducts.length} product available
								</Typography>
							</Stack>
						</Stack>
					)}
				</Stack>
			</div>
		);
	}
};

const myProducts: VendorProductsInquiry = {
	page: 1,
	limit: 5,
	sort: "createdAt",
	search: {},
};

export default MyProducts;
