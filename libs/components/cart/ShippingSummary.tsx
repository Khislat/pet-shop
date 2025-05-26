import {
	Box,
	Button,
	Checkbox,
	Divider,
	TextField,
	Typography,
} from "@mui/material";

const ShippingSummary = () => {
	return (
		<Box className={"summary"}>
			<Typography className={"estimateTitle"}>SHIPPING ESTIMATES</Typography>
			<h3 className="textFieldName">Country/Region :</h3>
			<TextField
				fullWidth
				size="small"
				variant="outlined"
				className={"textFieldCustom"}
			/>
			<h3 className="textFieldName">State</h3>
			<TextField
				fullWidth
				size="small"
				variant="outlined"
				className={"textFieldCustom"}
			/>
			<h3 className="textFieldName">Postal/ZIP Code :</h3>
			<TextField
				fullWidth
				size="small"
				variant="outlined"
				className={"textFieldCustom"}
			/>
			<Button fullWidth variant="contained" className={"calculateBtn"}>
				Calculate Shipping
			</Button>
			<Box className={"summaryInfo"}>
				<div className="subtotal">
					<Typography>
						Subtotal:
					</Typography>
          <strong>$39.99</strong>
				</div>

				<Typography className={"taxNote"}>
					Taxes Calculated At Checkout
				</Typography>
        
				<Button variant="contained" className={"checkoutBtn"}>
					Proceed To Checkout
				</Button>
			</Box>
		</Box>
	);
};

export default ShippingSummary;
