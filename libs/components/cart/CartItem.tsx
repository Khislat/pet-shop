import { Box, IconButton, Typography } from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";

interface CartItemProps {
  title: string;
  subtitle: string;
  size: string;
  color: string;
  price: number;
}

const CartItem = ({ title, subtitle, size, color, price }: CartItemProps) => {
  return (
    <Box className={"cartItem"}>
      <Box className={"imageBox"}></Box>
      <Box className={"productInfo"}>
        <Typography className={"subtitle"}>{subtitle}</Typography>
        <Typography className={"title"}>{title}</Typography>
        <Typography className={"desc"}>Size: {size} / Color: {color}</Typography>
      </Box>
      <Box className={"quantityBox"}>
        <IconButton><Remove /></IconButton>
        <Typography>1</Typography>
        <IconButton><Add /></IconButton>
      </Box>
      <Typography className={"price"}>${price.toFixed(2)}</Typography>
      <IconButton><Delete /></IconButton>
    </Box>
  );
};

export default CartItem;
