// components/CategoryDrawer.tsx
import React from "react";
import {
	Box,
	SwipeableDrawer,
	Typography,
	IconButton,
	Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import styles from "./CategoryDrawer.module.scss";

const categories = [
	{ name: "Dogs", image: "/img/homepage/aboutDog.jpg" },
	{ name: "Cats", image: "/img/homepage/cat.webp" },
	{ name: "Birds", image: "/img/homepage/parrot.webp" },
	{ name: "Fun Toys", image: "/img/homepage/toy.jpg" },
	{ name: "Accessories", image: "/img/homepage/catbowl.jpg" },
	{ name: "Collars", image: "/img/homepage/collar.jpg" },
];

type Props = {
	open: boolean;
	toggleDrawer: (open: boolean) => void;
};

const CategoryDrawer = ({ open, toggleDrawer }: Props) => {
	return (
		<SwipeableDrawer anchor="bottom" open={open} onClose={() => toggleDrawer(false)} onOpen={() => toggleDrawer(true)}>
			<Box className={styles.drawerContent}>
				<Stack className={styles.drawerHeader}>
					<Typography variant="h6">Categories</Typography>
					<IconButton onClick={() => toggleDrawer(false)}>
						<CloseIcon />
					</IconButton>
				</Stack>

				{/* Divider image */}
				<div className={styles.divider}></div>

				{/* Swiper */}
				<Swiper spaceBetween={16} slidesPerView={3}>
					{categories.map((cat, index) => (
						<SwiperSlide key={index}>
							<Box className={styles.categoryCard}>
								<img src={cat.image} alt={cat.name} />
								<Typography>{cat.name}</Typography>
							</Box>
						</SwiperSlide>
					))}
				</Swiper>
			</Box>
		</SwipeableDrawer>
	);
};

export default CategoryDrawer;
