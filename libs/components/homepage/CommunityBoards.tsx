import React, { useState } from "react";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import { BoardArticle } from "../../types/board-article/board-article";
import { useQuery } from "@apollo/client";
import { GET_BOARD_ARTICLES } from "../../../apollo/user/query";
import { BoardArticleCategory } from "../../enums/board-article.enum";
import { T } from "../../types/common";
import Moment from "react-moment";
import { NEXT_PUBLIC_APP_API_URL } from "../../config";

const CommunityBoards = () => {
	const device = useDeviceDetect();
	const [searchCommunity, setSearchCommunity] = useState({
		page: 1,
		sort: "articleViews",
		direction: "DESC",
	});
	const [newsArticles, setNewsArticles] = useState<BoardArticle[]>([]);

	/** APOLLO REQUEST **/
	const { loading, data, error } = useQuery(GET_BOARD_ARTICLES, {
		fetchPolicy: "network-only",
		variables: {
			input: {
				...searchCommunity,
				limit: 3,
				search: { articleCategory: BoardArticleCategory.NEWS },
			},
		},
		onCompleted: (data: T) => {
			setNewsArticles(data?.getBoardArticles?.list || []);
		},
	});

	if (device === "mobile") {
		return (
			<section className={"blogSection"}>
				<div className={"container"}>
					<div className={"sectionHeader"}>
						<h2 className={"sectionTitle"}>Latest News & Articles</h2>
						<div className={"decorationIcon"} />
					</div>

					<p className={"sectionDescription"}>
						Finibus arcu condimentum non. Nullam non iaculis quam. Aliquam ac
						ultricies tellus, ac dapibus neque. Vivamus tellus magna.
					</p>

					<div className={"blogGrid"}>
						{newsArticles.map((article) => (
							<div key={article._id} className={"blogCard"}>
								<div
									className={"blogImage"}
									style={{
										backgroundImage: `url(${
											article.articleImage?.startsWith("http")
												? article.articleImage
												: `${NEXT_PUBLIC_APP_API_URL}/${article.articleImage}`
										})`,
									}}>
									<div className={"dateTag"}>
										<span>
											<Moment format="DD.MM.YY">{article.createdAt}</Moment>
										</span>
									</div>
								</div>

								<div className={"blogContent"}>
									<h3 className={"blogTitle"}>{article.articleTitle}</h3>
									<p className={"blogExcerpt"}>{article.articleContent}</p>

									<div className={"blogFooter"}>
										<div className={"readMore"}>
											<span className={"readMoreText"}>READ MORE</span>
											<div className={"readMoreLine"} />
										</div>

										<div className={"reviewsContainer"}>
											<div className={"reviewContainer"}>
												<div className={"circles"}>
													<div className={"circle"}>
														<img
															src="/img/homepage/user1.webp"
															alt="User 1"
															className={"avatar"}
														/>
													</div>
													<div className={"circle"}>
														<img
															src="/img/homepage/user2.jpg"
															alt="User 2"
															className={"avatar"}
														/>
													</div>
													<div className={"circle"}>
														<img
															src="/img/homepage/user3.jpeg"
															alt="User 3"
															className={"avatar"}
														/>
													</div>
												</div>
											</div>

											<span className={"reviewCount"}>+4 Review</span>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
		);
	} else {
		return (
			<section className={"blogSection"}>
				<div className={"container"}>
					<div className={"sectionHeader"}>
						<h2 className={"sectionTitle"}>Latest News & Articles</h2>
						<div className={"decorationIcon"} />
					</div>

					<p className={"sectionDescription"}>
						Finibus arcu condimentum non. Nullam non iaculis quam. Aliquam ac
						ultricies tellus, ac dapibus neque. Vivamus tellus magna.
					</p>

					<div className={"blogGrid"}>
						{newsArticles.map((article) => (
							<div key={article._id} className={"blogCard"}>
								<div
									className={"blogImage"}
									style={{
										backgroundImage: `url(${
											article.articleImage?.startsWith("http")
												? article.articleImage
												: `${NEXT_PUBLIC_APP_API_URL}/${article.articleImage}`
										})`,
									}}>
									<div className={"dateTag"}>
										<span>
											<Moment format="DD.MM.YY">{article.createdAt}</Moment>
										</span>
									</div>
								</div>

								<div className={"blogContent"}>
									<h3 className={"blogTitle"}>{article.articleTitle}</h3>
									<p className={"blogExcerpt"}>{article.articleContent}</p>

									<div className={"blogFooter"}>
										<div className={"readMore"}>
											<span className={"readMoreText"}>READ MORE</span>
											<div className={"readMoreLine"} />
										</div>

										<div className={"reviewsContainer"}>
											<div className={"reviewContainer"}>
												<div className={"circles"}>
													<div className={"circle"}>
														<img
															src="/img/homepage/user1.webp"
															alt="User 1"
															className={"avatar"}
														/>
													</div>
													<div className={"circle"}>
														<img
															src="/img/homepage/user2.jpg"
															alt="User 2"
															className={"avatar"}
														/>
													</div>
													<div className={"circle"}>
														<img
															src="/img/homepage/user3.jpeg"
															alt="User 3"
															className={"avatar"}
														/>
													</div>
												</div>
											</div>

											<span className={"reviewCount"}>+4 Review</span>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
		);
	}
};

export default CommunityBoards;
