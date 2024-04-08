import {Post} from "../entities/post.entity"
import {PostResponseDto} from "./post-response.dto";
export function mapToPostResponseDto(post: Post, tags: string[]): PostResponseDto {
    return {
        id: post.id,
        spaceId: post.space.id,
        userId: post.user.id,
        title: post.title,
        content: post.content,
        isAnonymous: post.isAnonymous,
        tags: tags
    }
}