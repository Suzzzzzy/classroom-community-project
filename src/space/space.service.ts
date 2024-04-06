import { Injectable } from '@nestjs/common';
import { CreateSpaceDto } from './dto/create-space.dto';
import { UpdateSpaceDto } from './dto/update-space.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Space} from "./entities/space.entity";
import {Repository} from "typeorm";

@Injectable()
export class SpaceService {
  constructor(
      @InjectRepository(Space) private spaceRepository: Repository<Space>,
  ) {
  }
  async create(userId: number, createSpaceDto: CreateSpaceDto) {
    const space = new Space();
    space.name = createSpaceDto.name;
    space.logoImageUrl = createSpaceDto.logoImageUrl;
    await this.spaceRepository.save(space)
  }

  findAll() {
    return `This action returns all space`;
  }

  findOne(id: number) {
    return `This action returns a #${id} space`;
  }

  update(id: number, updateSpaceDto: UpdateSpaceDto) {
    return `This action updates a #${id} space`;
  }

  remove(id: number) {
    return `This action removes a #${id} space`;
  }
}
