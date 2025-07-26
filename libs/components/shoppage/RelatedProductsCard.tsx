import { Star } from "@mui/icons-material";
import { Stack } from "@mui/material";

const RelatedProductsCard = () => {
	return (
		<Stack className={"card"}>
			<div className={"discount"}> "10% Off"</div>
			<div className={"imagePlaceholder"}></div>
			<div className={"addToCartBtn"}>ADD TO CART</div>
			<div className={"stars"}>
				{[...Array(5)].map((_, i) => (
					<Star key={i} fontSize="small" />
				))}
			</div>
			<div className={"name"}>"Butterscotch Pet Food"</div>
			<div className={"priceRow"}>
				<span className={"current"}>$15</span>
				<span className={"old"}>$25</span>
			</div>
		</Stack>
	);
};

export default RelatedProductsCard;
