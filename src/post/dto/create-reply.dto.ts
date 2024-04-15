import {IsBoolean, IsString} from "class-validator";
import {PostType} from "../type/post-type";

export class CreateReplyDto {
    @IsString()
    content: string;

    @IsBoolean()
    isAnonymous: boolean;
}
