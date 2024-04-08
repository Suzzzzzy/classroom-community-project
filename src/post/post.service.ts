import {BadRequestException, ForbiddenException, forwardRef, Inject, Injectable} from '@nestjs/common';
import {CreatePostDto} from './dto/create-post.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {DataSource, Repository} from "typeorm";
import {Post} from "./entities/post.entity";
import {RoleService} from "../role/role.service";
import {SpaceService} from "../space/space.service";
import {User} from "../user/entity/user.entity";
import {RoleAccessType} from "../role/type/role-access-type";
import {PostType} from "./type/post-type";

@Injectable()
export class PostService {
  constructor(
      @InjectRepository(Post)
      private postRepository: Repository<Post>,
      @Inject(forwardRef(() =>RoleService))
      private roleService: RoleService,
      @Inject(forwardRef(() =>SpaceService))
      private spaceService: SpaceService,
      private readonly dataSource: DataSource,
  ) {
  }
  async create(user: User, spaceId: number, createPostDto: CreatePostDto) {
      // 공간 정보 확인
      const space = await this.spaceService.findOne(spaceId)
      // 권한 확인
      const userRole = await this.roleService.findRoleAssignment(spaceId, user.id);
      if (!userRole) {
          throw new ForbiddenException('공간에 참여 중인 사용자가 아닙니다.')
      }
      if (userRole.role.accessType == RoleAccessType.MEMBER && createPostDto.postType == PostType.NOTICE) {
          throw  new ForbiddenException('공지를 작성할 수 없습니다.')
      }
      if (userRole.role.accessType == RoleAccessType.ADMIN && createPostDto.isAnonymous == true) {
          throw new ForbiddenException('익명으로 작성할 수 없습니다.')
      }
      // post 작성
      return this.postRepository.save({
          user: user,
          space: space,
          postType: createPostDto.postType,
          title: createPostDto.title,
          content: createPostDto.content,
          isAnonymous: createPostDto.isAnonymous,
      });
  }

  findAll() {
    return `This action returns all post`;
  }

}
