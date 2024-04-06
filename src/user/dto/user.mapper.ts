import {DefaultUserDto} from "./default-user.dto";
import {User} from "../entity/user.entity";
import {PublicUserDto} from "./public-user.dto";

export function mapToDefaultUserDto(user: User): DefaultUserDto {
    return {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        profileImageUrl: user.profileImageUrl,
    };
}

export function mapToPublicUserDto(user: User): PublicUserDto {
    return {
        firstName: user.firstName,
        lastName: user.lastName,
        profileImageUrl: user.profileImageUrl,
    };
}