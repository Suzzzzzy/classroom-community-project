export class PostsResponseDto {
    id: number;
    userId: number;
    spaceId: number;
    title: string;
    content: string;
    isAnonymous: boolean;
    tags: string[];
}