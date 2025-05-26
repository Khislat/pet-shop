import Head from "next/head";
import {
	Box,
	Button,
	Checkbox,
	Divider,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import CartItem from "../../libs/components/cart/CartItem";
import ShippingSummary from "../../libs/components/cart/ShippingSummary";
import withLayoutBasic from "../../libs/components/layout/LayoutBasic";
import HeroSectionBasic from "../../libs/components/cart/HeroSectionBasic";

const ShippingPage = () => {
	return (
		<>
			<Stack className={"shippingPage"}>
				<HeroSectionBasic />

				<Stack className={"container"}>
					<Box className={"cartSection"}>
						<Typography className={"pageTitle"}>SHIPPING & RETURNS</Typography>
						<Box className={"cartHeader"}>
							<Typography className="cartHeaderType">Product</Typography>
							<Typography className="cartHeaderType">Quantity</Typography>
							<Typography className="cartHeaderType">Total</Typography>
						</Box>
						<Divider className="cartDevider" />
						<CartItem
							title="Adult Dog Food Chicken"
							subtitle="Pet Food"
							size="XL"
							color="Grey"
							price={39.99}
						/>
						<Divider className="cartDevider" />
						<CartItem
							title="Fekrix Dumbbell Blue Dog Toy"
							subtitle="Pet Toys"
							size="XL"
							color="Grey"
							price={39.99}
						/>
						<Divider className="cartDevider" />
						<CartItem
							title="Cookies Treat Biscuits Dogs"
							subtitle="Pet Foods"
							size="XL"
							color="Grey"
							price={39.99}
						/>
						<Divider className="cartDevider" />
						<Box className={"footerOptions"}>
							<Box className={"giftWrap"}>
								<Checkbox className="giftWrapCheck" />
								<Typography>Gift Wrap Your Purchase For Just $9.99</Typography>
							</Box>
							<Box className={"actionBtns"}>
							
								<Button variant="contained" className={"returnBtn"}>
									Return To Store
								</Button>
                <Button variant="outlined" className={"emptyCart"}>
									Empty Cart
								</Button>
							</Box>
						</Box>
					</Box>
					<Box>
						{" "}
						<Divider className="horizontalDivider" />
					</Box>

					<ShippingSummary />
				</Stack>
			</Stack>
		</>
	);
};

export default withLayoutBasic(ShippingPage);
