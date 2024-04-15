import {
  Body,
  ClassSerializerInterceptor,
  Controller, Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import {PostService} from './post.service';
import {CreatePostDto} from './dto/create-post.dto';
import {AuthGuard} from "../user/auth.guard";
import {mapToDefaultPostResponseDto, mapToPostResponseDto, mapToPostsResponseDto} from "./dto/mapper/post.mapper";
import {PostResponseDto} from "./dto/post-response.dto";
import {CreateReplyDto} from "./dto/create-reply.dto";
import {mapToReplyResponseDto} from "./dto/mapper/reply-mapper.dto";
import {mapToCommentResponseDto} from "./dto/mapper/comment-mapper.dto";
import {CommentResponseDto} from "./dto/comment-response.dto";
import {PostsResponseDto} from "./dto/posts-response.dto";
import {PostDefaultDto} from "./dto/post-default.dto";
import {ReplyDefaultDto} from "./dto/reply-default.dto";

@Controller('posts')
@UseGuards(AuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class PostController {
  constructor(private readonly postService: PostService) {
  }

  @Post('/spaces/:spaceId')
  async createPost(@Req() req: any, @Param('spaceId') spaceId: string, @Body() createPostDto: CreatePostDto): Promise<PostDefaultDto> {
    const user = req.user
    const newPost = await this.postService.createPost(user, +spaceId, createPostDto);
    return mapToDefaultPostResponseDto(newPost)
  }

  @Get('/:postId')
  async findPost(@Req() req: any, @Param('postId') postId: string): Promise<PostResponseDto> {
    const user = req.user
    const  [post, replies, accessType] = await this.postService.findPost(user, +postId);
    return mapToPostResponseDto(post, accessType, replies)
  }

  @Get('/spaces/:spaceId')
  async findAllPosts(@Req() req: any, @Param('spaceId') spaceId: string): Promise<PostsResponseDto[]> {
    const user = req.user
    const [popularPosts, otherPosts, accessType] = await this.postService.findAllPosts(user, +spaceId)
    return mapToPostsResponseDto(popularPosts, otherPosts, accessType)
  }

  @Post('/:postId/replies')
  async createReply(@Req() req: any, @Param('postId') postId: string, @Body() createReplyDto: CreateReplyDto): Promise<ReplyDefaultDto> {
    const user = req.user
    const newReply = await this.postService.createReply(user, +postId, createReplyDto)
    return mapToReplyResponseDto(newReply)
  }

  @Post('/:postId/replies/:replyId')
  async createComment(
      @Req() req: any,
      @Param('postId') postId: string,
      @Param('replyId') replyId: string,
      @Body() createReplyDto: CreateReplyDto
  ): Promise<CommentResponseDto> {
    const user = req.user
    const newComment = await this.postService.createComment(user, +postId, +replyId, createReplyDto)
    return mapToCommentResponseDto(newComment)
  }

  @Delete('/:postId/replies/:replyId')
  async deleteReply(
      @Req() req: any,
      @Param('postId') postId: string,
      @Param('replyId') replyId: string,
  ): Promise<string> {
    const user = req.user
    await this.postService.deleteReply(user, +postId, +replyId)
    return '삭제 완료'
  }

  @Get('/users/user')
  async findAllByUser(@Req() req: any): Promise<any> {
    const user = req.user
    const {myPosts, myReplies, myComments} = await this.postService.findAllByUser(user)
    const posts = myPosts.map(post => mapToDefaultPostResponseDto(post));
    const replies = myReplies.map(reply => mapToReplyResponseDto(reply));
    const comments = myComments.map(comment => mapToCommentResponseDto(comment));
    return {posts, replies, comments};
  }
}
