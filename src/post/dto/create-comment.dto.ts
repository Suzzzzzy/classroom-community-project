import {IsBoolean, IsString} from "class-validator";
import {PostType} from "../type/post-type";

export class CreateCommentDto {
    @IsString()
    content: string;

    @IsBoolean()
    isAnonymous: boolean;
}
