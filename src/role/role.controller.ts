import {Controller, Get, Post, Body, Patch, Param, Delete, Put, Req} from '@nestjs/common';
import { RoleService } from './role.service';
import {UpdateRoleAssignmentDto} from "./dto/update-role-assignment.dto";

@Controller('roles')
export class RoleController {
  constructor(
      private readonly roleService: RoleService,
  ) {}


  @Put('/spaces/:spaceId/users/roles/:targetUserId')
  async updateRoleAssignment(
      @Req() req: any,
      @Param('spaceId') spaceId: string,
      @Param('targetUserId') targetUserId: string,
      @Body() updateRoleAssignmentDto: UpdateRoleAssignmentDto) {
    const user = req.user
    const {role, accessType} = updateRoleAssignmentDto
    await this.roleService.updateRoleAssignment(user, +spaceId, +targetUserId, updateRoleAssignmentDto);
    return '변경 완료'
  }


}
