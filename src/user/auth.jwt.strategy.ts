import {Injectable} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy, VerifyCallback} from "passport-jwt";
import {UserService} from "./user.service";
import {User} from "./entity/user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private userService: UserService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'secret-key'
        });
    }

    async validate(payload: Payload, done: VerifyCallback): Promise<User> {
        const {id}  = payload
        const user = await this.userService.findByUserId(id)
        return user;
    }

}
export interface Payload {
    id: number;
}