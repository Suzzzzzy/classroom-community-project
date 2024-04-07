import {IsArray, IsString} from "class-validator";

export class SpaceResponseDto {
    id: number;
    userId: number;
    name: string;
    logoImageUrl: string;
    adminAccessCode: string;
    memberAccessCode: string;
}
