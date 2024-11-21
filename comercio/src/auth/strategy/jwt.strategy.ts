import { BadRequestException, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "../entities/auth.entity";
import { Repository } from "typeorm";
import { JwtPayload } from "../interfaces/jwt.payload";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {
        super({
            secretOrKey: process.env.SECRET_PASSWORD,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        });
    }

    async validate(payload: JwtPayload) {
        const { email } = payload;
        const user = await this.userRepository.findOneBy({email});
        if(!user) {
            throw new BadRequestException('Unauthorized');
        }
        if(!user.isActive) {
            throw new BadRequestException("Unauthorized");
        }
        return user;
    }
}