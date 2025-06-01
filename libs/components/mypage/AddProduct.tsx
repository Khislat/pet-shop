import React from "react";
import {
	TextField,
	Button,
	MenuItem,
	Typography,
	Box,
	Grid,
	Select,
	FormControl,
	InputLabel,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ImageIcon from "@mui/icons-material/Image";

const AddPropertyForm = () => {
	const [formData, setFormData] = React.useState({
		title: "",
		price: "",
		afterPriceLabel: "",
		location: "",
		address: "",
		barter: "NO",
		status: "NO",
		rooms: "",
		beds: "",
		square: "",
		description: "",
		images: [],
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSelectChange = (e: any) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (files) {
			const imageUrls = Array.from(files).map((file) =>
				URL.createObjectURL(file)
			);
			setFormData((prev) => ({ ...prev, images: [] }));
		}
	};

	return (
		<Box p={3}>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<TextField
						fullWidth
						label="Title"
						name="title"
						value={formData.title}
						onChange={handleChange}
					/>
				</Grid>

				<Grid item xs={6}>
					<TextField
						fullWidth
						label="Price"
						name="price"
						value={formData.price}
						onChange={handleChange}
					/>
				</Grid>
				<Grid item xs={6}>
					<FormControl fullWidth>
						<InputLabel>After Price Label</InputLabel>
						<Select
							name="afterPriceLabel"
							value={formData.afterPriceLabel}
							onChange={handleSelectChange}>
							<MenuItem value="USD">USD</MenuItem>
							<MenuItem value="EURO">EURO</MenuItem>
						</Select>
					</FormControl>
				</Grid>

				<Grid item xs={6}>
					<FormControl fullWidth>
						<InputLabel>Select Location</InputLabel>
						<Select
							name="location"
							value={formData.location}
							onChange={handleSelectChange}>
							<MenuItem value="Seoul">Seoul</MenuItem>
							<MenuItem value="Busan">Busan</MenuItem>
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={6}>
					<TextField
						fullWidth
						label="Property Address"
						name="address"
						value={formData.address}
						onChange={handleChange}
					/>
				</Grid>

				<Grid item xs={6}>
					<FormControl fullWidth>
						<InputLabel>Barter</InputLabel>
						<Select
							name="barter"
							value={formData.barter}
							onChange={handleSelectChange}>
							<MenuItem value="NO">NO</MenuItem>
							<MenuItem value="YES">YES</MenuItem>
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={6}>
					<FormControl fullWidth>
						<InputLabel>Property Status</InputLabel>
						<Select
							name="status"
							value={formData.status}
							onChange={handleSelectChange}>
							<MenuItem value="NO">NO</MenuItem>
							<MenuItem value="Available">Available</MenuItem>
						</Select>
					</FormControl>
				</Grid>

				<Grid item xs={4}>
					<FormControl fullWidth>
						<InputLabel>Rooms</InputLabel>
						<Select
							name="rooms"
							value={formData.rooms}
							onChange={handleSelectChange}>
							{[1, 2, 3, 4, 5].map((n) => (
								<MenuItem key={n} value={n}>
									{n}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={4}>
					<FormControl fullWidth>
						<InputLabel>Beds</InputLabel>
						<Select
							name="beds"
							value={formData.beds}
							onChange={handleSelectChange}>
							{[1, 2, 3, 4, 5].map((n) => (
								<MenuItem key={n} value={n}>
									{n}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={4}>
					<FormControl fullWidth>
						<InputLabel>Square</InputLabel>
						<Select
							name="square"
							value={formData.square}
							onChange={handleSelectChange}>
							{["500 m2", "1000 m2", "1500 m2"].map((n) => (
								<MenuItem key={n} value={n}>
									{n}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>

				<Grid item xs={12}>
					<TextField
						fullWidth
						label="Description"
						name="description"
						multiline
						rows={4}
						value={formData.description}
						onChange={handleChange}
					/>
				</Grid>

				<Grid item xs={12}>
					<Box
						p={3}
						border="2px dashed #f44336"
						display="flex"
						flexDirection="column"
						alignItems="center"
						justifyContent="center">
						<ImageIcon sx={{ fontSize: 60, color: "#ccc" }} />
						<Typography variant="body2" mb={1}>
							Drag and drop images here
						</Typography>
						<Typography variant="caption" mb={2}>
							Photos must be JPEG or PNG format and at least 2048x768
						</Typography>
						<Button
							variant="outlined"
							component="label"
							startIcon={<CloudUploadIcon />}>
							Browse Files
							<input
								hidden
								accept="image/*"
								multiple
								type="file"
								onChange={handleImageUpload}
							/>
						</Button>
					</Box>
				</Grid>

				<Grid item xs={12}>
					<Box display="flex" gap={2} mt={2}>
						{formData.images.map((img, idx) => (
							<Box
								key={idx}
								component="img"
								src={img}
								width={100}
								height={100}
								borderRadius={2}
							/>
						))}
					</Box>
				</Grid>

				<Grid item xs={12} display="flex" justifyContent="flex-end">
					<Button variant="contained" sx={{ mt: 3 }}>
						Next Step
					</Button>
				</Grid>
			</Grid>
		</Box>
	);
};

export default AddPropertyForm;
