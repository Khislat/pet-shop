import React from "react";

const BlogSection = () => {
	const blogPosts = [
		{
			id: 1,
			title: "The perfect range for pet products products",
			date: "Jan 12. 2023",
			excerpt: "Proin venenatis fermentum sem porttitor dictum. Maecenas",
			image:
				"https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-05-17/fBJasjrvUM.png",
		},
		{
			id: 2,
			title: "Domesticated pets are complex creatures",
			date: "Jan 18. 2023",
			excerpt: "Duis arcu ligula, volutpat id leo vitae, tempor cursus dolor.",
			image:
				"https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-05-17/BLkwtdQ8aJ.png",
		},
		{
			id: 3,
			title: "A cat can jump as much as seven times",
			date: "Feb 08. 2023",
			excerpt: "Aliquam aliquet lorem a ligula porta, eu egestas massa",
			image:
				"https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-05-17/YDvcuP4jDA.png",
		},
	];

	return (
		<section className={"blogSection"}>
			<div className={"container"}>
				<div className={"sectionHeader"}>
					<h2 className={"sectionTitle"}>Latest News & Blog</h2>
					<div className={"decorationIcon"} />
				</div>

				<p className={"sectionDescription"}>
					Finibus arcu condimentum non. Nullam non iaculis quam. Aliquam ac
					ultricies tellus, ac dapibus neque. Vivamus tellus magna.
				</p>

				<div className={"blogGrid"}>
					{blogPosts.map((post) => (
						<div key={post.id} className={"blogCard"}>
							<div
								className={"blogImage"}
								style={{ backgroundImage: `url(${post.image})` }}>
								<div className={"dateTag"}>
									<span>{post.date}</span>
								</div>
							</div>

							<div className={"blogContent"}>
								<h3 className={"blogTitle"}>{post.title}</h3>
								<p className={"blogExcerpt"}>{post.excerpt}</p>

								<div className={"blogFooter"}>
									<div className={"readMore"}>
										<span
											className={
												post.id === 1 ? "readMoreActive" : "readMoreText"
											}>
											READ MORE
										</span>
										<div
											className={
												post.id === 1 ? "readMoreLineActive" : "readMoreLine"
											}
										/>
									</div>

									<div className={"reviewsContainer"}>
										<div className={"reviewAvatars"}>
											<div className={"reviewAvatar1"} />
											<div className={"reviewAvatar2"} />
											<div className={"reviewAvatar3"} />
										</div>

										<span className={"reviewCount"}>+4 Review</span>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default BlogSection;
