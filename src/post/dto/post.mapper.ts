import {Post} from "../entities/post.entity"
import {PostResponseDto} from "./post-response.dto";
import {PostsResponseDto} from "./posts-response.dto";
import {RoleAccessType} from "../../role/type/role-access-type";

export function mapToPostResponseDto(post: Post): PostResponseDto {
    return {
        id: post.id,
        spaceId: post.spaceId,
        userId: post.userId,
        title: post.title,
        content: post.content,
        isAnonymous: post.isAnonymous,
    }
}

export function mapToPostsResponseDto(posts: Post[], accessType: RoleAccessType): PostsResponseDto[] {
    return posts.map(post => {
        const dto = new PostsResponseDto();
        dto.id = post.id;
        dto.spaceId = post.spaceId;
        dto.title = post.title;
        dto.content = post.content;
        dto.isAnonymous = post.isAnonymous;

        if (accessType === RoleAccessType.MEMBER && post.isAnonymous == true) {
            dto.userId = null;
        } else {
            dto.userId = post.userId;
        }
        return dto
    })
}