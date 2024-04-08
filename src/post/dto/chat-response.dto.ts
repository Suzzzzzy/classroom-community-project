export class ChatResponseDto {
    id: number;
    userId: number;
    postId: number;
    content: string;
    isAnonymous: boolean;
    createdAt: Date;
    updatedAt: Date;
}