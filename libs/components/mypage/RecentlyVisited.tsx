import React, { useState } from "react";
import { NextPage } from "next";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import { Pagination, Stack, Typography } from "@mui/material";
import { T } from "../../types/common";
import { useMutation, useQuery } from "@apollo/client";
import { GET_VISITED } from "../../../apollo/user/query";
import { Product } from "../../types/product/product";
import ProductCards from "./ProductCards";
import { LIKE_TARGET_PRODUCT } from "../../../apollo/user/mutation";
import { Messages } from "../../config";
import { sweetMixinErrorAlert } from "../../sweetAlert";

const RecentlyVisited: NextPage = () => {
	const device = useDeviceDetect();
	const [recentlyVisited, setRecentlyVisited] = useState<Product[]>([]);
	const [total, setTotal] = useState<number>(0);
	const [searchVisited, setSearchVisited] = useState<T>({ page: 1, limit: 6 });

	/** APOLLO REQUESTS **/
	const [likeTargetProduct] = useMutation(LIKE_TARGET_PRODUCT);

	const {
		loading: getVisitedLoading,
		data: getVisitedData,
		error: getVisitedError,
		refetch: getVisitedRefetch,
	} = useQuery(GET_VISITED, {
		fetchPolicy: "network-only",
		variables: { input: searchVisited },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setRecentlyVisited(data?.getVisited?.list);
			setTotal(data?.getVisited?.metaCounter[0]?.total ?? 0);
		},
	});

	/** HANDLERS **/
	const paginationHandler = (e: T, value: number) => {
		setSearchVisited({ ...searchVisited, page: value });
	};

	const likeProductHandler = async (user: T, id: string) => {
		try {
			if (!id) return;
			if (!user._id) throw new Error(Messages.error2);

			await likeTargetProduct({ variables: { input: id } });

			await getVisitedRefetch({ input: searchVisited });
		} catch (err: any) {
			console.log("ERROR, likeProductHandler:", err.message);
			sweetMixinErrorAlert(err.message).then();
		}
	};

	if (device === "mobile") {
		return <div>PETSHOP MY RECEANTL VISITED MOBILE</div>;
	} else {
		return (
			<div id="my-favorites-page">
				<Stack className="main-title-box">
					<Stack className="right-box">
						<Typography className="main-title">Recently Visited</Typography>
						<Typography className="sub-title">
							We are glad to see you again!
						</Typography>
					</Stack>
				</Stack>
				<Stack className="favorites-list-box">
					{recentlyVisited.length ? (
						recentlyVisited?.map((product: Product) => {
							return (
								<ProductCards
									product={product}
									myFavorites={true}
									recentlyVisited={true}
									likeProductHandler={likeProductHandler}
								/>
							);
						})
					) : (
						<div className={"no-data"}>
							<img src="/img/icons/icoAlert.svg" alt="" />
							<p>No Visited Products!</p>
						</div>
					)}
				</Stack>
				{recentlyVisited.length !== 0 && (
					<Stack className="pagination-config">
						<Stack className="pagination-box">
							<Pagination
								count={Math.ceil(total / searchVisited.limit)}
								page={searchVisited.page}
								shape="circular"
								color="primary"
								onChange={paginationHandler}
							/>
						</Stack>
						<Stack className="total-result">
							<Typography>
								Total {recentlyVisited.length} recently visited product
								{recentlyVisited.length > 1 ? "ies" : "y"}
							</Typography>
						</Stack>
					</Stack>
				)}
			</div>
		);
	}
};

export default RecentlyVisited;
