import {Module, ValidationPipe} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import { UserModule } from './user/user.module';
import {User} from "./user/entity/user.entity";
import { SpaceModule } from './space/space.module';
import {RoleModule} from "./role/role.module";
import {Space} from "./space/entities/space.entity";
import {Role} from "./role/entities/role.entity";
import {RoleAssignment} from "./role/entities/role-assignment";
import {AccessCode} from "./space/entities/accesscode.entity";
import { PostModule } from './post/post.module';
import {Post} from "./post/entities/post.entity";


@Module({
  imports: [
      TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'classum',
        entities: [User, Space, Role, RoleAssignment, AccessCode, Post],
        synchronize: true,
        logging: true,
      }),
      UserModule,
      SpaceModule,
      RoleModule,
      PostModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
