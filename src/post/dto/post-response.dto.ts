import {Chat} from "../entities/chat.entity";
import {ChatResponseDto} from "./chat-response.dto";

export class PostResponseDto {
    id: number;
    userId: number;
    spaceId: number;
    title: string;
    content: string;
    isAnonymous: boolean;
    createdAt: Date;
    updatedAt: Date;
    chats: ChatResponseDto[];
}