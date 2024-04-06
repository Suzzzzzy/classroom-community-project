import {Injectable} from '@nestjs/common';
import {UpdateRoleDto} from './dto/update-role.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Role} from "./entities/role.entity";
import {RoleAccessType} from "./type/role-access-type";
import {Space} from "../space/entities/space.entity";
import {User} from "../user/entity/user.entity";
import {RoleAssignment} from "./entities/role-assignment";

@Injectable()
export class RoleService {
  constructor(
      @InjectRepository(Role)
      private roleRepository: Repository<Role>,
      @InjectRepository(RoleAssignment)
      private roleAssignmentRepository: Repository<RoleAssignment>,
  ) {}
  async create(space: Space, accessType: RoleAccessType, name: string) {
    return await this.roleRepository.save({
        space: space,
        accessType: accessType,
        name: name,
      });
  }

  async assign(role: Role, user: User, isOwner: number) {
    return await this.roleAssignmentRepository.save({
      role: role,
      user: user,
      isOwner: isOwner
    });
  }

  async findBySpaceAndName(spaceId: number, name: string): Promise<Role> {
    return this.roleRepository.findOne({where: {name, space: {id: spaceId}}});
  }

  async findRoleAssignment(spaceId: number, userId: number): Promise<RoleAssignment | undefined> {
    return await this.roleAssignmentRepository.createQueryBuilder('roleAssignment')
        .innerJoin('roleAssignment.role', 'role')
        .where('role.space_id = :spaceId', {spaceId})
        .andWhere('roleAssignment.user_id = :userId', {userId})
        .getOne();
  }


  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
