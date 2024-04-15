import {CommentResponseDto} from "./comment-response.dto";

export class ReplyDefaultDto {
    id: number;
    userId: number;
    postId: number;
    content: string;
    isAnonymous: boolean;
    createdAt: Date;
    updatedAt: Date;
}