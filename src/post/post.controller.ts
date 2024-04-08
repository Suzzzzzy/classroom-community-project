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
import {mapToCreatePostResponseDto, mapToPostResponseDto, mapToPostsResponseDto} from "./dto/mapper/post.mapper";
import {PostResponseDto} from "./dto/post-response.dto";
import {CreateChatDto} from "./dto/create-chat.dto";
import {Chat} from "./entities/chat.entity";
import {mapToChatResponseDto} from "./dto/mapper/chat-mapper.dto";
import {ChatResponseDto} from "./dto/chat-response.dto";
import {mapToCommentResponseDto} from "./dto/mapper/comment-mapper.dto";
import {CommentResponseDto} from "./dto/comment-response.dto";
import {PostsResponseDto} from "./dto/posts-response.dto";

@Controller('posts')
@UseGuards(AuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class PostController {
  constructor(private readonly postService: PostService) {
  }

  @Post('spaces/:spaceId')
  async createPost(@Req() req: any, @Param('spaceId') spaceId: string, @Body() createPostDto: CreatePostDto): Promise<PostResponseDto> {
    const user = req.user
    const newPost = await this.postService.createPost(user, +spaceId, createPostDto);
    return mapToCreatePostResponseDto(newPost)
  }

  @Get('/:postId')
  async findPost(@Req() req: any, @Param('postId') postId: string): Promise<PostResponseDto> {
    const user = req.user
    const  [post, chats, accessType] = await this.postService.findPost(user, +postId);
    return mapToPostResponseDto(post, accessType, chats)
  }

  @Get('/spaces/:spaceId')
  async findAllPosts(@Req() req: any, @Param('spaceId') spaceId: string): Promise<PostsResponseDto[]> {
    const user = req.user
    const [posts, accessType] = await this.postService.findAllPosts(user, +spaceId)
    return mapToPostsResponseDto(posts, accessType)
  }

  @Post('/:postId/chats')
  async createChat(@Req() req: any, @Param('postId') postId: string, @Body() createChatDto: CreateChatDto): Promise<ChatResponseDto> {
    const user = req.user
    const newChat = await this.postService.createChat(user, +postId, createChatDto)
    return mapToChatResponseDto(newChat)
  }

  @Post('/:postId/chats/:chatId')
  async createComment(
      @Req() req: any,
      @Param('postId') postId: string,
      @Param('chatId') chatId: string,
      @Body() createChatDto: CreateChatDto
  ): Promise<CommentResponseDto> {
    const user = req.user
    const newComment = await this.postService.createComment(user, +postId, +chatId, createChatDto)
    return mapToCommentResponseDto(newComment)
  }

  @Delete('/:postId/chats/:chatId')
  async deleteChat(
      @Req() req: any,
      @Param('postId') postId: string,
      @Param('chatId') chatId: string,
  ): Promise<string> {
    const user = req.user
    await this.postService.deleteChat(user, +postId, +chatId)
    return '삭제 완료'
  }
}
