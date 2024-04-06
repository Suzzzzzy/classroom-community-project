import {Module, ValidationPipe} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import { UserModule } from './user/user.module';
import {User} from "./user/entity/user";
import { SpaceModule } from './space/space.module';
import {RoleModule} from "./role/role.module";
import {Space} from "./space/entities/space.entity";
import {Role} from "./role/entities/role.entity";


@Module({
  imports: [
      TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'classum',
        entities: [User, Space, Role],
        synchronize: true,
      }),
      UserModule,
      SpaceModule,
      RoleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
