import {forwardRef, Module} from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Post} from "./entities/post.entity"
import {SpaceModule} from "../space/space.module";
import {RoleModule} from "../role/role.module";
import {Chat} from "./entities/chat.entity";
import {Comment} from "./entities/comment.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, Chat, Comment]),
    forwardRef(() => RoleModule),
    forwardRef(() => SpaceModule)
  ],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService]
})
export class PostModule {}
