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

@Controller('posts')
@UseGuards(AuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('spaces/:spaceId')
  async create(@Req() req: any, @Param('spaceId') spaceId: string, @Body() createPostDto: CreatePostDto) {
    const user = req.user
    return await this.postService.create(user, +spaceId, createPostDto);
  }

  @Get()
  findAll() {
    return this.postService.findAll();
  }


}
