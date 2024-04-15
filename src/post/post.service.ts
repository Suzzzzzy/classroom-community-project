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
import {Reply} from "./entities/reply.entity";
import {Comment} from "./entities/comment.entity";
import {CreateReplyDto} from "./dto/create-reply.dto";
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
        @InjectRepository(Reply)
        private replyRepository: Repository<Reply>,
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

    async findPost(user: User, postId: number): Promise<[Post, Reply[], RoleAccessType]> {
        const post = await this.getOnePost(postId)
        // 권한 확인
        const userRole = await this.roleService.findRoleAssignment(post.spaceId, user.id);
        if (!userRole) {
            throw new ForbiddenException('공간에 참여 중인 사용자가 아닙니다.')
        }
        if (post.isAnonymous == true && userRole.role.accessType == RoleAccessType.MEMBER) {
            throw new NotFoundException()
        } else {
            const replyAndComments = await this.replyRepository.find({
                where: {postId},
                relations: ['comments']
            })
            return [post, replyAndComments, userRole.role.accessType]
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

    async findAllPosts(user: User, spaceId: number): Promise<[Post[], Post[], RoleAccessType]> {
        // 권한 확인
        const userRole = await this.roleService.findRoleAssignment(spaceId, user.id);
        if (!userRole) {
            throw new ForbiddenException('공간에 참여 중인 사용자가 아닙니다.')
        }
        // post 리스트 조회
        // 인기게시물 조회
        const popularPosts = await this.postRepository.createQueryBuilder("post")
            .where("post.spaceId = :spaceId", {spaceId})
            .andWhere('post.replyAndCommentCount > 0')
            .orderBy("post.replyAndCommentCount", "DESC")
            .limit(5)
            .getMany();

        const posts = await this.postRepository.find({where: {space: {id: spaceId}}});
        const otherPosts  = posts.filter(post => !popularPosts.some(popularPost => popularPost.id === post.id));

        return [popularPosts, otherPosts, userRole.role.accessType]
    }

    async createReply(user: User, postId: number, createReplyDto: CreateReplyDto): Promise<Reply> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
        // post 확인
        const post = await this.findPost(user, postId)
        // reply 작성
            post[0].replyAndCommentCount = +1;
            await this.postRepository.save(post[0]);
            return await this.replyRepository.save({
                user: user,
                postId: postId,
                content: createReplyDto.content,
                isAnonymous: createReplyDto.isAnonymous,
            });
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }

    async createComment(user: User, postId: number, replyId: number, createCommentDto: CreateCommentDto): Promise<Comment> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
        // post 확인
        const post = await this.findPost(user, postId);
        // reply 확인
        const reply = await this.replyRepository.findOne({where: {id: replyId}});
        if (!reply) {
            throw new NotFoundException()
        }
        // comment 작성
            post[0].replyAndCommentCount = +1;
            await this.postRepository.save(post[0]);
            return await this.commentRepository.save({
                reply: reply,
                user: user,
                content: createCommentDto.content,
                isAnonymous: createCommentDto.isAnonymous,
            });
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }

    async deleteReply(user: User, postId: number, replyId: number) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            // post 확인
            const post = await this.getOnePost(postId);
            // reply 확인
            const reply = await this.replyRepository.createQueryBuilder('reply')
                .leftJoinAndSelect('reply.comments', 'comments')
                .where('reply.id = :replyId', {replyId})
                .getOne();
            if (!reply) {
                throw new NotFoundException()
            }
            // 권한 확인
            const role = await this.roleService.findRoleAssignment(post.spaceId, user.id);
            if (!role) {
                throw new ForbiddenException('공간에 참여 중인 사용자가 아닙니다.')
            }
            if (user.id === reply.userId || role.role.accessType === RoleAccessType.ADMIN) {
                await this.commentRepository.softRemove(reply.comments)
                await this.replyRepository.softRemove(reply)
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

    async findAllByUser(user: User) :Promise<{ myPosts: Post[], myReplies: Reply[], myComments: Comment[] }>{
        const posts = await this.postRepository.find({where: {userId: user.id}});
        const replies = await this.replyRepository.find({where: {userId: user.id}});
        const comments = await this.commentRepository.find({where: {userId: user.id}});
        return {myPosts: posts, myReplies: replies, myComments: comments}
    }

}
