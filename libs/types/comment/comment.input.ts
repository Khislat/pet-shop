import { CommentGroup } from "../../enums/comment.enum";
import { Direction } from "../../enums/common.enum";

export interface CommentInput {
	commentGroup: CommentGroup;
	commentContent: string;
	commentRefId: string;
	memberId?: string;
	writerName?: string;
	writerEmail?: string;
	pet?: string;
	service?: string;
}

interface CISearch {
	commentRefId: string;
}

export interface CommentsInquiry {
	page: number;
	limit: number;
	sort?: string;
	direction?: Direction;
	search: CISearch;
}
export interface User {
	_id: string;
	memberNick?: string;
}
