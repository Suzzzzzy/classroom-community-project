import {Post} from "../../entities/post.entity"
import {PostResponseDto} from "../post-response.dto";
import {PostsResponseDto} from "../posts-response.dto";
import {RoleAccessType} from "../../../role/type/role-access-type";
import {Reply} from "../../entities/reply.entity";
import {ReplyResponseDto} from "../reply-response.dto";
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

export function mapToPostResponseDto(post: Post, accessType: RoleAccessType, replies: Reply[]): PostResponseDto {
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

    const repliesDto = replies.map(reply => {
        const replyDto = new ReplyResponseDto();
        replyDto.id = reply.id;
        replyDto.userId = reply.userId;
        replyDto.postId = post.id;
        replyDto.content = reply.content;
        replyDto.isAnonymous = reply.isAnonymous;
        replyDto.createdAt = reply.createdAt;
        replyDto.updatedAt = reply.updatedAt;

        if (accessType === RoleAccessType.MEMBER && reply.isAnonymous == true) {
            replyDto.userId = null;
        } else {
            replyDto.userId = reply.userId;
        }

        const commentsDto = reply.comments.map(comment => {
            const commentDto = new CommentResponseDto();
            commentDto.id = comment.id;
            commentDto.replyId = comment.replyId;
            commentDto.userId = comment.userId;
            commentDto.content = comment.content;
            commentDto.isAnonymous = comment.isAnonymous;
            commentDto.createdAt = comment.createdAt;
            commentDto.updatedAt = comment.updatedAt;

            if (accessType === RoleAccessType.MEMBER && comment.isAnonymous == true) {
                comment.userId = null;
            } else {
                comment.userId = reply.userId;
            }
            return commentDto
        })
        replyDto.comments = commentsDto
        return replyDto
    })
    dto.replies = repliesDto

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