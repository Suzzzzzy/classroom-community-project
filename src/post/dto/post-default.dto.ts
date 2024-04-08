import {ChatResponseDto} from "./chat-response.dto";

export class PostDefaultDto {
    id: number;
    userId: number;
    spaceId: number;
    title: string;
    content: string;
    isAnonymous: boolean;
    createdAt: Date;
    updatedAt: Date;
}