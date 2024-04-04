import {Injectable, UnauthorizedException} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy, VerifyCallback} from "passport-jwt";
import {User} from "./entity/user";
import {UserService} from "./user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken,
            secretOrKey: 'secret-key'
        });
    }

    async validate(payload: Payload, done: VerifyCallback): Promise<User> {
        const {id}  = payload
        const user = await this.userService.findByUserId(id)
        if (!user) {
            throw new UnauthorizedException('존재하지 않는 회원입니다.')
        }
        return user;
    }

}
export interface Payload {
    id: number;
}