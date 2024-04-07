import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./entity/user.entity";
import {JwtModule, JwtService} from "@nestjs/jwt";
import {JwtStrategy} from "./auth.jwt.strategy";
import {PassportModule} from "@nestjs/passport";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtModule.register({
            global: true,
            secret: "secret-key",
            signOptions: {expiresIn: '1000000s'},
        }),
        PassportModule,
    ],
  exports: [UserService, JwtModule],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
})
export class UserModule {}
