import { Member } from "./member/member";

export interface MessagePayload {
	event: string;
	text: string;
	memberData: Member;
}