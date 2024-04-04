import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {User} from "./entity/user";

@Injectable()
export class UserService {
  constructor(
      @InjectRepository(User)
      private userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const userEntity = await this.userRepository.create(createUserDto)
    return await this.userRepository.save(userEntity)
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne( { where: {email} });
    if (user) {
      return user;
    }
  }

  async findByUserId(userId: number): Promise<User> {
    const user = await this.userRepository.findOne({where: {id: userId}});
    if (!user) {
      throw new Error('사용자를 찾을 수 없습니다.')
    }
    return user
  }

  async updateUser(user: User, data: Partial<User>): Promise<User> {
    Object.assign(user, data);
    return this.userRepository.save(user);
  }

  findAll(): Promise<User[]> {
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
