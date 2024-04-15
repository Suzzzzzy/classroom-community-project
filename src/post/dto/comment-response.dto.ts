export class CommentResponseDto {
    id: number;
    userId: number;
    replyId: number;
    content: string;
    isAnonymous: boolean;
    createdAt: Date;
    updatedAt: Date;
}