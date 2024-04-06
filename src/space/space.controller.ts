import {
  Controller,
  Get,
  Post, Req,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor, UseGuards
} from '@nestjs/common';
import { SpaceService } from './space.service';
import { CreateSpaceDto } from './dto/create-space.dto';
import { UpdateSpaceDto } from './dto/update-space.dto';
import any = jasmine.any;
import {AuthGuard} from "../user/auth.guard";
import {mapToSpaceResponseDto} from "../role/dto/space.mapper";

@Controller('space')
@UseGuards(AuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class SpaceController {
  constructor(private readonly spaceService: SpaceService) {}

  @Post()
  async create(@Req() req:any, @Body() createSpaceDto: CreateSpaceDto) {
    const {name, logoImageUrl} = createSpaceDto
    const user = req.user
    const result = await this.spaceService.create(user, createSpaceDto);
    return mapToSpaceResponseDto(result)
  }

  @Get()
  findAll() {
    return this.spaceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.spaceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSpaceDto: UpdateSpaceDto) {
    return this.spaceService.update(+id, updateSpaceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.spaceService.remove(+id);
  }
}
