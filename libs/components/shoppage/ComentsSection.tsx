// components/ProductTabs/ClientReviews.tsx
import {
	Box,
	Button,
	Checkbox,
	Divider,
	FormControlLabel,
	Stack,
	TextField,
} from "@mui/material";
import React from "react";

const reviews = [
	{
		id: 1,
		name: "Joel Barbara",
		date: "March 2024",
		text: `Aenean auctor cursus tincidunt. Maecenas congue velit turpis, ut lacinia tellus hendrerit eget. Sed fringilla sapien sed quam blandit, eu pellentesque risus maximus.`,
	},
	{
		id: 2,
		name: "Kimberly Leo",
		date: "March 2024",
		text: `Vestibulum tincidunt maximus ipsum eu bibendum. Suspendisse urna erat, tincidunt nec dui faucibus, congue condimentum nulla.`,
	},
	{
		id: 3,
		name: "Amanda Melissa",
		date: "March 2024",
		text: `Suspendisse sollicitudin, lorem ac placerat finibus, quam sem pellentesque leo, at hendrerit neque arcu in metus. Fusce non commodo mauris.`,
	},
];

const Comments = () => {
	return (
		<Stack className={"commentWrapper"}>
			{" "}
			<h2 className={"heading"}>Comments</h2>
			{reviews.map((review) => (
				<div key={review.id} className={"review"}>
					<div className={"avatar"} />
					<div className={"content"}>
						<p className={"date"}>{review.date}</p>
						<p className={"name"}>{review.name}</p>
						<p className={"text"}>{review.text}</p>
						<p className={"reply"}>REPLY</p>
						<Divider className="comentDivider" />
					</div>
				</div>
			))}
			<Divider className="longDivider" />
			<div className={"comentBox"}>
				<h2 className={"title"}>Leave A Reply</h2>
				<p className={"note"}>
					Your email address will not be published. Required fields are marked *
				</p>

				<form className={"form"}>
					<div className={"row"}>
						<TextField
							label="Enter Your Name"
							variant="standard"
							fullWidth
							sx={{
								"& .MuiInputLabel-root": {
									marginBottom: "8px",
								},
								"& .MuiInputBase-root": {
									paddingTop: "8px", //
								},
							}}
						/>
						<TextField
							label="Your Email Id"
							variant="standard"
							fullWidth
							sx={{
								"& .MuiInputLabel-root": {
									marginBottom: "8px",
								},
								"& .MuiInputBase-root": {
									paddingTop: "8px", //
								},
							}}
						/>
					</div>

					<div className={"row"}>
						<TextField
							label="Pet"
							variant="standard"
							fullWidth
							sx={{
								"& .MuiInputLabel-root": {
									marginBottom: "8px",
								},
								"& .MuiInputBase-root": {
									paddingTop: "8px", //
								},
							}}
						/>
						<TextField
							label="Service"
							variant="standard"
							fullWidth
							sx={{
								"& .MuiInputLabel-root": {
									marginBottom: "8px",
								},
								"& .MuiInputBase-root": {
									paddingTop: "8px", //
								},
							}}
						/>
					</div>

					<TextField
						label="Message Here"
						multiline
						rows={5}
						variant="standard"
						fullWidth
						className={"messageBox"}
					/>

					<div className={"actions"}>
						<Button variant="contained" className={"submitBtn"}>
							Send Message
						</Button>

						<FormControlLabel
							control={<Checkbox />}
							label="Save my name, email, and website in this browser for the next time I comment."
						/>
					</div>
				</form>
			</div>
		</Stack>
	);
};

export default Comments;
