import {MiddlewareConsumer, Module, NestModule, ValidationPipe} from '@nestjs/common';
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
import {Chat} from "./post/entities/chat.entity";
import {Comment} from "./post/entities/comment.entity";
import {ConfigModule} from "@nestjs/config";
import * as process from "node:process";
import {LoggerMiddleware} from "./logger/logger.middleware";


@Module({
  imports: [
      ConfigModule.forRoot({
          envFilePath:
              process.env.NODE_ENV === 'prod'
                  ? '.prod.env'
                  : '.dev.env',
          isGlobal: true,
      }),
          TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost', // process.env.DATABASE_HOSTNAME,
        port: +process.env.DATABASE_PORT,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        entities: [User, Space, Role, RoleAssignment, AccessCode, Post, Chat, Comment],
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
export class AppModule implements NestModule{
    configure(consumer: MiddlewareConsumer): any {
        if (process.env.NODE_ENV === 'dev') {
            consumer.apply(LoggerMiddleware).forRoutes('*')
        }
    }
}
