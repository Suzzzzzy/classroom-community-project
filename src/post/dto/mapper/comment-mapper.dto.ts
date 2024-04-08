import {Comment} from "../../entities/comment.entity";
import {CommentResponseDto} from "../comment-response.dto";

export function mapToCommentResponseDto(comment: Comment): CommentResponseDto {
    return {
        id: comment.id,
        userId: comment.userId,
        chatId: comment.chatId,
        content: comment.content,
        isAnonymous: comment.isAnonymous,
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt,
    }
}
