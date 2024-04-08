import {Space} from "../entities/space.entity";
import {SpaceResponseDto} from "./space-response.dto";

export function mapToSpaceResponseDto(space: Space, adminAccessCode: string, memberAccessCode: string): SpaceResponseDto {
    return {
        id: space.id,
        userId: space.userId,
        name: space.name,
        logoImageUrl: space.logoImageUrl,
        adminAccessCode: adminAccessCode,
        memberAccessCode: memberAccessCode,
    }
}