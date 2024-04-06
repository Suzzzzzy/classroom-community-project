import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {DataSource, Repository} from "typeorm";
import {Role} from "./entities/role.entity";
import {RoleAccessType} from "./type/role-access-type";

@Injectable()
export class RoleService {
  constructor(
      @InjectRepository(Role)
      private roleRepository: Repository<Role>,
      private readonly dataSource: DataSource,
  ) {}
  async create(spaceId: number, accessType: RoleAccessType, name: string) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      // 역할 저장
      const newRole = await queryRunner.manager.save(Role, {
        space: {id: spaceId},
        accessType: accessType,
        name: name,
      });
      await queryRunner.commitTransaction();
      return newRole
    } catch (error) {
        await queryRunner.rollbackTransaction();
        return { status: 404, message: error.message };
      } finally {
        await queryRunner.release();
      }
    }


  findAll() {
    return `This action returns all role`;
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
