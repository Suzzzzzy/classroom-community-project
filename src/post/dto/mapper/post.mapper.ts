import {Post} from "../../entities/post.entity"
import {PostResponseDto} from "../post-response.dto";
import {PostsResponseDto} from "../posts-response.dto";
import {RoleAccessType} from "../../../role/type/role-access-type";
import {Chat} from "../../entities/chat.entity";
import {ChatResponseDto} from "../chat-response.dto";
import {CommentResponseDto} from "../comment-response.dto";
import {PostDefaultDto} from "../post-default.dto";

export function mapToDefaultPostResponseDto(post: Post): PostDefaultDto {
    return {
        id : post.id,
        spaceId : post.spaceId,
        userId: post.userId,
        title : post.title,
        content : post.content,
        isAnonymous : post.isAnonymous,
        createdAt : post.createdAt,
        updatedAt : post.updatedAt,
    }
}

export function mapToPostResponseDto(post: Post, accessType: RoleAccessType, chats: Chat[]): PostResponseDto {
    const dto = new PostResponseDto();
    dto.id = post.id;
    dto.spaceId = post.spaceId;
    dto.title = post.title;
    dto.content = post.content;
    dto.isAnonymous = post.isAnonymous;
    dto.createdAt = post.createdAt;
    dto.updatedAt = post.updatedAt;

    if (accessType === RoleAccessType.MEMBER && post.isAnonymous == true) {
        dto.userId = null;
    } else {
        dto.userId = post.userId;
    }

    const chatsDto = chats.map(chat => {
        const chatDto = new ChatResponseDto();
        chatDto.id = chat.id;
        chatDto.userId = chat.userId;
        chatDto.postId = post.id;
        chatDto.content = chat.content;
        chatDto.isAnonymous = chat.isAnonymous;
        chatDto.createdAt = chat.createdAt;
        chatDto.updatedAt = chat.updatedAt;

        if (accessType === RoleAccessType.MEMBER && chat.isAnonymous == true) {
            chatDto.userId = null;
        } else {
            chatDto.userId = chat.userId;
        }

        const commentsDto = chat.comments.map(comment => {
            const commentDto = new CommentResponseDto();
            commentDto.id = comment.id;
            commentDto.chatId = comment.chatId;
            commentDto.userId = comment.userId;
            commentDto.content = comment.content;
            commentDto.isAnonymous = comment.isAnonymous;
            commentDto.createdAt = comment.createdAt;
            commentDto.updatedAt = comment.updatedAt;

            if (accessType === RoleAccessType.MEMBER && comment.isAnonymous == true) {
                comment.userId = null;
            } else {
                comment.userId = chat.userId;
            }
            return commentDto
        })
        chatDto.comments = commentsDto
        return chatDto
    })
    dto.chats = chatsDto

    return dto
}

export function mapToPostsResponseDto(popularPosts: Post[], otherPosts: Post[], accessType: RoleAccessType): PostsResponseDto[] {
    const popularPostsDto = popularPosts.map(post => {
        const dto = new PostsResponseDto();
        dto.id = post.id;
        dto.spaceId = post.spaceId;
        dto.title = post.title;
        dto.content = post.content;
        dto.isAnonymous = post.isAnonymous;
        dto.createdAt = post.createdAt;
        dto.updatedAt = post.updatedAt;
        dto.tags = ['인기'];

        if (accessType === RoleAccessType.MEMBER && post.isAnonymous == true) {
            dto.userId = null;
        } else {
            dto.userId = post.userId;
        }
        return dto;
    });

    const otherPostsDto = otherPosts.map(post => {
        const dto = new PostsResponseDto();
        dto.id = post.id;
        dto.spaceId = post.spaceId;
        dto.title = post.title;
        dto.content = post.content;
        dto.isAnonymous = post.isAnonymous;
        dto.createdAt = post.createdAt;
        dto.updatedAt = post.updatedAt;

        if (accessType === RoleAccessType.MEMBER && post.isAnonymous == true) {
            dto.userId = null;
        } else {
            dto.userId = post.userId;
        }
        return dto
    })
    return [...popularPostsDto, ...otherPostsDto]

}