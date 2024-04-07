import {
  Controller,
  Body,
  Param,
  Put,
  Req,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor, Delete
} from '@nestjs/common';
import { RoleService } from './role.service';
import {UpdateRoleAssignmentDto} from "./dto/update-role-assignment.dto";
import {AuthGuard} from "../user/auth.guard";
import {RoleAssignment} from "./entities/role-assignment";

@Controller('roles')
@UseGuards(AuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class RoleController {
  constructor(
      private readonly roleService: RoleService,
  ) {
  }


  @Put('/spaces/:spaceId/users/:targetUserId')
  async updateRoleAssignment(
      @Req() req: any,
      @Param('spaceId') spaceId: string,
      @Param('targetUserId') targetUserId: string,
      @Body() updateRoleAssignmentDto: UpdateRoleAssignmentDto): Promise<string> {
    const user = req.user
    await this.roleService.updateRoleAssignment(user, +spaceId, +targetUserId, updateRoleAssignmentDto);
    return '변경 완료'
  }

  @Delete('/:roleId/spaces/:spaceId')
  async deleteRole(
      @Req() req: any,
      @Param('roleId') roleId: string,
      @Param('spaceId') spaceId: string,
  ): Promise<string> {
    const user = req.user
    await this.roleService.deleteRole(user, +roleId, +spaceId)
    return '삭제 완료'
  }


}
