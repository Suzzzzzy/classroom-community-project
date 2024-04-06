import {Injectable} from '@nestjs/common';
import {UpdateRoleDto} from './dto/update-role.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {DataSource, Repository} from "typeorm";
import {Role} from "./entities/role.entity";
import {RoleAccessType} from "./type/role-access-type";
import {Space} from "../space/entities/space.entity";

@Injectable()
export class RoleService {
  constructor(
      @InjectRepository(Role)
      private roleRepository: Repository<Role>,
  ) {}
  async create(space: Space, accessType: RoleAccessType, name: string) {
      // 역할 저장
    return await this.roleRepository.save({
        space: space,
        accessType: accessType,
        name: name,
      })
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
