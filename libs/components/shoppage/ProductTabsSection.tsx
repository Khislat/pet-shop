import React from "react";
import { Tabs, Tab, Box, Typography, Stack, Divider } from "@mui/material";
import Comments from "./ComentsSection";
import RelatedProducts from "./RelatedProducts";
import {
	CommentInput,
	CommentsInquiry,
} from "../../types/comment/comment.input";

// import RelatedProducts from "./RelatedProducts";

type Props = {
	comments: Comment[];
	commentTotal: number;
	insertCommentData: CommentInput;
	setInsertCommentData: React.Dispatch<React.SetStateAction<CommentInput>>;
	createCommentHandler: () => void;
	commentInquiry: CommentsInquiry;
	commentPaginationChangeHandler: (event: any, value: number) => void;
};

const ProductTabs = ({
	comments,
	commentTotal,
	insertCommentData,
	setInsertCommentData,
	createCommentHandler,
	commentInquiry,
	commentPaginationChangeHandler,
}: Props) => {
	const [activeTab, setActiveTab] = React.useState(0);

	const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
		setActiveTab(newValue);
	};

	return (
		<Stack className={"tabsWrapper"}>
			<Box className={"tabsBox"}>
				<Tabs
					value={activeTab}
					onChange={handleChange}
					textColor="inherit"
					TabIndicatorProps={{ style: { display: "none" } }}
					className="customTabs">
					<Tab
						label="PRODUCT DESCRIPTION"
						className={`${"tab"} ${activeTab === 0 ? "active" : ""}`}
					/>
					<Tab
						label="ABOUT BRAND"
						className={`${"tab"} ${activeTab === 1 ? "active" : ""}`}
					/>
					<Tab
						label="CLIENT REVIEWS"
						className={`${"tab"} ${activeTab === 2 ? "active" : ""}`}
					/>
				</Tabs>
			</Box>
			<Box>
				{" "}
				<Divider className="verticalDivider" />
			</Box>

			<Box className={"tabContent"}>
				{activeTab === 0 && (
					<Box>
						<Typography variant="h5" className={"heading"}>
							FEATURES
						</Typography>
						<Typography className={"text"}>
							Proin maximus quis massa mollis tincidunt. Suspendisse condimentum
							dui ac lobortis tristique. Mauris ornare commodo nunc id
							elementum. Nam accumsan ante quis dui molestie sagittis. Class
							aptent taciti sociosqu ad litora torquent per conubia nostra, per
							inceptos himenaeos. Nam posuere nisl diam, vitae efficitur metus
							lobortis in. Curabitur finibus ac lorem dapibus condimentum. Ut
							quis metus nec lacus posuere accumsan nec et diam. Nullam pharetra
							dictum mattis. Nulla fermentum ultrices lacus. Mauris non erat
							libero. Vivamus pellentesque, tellus et imperdiet molestie.
						</Typography>
						<Typography variant="h5" className={"heading"}>
							CERTIFIED FOOD MATERIALS
						</Typography>
						<Box className="certificade">
							<ul className={"list"}>
								<li>
									<strong>Journey into a Realm of Uncommon Glamour</strong>
								</li>
								<li>
									<strong>
										Where Elegance Finds Its Extraordinary Artistry
									</strong>
								</li>
								<li>
									<strong>
										Duis vel arcu mauris. Donec convallis convallis
									</strong>
								</li>
								<li>
									<strong>
										Pibh eget volutpat. Vestibulum sit amet scelerisque ex.
									</strong>
								</li>
								<li>
									<strong>
										Phasellus ipsum tortor, porttitor vitae auio vel tempus
									</strong>
								</li>
							</ul>

							<Box className={"imagesWrapper"}>
								<Box className={"imagePlaceholder"}>
									{" "}
									<img
										src="/img/detailpage/detailPage.png"
										alt="bird"
										className="detailPage"
									/>
									<img
										src="/img/detailpage/detailPage1.png"
										alt="bird"
										className="detailPage"
									/>
								</Box>
							</Box>
						</Box>
					</Box>
				)}
				{activeTab === 1 && (
					<Typography>Client Reviews content goes here...</Typography>
				)}
				{activeTab === 2 && (
					<Stack className="commentWrap">
						<Comments
							comments={comments}
							commentTotal={commentTotal}
							insertCommentData={insertCommentData}
							setInsertCommentData={setInsertCommentData}
							createCommentHandler={createCommentHandler}
							commentInquiry={commentInquiry}
							commentPaginationChangeHandler={commentPaginationChangeHandler}
						/>
					</Stack>
				)}
			</Box>
			<Box className="relatedProducts">
				<RelatedProducts />
			</Box>
		</Stack>
	);
};

export default ProductTabs;
