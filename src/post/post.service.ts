import {
    ForbiddenException,
    forwardRef,
    Inject,
    Injectable, InternalServerErrorException,
    NotFoundException
} from '@nestjs/common';
import {CreatePostDto} from './dto/create-post.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {DataSource, Repository} from "typeorm";
import {Post} from "./entities/post.entity";
import {RoleService} from "../role/role.service";
import {SpaceService} from "../space/space.service";
import {User} from "../user/entity/user.entity";
import {RoleAccessType} from "../role/type/role-access-type";
import {PostType} from "./type/post-type";
import {Chat} from "./entities/chat.entity";
import {Comment} from "./entities/comment.entity";
import {CreateChatDto} from "./dto/create-chat.dto";
import {CreateCommentDto} from "./dto/create-comment.dto";

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Post)
        private postRepository: Repository<Post>,
        @Inject(forwardRef(() => RoleService))
        private roleService: RoleService,
        @Inject(forwardRef(() => SpaceService))
        private spaceService: SpaceService,
        @InjectRepository(Chat)
        private chatRepository: Repository<Chat>,
        @InjectRepository(Comment)
        private commentRepository: Repository<Comment>,
        private readonly dataSource: DataSource,
    ) {

    }
  async createPost(user: User, spaceId: number, createPostDto: CreatePostDto): Promise<Post> {
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

    async findPost(user: User, postId: number): Promise<Post> {
        const post = await this.getOnePost(postId)
        // 권한 확인
        const userRole = await this.roleService.findRoleAssignment(post.spaceId, user.id);
        if (!userRole) {
            throw new ForbiddenException('공간에 참여 중인 사용자가 아닙니다.')
        }
        if (post.isAnonymous == true && userRole.role.accessType == RoleAccessType.MEMBER) {
            throw new NotFoundException()
        } else {
            return post
        }
    }

    async getOnePost(postId: number): Promise<Post> {
        const post = await this.postRepository.findOne({
            where: {id: postId},
        });
        if (!post) {
            throw new NotFoundException()
        }
        return post
    }

    async findAllPosts(user: User, spaceId: number): Promise<[Post[], RoleAccessType]> {
        // 권한 확인
        const userRole = await this.roleService.findRoleAssignment(spaceId, user.id);
        if (!userRole) {
            throw new ForbiddenException('공간에 참여 중인 사용자가 아닙니다.')
        }
        // post 리스트 조회
        const posts = await this.postRepository.find({where: {space: {id: spaceId}}});
        return [posts, userRole.role.accessType]
    }

    async createChat(user: User, postId: number, createChatDto: CreateChatDto): Promise<Chat> {
        // post 확인
        const post = await this.findPost(user, postId)
        // chat 작성
        return await this.chatRepository.save({
            user: user,
            post: post,
            content: createChatDto.content,
            isAnonymous: createChatDto.isAnonymous,
        })
    }

    async createComment(user: User, postId: number, chatId: number, createCommentDto: CreateCommentDto): Promise<Comment> {
        // post 확인
        const post = await this.findPost(user, postId);
        // chat 확인
        const chat = await this.chatRepository.findOne({where: {id: chatId}});
        if (!chat) {
            throw new NotFoundException()
        }
        // comment 작성
        return await this.commentRepository.save({
            chat: chat,
            user: user,
            content: createCommentDto.content,
            isAnonymous: createCommentDto.isAnonymous,
        })
    }

    async deleteChat(user: User, postId: number, chatId: number) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            // post 확인
            const post = await this.getOnePost(postId);
            // chat 확인
            const chat = await this.chatRepository.createQueryBuilder('chat')
                .leftJoinAndSelect('chat.comments', 'comments')
                .where('chat.id = :chatId', {chatId})
                .getOne();
            if (!chat) {
                throw new NotFoundException()
            }
            // 권한 확인
            const role = await this.roleService.findRoleAssignment(post.spaceId, user.id);
            if (!role) {
                throw new ForbiddenException('공간에 참여 중인 사용자가 아닙니다.')
            }
            if (user.id === chat.userId || role.role.accessType === RoleAccessType.ADMIN) {
                await this.commentRepository.softRemove(chat.comments)
                await this.chatRepository.softRemove(chat)
            } else {
                throw new ForbiddenException('삭제할 권한이 없습니다.')
            }
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }

}
