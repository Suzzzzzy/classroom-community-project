import {DefaultUserDto} from "./default-user.dto";
import {UserEntity} from "../entity/user.entity";
import {PublicUserDto} from "./public-user.dto";

export function mapToDefaultUserDto(user: UserEntity): DefaultUserDto {
    return {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        profileImageUrl: user.profileImageUrl,
    };
}

export function mapToPublicUserDto(user: UserEntity): PublicUserDto {
    return {
        firstName: user.firstName,
        lastName: user.lastName,
        profileImageUrl: user.profileImageUrl,
    };
}