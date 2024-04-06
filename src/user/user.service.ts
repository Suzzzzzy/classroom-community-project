import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {UserEntity} from "./entity/user.entity";

@Injectable()
export class UserService {
  constructor(
      @InjectRepository(UserEntity)
      private userRepository: Repository<UserEntity>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const userEntity = await this.userRepository.create(createUserDto)
    return await this.userRepository.save(userEntity)
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne( { where: {email} });
    if (user) {
      return user;
    }
  }

  async findByUserId(userId: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({where: {id: userId}});
    if (!user) {
      throw new Error('사용자를 찾을 수 없습니다.')
    }
    return user
  }

  async updateUser(user: UserEntity, data: Partial<UserEntity>): Promise<UserEntity> {
    Object.assign(user, data);
    return this.userRepository.save(user);
  }

  findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
