export class PostsResponseDto {
    id: number;
    userId: number;
    spaceId: number;
    title: string;
    content: string;
    isAnonymous: boolean;
    createdAt: Date;
    updatedAt: Date;
    tags: string[];
}