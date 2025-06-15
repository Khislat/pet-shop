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
import {
	CommentInput,
	CommentsInquiry,
} from "../../types/comment/comment.input";
import { Comment } from "../../types/comment/comment";
import { userVar } from "../../../apollo/store";
import { useReactiveVar } from "@apollo/client";
import { NEXT_PUBLIC_APP_API_URL } from "../../config";

type CommentsProps = {
	comments: Comment[];
	commentTotal: number;
	insertCommentData: CommentInput;
	setInsertCommentData: React.Dispatch<React.SetStateAction<CommentInput>>;
	createCommentHandler: () => void;
	commentInquiry: CommentsInquiry;
	commentPaginationChangeHandler: (event: any, value: number) => void;
};

const Comments = ({
	comments,
	commentTotal,
	insertCommentData,
	setInsertCommentData,
	createCommentHandler,
	commentInquiry,
	commentPaginationChangeHandler,
}: CommentsProps) => {
	const user = useReactiveVar(userVar);
	return (
		<Stack className={"commentWrapper"}>
			<h2 className={"heading"}>Comments</h2>

			{comments.map((comment) => (
				<div key={comment._id} className={"review"}>
					<div className={"avatar"}>
						<img
							src={
								comment.memberData?.memberImage
									? `${NEXT_PUBLIC_APP_API_URL}/${comment.memberData.memberImage}`
									: "/img/profile/defaultUser.svg"
							}
							alt={"member-photo"}
						/>
					</div>
					<div className={"content"}>
						<p className={"date"}>
							{new Date(comment.createdAt).toLocaleDateString()}
						</p>
						<p className={"name"}>
							{comment.memberData?.memberNick ||
								comment.memberData?.memberFullName ||
								"Anonymous"}
						</p>
						<p className={"text"}>{comment.commentContent}</p>
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

				<form
					className={"form"}
					onSubmit={(e) => {
						e.preventDefault();
						createCommentHandler();
					}}>
					{/* Formdagi boshqa inputlar majburiy emas, shunchaki UI uchun. Asl comment input pastda */}

					<div className={"row"}>
						<TextField
							label="Your Comment"
							variant="standard"
							fullWidth
							multiline
							rows={4}
							value={insertCommentData.commentContent}
							onChange={(e) =>
								setInsertCommentData({
									...insertCommentData,
									commentContent: e.target.value,
								})
							}
						/>
					</div>

					<div className={"actions"}>
						<Button variant="contained" className={"submitBtn"} type="submit">
							Send Message
						</Button>
					</div>
				</form>
			</div>
		</Stack>
	);
};

export default Comments;
