import {IsEmail, IsEmpty, IsOptional, IsString} from "class-validator";

export class CreateUserDto {
    @IsEmail()
    readonly email: string;

    @IsString()
    readonly password: string;

    @IsString()
    readonly firstName: string;

    @IsString()
    readonly lastName: string;

    @IsString()
    readonly profileImageUrl: string;
}
