import {IsArray, IsString} from "class-validator";

export class UpdateRoleAssignmentDto {
    @IsString()
    readonly role: string;

    @IsString()
    readonly accessType: string;
}
