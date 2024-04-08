import {ChatResponseDto} from "../chat-response.dto";
import {Chat} from "../../entities/chat.entity";

export function mapToChatResponseDto(chat: Chat): ChatResponseDto {
    return {
        id: chat.id,
        userId: chat.userId,
        postId: chat.postId,
        content: chat.content,
        isAnonymous: chat.isAnonymous,
        createdAt: chat.createdAt,
        updatedAt: chat.updatedAt,
        comments: null
    }
}
