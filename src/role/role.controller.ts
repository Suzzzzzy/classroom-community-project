import {
  Controller,
  Body,
  Param,
  Put,
  Req,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor
} from '@nestjs/common';
import { RoleService } from './role.service';
import {UpdateRoleAssignmentDto} from "./dto/update-role-assignment.dto";
import {AuthGuard} from "../user/auth.guard";

@Controller('roles')
@UseGuards(AuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class RoleController {
  constructor(
      private readonly roleService: RoleService,
  ) {}


  @Put('/spaces/:spaceId/users/:targetUserId')
  async updateRoleAssignment(
      @Req() req: any,
      @Param('spaceId') spaceId: string,
      @Param('targetUserId') targetUserId: string,
      @Body() updateRoleAssignmentDto: UpdateRoleAssignmentDto) {
    const user = req.user
    await this.roleService.updateRoleAssignment(user, +spaceId, +targetUserId, updateRoleAssignmentDto);
    return '변경 완료'
  }


}
