import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.css";

const Header = () => {
	return (
		<header className={styles.header}>
			<div className={styles.container}>
				<div className={styles.logo}>
					<Image
						src="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-05-17/0193a801-a4c8-4244-86a0-e14a93cba981.png"
						alt="BowBow Logo"
						width={210}
						height={85}
					/>
				</div>

				<nav className={styles.navigation}>
					<ul className={styles.navList}>
						<li className={styles.navItem}>
							<Link href="/">Home</Link>
						</li>
						<li className={styles.navItem}>
							<Link href="/new">New</Link>
						</li>
						<li className={styles.navItem}>
							<Link href="/shop">Shop</Link>
						</li>
						<li className={styles.navItem}>
							<Link href="/about">About</Link>
						</li>
						<li className={styles.navItem}>
							<Link href="/pages">Pages</Link>
						</li>
						<li className={styles.navItem}>
							<Link href="/blog">Blog</Link>
						</li>
						<li className={styles.navItem}>
							<Link href="/contact">Contact</Link>
						</li>
					</ul>
				</nav>

				<div className={styles.headerActions}>
					<div className={styles.languageCurrency}>
						<div className={styles.dropdown}>
							<span>USD</span>
							<div className={styles.arrowDown} />
						</div>
						<div className={styles.dropdown}>
							<span>English</span>
							<div className={styles.arrowDown} />
						</div>
					</div>

					<div className={styles.headerIcons}>
						<div className={styles.iconSearch} />
						<div className={styles.iconUser} />
						<div className={styles.iconWishlist} />
						<div className={styles.iconCart} />
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
