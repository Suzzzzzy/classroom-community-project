import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {CreateSpaceDto} from './dto/create-space.dto';
import {UpdateSpaceDto} from './dto/update-space.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Space} from "./entities/space.entity";
import {DataSource, Repository} from "typeorm";
import {RoleAccessType} from "../role/type/role-access-type";
import {RoleService} from "../role/role.service";
import {generateAccessCode} from "../utils/generator";
import {User} from "../user/entity/user.entity";

@Injectable()
export class SpaceService {
  constructor(
      @InjectRepository(Space)
      private spaceRepository: Repository<Space>,
      private roleService: RoleService,
      private readonly dataSource: DataSource,
  ) {
  }
  async create(user: User, createSpaceDto: CreateSpaceDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const newSpace = new Space();
      newSpace.userId = user.id;
      newSpace.name = createSpaceDto.name;
      newSpace.logoImageUrl = createSpaceDto.logoImageUrl;
      newSpace.adminAccessCode = generateAccessCode();
      newSpace.memberAccessCode = generateAccessCode();

      await this.spaceRepository.save(newSpace);

      // 관리자 역할 생성
      await Promise.all(createSpaceDto.adminRoles.map(async (roleName) => {
        await this.roleService.create(newSpace, RoleAccessType.ADMIN, roleName);
      }));

      // 멤버 역할 생성
      await Promise.all(createSpaceDto.memberRoles.map(async (roleName) => {
        await this.roleService.create(newSpace, RoleAccessType.MEMBER, roleName);
      }));

      // 공간 생성자(소유자) 역할 할당
      const userRole = await this.roleService.findBySpaceAndName(newSpace.id, createSpaceDto.myRole)
      if (!userRole || userRole.accessType != RoleAccessType.ADMIN) {
        throw new Error('나의 역할이 올바르지 않습니다.');
      }
      await this.roleService.assign(userRole, user, 1);

      return newSpace;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException('공간 생성에 실패했습니다.', error.message);
    } finally {
      await queryRunner.release();
    }
  }

  async deleteSpace(user:User, spaceId: number) {
    // 소유자 권한 확인

    await this.spaceRepository.delete(spaceId);
  }

  async findOne(id: number): Promise<Space>{
    const space = await this.spaceRepository.findOne({where: {id}});
    if (!space) {
      throw new Error('공간을 찾을 수 없습니다.');
    }
    return space
  }

  findAll() {
    return `This action returns all space`;
  }



  update(id: number, updateSpaceDto: UpdateSpaceDto) {
    return `This action updates a #${id} space`;
  }

}
