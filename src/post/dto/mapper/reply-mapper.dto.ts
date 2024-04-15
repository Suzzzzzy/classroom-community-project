import {ReplyResponseDto} from "../reply-response.dto";
import {Reply} from "../../entities/reply.entity";
import {ReplyDefaultDto} from "../reply-default.dto";

export function mapToReplyResponseDto(reply: Reply): ReplyDefaultDto {
    return {
        id: reply.id,
        userId: reply.userId,
        postId: reply.postId,
        content: reply.content,
        isAnonymous: reply.isAnonymous,
        createdAt: reply.createdAt,
        updatedAt: reply.updatedAt,
    }
}
