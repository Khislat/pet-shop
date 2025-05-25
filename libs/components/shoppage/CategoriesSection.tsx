import React from "react";
import Image from "next/image";
import { Box, Stack } from "@mui/material";

const CategoriesSection = () => {
	return (
		<Stack className={"categoriesSectionShop"}>
			<Stack className="container">
				{" "}
				<Stack className={"sectionHeader"}>
					<h2 className={"sectionTitle"}>Pets & Food Categories</h2>
					<div className={"decorationIcon"} />
				</Stack>
				<Stack className={"categoriesContainer"}>
					<Stack className={"categoryItem"}>
						<Box className={"categoryImage"}>
							<div className={"imageCircle"}>
								<div className={"dogImage"} />
							</div>
						</Box>
						<h3 className={"categoryName"}>Dogs</h3>
					</Stack>
					<Stack className={"categoryItem"}>
						<Box className={"categoryImage"}>
							<div className={"imageCircle"}>
								<div className={"catImage"} />
							</div>
						</Box>
						<h3 className={"categoryName"}>Cats</h3>
					</Stack>
					<Stack className={"categoryItem"}>
						<Box className={"categoryImage"}>
							<div className={"imageCircle"}>
								<div className={"birdImage"} />
							</div>
						</Box>
						<h3 className={"categoryName"}>Birds</h3>
					</Stack>
					<Stack className={"categoryItem"}>
						<Box className={"categoryImage"}>
							<div className={"imageCircle"}>
								<div className={"toyImage"} />
							</div>
						</Box>
						<h3 className={"categoryName"}>Fun Toys</h3>
					</Stack>
					<Stack className={"categoryItem"}>
						<Box className={"categoryImage"}>
							<div className={"imageCircle"}>
								<div className={"healthyImage"} />
							</div>
						</Box>
						<h3 className={"categoryName"}>Healthy</h3>
					</Stack>
					<Stack className={"categoryItem"}>
						<Box className={"categoryImage"}>
							<div className={"imageCircle"}>
								<div className={"collarImage"} />
							</div>
						</Box>
						<h3 className={"categoryName"}>Collars & Leash</h3>
					</Stack>
				</Stack>
				<div className={"divider"} />
			</Stack>
		</Stack>
	);
};

export default CategoriesSection;
