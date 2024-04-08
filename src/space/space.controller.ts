import {
  Controller,
  Post, Req,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor, UseGuards,
} from '@nestjs/common';
import { SpaceService } from './space.service';
import { CreateSpaceDto } from './dto/create-space.dto';
import {AuthGuard} from "../user/auth.guard";
import {mapToSpaceResponseDto} from "./dto/mapper/space.mapper";
import {JoinSpaceDto} from "./dto/join-space.dto";

@Controller('spaces')
@UseGuards(AuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class SpaceController {
  constructor(private readonly spaceService: SpaceService) {}

  @Post()
  async createSpace(@Req() req:any, @Body() createSpaceDto: CreateSpaceDto) {
    const user = req.user
      const [space, adminAccessCode, memberAccessCode] = await this.spaceService.create(user, createSpaceDto);
      return mapToSpaceResponseDto(space, adminAccessCode, memberAccessCode);
  }

  @Delete(':id')
  async deleteSpace(@Req() req:any, @Param('id') id: string) {
    const user = req.user
    const spaceId = parseInt(id, 10);
    await this.spaceService.deleteSpace(user, spaceId);
    return '삭제 완료'
  }

  @Post('/:spaceId/users')
  async JoinSpace(@Req() req: any, @Param('spaceId') spaceId: string, @Body() joinSpaceDto: JoinSpaceDto) {
    const user = req.user
    await this.spaceService.joinSpace(user, +spaceId, joinSpaceDto)
    return '참여 완료'
  }

}
