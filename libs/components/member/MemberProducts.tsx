import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { Pagination, Stack, Typography } from "@mui/material";
import useDeviceDetect from "../../hooks/useDeviceDetect";

import { T } from "../../types/common";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import {
	ProductsInquiry,
	VendorProductsInquiry,
} from "../../types/product/product.input";
import { Product } from "../../types/product/product";
import { GET_PRODUCTS } from "../../../apollo/user/query";
import ProductCard from "../homepage/ProductCard";
import ProductCards from "../mypage/ProductCards";
import { MyProductsCard } from "../mypage/MyProductsCard";

interface MyProducProps {
	initialInput?: VendorProductsInquiry;
}

const MyProducts: NextPage = ({ initialInput = myProducts }: MyProducProps) => {
	const device = useDeviceDetect();
	const router = useRouter();
	const { memberId } = router.query;
	const [searchFilter, setSearchFilter] = useState<VendorProductsInquiry>(initialInput);

	const [agentProducts, setAgentProducts] = useState<Product[]>([]);
	const [total, setTotal] = useState<number>(0);

	/** APOLLO REQUESTS **/
	const {
		loading: getProductsLoading,
		data: getProductsData,
		error: getProductsError,
		refetch: getProductsRefetch,
	} = useQuery(GET_PRODUCTS, {
		fetchPolicy: "network-only",
		variables: { input: searchFilter },
		skip: !memberId,
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setAgentProducts(data?.getProducts?.list);
			setTotal(data?.getProducts?.metaCounter[0]?.total ?? 0);
		},
	});

	/** LIFECYCLES **/
	useEffect(() => {
		getProductsRefetch().then();
	}, [searchFilter]);
	useEffect(() => {
		console.log("memberId:", memberId);
		console.log("searchFilter:", searchFilter);
	}, [searchFilter, memberId]);

	useEffect(() => {
		if (getProductsData) {
			console.log("getProductsData:", getProductsData);
		}
	}, [getProductsData]);

	useEffect(() => {
		if (memberId) {
			setSearchFilter((prev) => ({
				...prev,
				search: { ...prev.search, memberId: memberId as string },
			}));
		}
	}, [memberId]);

	useEffect(() => {
		if (memberId) {
			getProductsRefetch({ input: searchFilter });
		}
	}, [searchFilter]);

	/** HANDLERS **/
	const paginationHandler = (e: T, value: number) => {
		setSearchFilter({ ...searchFilter, page: value });
	};

	if (device === "mobile") {
		return <div>NESTAR PRODUCTS MOBILE</div>;
	} else {
		return (
			<div id="member-properties-page">
				<Stack className="main-title-box">
					<Stack className="right-box">
						<Typography className="main-title">Products</Typography>
					</Stack>
				</Stack>
				<Stack className="properties-list-box">
					<Stack className="list-box">
						{agentProducts?.length > 0 && (
							<Stack className="listing-title-box">
								<Typography className="title-text">Listing title</Typography>
								<Typography className="title-text">Date Published</Typography>
								<Typography className="title-text">Status</Typography>
								<Typography className="title-text">View</Typography>
							</Stack>
						)}
						{agentProducts?.length === 0 && (
							<div className={"no-data"}>
								<img src="/img/icons/icoAlert.svg" alt="" />
								<p>No Product found!</p>
							</div>
						)}
						{agentProducts?.map((product: Product) => {
							return (
								<MyProductsCard
									product={product}
									memberPage={true}
									key={product?._id}
								/>
							);
						})}

						{agentProducts.length !== 0 && (
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
									<Typography>{total} property available</Typography>
								</Stack>
							</Stack>
						)}
					</Stack>
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
