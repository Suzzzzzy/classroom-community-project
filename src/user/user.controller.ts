import {
  Body, ClassSerializerInterceptor,
  ConflictException,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post, Put, Req,
  UnauthorizedException, UseGuards, UseInterceptors, UsePipes, ValidationPipe
} from '@nestjs/common';
import {UserService} from './user.service';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {LoginUserDto} from "./dto/login-user.dto";
import * as bcrypt from 'bcrypt';
import {JwtService} from "@nestjs/jwt";
import { AuthGuard } from './auth.guard';
import {mapToDefaultUserDto, mapToPublicUserDto} from "./dto/user.mapper";

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(
      private readonly userService: UserService,
      private readonly jwtService: JwtService,
  ) {}

  @Post('signup')
  async create(@Body() createUserDto: CreateUserDto) {
    const {email, password, firstName, lastName, profileImageUrl} = createUserDto;
    const hasEmail = await this.userService.findByEmail(email);
    if (hasEmail) {
      throw new ConflictException('이미 사용중인 이메일 입니다.');
    }
    const userEntity = await this.userService.create(createUserDto);

    return mapToDefaultUserDto(userEntity)
  }

  @Post('signin')
  async login(@Body() loginUserDto: LoginUserDto) {
    const {email, password} = loginUserDto;
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('이메일 또는 비밀번호를 확인해주세요.');
    }
    const checkedPassword = bcrypt.compareSync(password, user.password.toString());
    if (!checkedPassword) {
      throw new UnauthorizedException('이메일 또는 비밀번호를 확인해주세요.');
    }
    const payload = {
      id: user.id,
    }
    const accessToken = this.jwtService.sign(payload);
    return {
      accessToken: accessToken,
      refreshToken: ""
    }
  }

  @UseGuards(AuthGuard)
  @Put('profile')
  async updateProfile(@Req() req: any, @Body() updateUserDto: UpdateUserDto) {
    const {password, firstName, lastName, profileImageUrl} = updateUserDto;
    const user = req.user
    const result = await this.userService.updateUser(user, updateUserDto)
    return mapToDefaultUserDto(result)
  }

  @UseGuards(AuthGuard)
  @Get('profile/:id?')
  async findUser(@Req() req, @Param('id') id?: string): Promise<any> {
    if (id != null) {
      const userId = parseInt(id, 10);
      if (userId === req.user.id) {
        return mapToDefaultUserDto(req.user)
      }
      const user = await this.userService.findByUserId(userId);
      return mapToPublicUserDto(user)
    } else {
      return mapToDefaultUserDto(req.user)
    }
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
