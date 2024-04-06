import {Module, ValidationPipe} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import { UserModule } from './user/user.module';
import {User} from "./user/entity/user";
import { SpaceModule } from './space/space.module';


@Module({
  imports: [
      TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'classum',
        entities: [User],
        synchronize: true,
      }),
      UserModule,
      SpaceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
