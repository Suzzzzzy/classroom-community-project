import {IsArray, IsString} from "class-validator";

export class CreateSpaceDto {
    @IsString()
    readonly name: string;

    @IsString()
    readonly logoImageUrl: string;

    @IsArray()
    readonly adminRoles: string[];

    @IsArray()
    readonly memberRoles: string[];

    @IsString()
    readonly myRole: string;
}
