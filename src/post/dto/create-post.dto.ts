import {IsBoolean, IsString} from "class-validator";
import {PostType} from "../type/post-type";

export class CreatePostDto {
    @IsString()
    postType: PostType;

    @IsString()
    title: string;

    @IsString()
    content: string;

    @IsBoolean()
    isAnonymous: boolean;
}
