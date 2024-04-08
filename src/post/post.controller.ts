import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import {AuthGuard} from "../user/auth.guard";
import {mapToPostResponseDto} from "./dto/post.mapper";
import {PostResponseDto} from "./dto/post-response.dto";
import {mapToSpaceResponseDto} from "../space/dto/space.mapper";

@Controller('posts')
@UseGuards(AuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('spaces/:spaceId')
  async create(@Req() req: any, @Param('spaceId') spaceId: string, @Body() createPostDto: CreatePostDto): Promise<PostResponseDto>   {
    const user = req.user
    const newPost = await this.postService.create(user, +spaceId, createPostDto);
    return mapToPostResponseDto(newPost, null)
  }

  @Get('/:postId')
  async findOne(@Req() req: any, @Param('postId') postId: string): Promise<PostResponseDto> {
    const user = req.user
    const post =  await this.postService.findOne(user, +postId);
    return mapToPostResponseDto(post, null)
  }

  // @Get('/:postId')
  // async findOne(@Req() req: any, @Param('spaceId') spaceId: string): Promise<PostResponseDto[]> {
  //   const user = req.user
  //   return this.postService.findOne();
  // }

}
