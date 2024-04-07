import {IsString} from "class-validator";

export class JoinSpaceDto {
    @IsString()
    readonly accessCode: string;

    @IsString()
    readonly myRole: string;
}
