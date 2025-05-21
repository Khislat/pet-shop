import { Stack } from "@mui/material";
import React from "react";

const TeamSection = () => {
	const teamMembers = [
		{
			id: 1,
			name: "Linda Himloton",
			role: "Pets Care Trainer",
			image:
				"https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-05-17/pKU0J9advp.png",
		},
		{
			id: 2,
			name: "Andreya Kishore",
			role: "Pets Care Trainer",
			image:
				"https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-05-17/WHe3fpfPmQ.png",
		},
		{
			id: 3,
			name: "Mariya Joesph",
			role: "Pets Care Trainer",
			image:
				"https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-05-17/YopQS8dJTz.png",
		},
		{
			id: 4,
			name: "Amanda losya",
			role: "Pets Care Trainer",
			image:
				"https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-05-17/xx8Ox8F6dB.png",
		},
	];

	return (
		<Stack className={"teamSection"}>
			<Stack className="background">
				<img
					src="/img/banner/hero-wave.svg"
					alt="wave"
					className={"wave2"}
					style={{ background: "#eff9ff" }}
				/>
				<Stack className={"container"}>
					<Stack className={"sectionHeader"}>
						<h2 className={"sectionTitle"}>Our top Brends</h2>
						<div className={"decorationIcon"} />
					</Stack>

					<Stack className={"teamGrid"}>
						{teamMembers.map((member) => (
							<Stack key={member.id} className={"teamCard"}>
								<div className={"profileImageContainer"}>
									<div className={"profileImage"} />
								</div>
								<h3 className={"memberName"}>{member.name}</h3>
								<p className={"memberRole"}>{member.role}</p>
								<div
									className={"socialLinks"}
									style={{ backgroundImage: `url(${member.image})` }}
								/>
							</Stack>
						))}
					</Stack>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default TeamSection;
