import Head from "next/head";
import {
	Box,
	Button,
	Checkbox,
	Divider,
	Stack,
	Typography,
} from "@mui/material";
import CartItem from "../../libs/components/cart/CartItem";
import ShippingSummary from "../../libs/components/cart/ShippingSummary";
import withLayoutBasic from "../../libs/components/layout/LayoutBasic";
import HeroSectionBasic from "../../libs/components/cart/HeroSectionBasic";
import { useCart } from "../../libs/context/CartContext";
import { useRouter } from "next/router";

const ShippingPage = () => {
	const router = useRouter();
	const { cartItems, updateQuantity, removeFromCart, clearCart, getCartTotal } =
		useCart();

	const handleQuantityIncrease = (itemId: string, currentQuantity: number) => {
		updateQuantity(itemId, currentQuantity + 1);
	};

	const handleQuantityDecrease = (itemId: string, currentQuantity: number) => {
		updateQuantity(itemId, Math.max(1, currentQuantity - 1));
	};
	const goShopPage = () => {
		router.push("/shop");
	};

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

						{cartItems.length === 0 ? (
							<Box className="emptyCart" sx={{ textAlign: "center", py: 4 , marginTop: '-1px' }}>
								<Typography variant="h6">Your cart is empty</Typography>
								<Typography color="text.secondary">
									Add some products to get started!
								</Typography>
							</Box>
						) : (
							cartItems.map((item) => (
								<Box key={item._id}>
									<CartItem
										title={item.productTitle}
										subtitle={item.productCategory}
										size={item.productWeight || "XL"}
										price={item.productPrice}
										quantity={item.quantity}
										image={item.productImages}
										onAdd={() =>
											handleQuantityIncrease(item._id, item.quantity)
										}
										onRemove={() =>
											handleQuantityDecrease(item._id, item.quantity)
										}
										onDelete={() => removeFromCart(item._id)}
									/>
									<Divider className="cartDevider" />
								</Box>
							))
						)}

						

						{cartItems.length > 0 && (
							<Box className="cartSummary" sx={{ mt: 2, textAlign: "right" }}>
								<Typography variant="h6">
									Total: ${getCartTotal().toFixed(2)}
								</Typography>
							</Box>
						)}

						<Box className={"footerOptions"}>
							<Box className={"giftWrap"}>
								<Checkbox className="giftWrapCheck" />
								<Typography>Gift Wrap Your Purchase For Just $9.99</Typography>
							</Box>
							<Box className={"actionBtns"}>
								<Button variant="contained" className={"returnBtn"} onClick={goShopPage}>
									Return To Store
								</Button>
								<Button
									variant="outlined"
									className={"emptyCart"}
									onClick={clearCart}
									disabled={cartItems.length === 0}>
									Empty Cart
								</Button>
							</Box>
						</Box>
					</Box>

					<Box>
						<Divider className="horizontalDivider" />
					</Box>

					<ShippingSummary />
				</Stack>
			</Stack>
		</>
	);
};

export default withLayoutBasic(ShippingPage);
