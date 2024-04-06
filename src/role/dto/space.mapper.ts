import {Space} from "../../space/entities/space.entity";
import {SpaceResponseDto} from "../../space/dto/space-response.dto";

export function mapToSpaceResponseDto(space: Space): SpaceResponseDto {
    return {
        id: space.id,
        userId: space.userId,
        name: space.name,
        logoImageUrl: space.logoImageUrl,
        adminAccessCode: space.adminAccessCode,
        memberAccessCode: space.memberAccessCode,
    }
}