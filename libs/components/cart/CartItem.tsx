// components/cart/CartItem.tsx
import { Box, IconButton, Typography } from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";
import { NEXT_PUBLIC_APP_API_URL } from "../../config";

interface CartItemProps {
	title: string;
	subtitle: string;
	size: string;
	price: number;
	quantity: number;
	image: string[];
	onAdd: () => void;
	onRemove: () => void;
	onDelete: () => void;
}

const CartItem = ({
	title,
	subtitle,
	size,
	price,
	quantity,
	image,
	onAdd,
	onRemove,
	onDelete,
}: CartItemProps) => {
	return (
		<Box className={"cartItem"}>
			<Box className={"imageBox"}>
				{image?.length > 0 && (
					<img
						src={`${NEXT_PUBLIC_APP_API_URL}/${image}`}
						width={100}
						height={100}
						className="productImage"
					/>
				)}
			</Box>
			<Box className={"productInfo"}>
				<Typography className={"subtitle"}>{subtitle}</Typography>
				<Typography className={"title"}>{title}</Typography>
				<Typography className={"desc"}>Size: {size} </Typography>
			</Box>

			<Box className={"quantityBox"}>
				<IconButton onClick={onRemove} disabled={quantity <= 1}>
					<Remove />
				</IconButton>
				<Typography>{quantity}</Typography>
				<IconButton onClick={onAdd}>
					<Add />
				</IconButton>
			</Box>

			<Typography className={"price"}>
				${(price * quantity).toFixed(2)}
			</Typography>
			<IconButton onClick={onDelete}>
				<Delete />
			</IconButton>
		</Box>
	);
};

export default CartItem;
