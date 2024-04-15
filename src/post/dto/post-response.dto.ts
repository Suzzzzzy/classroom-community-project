import {Reply} from "../entities/reply.entity";
import {ReplyResponseDto} from "./reply-response.dto";

export class PostResponseDto {
    id: number;
    userId: number;
    spaceId: number;
    title: string;
    content: string;
    isAnonymous: boolean;
    createdAt: Date;
    updatedAt: Date;
    replies: ReplyResponseDto[];
}