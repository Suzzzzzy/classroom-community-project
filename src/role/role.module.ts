import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Space} from "../space/entities/space.entity";
import {Role} from "./entities/role.entity";
import {SpaceModule} from "../space/space.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Space, Role]),
    SpaceModule
  ],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [SpaceModule]
})
export class RoleModule {}
