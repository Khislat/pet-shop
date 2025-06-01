import { Box, Link, Stack, Typography } from "@mui/material";
import Image from "next/image";
import AddBoxIcon from "@mui/icons-material/AddBox";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HistoryIcon from "@mui/icons-material/History";
import GroupIcon from "@mui/icons-material/Group";
import GroupsIcon from "@mui/icons-material/Groups";
import ArticleIcon from "@mui/icons-material/Article";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";

const MyPageTabsSection = () => {
	return (
		<Stack className="tabsWrapper">
			<Stack className="container">
				<div className="sidebar">
					<div className="profile">
						<Image
							src="/avatar.jpg"
							alt="profile"
							width={60}
							height={60}
							className="avatar"
						/>
						<div className="info">
							<Typography variant="subtitle1" fontWeight={600}>
								Arlene McCoy
							</Typography>
							<Typography variant="body2" className="phone">
								📞 010–1234–3421
							</Typography>
							<Typography className="agent">AGENT</Typography>
						</div>
					</div>
				</div>
				<Box className="section">
					<Typography className="section-title">MANAGE LISTINGS</Typography>
					<ul>
						<li>
							<AddBoxIcon /> <Link href="/add-property">Add Property</Link>
						</li>
						<li>
							<HomeWorkIcon /> <Link href="/my-properties">My Properties</Link>
						</li>
						<li className="active">
							<FavoriteIcon /> <Link href="/mypage">My Favorites</Link>
						</li>
						<li>
							<HistoryIcon />{" "}
							<Link href="/recently-visited">Recently Visited</Link>
						</li>
						<li>
							<GroupIcon /> <Link href="/followers">Followers</Link>
						</li>
						<li>
							<GroupsIcon /> <Link href="/followings">Followings</Link>
						</li>
					</ul>
				</Box>

				<Box className="section">
					<Typography className="section-title">Community</Typography>
					<ul>
						<li>
							<ArticleIcon /> <Link href="/articles">Article</Link>
						</li>
						<li>
							<NoteAddIcon /> <Link href="/write-article">Write Article</Link>
						</li>
					</ul>
				</Box>
				<Box className="section">
					<Typography className="section-title">MANAGE ACCOUNT</Typography>
					<ul>
						<li>
							<PersonIcon /> <Link href="/profile">My Profile</Link>
						</li>
						<li>
							<LogoutIcon /> <Link href="/logout">Logout</Link>
						</li>
					</ul>
				</Box>
			</Stack>
		</Stack>
	);
};
export default MyPageTabsSection;
