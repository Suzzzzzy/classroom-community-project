export class CommentResponseDto {
    id: number;
    userId: number;
    chatId: number;
    content: string;
    isAnonymous: boolean;
    createdAt: Date;
    updatedAt: Date;
}