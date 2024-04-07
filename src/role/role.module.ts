import {forwardRef, Module} from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Role} from "./entities/role.entity";
import {RoleAssignment} from "./entities/role-assignment";
import {SpaceModule} from "../space/space.module";
import {UserModule} from "../user/user.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Role, RoleAssignment]),
    forwardRef(() =>SpaceModule),
      UserModule,
  ],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService]
})
export class RoleModule {}
