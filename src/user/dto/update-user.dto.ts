import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {IsOptional, IsString} from "class-validator";

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    readonly password?: string;

    @IsOptional()
    @IsString()
    readonly firstName?: string;

    @IsOptional()
    @IsString()
    readonly lastName?: string;

    @IsOptional()
    @IsString()
    readonly profileImageUrl?: string;
}
