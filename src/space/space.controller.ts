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
import { UpdateSpaceDto } from './dto/update-space.dto';
import any = jasmine.any;
import {AuthGuard} from "../user/auth.guard";
import {mapToSpaceResponseDto} from "./dto/space.mapper";
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
    return this.spaceService.deleteSpace(user, spaceId);
  }

  @Post('/:spaceId/users')
  async JoinSpace(@Req() req: any, @Param('spaceId') spaceId: string, @Body() joinSpaceDto: JoinSpaceDto) {
    const user = req.user
    await this.spaceService.joinSpace(user, +spaceId, joinSpaceDto)
    return '참여 완료'
  }



  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSpaceDto: UpdateSpaceDto) {
    return this.spaceService.update(+id, updateSpaceDto);
  }


}
