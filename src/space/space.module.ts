import { Module } from '@nestjs/common';
import { SpaceService } from './space.service';
import { SpaceController } from './space.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Role} from "../role/entities/role.entity";
import {Space} from "./entities/space.entity";
import {RoleModule} from "../role/role.module";

@Module({
  imports: [
      TypeOrmModule.forFeature([Space, Role]),
      RoleModule
  ],
  controllers: [SpaceController],
  providers: [SpaceService],
  exports: [SpaceService]
})
export class SpaceModule {}
