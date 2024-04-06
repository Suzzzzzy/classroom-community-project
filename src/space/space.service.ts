import { Injectable } from '@nestjs/common';
import { CreateSpaceDto } from './dto/create-space.dto';
import { UpdateSpaceDto } from './dto/update-space.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Space} from "./entities/space.entity";
import {Repository} from "typeorm";
import {RoleAccessType} from "../role/type/role-access-type";
import {RoleService} from "../role/role.service";

@Injectable()
export class SpaceService {
  constructor(
      @InjectRepository(Space)
      private spaceRepository: Repository<Space>,
      private roleService: RoleService,
  ) {
  }
  async create(userId: number, createSpaceDto: CreateSpaceDto) {
    const newSpace = new Space();
    newSpace.userId = userId;
    newSpace.name = createSpaceDto.name;
    newSpace.logoImageUrl = createSpaceDto.logoImageUrl;
    newSpace.adminAccessCode = generateAccessCode();
    newSpace.memberAccessCode = generateAccessCode();

    await this.spaceRepository.save(newSpace);

    // 관리자 역할 생성
    await Promise.all(createSpaceDto.adminRoles.map(async (roleName) => {
      await this.roleService.create(newSpace.id, RoleAccessType.ADMIN, roleName);
    }));

    // 멤버 역할 생성
    await Promise.all(createSpaceDto.memberRoles.map(async (roleName) => {
      await this.roleService.create(newSpace.id, RoleAccessType.MEMBER, roleName);
    }));

    return newSpace

  }

  findAll() {
    return `This action returns all space`;
  }

  findOne(id: number) {
    return `This action returns a #${id} space`;
  }

  update(id: number, updateSpaceDto: UpdateSpaceDto) {
    return `This action updates a #${id} space`;
  }

  remove(id: number) {
    return `This action removes a #${id} space`;
  }
}
