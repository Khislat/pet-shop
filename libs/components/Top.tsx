"use client";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export default function Top() {
	return (
		<AppBar position="static" className={"header"}>
			<Toolbar className={"toolbar"}>
				<Link href="/">
					<Image src="/logo.svg" alt="Bowow Logo" width={120} height={40} />
				</Link>
				<Box className={"nav"}>
					<Link href="/products">Products</Link>
					<Link href="/categories">Categories</Link>
					<Link href="/about">About</Link>
					<Link href="/contact">Contact</Link>
				</Box>
				<Box className={"actions"}>
					<Button variant="text">Login</Button>
					<Button variant="contained" color="primary">
						Sign Up
					</Button>
				</Box>
			</Toolbar>
		</AppBar>
	);
}
