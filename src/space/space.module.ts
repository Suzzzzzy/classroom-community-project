import {forwardRef, Module} from '@nestjs/common';
import { SpaceService } from './space.service';
import { SpaceController } from './space.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Role} from "../role/entities/role.entity";
import {Space} from "./entities/space.entity";
import {RoleAssignment} from "../role/entities/role-assignment";
import {AccessCode} from "./entities/accesscode.entity";
import {RoleModule} from "../role/role.module";
import {Post} from "../post/entities/post.entity"
import {Reply} from "../post/entities/reply.entity"
import {Comment} from "../post/entities/comment.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Space, Role, RoleAssignment, AccessCode, Post, Reply, Comment]),
    forwardRef(() =>RoleModule),
  ],
  controllers: [SpaceController],
  providers: [SpaceService],
  exports: [SpaceService]
})
export class SpaceModule {}
