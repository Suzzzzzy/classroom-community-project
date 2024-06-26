import {BadRequestException, ForbiddenException, forwardRef, Inject, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Role} from "./entities/role.entity";
import {RoleAccessType} from "./type/role-access-type";
import {Space} from "../space/entities/space.entity";
import {User} from "../user/entity/user.entity";
import {RoleAssignment} from "./entities/role-assignment";
import {SpaceService} from "../space/space.service";
import {UpdateRoleAssignmentDto} from "./dto/update-role-assignment.dto";
import {UserService} from "../user/user.service";

@Injectable()
export class RoleService {
  constructor(
      @InjectRepository(Role)
      private roleRepository: Repository<Role>,
      @InjectRepository(RoleAssignment)
      private roleAssignmentRepository: Repository<RoleAssignment>,
      @Inject(forwardRef(() =>SpaceService))
      private spaceService: SpaceService,
      private userService: UserService,
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
    const newRole= await this.roleRepository.findOne({where: {name, space: {id: spaceId}}});
    if (!newRole) {
      throw new BadRequestException('존재하지 않는 역할 입니다.');
    }
    return newRole
  }

  async findRoleAssignment(spaceId: number, userId: number): Promise<RoleAssignment> {
    return await this.roleAssignmentRepository.createQueryBuilder('roleAssignment')
        .innerJoinAndSelect('roleAssignment.role', 'role')
        .where('role.spaceId = :spaceId', {spaceId})
        .andWhere('roleAssignment.userId = :userId', {userId})
        .getOne();
  }

  async updateRoleAssignment(user: User, spaceId: number, targetUserId: number, updateRoleAssignmentDto: UpdateRoleAssignmentDto): Promise<void>{
    await this.spaceService.findOne(spaceId);
    // 소유자 권한 확인
    const userRole = await this.findRoleAssignment(spaceId, user.id);
    if (!userRole || userRole.isOwner == 0) {
      throw new ForbiddenException('역할 변경 권한이 없습니다.')
    }
    // 타겟 유저 확인
    await this.userService.findByUserId(targetUserId)
    // 역할 변경
    const role = await this.findRoleAssignment(spaceId, targetUserId)
    if (!role) {
      throw new ForbiddenException('공간에 참여 중인 사용자가 아닙니다.')
    }
    const newRole = await this.findBySpaceAndName(spaceId, updateRoleAssignmentDto.role);
    if (!newRole) {
      throw new BadRequestException('존재하지 않는 역할 입니다.')
    }

    role.role = newRole;
    if (updateRoleAssignmentDto.accessType == "소유자") {
      if (newRole.accessType != RoleAccessType.ADMIN) {
        throw new BadRequestException('소유자는 관리자와 같은 역할을 공유합니다.')
      }
      role.isOwner = 1;
    } else {
      if (newRole.accessType != updateRoleAssignmentDto.accessType) {
        throw new BadRequestException('권한과 역할이 올바르지 않습니다.')
      }
      role.isOwner = 0;
    }
    await this.roleAssignmentRepository.save(role);
  }

  async deleteRole(user: User, roleId: number, spaceId: number): Promise<void> {
    // 관리자 권한 확인
    const userRole = await this.findRoleAssignment(spaceId, user.id);
    if (!userRole) {
      throw new ForbiddenException('공간에 참여 중인 사용자가 아닙니다.')
    }
    if (userRole.role.accessType != RoleAccessType.ADMIN) {
      throw new ForbiddenException('역할 삭제 권한이 없습니다.');
    }
    // 역할 정보 확인
    const role = await this.roleRepository.findOne({where: {id: roleId}})
    if (!role || role.spaceId != spaceId) {
      throw new BadRequestException('공간과 역할 정보가 올바르지 않습니다.')
    }
    // 역할 할당되어 있는 유저 확인
    const isRoleAssignment = await this.roleAssignmentRepository.findOne({where: {role: {id: roleId}}})
    if (isRoleAssignment) {
      throw new ForbiddenException('사용중인 역할은 삭제할 수 없습니다.')
    }
    await this.roleRepository.softDelete(roleId);
  }
}
