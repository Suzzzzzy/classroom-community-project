import {ChatResponseDto} from "../chat-response.dto";
import {Chat} from "../../entities/chat.entity";
import {ChatDefaultDto} from "../chat-default.dto";

export function mapToChatResponseDto(chat: Chat): ChatDefaultDto {
    return {
        id: chat.id,
        userId: chat.userId,
        postId: chat.postId,
        content: chat.content,
        isAnonymous: chat.isAnonymous,
        createdAt: chat.createdAt,
        updatedAt: chat.updatedAt,
    }
}
